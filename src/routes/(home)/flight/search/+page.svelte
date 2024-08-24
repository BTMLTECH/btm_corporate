<script lang="ts">
	import { enhance } from '$app/forms';
	import type { FlightsOfferSearchType } from '$lib/utils/flightTypes';
	import Clock from './components/Clock.svelte';
	import Date from './components/Date.svelte';
	import EditIcon from './components/EditIcon.svelte';
	import FlightIcon from './components/FlightIcon.svelte';
	import OutboundFlight from './components/OutboundFlight.svelte';
	import ReturnFlight from './components/ReturnFlight.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import { redirect } from '@sveltejs/kit';
	import { flightStore } from '../../../../store';
	import { goto } from '$app/navigation';
	import NoFlight from './components/NoFlight.svelte';
	import { page } from '$app/stores';
	import Airline from './components/Airline.svelte';
	import Plane from './components/Plane.svelte';

	let booking: {
		id: string;
		isLoading: boolean;
	} = {
		id: '',
		isLoading: false
	};

	export let data: {
		passengers: number;
		origin: string;
		destination: string;
		results?: {
			meta: { count: number };
			data: Array<FlightsOfferSearchType>;
			currencies: { [x: string]: string };
			dictionaries: { carriers: { [x: string]: string } };
		};
	};

	const flightTravelPath = (
		segments: [
			{
				departure: { iataCode: string; at: string };
				arrival: { iataCode: string; at: string };
				duration: string;
			}
		]
	) => {
		return segments.flatMap(({ arrival, departure }, index, segments) => {
			if (index === segments.length - 1) {
				return [departure.iataCode, arrival.iataCode];
			}
			return [departure.iataCode];
		});
	};

	const travelDuration = (
		segments: [
			{
				departure: { iataCode: string; at: string };
				arrival: { iataCode: string; at: string };
				duration: string;
			}
		]
	) => {
		return segments.flatMap(({ arrival, departure }, index, segments) => {
			if (index === segments.length - 1) {
				return [departure.at, arrival.at];
			}
			return [departure.at];
		});
	};

	const checkFlightPriceAndProceed = async (
		flightData: FlightsOfferSearchType & { dictionaries?: { carriers: { [x: string]: string } } },
		idx: string = ''
	) => {
		booking.id = idx as string;
		booking.isLoading = true;
		try {
			const form = new FormData();
			form.append('flightData', JSON.stringify(flightData));

			const request = await fetch('/api/flight-price', {
				method: 'POST',
				body: form
			});

			const response = await request.json();

			let carrier = flightData.itineraries[0].segments[0].operating.carrierCode;

			if (!response.warnings) {
				flightStore.set({ ...flightData, dictionaries: flightData.dictionaries });
				goto('book');
				return;
			}

			booking.id = '';
			booking.isLoading = false;
			return response;
		} catch (err: any) {
			console.log('an error has occured', err);
			return null;
		}
	};
</script>

