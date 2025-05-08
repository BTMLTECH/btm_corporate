import type { PageServerLoad } from "./$types";
import { PackageSchema } from "$lib/validations/package";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { fail, redirect } from "@sveltejs/kit";
import { PaymentSchema } from "$lib/validation";
import { LIVE_URL, LOCAL_URL } from "$env/static/private";
import { authService } from "$lib/server/config.server";

const calculateTotalPrice = (...arrays: Array<{ [x: string]: any }>) => {
  try {
    return arrays
      .flat() // Flatten all arrays into a single array
      .reduce((total, item) => {
        // Check if item is an object and has a price property
        if (!item || typeof item !== "object" || !("price" in item)) {
          throw new Error("Invalid item format: missing price property");
        }

        // Convert price to number if it's a string
        const price = Number(item.price);

        // Check if price is a valid number
        if (isNaN(price)) {
          throw new Error(`Invalid price value: ${item.price}`);
        }

        return total + price;
      }, 0);
  } catch (error: any) {
    console.error("Error calculating total price:", error.message);
    return 0; // or handle error as needed
  }
};

interface ActivitySchema {
  id: string;
  name: string;
  description: string;
  price: number;
  touristSitesRegion: Array<TouristSiteSchema>;
}

interface TouristSiteSchema {
  id: string;
  name: string;
  type: string;
  price: number;
  region_id: string;
  activities: Array<ActivitySchema>;
}

interface RegionSchema {
  id: string;
  name: string;
}

interface AccommodationSchema {
  id: string;
  name: string;
  type: string;
  price: number;
}


interface TransportationSchema {
  id: string;
  name: string;
  price: number;
}

export const load: PageServerLoad = async ({ fetch, locals, url }) => {
  if (!locals.user)
    return redirect(301, `/login?redirectTo=/tours/package/create`);

  const form = await superValidate(zod(PackageSchema));
  const paymentForm = await superValidate(zod(PaymentSchema));

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

  try {
    const endpoints = [
      `${process.env.NODE_ENV === "production" ? LIVE_URL + "/accommodation" : LOCAL_URL + "/accommodation"}`,
      `${process.env.NODE_ENV === "production" ? LIVE_URL + "/activity" : LOCAL_URL + "/activity"}`,
      `${process.env.NODE_ENV === "production" ? LIVE_URL + "/region" : LOCAL_URL + "/region"}`,
      `${process.env.NODE_ENV === "production" ? LIVE_URL + "/region/tour-sites" : LOCAL_URL + "/region/tour-sites"}`,
      `${process.env.NODE_ENV === "production" ? LIVE_URL + "/transportation" : LOCAL_URL + "/transportation"}`,
    ];

    const [accommodations, activities, regions, touristSites, transportations] =
      await Promise.all([
        fetchData<AccommodationSchema[]>(endpoints[0]),
        fetchData<ActivitySchema[]>(endpoints[1]),
        fetchData<RegionSchema[]>(endpoints[2]),
        fetchData<TouristSiteSchema[]>(endpoints[3]),
        fetchData<TransportationSchema[]>(endpoints[4]),
      ]);

    return {
      accommodations,
      activities,
      touristSites,
      transportations,
      regions,
      form,
      paymentForm,
      user: locals.user,
    };
  } catch (err: any) {
    let errors = { ...err };

    for (let k in JSON.parse(JSON.stringify(err))) {
      errors = {
        ...errors,
        [`${k}`]: err[k],
      };
    }

    return {
      success: false,
      regions: [],
      accommodations: [],
      activities: [],
      touristSites: [],
      transportations: [],
      form,
      paymentForm,
      errors,
      user: undefined,
    };
  }
};

