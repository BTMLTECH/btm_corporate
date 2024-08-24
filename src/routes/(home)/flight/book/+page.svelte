<script lang="ts">
	import type { FlightsOfferSearchType } from '$lib/utils/flightTypes';
	import { onDestroy, onMount } from 'svelte';
	import { flightStore } from '../../../../store';
	import FlightIcon from './components/FlightIcon.svelte';
	import Takeoff from './components/Takeoff.svelte';
	import Date from '../search/components/Date.svelte';
	import Clock from './components/Clock.svelte';
	import Nationality from './components/Nationality.svelte';
	import BookError from './components/BookError.svelte';
	import Person from './components/Person.svelte';
	import Label from './components/Label.svelte';
	import Home from './components/Home.svelte';
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

		// flw
		const script = document.createElement('script');
		script.src = 'https://checkout.flutterwave.com/v3.js';
		document.body.appendChild(script);
	});

	onDestroy(() => {
		unsubscriber();
	});

	const calculateNoOfPersons = (
		{ travelerPricings }: Pick<FlightsOfferSearchType, 'travelerPricings'>,
		travelerType: string
	) => {
		return travelerPricings.filter((traveler) => traveler.travelerType === travelerType).length;
	};

	const calculatePersonsFare = (
		{ travelerPricings }: Pick<FlightsOfferSearchType, 'travelerPricings'>,
		travelerType: string,
		priceType: 'base' | 'total' = 'base'
	) => {
		return travelerPricings
			.filter((traveler) => traveler.travelerType === travelerType)
			.reduce((sum, traveler) => sum + parseFloat(traveler.price[priceType]), 0);
	};

	let displayModal: boolean = false;
	let pin = '';

	const handleBooking = async (pin?: string) => {
		const bookingData = new FormData();

		bookingData.append('pin', pin as string);

		try {
			const req = await fetch('/api/book', {
				method: 'POST',
				body: bookingData
			});

			const resp = (await req.json()) as {
				status: string;
				message: string;
				meta: {
					authorization: {
						mode: string;
						fields: Array<string>;
					};
				};
			};

			console.log('request done', resp);
			if (resp.status === 'success') {
				if (resp.meta.authorization.mode === 'pin') {
					displayModal = true;
				}
			}
		} catch (err) {
			console.log('An error has occured', err);
			return null;
		}
	};

	const makePayment = () => {
		FlutterwaveCheckout({
			public_key: 'FLWPUBK_TEST-8bf1eaf1acc66c02124ed1573791ec1c-X',
			tx_ref: 'txref-DI0NzMx13',
			amount: 2500,
			currency: 'USD',
			payment_options: 'card',
			redirect_url: 'http://127.0.0.1:5173',
			meta: {
				source: 'docs-inline-test',
				consumer_mac: '92a3-912ba-1192a'
			},
			customer: {
				email: 'test@mailinator.com',
				phone_number: '08100000000',
				name: 'Ayomide Jimi-Oni'
			},
			customizations: {
				title: 'Flutterwave Developers',
				description: 'Test Payment',
				logo: 'https://checkout.flutterwave.com/assets/img/rave-logo.png'
			},
			callback: function (data) {
				console.log('payment callback:', data);
			},
			onclose: function () {
				console.log('Payment cancelled!');
			}
		});
	};

	$: console.log('Flight Data From The Store', flightData);
</script>

