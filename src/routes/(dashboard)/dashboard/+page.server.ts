import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { authService } from "$lib/server/config.server";
import type { User } from "$lib/types";
import { LIVE_URL, LOCAL_URL } from "$env/static/private";
import { fail } from "sveltekit-superforms";

export const load: PageServerLoad = async ({ fetch, parent, locals, url }) => {
  const parentData = await parent();

  if (!parentData.user)
    return redirect(301, url.searchParams.get("redirectTo") || "/login");
  
  const redirectTo = url.searchParams.get("redirectTo") as string

  if (redirectTo) redirect(301, redirectTo)

  return { ...parentData };
};

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
  reverify: async ({ request, fetch, cookies }) => {
    const form = await request.formData();

    const user = form.get("user") as string;


    if (!user || !user.length) return redirect(301, "/login");

    try {
      const csrfToken = cookies.get("csrf_token")
      const accessToken = cookies.get("access_token")

      const userJSON = JSON.parse(user)

      const response = await fetch(
        `${process.env.NODE_ENV === "production" ? LIVE_URL + "/auth/resend-verification" : LOCAL_URL + "/auth/resend-verification"}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken ? csrfToken : "",
            Authorization: `Bearer ${accessToken}`,
            cookie: `csrf_token=${csrfToken}`
          },
          body: JSON.stringify(userJSON),
          credentials: "include"
        }
      );

      const data = await response.json();

      if (data?.detail) {
        throw Error(data?.detail);
      }

      return { ...data };
    } catch (err: any) {
      return fail(400, {
        message: err.message,
      });
    }

    return {};
  },
};
