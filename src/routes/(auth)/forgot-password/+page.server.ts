import type { Actions, PageServerLoad } from "./$types";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { ForgotPasswordSchema } from "$lib/validations/user";
import { fail } from "@sveltejs/kit";
import { LIVE_URL, LOCAL_URL } from "$env/static/private";

export const load: PageServerLoad = async () => {
  const form = await superValidate(zod(ForgotPasswordSchema));

  return { form };
};

export const actions = {
  forgotPassword: async ({ request, cookies, locals, fetch }) => {
    const form = await superValidate(request, zod(ForgotPasswordSchema));

    if (!form.valid) {
      return fail(400, { form });
    }

    try {
      const response = await fetch(process.env.NODE_ENV === 'production' ? LIVE_URL + '/auth/forgot-password' : LOCAL_URL + '/auth/forgot-password', {
        method: "POST",
      })

      const data = await response.json()

      console.log("data from forgot password", data)
    } catch (err: any) {
      console.error("an error has occured", err);
      return { form };
    }

    return { form };
  },
} satisfies Actions;
