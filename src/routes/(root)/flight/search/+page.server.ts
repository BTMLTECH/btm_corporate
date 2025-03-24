import type { IFlightSearch } from "$lib/types/FlightSearch.js";
import type { FlightsOfferSearchType } from "$lib/utils/flightTypes.js";

export async function load({ fetch, url }) {
  let flightData: {
    destinations: Array<{
      departureLocation: string;
      arrivalLocation: string;
      date: string;
    }>;
    passengers: { adults: number; children?: number; infants?: number };
    travelClass: string;
    nrOfRequestedResults: number;
    nonStop: string;
    flex: string;
  } = {
    destinations: [],
    passengers: { adults: 0 },
    travelClass: "ECONOMY",
    nrOfRequestedResults: 10,
    nonStop: "true",
    flex: "true",
  };

  const origin = url.searchParams.get("origin") as string;
  const destination = url.searchParams.get("destination") as string;
  const departure = url.searchParams.get("departure") as string;
  const returnDate = url.searchParams.get("return");
  const adult = url.searchParams.get("adult") as string;
  const child = url.searchParams.get("child") as string;
  const infant = url.searchParams.get("infant") as string;
  const travelClass = url.searchParams.get("travelClass") as string;

  // send request
  flightData.destinations.push({
    departureLocation: origin,
    arrivalLocation: destination,
    date: departure,
  });

  if (returnDate) {
    flightData.destinations.push({
      departureLocation: destination,
      arrivalLocation: origin,
      date: returnDate,
    });
  }

  flightData.passengers = {
    adults: parseInt(adult),
    children: child && child.length ? parseInt(child) : 0,
    infants: infant && infant.length ? parseInt(infant) : 0,
  };

  flightData.travelClass = `${travelClass}`;

  try {
    const req = await fetch("https://btm-live.onrender.com/api/flights/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        destinations: flightData.destinations,
        passengers: flightData.passengers,
        travelClass: flightData.travelClass,
        flex: "true",
        nonStop: "true",
        nrOfRequestedResults: 1,
      }),
    });

    const response = (await req.json()) as {
      success: boolean;
      data: Array<IFlightSearch>;
    };

    return { ...response, error: undefined } as {
      success: boolean;
      data: Array<IFlightSearch>;
      error?: string;
    };
  } catch (err: any) {
    console.error("error", err, err.cause);
    if (err.cause.syscall.length && err.cause.syscall.includes("getaddrinfo")) {
      return {
        success: false,
        data: [],
        error: err.message,
      } as { success: boolean; data: []; error?: string };
    }
    return {
      success: false,
      data: [],
      error: "An error has occured",
    } as { success: boolean; data: []; error?: string };
  }
}

// export const actions: Actions = {
// 	// not using this....
// 	default: async ({ request, fetch }) => {
// 		const form = await request.formData();
// 		const flightData = form.get('data') as string;
// 		const flightForm = new FormData();

// 		flightForm.append('flightData', flightData);

// 		try {
// 			const flightOffer = await fetch('/api/flight-price', {
// 				method: 'POST',
// 				body: flightForm
// 			});

// 			const response = await flightOffer.json();

// 			console.log('response', JSON.parse(JSON.stringify(response)));

// 			return JSON.parse(JSON.stringify(response))
// 		} catch (err: any) {
// 			console.log('error from +page.server.ts', err);
// 			return null;
// 		}

// 		return null;
// 	}
// 	// checkPrice: async ({ request, fetch }) => {
// 	// 	const form = await request.formData();
// 	// 	console.log('asdfgh', form.get('data'));

// 	// 	// const flightOffer = await fetch("", {
// 	// 	// 	method: "POST",
// 	// 	// 	headers: {
// 	// 	// 		'Content-Type': "application/json"
// 	// 	// 	},
// 	// 	// 	body: JSON.stringify({
// 	// 	// 		data:
// 	// 	// 	})
// 	// 	// })

// 	// 	return {};
// 	// }
// };
