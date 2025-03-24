import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent, data }) => {
	await parent();

	let { form, form2 } = data;
	return {
		form,
		form2
	};
};

