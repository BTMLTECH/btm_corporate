import { PackageSchema } from "$lib/validations/package";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { fail, redirect } from "@sveltejs/kit";
import { PaymentSchema } from "$lib/validation";
import { LIVE_URL, LOCAL_URL } from "$env/static/private";
import type { PageServerLoad } from "./$types";

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

interface TouristSiteSchema {
  id: string;
  name: string;
  type: string;
  price: number;
  region_id: string;
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

interface ActivitySchema {
  id: string;
  name: string;
  description: string;
  price: number;
}

interface TransportationSchema {
  id: string;
  name: string;
  price: number;
}

export const load: PageServerLoad = async ({ fetch, locals }) => {
  if (!locals.user) return redirect(301, "/login");

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
      errors,
      user: undefined,
    };
  }
};

export const actions = {
  createPackage: async ({ request }) => {
    const form = await superValidate(request, zod(PackageSchema));
    // const form2 = await superValidate(request, zod(CreatePackageSchema));

    if (!form.valid) {
      return fail(400, { form });
    }

    let totalTourPrice =
      (form.data.accommodation.price as number) +
      form.data.activities.reduce((a, b) => a + b.price, 0) +
      form.data.tourSites.reduce((a, b) => a + b.price, 0) +
      form.data.transportation.reduce((a, b) => a + b.price, 0) *
        form.data.nrOfPeople;

    console.log("total price", totalTourPrice);

    try {
      const response = await fetch(
        `${process.env.NODE_ENV === "production" ? LIVE_URL + "/tour-package/add" : LOCAL_URL + "/tour-package/add"}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tour_package: {
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
              region_id: form.data.region.id,
              transportations: [
                ...form.data.transportation.map(
                  (transportation) => transportation.id
                ),
              ],
              tour_sites_region: [
                ...form.data.tourSites.map((tourSite) => tourSite.id),
              ],
            },
            payment_request: {
              amount: "1",
              currency: "USD",
              card_number:
                form.data.paymentData.cardNumber || "5531886652142950",
              cvv: form.data.paymentData.cvv || "564",
              expiry_month: form.data.paymentData.expiryMonth || "09",
              expiry_year: form.data.paymentData.expiryYear || "32",
              email: form.data.user.email,
              tour_package_id: "",
              mode: "",
              fields: {},
            },
          }),
        }
      );
      let resp = await response.json();

      return { form, ...resp };
    } catch (err: any) {
      console.error("An error has occured", err);

      return fail(500, {
        form,
        error: "Failed to create package and initiate payment",
      });
    }
  },
};
