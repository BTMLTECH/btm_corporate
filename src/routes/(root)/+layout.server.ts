import { flightSearchSchema } from '$lib/server/validation.js';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export async function load(event) {
	return {  user: event.locals.user };
}
