<script lang="ts">
	import type { FlightsOfferSearchType } from '$lib/utils/flightTypes';
	import { onDestroy, onMount } from 'svelte';
	import { flightStore } from '../../../../store';
	import FlightIcon from './components/FlightIcon.svelte';
	import Takeoff from './components/Takeoff.svelte';
	import Date from '../search/components/Date.svelte';
	import Clock from './components/Clock.svelte';
	import Nationality from './components/Nationality.svelte';
	import Person from './components/Person.svelte';
	import Label from './components/Label.svelte';
	import Discount from './components/Discount.svelte';
	import Airline from '../search/components/Airline.svelte';

	let flightData:
		| (FlightsOfferSearchType & { dictionaries?: { carriers: { [x: string]: string } } })
		| undefined;

	const unsubscriber = flightStore.subscribe((flight) => {
		flightData = flight as FlightsOfferSearchType & {
			dictionaries: { carriers: { [x: string]: string } };
		};
	});

	onMount(() => {
		if (!flightData) {
			const flightDataLS = JSON.parse(
				localStorage.getItem('flightData') as string
			) as FlightsOfferSearchType & { dictionaries: { carriers: { [x: string]: string } } };

			if (flightDataLS) {
				console.log('nice', flightDataLS);
				flightData = flightDataLS;

				console.log(flightData);
			}
			flightData = flightDataLS;
		}
	});

	onDestroy(() => {
		unsubscriber();
	});

	$: console.log('Flight Data From The Store', flightData);
</script>

