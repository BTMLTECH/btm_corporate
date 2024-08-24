import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { amadeus } from '$lib/server/amadeus';
// @ts-ignore
import Amadeus from 'amadeus';

export const GET = async () => {
	return [{}];
};

export const POST: RequestHandler = async ({ fetch, request }) => {
	const form = await request.formData();
	const location = form.get('location') as string;

	try {
		const { data } = await amadeus.referenceData.locations.get({
			keyword: location,
			subType: 'AIRPORT,CITY'
		});

		return json({
			error: undefined,
			data: data as [
				{
					subType: string;
					name: string;
					iataCode: string;
					address: { cityName: string; countryCode: string };
				}
			]
		});
	} catch (err: any) {
		console.log('error');
		return json(
			{
				error: err.code,
				data: []
			},
			{ status: 400 }
		);
	}
};
