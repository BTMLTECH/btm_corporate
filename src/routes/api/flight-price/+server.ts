import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { amadeus } from '$lib/server/amadeus';
// @ts-ignore
import Amadeus from 'amadeus';
import { flightSearchSchema } from '$lib/validation';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { FlightsOfferSearchType } from '$lib/utils/flightTypes';

export const POST: RequestHandler = async ({ fetch, request, url }) => {
	const form = await request.formData();
	// const superForm = await superValidate(form, zod(flightSearchSchema));
	const flightData = JSON.parse(form.get('flightData') as string) as FlightsOfferSearchType;

	// flightData.price.total = '999.00'

	try {
		const { result } = await amadeus.shopping.flightOffers.pricing.post(
			JSON.stringify({
				data: {
					type: 'flight-offers-pricing',
					flightOffers: [flightData] as FlightsOfferSearchType[]
				}
			})
		);

		return json(result);
	} catch (err) {
		return json([]);
	}
};
