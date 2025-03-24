import { error, fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { authService } from "$lib/server/config.server";
import { LIVE_URL, LOCAL_URL } from "$env/static/private";
import type { User } from "$lib/types";

export const load: PageServerLoad = async ({ cookies, url, locals }) => {
  let token = url.searchParams.get("token");

  if (!token) {
    throw redirect(301, "/login");
  }

  // send request to backend to verify email
  try {
    authService.setUrl(
      `${process.env.NODE_ENV === "production" ? LIVE_URL + "/auth/verify" : LOCAL_URL + "/auth/verify"}`
    );
    let isSignUpVerified = await authService.verifySignUp(token);

    if (!isSignUpVerified.verified) {
      return {
        success: false,
        verified: false,
        user: locals.user,
      };
    }

    // get cached user
    let cachedUserSession = cookies.get("user_session");

    if (cachedUserSession) {
      let user: User = JSON.parse(cachedUserSession) as User;
      user.email_verified = true;
      cookies.set("user_session", JSON.stringify(user), { path: "/" });
    }

    return { success: true, verified: true, user: locals.user };
  } catch (err: any) {
    console.error("error", err);
    return {
      success: false,
      verified: false,
      user: locals.user,
    };
  }
};
