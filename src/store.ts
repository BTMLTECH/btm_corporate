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
		| (FlightsOfferSearchType & { dictionaries?: { carriers: { [x: string]: string } } })
		| undefined
) {
	// Get the initial value from localStorage or use the provided initial value
	let storedValue:
		| (FlightsOfferSearchType & { dictionaries?: { carriers: { [x: string]: string } } })
		| undefined;

	if (typeof window !== 'undefined') {
		// Check if the key exists in localStorage
		storedValue = JSON.parse(localStorage.getItem(key) as string) as FlightsOfferSearchType & {
			dictionaries?: { carriers: { [x: string]: string } };
		}

		console.log("stored value", storedValue)
	}
	
	const data = storedValue ? storedValue : initialValue;

	// Create a writable store with the initial data
	const store = writable(data);

	// Subscribe to the store and save any changes to localStorage
	if (typeof window !== 'undefined') {
		store.subscribe((value) => {
			localStorage.setItem(key, JSON.stringify(value));
		});
	}

	return store;
}

// Store flight information
export const flightStore = persist('flightData', undefined);