<div class="min-h-screen bg-neutral-200/50 pb-20">
	<!-- <section class="px-5 md:px-14 pt-8">
		<div class="heading border-b pb-3">
			<h1 class="text-2xl font-bold">Passenger Information</h1>
		</div>
	</section> -->

	<section class="px-5 md:px-14 pt-28">
		<div class="flex flex-col lg:grid lg:grid-cols-3 items-start w-full gap-y-12 lg:gap-x-12">
			<div class="lg:hidden w-full rounded-md border border-neutral-300 bg-white py-4 px-6">
				{#if flightData}
					{@const match = flightData.itineraries[0].duration.match(/(\d+)H(\d+)?/)}
					<div class="flex gap-x-2 border-b pb-4">
						<Takeoff class="w-6 h-6 text-neutral-500" />
						<div class="flex items-center gap-x-1 font-semibold text-neutral-700 text-lg">
							<p>{flightData.itineraries[0].segments[0].departure.iataCode}</p>
							<FlightIcon />
							<p>{flightData.itineraries[0].segments[0].arrival.iataCode}</p>
						</div>
					</div>
					<div class="grid items-center mt-4">
						<div class="flex items-center gap-x-2">
							<Clock class="text-neutral-500" />
							<div class="flex gap-x-[3px] font-bold text-neutral-700">
								<p>
									{new window.Date(flightData.itineraries[0].segments[0].departure.at)
										.toLocaleString('en-GB', {
											hour: '2-digit',
											minute: '2-digit',
											hour12: true
										})
										.replace(',', '')}
								</p>
								<p>{'-'}</p>
								<p>
									{new window.Date(flightData.itineraries[0].segments[0].arrival.at)
										.toLocaleString('en-GB', {
											hour: '2-digit',
											minute: '2-digit',
											hour12: true
										})
										.replace(',', '')}
								</p>
							</div>
						</div>
						<div class="flex items-center gap-x-2 font-bold">
							<Date class="text-neutral-500" />
							<p class="text-neutral-700">
								{new window.Date(flightData.itineraries[0].segments[0].arrival.at)
									.toLocaleString('en-GB', {
										weekday: 'short',
										day: '2-digit',
										month: 'short',
										year: 'numeric'
									})
									.replace(',', '')}
							</p>
						</div>
						<div class="flex items-center gap-x-2 font-bold">
							<Airline class="text-neutral-500" />
							<p class="text-neutral-700">
								{flightData.dictionaries &&
									flightData.dictionaries.carriers[
										flightData.itineraries[0].segments[0].operating.carrierCode
									]}
							</p>
						</div>
					</div>
				{/if}
			</div>

			<div class="w-full flex flex-col lg:col-span-2">
				<div class="info w-full bg-green-100 mb-8 rounded-lg text-xs">
					<p class="p-3">
						We take privacy issues seriously. You can be sure that your personal data is securely
						protected.
					</p>
				</div>
				<!-- Contact Information -->
				<div class="contact-details">
					<p class="text-lg font-bold mb-2">Contact Details</p>

					<div class="flex flex-col gap-y-5 md:flex-row mt-4 items-center gap-x-4">
						<div class="w-full">
							<label for="email" class="font-semibold text-sm">Enter your email</label>
							<input
								type="email"
								class="w-full border-b border-neutral-300 px-4 py-2 bg-white"
								placeholder="john.doe@example.com"
							/>
						</div>

						<div class="w-full">
							<label for="email" class="font-semibold text-sm">Enter your phone number</label>
							<input
								type="tel"
								class="w-full border-b border-neutral-300 px-4 py-2 bg-white"
								placeholder="2349000000000"
							/>
						</div>
					</div>
				</div>
				<!-- Personal Information -->
				<div class="personal-information mt-8 border-t pt-4">
					<p class="text-lg font-bold mb-2">Primary Passenger</p>

					<div class="gap-y-6 mt-4 flex flex-col">
						<div class="grid gap-y-1 max-w-44">
							<label for="title" class="font-semibold text-sm">Title*</label>
							<select name="title" id="title" class="bg-white p-3 border-b border-neutral-300">
								<option value="Mr">Mr</option>
								<option value="Ms">Ms</option>
								<option value="Mrs">Mrs</option>
							</select>
						</div>

						<div class="name flex flex-col gap-y-5 md:flex-row gap-x-3">
							<div class="w-full flex flex-col">
								<label for="firstName" class="font-semibold text-sm"> First Name* </label>
								<input
									type="text"
									name="firstName"
									placeholder=""
									class="w-full border-b border-neutral-300 px-4 py-2 bg-white"
								/>
							</div>

							<div class="w-full flex flex-col">
								<label for="middleName" class="font-semibold text-sm"> Middle Name </label>
								<input
									type="text"
									name="middleName"
									placeholder=""
									class="w-full border-b border-neutral-300 px-4 py-2 bg-white"
								/>
							</div>

							<div class="w-full flex flex-col">
								<label for="lastName" class="font-semibold text-sm"> Last Name* </label>
								<input
									type="text"
									name="lastName"
									placeholder=""
									class="w-full border-b border-neutral-300 px-4 py-2 bg-white shadow-inner"
								/>
							</div>
						</div>

						<div class="flex flex-col gap-y-5 md:flex-row gap-x-3">
							<div class="grid w-full">
								<label for="nationality" class="text-sm font-semibold">Nationality*</label>
								<Nationality />
							</div>
							<div class="grid w-full">
								<label for="dob" class="text-sm font-semibold">Date of birth*</label>
								<input
									type="date"
									name="dob"
									id="dob"
									class="w-full px-4 py-2 bg-white border-b shadow-inner"
								/>
							</div>

							<div class="grid w-full">
								<label for="gender" class="text-sm font-semibold">Gender*</label>
								<select name="gender" id="gender" class="bg-white border-b px-4 py-2">
									<option value="male">Male</option>
									<option value="female">Female</option>
								</select>
							</div>
						</div>

						<div class="flex flex-col gap-y-5 md:flex-row gap-x-3">
							<div class="w-full">
								<label for="passport-id" class="font-semibold text-sm">
									Passport or ID Number *</label
								>
								<input
									type="text"
									name="passport-id"
									placeholder=""
									class="w-full border-b border-neutral-300 px-4 py-2 bg-white shadow-inner"
								/>
							</div>

							<div class="w-full">
								<label for="passport-exp" class="font-semibold text-sm">
									Passport or ID Expiration Date *
								</label>
								<input
									type="date"
									name="passport-exp"
									class="w-full border-b border-neutral-300 px-4 py-2 bg-white shadow-inner"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="flex flex-col w-full gap-y-8">
				<div class="hidden lg:block w-full rounded-md border border-neutral-300 bg-white py-4 px-6">
					{#if flightData}
						{@const match = flightData.itineraries[0].duration.match(/(\d+)H(\d+)?/)}
						<div class="flex gap-x-2 border-b pb-4">
							<Takeoff class="w-6 h-6 text-neutral-500" />
							<div class="flex items-center gap-x-1 font-semibold text-neutral-700 text-lg">
								<p>{flightData.itineraries[0].segments[0].departure.iataCode}</p>
								<FlightIcon />
								<p>{flightData.itineraries[0].segments[0].arrival.iataCode}</p>
							</div>
						</div>
						<div class="grid items-center mt-4">
							<div class="flex items-center gap-x-2">
								<Clock class="text-neutral-500" />
								<div class="flex gap-x-[3px] font-bold text-neutral-700">
									<p>
										{new window.Date(flightData.itineraries[0].segments[0].departure.at)
											.toLocaleString('en-GB', {
												hour: '2-digit',
												minute: '2-digit',
												hour12: true
											})
											.replace(',', '')}
									</p>
									<p>{'-'}</p>
									<p>
										{new window.Date(flightData.itineraries[0].segments[0].arrival.at)
											.toLocaleString('en-GB', {
												hour: '2-digit',
												minute: '2-digit',
												hour12: true
											})
											.replace(',', '')}
									</p>
								</div>
							</div>
							<div class="flex items-center gap-x-2 font-bold">
								<Date class="text-neutral-500" />
								<p class="text-neutral-700">
									{new window.Date(flightData.itineraries[0].segments[0].arrival.at)
										.toLocaleString('en-GB', {
											weekday: 'short',
											day: '2-digit',
											month: 'short',
											year: 'numeric'
										})
										.replace(',', '')}
								</p>
							</div>
							<div class="flex items-center gap-x-2 font-bold">
								<Airline class="text-neutral-500" />
								<p class="text-neutral-700">
									{flightData.dictionaries &&
										flightData.dictionaries.carriers[
											flightData.itineraries[0].segments[0].operating.carrierCode
										]}
								</p>
							</div>
						</div>
					{/if}
				</div>
				<div class="w-full rounded-md border border-neutral-300 bg-white py-4 px-6">
					<div class="font-bold text-neutral-700">
						<h1>Price Summary</h1>
					</div>

					<div class="grid gap-y-5">
						<div class="grid mt-8 gap-y-2">
							{#if flightData && flightData.travelerPricings}
								{@const basePrice = flightData.travelerPricings.reduce((sum, traveler) => {
									return sum + parseFloat(traveler.price.base);
								}, 0)}
								{@const totalFarePrice = flightData.travelerPricings.reduce((sum, traveler) => {
									return sum + parseFloat(traveler.price.total);
								}, 0)}
								<div class="flex justify-between">
									<div class="flex gap-x-2 items-center">
										<Person class="text-neutral-500" />
										<p>{flightData && flightData.travelerPricings.length}x Adult</p>
									</div>
									<p>
										{basePrice}
										{flightData.price.currency}
									</p>
								</div>

								<div class="flex justify-between ml-4">
									<p>Flight Fare</p>
									<p>{totalFarePrice} {flightData.price.currency}</p>
								</div>
							{/if}
						</div>

						<div class="grid pt-5 gap-y-2 border-t">
							{#if flightData && flightData.travelerPricings}
								{@const totalPrice = flightData.travelerPricings.reduce((sum, traveler) => {
									return sum + parseFloat(traveler.price.total);
								}, 0)}
								<div class="flex justify-between">
									<div class="flex gap-x-2 items-center">
										<Label class="text-neutral-500" />
										<p>Total Fares</p>
									</div>
									<p>{totalPrice} {flightData.price.currency}</p>
								</div>
							{/if}

							<!-- <div class="flex justify-between">
								<div class="flex gap-x-2 items-center">
									<Discount class="text-neutral-500" />
									<p>Total Tax</p>
								</div>
								<p>N415,000</p>
							</div> -->
						</div>

						<div class="grid pt-5 gap-y-2 border-t">
							{#if flightData && flightData.travelerPricings}
								{@const totalPrice = flightData.travelerPricings.reduce((sum, traveler) => {
									return sum + parseFloat(traveler.price.total);
								}, 0)}
								<div class="flex items-center justify-between font-bold text-lg">
									<p>Total</p>
									<p>{totalPrice} {flightData.price.currency}</p>
								</div>
							{/if}
							<div class="flex justify-end mt-8">
								<button class="btn-primary">Continue</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</div>