export const actions = {
  createPackage: async ({ request, locals, cookies }) => {
    if (!locals.user)
      return redirect(302, `/login?redirectTo=/tours/package/create`);
    const form = await superValidate(request, zod(PackageSchema));

    if (!form.valid) {
      return fail(400, { form });
    }

    const accessToken = cookies.get("access_token") as string;
    const csrfToken = cookies.get("csrf_token") as string;

    let totalTourPrice =
      (form.data.accommodation.price as number) +
      form.data.activities.reduce((a, b) => a + b.price, 0) +
      form.data.tourSites.reduce((a, b) => a + b.price, 0) +
      form.data.transportation.reduce((a, b) => a + b.price, 0) *
        form.data.nrOfPeople;

    try {
      const response = await fetch(
        `${process.env.NODE_ENV === "production" ? LIVE_URL + "/tour-package/user/create" : LOCAL_URL + "/tour-package/user/create"}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken ? csrfToken : "",
            Authorization: `Bearer ${accessToken}`,
            cookie: `csrf_token=${csrfToken}`,
          },
          body: JSON.stringify({
            name: form.data.user.name,
            email: form.data.user.email,
            contact: form.data.user.phone,
            address: form.data.user.address,
            accommodation_id: form.data.accommodation.id,
            activities: [
              ...form.data.activities.map((activity) => activity.id),
            ],
            no_of_people_attending: form.data.nrOfPeople,
            start_date: form.data.startDate,
            end_date: form.data.endDate,
            user_id: locals.user.id,
            // user: locals.user,
            region_id: form.data.region.id,
            transportations: [
              ...form.data.transportation.map(
                (transportation) => transportation.id
              ),
            ],
            tour_sites_region: [
              ...form.data.tourSites.map((tourSite) => tourSite.id),
            ],
            // payment_request: {
            //   amount: "1",
            //   currency: "USD",
            //   card_number:
            //     form.data.paymentData.cardNumber || "5531886652142950",
            //   cvv: form.data.paymentData.cvv || "564",
            //   expiry_month: form.data.paymentData.expiryMonth || "09",
            //   expiry_year: form.data.paymentData.expiryYear || "32",
            //   email: form.data.user.email,
            //   tour_package_id: "",
            //   mode: form.data.paymentData.mode,
            //   fields: {},
            // },
          }),
        }
      );

      if (response.status === 401 || response.status === 403) {
        cookies.delete("access_token", { path: "/" });
        cookies.delete("csrf_token", { path: "/" });
        cookies.delete("user_session", { path: "/" });

        locals.accessToken = undefined;
        locals.user = undefined;

        return fail(response.status, {
          form,
          error: "Unauthorized",
        });
      }

      let resp: {
        id: string;
        region_id: string;
        accommodation_id: string;
        active: boolean;
        no_of_people_attending: number;
        user_id: string;
        start_date: string;
        end_date: string;
        detail?: { [x: string]: any };
      } = (await response.json()) as {
        id: string;
        region_id: string;
        accommodation_id: string;
        active: boolean;
        no_of_people_attending: number;
        user_id: string;
        start_date: string;
        end_date: string;
        detail?: { [x: string]: any };
      };

      if (resp?.detail) {
        return fail(400, {
          form,
          ...resp.detail,
        });
      }

      return { form, ...resp };
    } catch (err: any) {
      const errors: { detail: string | { [x: string]: any } } = err as {
        detail: { [x: string]: any };
      };
      console.error("An error has occured", errors);

      return fail(500, {
        form,
        error: "Failed to create package",
      });
    }
  },
  payment: async ({ request, locals, cookies }) => {
    const formData = await request.formData();
    const form = await superValidate(formData, zod(PaymentSchema));
    const mode = formData.get("mode") as string;
    const tourPackageId = formData.get("tour_package_id");

    if (!form.valid) {
      return fail(400, { form });
    }

    const accessToken = cookies.get("access_token") as string;
    const csrfToken = cookies.get("csrf_token") as string;
    const userSession = cookies.get("user_session") as string;

    try {
      const user: { email: string; name: string } = JSON.parse(userSession) as {
        email: string;
        name: string;
      };

      const response = await fetch(
        `${process.env.NODE_ENV === "production" ? LIVE_URL + "/payment/process" : LOCAL_URL + "/payment/process"}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken ? csrfToken : "",
            Authorization: `Bearer ${accessToken}`,
            cookie: `csrf_token=${csrfToken}`,
          },
          body: JSON.stringify({
            amount: "1",
            currency: "USD",
            card_number: form.data.cardNumber || "5531886652142950",
            cvv: form.data.cvv || "564",
            expiry_month: form.data.expiryMonth || "09",
            expiry_year: form.data.expiryYear || "32",
            name: user.name,
            email: user.email,
            tour_package_id: tourPackageId,
            mode:
              form.data.field && form.data.field?.pin === "pin" ? "pin" : "",
            fields: { ...form.data.field },
          }),
        }
      );

      if (response.status !== 200) {
        return;
      }

      const data = (await response.json()) as {
        success: string;
        message: string;
        authorization: { mode: string; redirect: string };
      };

      if (data.success === "pending") {
        if (
          data.authorization &&
          data.authorization.mode &&
          data.authorization.mode === "redirect"
        ) {
          return {
            form,
            mode: data.authorization.mode,
            redirect: data.authorization.redirect,
          };
        }
      }

      if (data.success === "success") {
        if (
          data.authorization &&
          data.authorization.mode &&
          data.authorization.mode === "pin"
        ) {
          return { form, ...data };
        }
      }
    } catch (err: any) {
      console.error("error", err);
    }

    return { form };
  },
};
