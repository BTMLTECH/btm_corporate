import type { FlightsOfferSearchType } from '$lib/utils/flightTypes.js';
import type { Actions } from '../../$types.js';
import { amadeus } from '$lib/server/amadeus';
import { json } from '@sveltejs/kit';

export async function load({ fetch, url }) {
	const form = new FormData();
	const origin = url.searchParams.get('origin');
	const destination = url.searchParams.get('destination');
	const departure = url.searchParams.get('departure');
	const returnDate = url.searchParams.get('return');
	const adult = url.searchParams.get('adult') as string;
	const child = url.searchParams.get('child') as string;
	const infant = url.searchParams.get('infant') as string;
	const travelClass = url.searchParams.get('travelClass');

	form.append('origin', origin as string);
	form.append('destination', destination as string);
	form.append('departure', departure as string);
	if (returnDate) form.append('return', returnDate as string);
	form.append('adult', adult as string);
	form.append('child', child as string);
	form.append('infant', infant as string);
	form.append('travelClass', travelClass as string);

	const res = await fetch(`/api/search`, {
		method: 'POST',
		body: form
	});

	const { result } = await res.json();

	return {
		origin,
		destination,
		passengers: parseInt(adult) + parseInt(child) + parseInt(infant),
		results: result as {
			meta: { count: number };
			data: FlightsOfferSearchType[];
			currencies: { [x: string]: string };
			dictionaries: { carriers: { [x: string]: string } };
		}
	};
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
