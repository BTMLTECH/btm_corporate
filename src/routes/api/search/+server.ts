import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { amadeus } from '$lib/server/amadeus';
// @ts-ignore
import Amadeus from 'amadeus';
import { flightSearchSchema } from '$lib/validation';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const POST: RequestHandler = async ({ fetch, request, url }) => {
	const form = await request.formData();
	const superForm = await superValidate(form, zod(flightSearchSchema));


	try {
		const data = await amadeus.shopping.flightOffersSearch.get({
			originLocationCode: superForm.data.origin,
			destinationLocationCode: superForm.data.destination,
			departureDate: superForm.data.departure,
			...(superForm.data.return ? { returnDate: superForm.data.return } : {}),
			nonStop: true,
			adults: superForm.data.adult,
			children: superForm.data.child,
			infants: superForm.data.infant,
			travelClass: superForm.data.travelClass,
			currencyCode: 'USD',
			max: 6,
		});

		return json({
			result: data.result,
		});
	} catch (err) {
		console.log("An error has occured", err)
		return json({
			result:  {}
		});
	}
};
