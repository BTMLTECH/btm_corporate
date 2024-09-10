<script lang="ts">
	import Loading from '$lib/components/Loading.svelte';
	import type { FlightsOfferSearchType } from '$lib/utils/flightTypes';
	import { onMount } from 'svelte';
	import TelephoneInput from './components/TelephoneInput.svelte';

	onMount(async () => {
		const flightData = JSON.parse(
			localStorage.getItem('flightData') as string
		) as FlightsOfferSearchType | null;
		const travelers = JSON.parse(localStorage.getItem('travelers') as string) as Array<any>;

		if (flightData) {
			const formData = new FormData();

			formData.append('flightData', JSON.stringify(flightData));
			formData.append('travelers', JSON.stringify(travelers));

			try {
				// Send data to the server for booking
				const response = await fetch('/api/book', {
					method: 'POST',
					body: formData
				});

				const result = await response.json();

				console.log('result', result);
				if (result.code) throw Error('Booking failed!');

				// get the generated PNR

				// send an email to the user who booked the flight with their flight details included
			} catch (err) {
				console.error('Booking failed!');
			}
		}
	});
</script>

<section class="w-full px-10 mb-20">
	<!-- <div
		class="error grid gap-5 items-center justify-center place-items-center pt-32 text-neutral-500"
	>
		<div class="grid items-center justify-center gap-y-4">
			<Loading class="w-20 h-20" />
			<h3>Please wait...</h3>
		</div>
	</div> -->
	<TelephoneInput />
</section>
