import { flightBookingInfoSchema, primaryPassengerBooking } from '$lib/validation.js';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	let travelers = [
		{
			id: '',
			name: {
				firstName: '',
				lastName: ''
			},
			documents: {
				number: '',
				issuanceDate: '',
				expiryDate: '',
				issuanceCountry: '',
				nationality: '',
				documentType: 'PASSPORT',
				holder: true
			},
			dateOfBirth: '',
			gender: '',
			contact: {
				phones: {
					deviceType: 'MOBILE',
					countryCallingCode: '',
					number: ''
				},
				emailAddress: ''
			}
		}
	];
	const form = await superValidate(zod(flightBookingInfoSchema));
	const form2 = await superValidate(zod(primaryPassengerBooking));

	return { form, form2 };
};
