import type { FlightsOfferSearchType } from '$lib/utils/flightTypes';
import { writable } from 'svelte/store';

// Create the store
export const serviceStore = writable({
	serviceType: '',
	isOpen: false
});

function persist(
	key: string,
	initialValue:
		(FlightsOfferSearchType & { dictionaries?: { carriers: { [x: string]: string } } }) | null
) {
	// // Get the initial value from localStorage or use the provided initial value
	// let storedValue:
	// 	(FlightsOfferSearchType & { dictionaries?: { carriers: { [x: string]: string } } }) | null = null

	// if (typeof window !== 'undefined') {
	// 	// Check if the key exists in localStorage
	// 	if (!localStorage.getItem(key) || localStorage.getItem(key) === null) {
	// 		console.log("init", localStorage.getItem(key))
	// 		storedValue = JSON.parse(localStorage.getItem(key) as string) as FlightsOfferSearchType & {
	// 			dictionaries?: { carriers: { [x: string]: string } };
	// 		}
	// 	}
	// 	else
	// 		storedValue = null

	// 	console.log("stored value", storedValue)
	// }

	// const data = storedValue ? storedValue : initialValue;

	// // Create a writable store with the initial data
	// const store = writable(data);

	// // Subscribe to the store and save any changes to localStorage
	// if (typeof window !== 'undefined' && data === null) {
	// 	store.subscribe((value) => {
	// 		localStorage.setItem(key, JSON.stringify(value));
	// 	});
	// }

	// return store;

	let storedValue:
		(FlightsOfferSearchType & { dictionaries?: { carriers: { [x: string]: string } } }) | null = null;

	if (typeof window !== 'undefined') {
		// Check if the key exists and is not null
		const storedData = localStorage.getItem(key);

		if (storedData !== null) {
			storedValue = JSON.parse(storedData) as FlightsOfferSearchType & {
				dictionaries?: { carriers: { [x: string]: string } };
			};
		}
	}

	// Use stored value if available, otherwise use the initial value
	const data = storedValue !== null ? storedValue : initialValue;

	// Create a writable store with the initial data
	const store = writable(data);

	// Always subscribe and store the changes in localStorage
	if (typeof window !== 'undefined') {
		store.subscribe((value) => {
			localStorage.setItem(key, JSON.stringify(value));
		});
	}

	return store;
}

// Store flight information
export const flightStore = persist('flightData', null);
