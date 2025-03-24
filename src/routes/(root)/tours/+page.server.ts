import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = async ({ fetch, locals }) => {
    return {user: locals.user}
};