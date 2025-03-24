import type { PageServerLoad } from "./$types";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { fail, redirect } from "@sveltejs/kit";
import { AuthSchema } from "$lib/validations/user";
import { authService } from "$lib/server/config.server";
import type { User } from "$lib/types";
import { LIVE_URL, LOCAL_URL } from "$env/static/private";

export const load: PageServerLoad = async ({ fetch, locals, cookies, url }) => {
  const form = await superValidate(zod(AuthSchema));
  if (locals.user) return redirect(302, "/dashboard");

  // check if user is logged in here

  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  if (code && state) {
    try {
      // Send the code to your backend to complete authentication
      const response = await fetch(
        `${process.env.NODE_ENV === "production" ? LIVE_URL + "/auth/google/register/callback" : LOCAL_URL + "/auth/google/register/callback"}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code, state }),
        }
      );

      // Handle the response accordingly
      const data: {
        detail?: string;
        access_token: string;
        csrf_token: string;
        user: User;
        status_code?: number;
      } = await response.json();

      if (data.detail) {
        return {
          status: data.status_code,
          success: false,
          form,
          error: data.detail,
          errors: [
            {
              name: "email",
              message: data.detail as string,
            },
          ],
        };
      }
      
      return {
        success: true,
        form,
        user: data.user,
        accessToken: data.access_token,
      };
    } catch (err: any) {
      let errors = { ...err };

      for (let k in JSON.parse(JSON.stringify(err))) {
        errors = {
          ...errors,
          [`${k}`]: err[k],
        };
      }

      return {
        success: false,
        form,
        errors,
        user: undefined,
      };
    }
  }

  return {
    success: true,
    form,
  };
};

export const actions = {
  register: async ({ request }) => {
    const form = await superValidate(request, zod(AuthSchema));

    if (!form.valid) {
      return fail(400, { form });
    }

    if (form.data.password?.length < 6) {
      form.valid = false;
      form.errors = {
        ...form.errors,
        password: ["Password is too short!"],
      };

      return fail(400, {
        success: false,
        form,
        error: "Form is invalid",
        errors: [
          {
            name: "Password",
            message: "Password is too short",
          },
        ],
      });
    }

    if (form.data.cPassword !== form.data.password) {
      form.errors = {
        ...form.errors,
        cPassword: ["Password does not match!"],
      };

      return fail(400, {
        success: false,
        form,
        error: "Form is invalid",
        errors: [
          {
            name: "Confirm Password",
            message: "Password does not match!",
          },
        ],
      });
    }

    try {
      authService.setUrl(
        `${process.env.NODE_ENV === "production" ? LIVE_URL + "/auth/sign-up" : LOCAL_URL + "/auth/sign-up"}`
      );

      const newUser = await authService.createCredentials(
        form.data.name,
        form.data.email,
        form.data.password
      );

      if (newUser && newUser.detail) {
        return fail(400, {
          error: newUser.detail,
          errors:
            newUser.errors && newUser.errors.length ? [...newUser.errors] : [],
          form,
          user: undefined,
        });
      }

      return {
        success: true,
        form,
        user: newUser,
      };
    } catch (err: any) {
      return {
        success: false,
        form,
        error: "",
        errors: [],
        user: undefined,
      };
    }
  },
};