{#if !flightData}
	<section class="w-full px-10">
		<div
			class="error grid gap-5 items-center justify-center place-items-center pt-32 text-neutral-500"
		>
			<BookError class="w-44 h-44" />
			<p class="text-3xl font-bold">You cannot perform this action</p>
			<a
				href="/"
				class="flex items-center gap-x-1 bg-neutral-600 rounded-md text-white font-semibold px-3 py-2 transition-all hover:scale-110 ease-in"
			>
				<Home />
				Go back home</a
			>
		</div>
	</section>
{:else}
	<div class="min-h-screen bg-neutral-200/50 pb-20 relative">
		<section class="px-5 md:px-14 pt-28">
			<div class="flex flex-col lg:flex-row items-start w-full gap-y-12 lg:gap-x-12">
				<div class="lg:hidden w-full rounded-md border border-neutral-300 bg-white py-4 px-6">
					{#if flightData}
						<div class="grid gap-y-4">
							{#each flightData.itineraries as flight, index}
								{@const match = flightData.itineraries[index].duration.match(/(\d+)H(\d+)?/)}
								<div class="flex flex-col">
									<div class="flex gap-x-2 mb-2">
										<Takeoff />
										{#each flight.segments as segment}
											<div class="flex items-center gap-x-1 font-semibold text-neutral-700 text-lg">
												<p>{segment.departure.iataCode}</p>
												<FlightIcon />
												<p>{segment.arrival.iataCode}</p>
											</div>
										{/each}
									</div>

									<div
										class="grid items-center text-sm {flightData.itineraries.length > index + 1
											? 'border-b pb-3'
											: ''}"
									>
										<div class="flex items-center gap-x-2">
											<Clock class="text-neutral-500" />
											<div class="flex gap-x-[3px] font-semibold text-neutral-700">
												<p>
													{new window.Date(flight.segments[0].departure.at)
														.toLocaleString('en-GB', {
															hour: '2-digit',
															minute: '2-digit',
															hour12: true
														})
														.replace(',', '')}
												</p>
												<p>{'-'}</p>
												<p>
													{new window.Date(flight.segments[0].arrival.at)
														.toLocaleString('en-GB', {
															hour: '2-digit',
															minute: '2-digit',
															hour12: true
														})
														.replace(',', '')}
												</p>
											</div>
										</div>
										<div class="flex items-center gap-x-2 font-semibold">
											<Date class="text-neutral-500" />
											<p class="text-neutral-700">
												{new window.Date(flight.segments[0].arrival.at)
													.toLocaleString('en-GB', {
														weekday: 'short',
														day: '2-digit',
														month: 'short',
														year: 'numeric'
													})
													.replace(',', '')}
											</p>
										</div>
										<div class="flex items-center gap-x-2 font-semibold">
											<Airline class="text-neutral-500" />
											<p class="text-neutral-700">
												{flightData.dictionaries &&
													flightData.dictionaries.carriers[
														flightData.itineraries[0].segments[0].operating.carrierCode
													]}
											</p>
										</div>
									</div>
								</div>
							{/each}
						</div>
					{/if}
				</div>

				<div class="w-full flex flex-col lg:col-span-2 flex-1">
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
					{#if flightData && flightData.travelerPricings.length}
						<div class="grid gap-y-4 mt-8">
							<h1 class="font-bold text-lg">Passenger Information</h1>
							<div class="personal-information border-t pt-4">
								<p class="text-lg font-bold mb-2">Primary Passenger</p>

								<div class="gap-y-6 mt-4 flex flex-col">
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
							{#each flightData.travelerPricings.slice(1) as travelerPricing, index}
								<div class="personal-information border-b pb-8">
									<p class="text-lg font-bold mb-2">Passenger #{index + 2}</p>

									<div class="gap-y-6 mt-4 flex flex-col">
										<!-- <div class="grid gap-y-1 max-w-44">
										<label for="title" class="font-semibold text-sm">Title*</label>
										<select
											name="title"
											id="title"
											class="bg-white p-3 border-b border-neutral-300"
										>
											<option value="Mr">Mr</option>
											<option value="Ms">Ms</option>
											<option value="Mrs">Mrs</option>
										</select>
									</div> -->

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
							{/each}
						</div>
					{/if}
				</div>

				<div class="w-full h-full flex flex-col lg:max-w-[450px]">
					<div class="flex flex-col w-full gap-y-8 sticky top-0">
						<div
							class="hidden lg:block w-full rounded-md border border-neutral-300 bg-white py-4 px-6"
						>
							{#if flightData}
								<div class="grid gap-y-4">
									{#each flightData.itineraries as flight, index}
										{@const match = flightData.itineraries[index].duration.match(/(\d+)H(\d+)?/)}
										<div class="flex flex-col">
											<div class="flex gap-x-2 mb-2">
												<Takeoff />
												{#each flight.segments as segment}
													<div
														class="flex items-center gap-x-1 font-semibold text-neutral-700 text-lg"
													>
														<p>{segment.departure.iataCode}</p>
														<FlightIcon class="text-neutral-700" />
														<p>{segment.arrival.iataCode}</p>
													</div>
												{/each}
											</div>

											<div
												class="grid items-center text-sm {flightData.itineraries.length > index + 1
													? 'border-b pb-3'
													: ''}"
											>
												<div class="flex items-center gap-x-2">
													<Clock />
													<div class="flex gap-x-[3px] font-semibold text-neutral-700">
														<p>
															{new window.Date(flight.segments[0].departure.at)
																.toLocaleString('en-GB', {
																	hour: '2-digit',
																	minute: '2-digit',
																	hour12: true
																})
																.replace(',', '')}
														</p>
														<p>{'-'}</p>
														<p>
															{new window.Date(flight.segments[0].arrival.at)
																.toLocaleString('en-GB', {
																	hour: '2-digit',
																	minute: '2-digit',
																	hour12: true
																})
																.replace(',', '')}
														</p>
													</div>
												</div>
												<div class="flex items-center gap-x-2 font-semibold">
													<Date />
													<p class="text-neutral-700">
														{new window.Date(flight.segments[0].arrival.at)
															.toLocaleString('en-GB', {
																weekday: 'short',
																day: '2-digit',
																month: 'short',
																year: 'numeric'
															})
															.replace(',', '')}
													</p>
												</div>
												<div class="flex items-center gap-x-2 font-semibold">
													<Airline />
													<p class="text-neutral-700">
														{flightData.dictionaries &&
															flightData.dictionaries.carriers[
																flightData.itineraries[0].segments[0].operating.carrierCode
															]}
													</p>
												</div>
											</div>
										</div>
									{/each}
								</div>
							{/if}
						</div>

						{#if flightData}
							<div class="w-full rounded-md border border-neutral-300 bg-white py-4 px-6">
								<div class="font-bold text-neutral-700">
									<h1>Price Summary</h1>
								</div>

								<div class="grid gap-y-5 mt-3">
									<div class="grid gap-y-2">
										{#if flightData.travelerPricings.length > 0}
											<div class="grid mb-2">
												<div class="flex items-center justify-between">
													<div class="flex gap-x-2 items-center">
														<Person />
														<div class="flex items-center justify-between">
															<div class="info">
																<p>
																	{calculateNoOfPersons(
																		{ travelerPricings: flightData.travelerPricings },
																		'ADULT'
																	)}x Adult
																</p>
															</div>
														</div>
													</div>
													<p class="font-bold text-xs">
														{calculatePersonsFare(
															{ travelerPricings: flightData.travelerPricings },
															'ADULT',
															'base'
														)}
														{flightData.price.currency}
													</p>
												</div>

												<div class="flex items-center justify-between">
													<div class="flex items-center gap-x-2">
														<div class="w-[1em]"></div>
														<p>Flight fare</p>
													</div>
													<p class="font-bold text-xs">
														{calculatePersonsFare(
															{ travelerPricings: flightData.travelerPricings },
															'ADULT',
															'total'
														).toFixed(2)}
														{flightData.price.currency}
													</p>
												</div>
											</div>

											{#if calculateNoOfPersons({ travelerPricings: flightData.travelerPricings }, 'CHILD') > 0}
												<div class="grid mb-2">
													<div class="flex justify-between items-center">
														<div class="flex items-center gap-x-2">
															<Person />
															<div class="flex justify-between">
																<div class="info">
																	<p>
																		{calculateNoOfPersons(
																			{ travelerPricings: flightData.travelerPricings },
																			'CHILD'
																		)}x Child
																	</p>
																</div>
															</div>
														</div>
														<p class="font-bold text-xs">
															{calculatePersonsFare(
																{ travelerPricings: flightData.travelerPricings },
																'CHILD',
																'base'
															).toFixed(2)}
															{flightData.price.currency}
														</p>
													</div>
													<div class="flex items-center justify-between">
														<div class="flex items-center gap-x-2">
															<div class="w-[1em]"></div>
															<p>Flight fare</p>
														</div>
														<p class="font-bold text-xs">
															{calculatePersonsFare(
																{ travelerPricings: flightData.travelerPricings },
																'CHILD',
																'total'
															).toFixed(2)}
															{flightData.price.currency}
														</p>
													</div>
												</div>
											{/if}

											{#if calculateNoOfPersons({ travelerPricings: flightData.travelerPricings }, 'HELD_INFANT') > 0}
												<div class="grid mb-2">
													<div class="flex justify-between items-center">
														<div class="flex items-center gap-x-2">
															<Person />
															<div class="flex justify-between">
																<div class="info">
																	<p>
																		{calculateNoOfPersons(
																			{ travelerPricings: flightData.travelerPricings },
																			'HELD_INFANT'
																		)}x Infant
																	</p>
																</div>
															</div>
														</div>
														<p>
															{#if calculatePersonsFare({ travelerPricings: flightData.travelerPricings }, 'HELD_INFANT', 'base') > 0}
																{calculatePersonsFare(
																	{ travelerPricings: flightData.travelerPricings },
																	'HELD_INFANT',
																	'base'
																)}
																{flightData.price.currency}
															{:else}
																-
															{/if}
														</p>
													</div>
													<div class="flex items-center justify-between">
														<div class="flex items-center gap-x-2">
															<div class="w-[1em]"></div>
															<p>Flight fare</p>
														</div>
														<p>
															{#if calculatePersonsFare({ travelerPricings: flightData.travelerPricings }, 'HELD_INFANT', 'total') > 0}
																{calculatePersonsFare(
																	{ travelerPricings: flightData.travelerPricings },
																	'HELD_INFANT',
																	'total'
																)}
																{flightData.price.currency}
															{:else}
																-
															{/if}
														</p>
													</div>
												</div>
											{/if}
										{/if}
									</div>

									<div class="grid pt-5 gap-y-2 border-t">
										{#if flightData && flightData.travelerPricings}
											<div class="flex justify-between items-center">
												<div class="flex gap-x-2 items-center">
													<Label />
													<p>Total Base Fares</p>
												</div>
												<p class="font-bold text-xs">
													{flightData.price.base}
													{flightData.price.currency}
												</p>
											</div>
										{/if}
									</div>

									<div class="grid pt-5 gap-y-2 border-t">
										{#if flightData && flightData.travelerPricings}
											<div class="flex items-center justify-between font-bold text-lg">
												<p>Total</p>
												<p>
													{parseFloat(flightData.price.grandTotal).toFixed(2)}
													{flightData.price.currency}
												</p>
											</div>
										{/if}
										<div class="flex justify-end mt-8">
											<button type="button" on:click={makePayment} class="btn-primary"
												>Continue</button
											>
										</div>
									</div>
								</div>
							</div>
						{/if}
					</div>
				</div>
			</div>
		</section>
		<!-- Modal -->
		 {#if displayModal}
		<div class="fixed inset-0 z-[99999] overflow-y-auto">
			<div class="flex items-center justify-center min-h-screen px-4 sm:px-0">
				<div class="fixed inset-0 bg-black opacity-75"></div>
				<div class="bg-white rounded-lg p-6 max-w-md mx-auto z-50 relative h-fit">
					<div class="grid mb-3">
						<p class="font-semibold">Enter your card pin to continue</p>
						<input
							bind:value={pin}
							type="text"
							class="w-full px-4 py-3 border-neutral-400 border-b bg-neutral-z00"
							placeholder="Enter pin"
						/>
					</div>

					<button type="button" on:click={() => handleBooking(pin)} class="btn-primary"
						>Continue</button
					>
				</div>
			</div>
		</div>
		{/if}
	</div>
{/if}
