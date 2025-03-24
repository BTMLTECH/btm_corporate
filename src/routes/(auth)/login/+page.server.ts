import type { PageServerLoad } from "./$types";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { fail, redirect } from "@sveltejs/kit";
import { LoginSchema } from "$lib/validations/user";
import { authService } from "$lib/server/config.server";
import { LIVE_URL, LOCAL_URL } from "$env/static/private";
import type { User } from "$lib/types";

export const load: PageServerLoad = async ({ fetch, url, cookies, locals }) => {
  const form = await superValidate(zod(LoginSchema));

  if (locals.user)
    return redirect(302, url.searchParams.get("redirectTo") || "/dashboard");

  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  if (code && state) {
    try {
      // Send the code to your backend to complete authentication
      const response = await fetch(
        `${process.env.NODE_ENV === "production" ? LIVE_URL + "/auth/google/login/callback" : LOCAL_URL + "/auth/google/login/callback"}`,
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
        access_token: string;
        csrf_token: string;
        detail?: string;
        user: User;
      } = await response.json();

      if (data.detail) {
        return {
          success: false,
          form,
          error: data.detail,
          errors: [
            {
              name: "login-state",
              message: data.detail as string,
            },
          ],
        };
      }

      cookies.set("csrf_token", data.csrf_token, {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        // secure: process.env.NODE_ENV === "production",
        secure: false,
        maxAge: 60 * 60 * 2, // 24 hours
        // domain: '127.0.0.1'
      });

      cookies.set("access_token", data.access_token, {
        path: "/",
        httpOnly: true,
        sameSite: "none",
        // secure: process.env.NODE_ENV === "production",
        secure: true,
        maxAge: 60 * 60 * 2, // 24 hours
        // domain: '127.0.0.1'
      });

      locals.user = data.user;
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
        accessToken: undefined,
      };
    }

    throw redirect(301, url.searchParams.get("redirectTo") || "/dashboard");
  }

  return {
    success: true,
    form,
  };
};

export const actions = {
  login: async ({ request, cookies, locals, url, params }) => {
    const formData = await request.formData();
    const form = await superValidate(formData, zod(LoginSchema));
    const redirectTo = formData.get("redirectTo") as string;

    if (!form.valid) {
      return fail(400, { form });
    }

    try {
      authService.setUrl(
        `${process.env.NODE_ENV === "production" ? LIVE_URL + "/auth/sign-in" : LOCAL_URL + "/auth/sign-in"}`
      );
      const auth = await authService.validateCredentials(
        form.data.email,
        form.data.password
      );

      if (auth && auth.detail && !auth.user) {
        return fail(401, {
          error: auth.detail,
          errors: auth.errors,
          form,
        });
      }

      if (!auth) {
        return fail(401, {
          error: "Authentication failed",
          errors: [
            { email: "Email is required", password: "Password is required" },
          ],
          form,
        });
      }

      cookies.set("csrf_token", auth.csrf_token, {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        // secure: process.env.NODE_ENV === "production",
        secure: false,
        maxAge: 60 * 60 * 2, // 24 hours
        // domain: '127.0.0.1'
      });

      cookies.set("access_token", auth.access_token, {
        path: "/",
        httpOnly: true,
        sameSite: "none",
        // secure: process.env.NODE_ENV === "production",
        secure: true,
        maxAge: 60 * 60 * 2, // 24 hours
        // domain: '127.0.0.1'
      });

      locals.user = auth.user;

      // return {
      //   success: true,
      //   form,
      //   ...auth,
      // };
    } catch (err: any) {
      console.error("eor", err);
      return fail(500, {
        form,
        error: "Sorry! We could not complete this action at this time.",
        errors: [
          {
            name: "login",
            message: "Sorry! We could not complete this action at this time.",
          },
        ],
      });
    }

    redirect(301, `/dashboard?redirectTo=${redirectTo}`);
  },
};
