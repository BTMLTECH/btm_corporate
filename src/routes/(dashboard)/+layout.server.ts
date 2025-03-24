import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import { authService } from "$lib/server/config.server";

export const load: LayoutServerLoad = async ({ locals, cookies, url }) => {
  if (!locals.user) {
    return redirect(301, url.searchParams.get("redirectTo") || "/login");
  }

  return { user: locals.user };
};