<!-- Edit search -->
{#if data.results}
	<section class="w-full">
		<div class="bg-neutral-100">
			<div class="px-10 py-8">
				<div class="flex gap-x-8 items-center">
					<button
						class="bg-blue-600 hover:bg-blue-700 text-white rounded px-3 py-2 flex items-center"
					>
						<span class="mr-1">
							<EditIcon />
						</span>
						Edit Search
					</button>

					<div class="flex items-center gap-x-2 text-neutral-600">
						<p class="text-lg font-semibold">{data.origin}</p>
						<FlightIcon class="w-6 h-6" />
						<p class="text-lg font-semibold">{data.destination}</p>
					</div>

					<p class="font-medium">
						{data.passengers}
						{data.passengers > 1 ? 'Passengers' : 'Passenger'}
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Flight Results Page -->
	<section class="px-10">
		<div class="my-8">
			<p class="font-semibold">
				Showing {data.results.data.length}
				{data.results.data.length > 1 ? 'flights' : 'flight'}
			</p>
		</div>

		<div class="flight-search-wrapper w-full">
			<ul class="flex flex-col gap-y-8">
				{#if data.results}
					{#each data.results.data as flight (flight.id)}
						<li
							class="rounded-md border bg-white flex flex-col md:flex-row relative w-full md:pr-4 hover:drop-shadow-xl transition-all ease-in"
						>
							<div
								class="bg-neutral-600 text-white w-full md:w-fit p-4 h-auto rounded-t-md md:rounded-t-none md:!rounded-l-md flex items-center"
							>
								<p
									class="w-full md:w-fit md:-rotate-180 h-auto text-center md:[writing-mode:_tb] font-bold"
								>
									{flight.travelerPricings[0].fareDetailsBySegment[0].cabin === 'FIRST'
										? 'FIRST CLASS'
										: flight.travelerPricings[0].fareDetailsBySegment[0].cabin}
								</p>
							</div>
							<div
								class="px-4 md:ml-4 w-full flex-1 grid grid-cols-1 gap-y-6 sm:grid-cols-2 md:flex justify-between items-center py-4"
							>
								{#each flight.itineraries as { segments, duration }, index}
									{@const match = duration.match(/(\d+)H(\d+)?/)}
									<div class="flex flex-col relative">
										<div class="flex items-center gap-x-1 mb-2">
											{#if index === 0}
												<OutboundFlight class="text-neutral-600" />
											{:else}
												<ReturnFlight class="text-neutral-600" />
											{/if}
											<p class="text-sm flex items-center">
												{index === 0 ? 'Outbound' : 'Return'}
											</p>
										</div>
										<div class="flex items-center gap-x-1">
											<div class="flex items-center gap-x-1">
												<Plane class="text-neutral-600" />
												<div class="flex items-center gap-x-1">
													<p class="text-sm font-bold">
														{flightTravelPath(segments)[0]}
													</p>
													<FlightIcon class="text-neutral-600" />
													<p class="text-sm font-bold">{flightTravelPath(segments)[1]}</p>
												</div>
											</div>
										</div>
										<div class="flex items-center gap-x-1">
											<Clock class="text-neutral-600" />
											<p>
												h{match ? match[1] : 0} m{match ? match[2] : 0}
											</p>
										</div>
										<div class="flex items-center gap-x-1">
											<Date class="text-neutral-600" />
											<small
												>{index === 0
													? travelDuration(segments)[0].replace('T', ' - ')
													: travelDuration(segments)[1].replace('T', ' - ')}</small
											>
										</div>
										<div class="flex items-center gap-x-1">
											<Airline class="text-neutral-600" />
											<p class="bg-neutral-300 rounded-full px-2 py-1 text-xs font-bold">
												{data.results.dictionaries.carriers[segments[0].operating.carrierCode]}
											</p>
										</div>
									</div>
								{/each}
								<div class="sm:col-span-2 md:flex flex-col items-end">
									<div class="price w-full md:w-fit flex justify-end mb-2">
										<p
											class="w-fit md:w-full border border-neutral-500 text-neutral-500 px-4 rounded-full font-bold"
										>
											{flight.price.total}
											{flight.price.currency}
										</p>
									</div>
									<div class="price w-full md:w-fit">
										<button
											id={`${flight.id}`}
											type="submit"
											disabled={booking.isLoading}
											on:click={(e) => {
												checkFlightPriceAndProceed(
													{ ...flight, dictionaries: data.results?.dictionaries },
													e.currentTarget.id
												);
											}}
											class="{booking.isLoading
												? 'opacity-50 items-center'
												: ''} px-4 py-2 rounded w-fit md:w-full border flex text-white bg-blue-600 font-semibold hover:bg-blue-700 transition-all ease-in"
										>
											{#if booking.isLoading && booking.id === flight.id}
												Please wait...
												<Loading class="w-5 h-5 ml-2" />
											{:else}
												Book
											{/if}
										</button>
									</div>
								</div>
							</div>
						</li>
					{/each}
				{/if}
			</ul>
		</div>
	</section>
{:else}
	<section class="w-full px-10 border-b pb-20">
		<div
			class="error grid gap-5 items-center justify-center place-items-center pt-32 text-neutral-500"
		>
			<NoFlight class="w-44 h-44" />
			<p class="text-3xl font-bold">An error has occured :(</p>
			<button
				type="button"
				on:click={() => {
					location.reload();
				}}
				class="bg-neutral-600 rounded-md text-white font-semibold px-3 py-2 transition-all hover:scale-110 ease-in"
				>Try Again</button
			>
		</div>
	</section>
{/if}
