import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { LIVE_URL, LOCAL_URL } from "$env/static/private";

// export const load: PageServerLoad = async ({ fetch, parent, locals, url }) => {
//     if (locals.user)
//         return redirect(302, url.searchParams.get("redirectTo") || "/dashboard");

//     const response = await fetch(
//         `${process.env.NODE_ENV === "production" ? LIVE_URL + "/auth/google/login/callback" : LOCAL_URL + "/auth/google/login/callback"}`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

// };