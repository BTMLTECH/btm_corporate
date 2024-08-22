import { amadeus } from '$lib/server/amadeus';
import { autocompleteFlightSearchSchema, flightSearchSchema } from '$lib/server/validation.js';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export async function load(event) {
	const form = await superValidate(event, zod(flightSearchSchema));

	return { form };
}

export const actions = {
	default: async ({ request }) => {
		const form = await request.formData()

		console.log("form from booking", form.get("data"))
		// const formData = await request.formData();

		// const form = await superValidate(formData, zod(flightSearchSchema));
		// console.log("formmm", form)

		// const {data} = await amadeus.referenceData.locations.get({
		// 	keyword: form.data.keyword,
		// 	subType: form.data.subType,
		//   });

		// console.log("dataa", data)

		return {
			datum: [
				{
					id: 1,
					location: 'Lagos'
				},
				{
					id: 2,
					location: 'Laos'
				},
				{
					id: 3,
					location: 'Latvia'
				},
				{
					id: 4,
					location: 'Latvania'
				},
				{
					id: 5,
					location: 'Lake Chad'
				},
				{
					id: 6,
					location: 'Latooos'
				}
			]
		};
	}
};
