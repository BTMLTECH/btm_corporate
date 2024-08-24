import { flutterwave } from '$lib/server/flutterwave';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { FLW_SECRET_KEY } from '$env/static/private';

export const POST: RequestHandler = async ({ fetch, request, url }) => {
	console.log('all good');
	const form = await request.formData()
	const card_number = form.get("card_number")
	const cvv = form.get('cvv')
	const pin = form.get('pin')

	try {
		const payload = {
			card_number: '5531886652142950',
			cvv: '564',
			expiry_month: '09',
			expiry_year: '32',
			currency: 'NGN',
			amount: '100',
			fullname: 'Example User',
			email: 'user@example.com',
			tx_ref: 'MC-3243e',
			redirect_url: 'https://www.flutterwave.ng',
			enckey: "FLWSECK_TEST6abc462024ea",
			authorization: {
				mode: "pin",
				pin: pin
			}
		};

		const resp = await flutterwave.Charge.card(payload);

		console.log(resp);
		return json({});
	} catch (error) {
		console.log(error);
	}
	return json({});
};
