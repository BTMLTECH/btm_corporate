import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";
import { LIVE_URL, LOCAL_URL } from "$env/static/private";
import type { TourPackage } from "$lib/types/tourPackage";

export const load: PageServerLoad = async ({ fetch, locals, params }) => {
  async function fetchData<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${endpoint}`);
      }
      return response.json();
    } catch (err: any) {
      throw Error("Something has happened");
    }
  }
  const { id } = params as { id: string };
  const data = await fetchData<TourPackage>(
    `${process.env.NODE_ENV === "production" ? LIVE_URL + "/tour-package/view/" + id : LOCAL_URL + "/tour-package/view/" + id}`
  );

  return { tourPackage: data };
};
