// import { error, redirect } from "@sveltejs/kit";
// import type { PageServerLoad } from "../$types";
// import { LIVE_URL, LOCAL_URL } from "$env/static/private";
// import type { TourPackage } from "$lib/types/tourPackage";

// export const load: PageServerLoad = async ({ fetch, locals, params }) => {
//   async function fetchData<T>(endpoint: string): Promise<T> {
//     try {
//       const response = await fetch(endpoint);

//       if (!response.ok) {
//         const { detail } = (await response.json()) as { detail: string };
//         throw new Error(detail ?? "An unknown error has occured");
//       }
//       return response.json();
//     } catch (err: any) {
//       throw error(404, { message: err.message as string});
//     }
//   }
//   const { id } = params as { id: string };
//   const data = await fetchData<TourPackage>(
//     `${process.env.NODE_ENV === "production" ? LIVE_URL + "/tour-package/view/" + id : LOCAL_URL + "/tour-package/view/" + id}`
//   );

//   return { tourPackage: data };
// };
