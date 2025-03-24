import { LIVE_URL, LOCAL_URL } from "$env/static/private";
import type { User } from "$lib/types";

const PUBLIC_PATHS = [
  "/",
  "/about",
  "/services",
  "/tours",
  "/contact",
  "/forgot-password",
];

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  const { cookies, url } = event;
  const csrfToken = cookies.get("csrf_token");
  const token = cookies.get("access_token");

  let userData: User & { detail: string | undefined };
  let cachedUserSession = cookies.get("user_session"); // Retrieve cached user session

  async function validateUserSession() {
    if (csrfToken && token) {
      try {
        const req = await fetch(
          `${process.env.NODE_ENV === "production" ? LIVE_URL + "/auth/validate-session" : LOCAL_URL + "/auth/validate-session"}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "X-CSRF-Token": csrfToken ? csrfToken : "",
              Authorization: `Bearer ${token}`,
              cookie: `csrf_token=${csrfToken}`,
            },
            credentials: "include",
          }
        );

        userData = await req.json();

        if (userData?.detail) {
          event.locals.user = undefined;
          cookies.delete("user_session", { path: "/" }); // Clear cached session if invalid
          cookies.delete("access_token", { path: "/" });
          cookies.delete("csrf_token", { path: "/" });
        } else {
          event.locals.user = userData;
          cookies.set("user_session", JSON.stringify(userData), {
            path: "/",
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 15, // Cache session for 15 minutes
          });
        }
      } catch (err: any) {
        console.log("Error validating session:", err);
        event.locals.user = undefined;
        cookies.delete("user_session", { path: "/" });
        cookies.delete("access_token", { path: "/" });
        cookies.delete("csrf_token", { path: "/" });
      }
    } else {
      event.locals.user = undefined;
      cookies.delete("user_session", { path: "/" });
      cookies.delete("access_token", { path: "/" });
      cookies.delete("csrf_token", { path: "/" });
    }
  }

  // If a session is already cached, use it instead of making a new request
  if (cachedUserSession) {
    try {
      event.locals.user = JSON.parse(cachedUserSession);
    } catch {
      event.locals.user = undefined;
      cookies.delete("user_session", { path: "/" });
      cookies.delete("access_token", { path: "/" });
      cookies.delete("csrf_token", { path: "/" });
    }
  } else if (
    url.pathname.includes("/login") ||
    url.pathname.includes("register") ||
    url.pathname.includes("/dashboard")
  ) {
    await validateUserSession(); // Validate only for auth-required routes
  } else {
    event.locals.user = undefined;
    cookies.delete("user_session", { path: "/" });
    cookies.delete("access_token", { path: "/" });
    cookies.delete("csrf_token", { path: "/" });
  }

  const response = await resolve(event);
  return response;
}
