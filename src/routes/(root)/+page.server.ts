import {
  flightSearchSchema,
} from "$lib/server/validation.js";
import { redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";

export async function load(event) {
  const form = await superValidate(event, zod(flightSearchSchema));

  return { form };
}

export const actions = {
  logout: async ({ fetch, cookies, request }) => {
      //  send request to backend to invalidate user session
      const csrfToken = cookies.get("csrf_token") as string;
      const token = cookies.get("access_token") as string;
  
      try {
        const response = await fetch(
          `${process.env.NODE_ENV === "production" ? LIVE_URL + "/auth/logout" : LOCAL_URL + "/auth/logout"}`
          , {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken ? csrfToken : "",
            Authorization: `Bearer ${token}`,
            cookie: `csrf_token=${csrfToken}`,
          },
          credentials: "include",
        });
  
        const data = await response.json();
  
        cookies.delete("access_token", { path: "/" });
        cookies.delete("csrf_token", { path: "/" });
        cookies.delete("user_session", { path: "/" });
      } catch (err: any) {
        console.error('An error has occured', err)
      }
      // await authService.destroyUserSession(csrfToken);
      cookies.delete("access_token", { path: "/" });
      cookies.delete("csrf_token", { path: "/" });
      cookies.delete("user_session", { path: "/" });
  
      //  invalidate user session on client side as well.
      redirect(301, "/login");
    },
};
