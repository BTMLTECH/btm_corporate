<script lang="ts">
	import Hero from './components/Hero.svelte';
	import Hero1 from '$lib/images/hero/hero-1.webp';
	import Hero2 from '$lib/images/hero/hero-2.webp';
	import Hero3 from '$lib/images/hero/hero-3.webp';
	import JumboImage from '$lib/images/jumbo-image.webp';
	import CallOut from './components/CallOut.svelte';
	import Loading from './components/Loading.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { flightSearchSchema } from '$lib/validation';
	import { superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { Swiper } from 'swiper';
	import services from '$lib/data/services';
	import Services from './components/Services.svelte';
	import WhoWeAre from './components/WhoWeAre.svelte';

	type FlightClassPassengers = {
		adult: number;
		child: number;
		infant: number;
	};

	type FlightClassType = {
		type: 'Economy' | 'Premium Economy' | 'Business' | 'First Class';
		passengers: FlightClassPassengers;
	};

	type FlightClassOpts = {
		flightClass: FlightClassType;
		destination: {
			from: string;
			to: string;
		};
	};

	let activeFlightSearchTab: string = 'flight';
	let activeFlightSearchTabType: string = 'return';
	let displayFlightClassTypeOpts: boolean = false;
	let displayFlightPassengers: boolean = false;

	let autocompleteTimeoutHandle = 0;
	let originResults:
		| [
				{
					name: string;
					address: { cityName: string; countryCode: string };
					iataCode: string;
				}
		  ]
		| [] = [];
	let destinationResults:
		| [
				{
					name: string;
					address: { cityName: string; countryCode: string };
					iataCode: string;
				}
		  ]
		| [] = [];
	let isOriginLoading: boolean = false;
	let isDestinationLoading: boolean = false;
	let showOriginLocations: boolean = false;
	let showDestinationLocations: boolean = false;

	export let data;

	const { form } = superForm(data.form, {
		customValidity: true,
		validators: zod(flightSearchSchema),
		taintedMessage: null
		// onResult: ({ result }) => {
		// 	if (result.type === 'success') window.scrollTo({ top: 0, behavior: 'smooth' });
		// }
	});

	let showOriginError: string = '';
	let showDestinationError: string = '';

	const autocomplete = ({ origin, destination }: { origin?: string; destination?: string }) => {
		if (autocompleteTimeoutHandle) clearTimeout(autocompleteTimeoutHandle);
		autocompleteTimeoutHandle = setTimeout(async () => {
			try {
				if (origin && origin.length > 0) {
					const payload = new FormData();

					payload.append('location', origin);

					const response = await fetch(`/api/autocomplete`, {
						method: 'POST',
						body: payload
					});

					const { error, data } = (await response.json()) as {
						error?: string;
						data: [
							{
								subType: string;
								name: string;
								address: {
									cityName: string;
									countryCode: string;
								};
								iataCode: string;
							}
						];
					};

					if (error && error?.length > 0) {
						showOriginError = 'An error has occured';
						showOriginLocations = true;
						isOriginLoading = false;

						return;
					}

					originResults = data.length > 0 ? data : [];

					showOriginLocations = originResults.length > 0;
				}

				if (destination && destination.length > 0) {
					const payload = new FormData();
					payload.append('location', destination);
					const response = await fetch(`/api/autocomplete`, {
						method: 'POST',
						body: payload
					});
					const { error, data } = (await response.json()) as {
						error?: string;
						data: [
							{
								name: string;
								address: {
									cityName: string;
									countryCode: string;
								};
								iataCode: string;
							}
						];
					};

					if (error && error?.length > 0) {
						showDestinationError = 'An error has occured';
						showDestinationLocations = true;
						isDestinationLoading = false;

						return;
					}

					destinationResults = data.length > 0 ? data : [];
					showDestinationLocations = destinationResults.length > 0;
				}

				isOriginLoading = false;
				isDestinationLoading = false;
			} catch (error) {
				console.error(error);
			}
		}, 1500);
	};

	function handleClickOutside(event: MouseEvent): void {
		const target = event.target as HTMLElement;

		if (!target.closest('.origin-location')) {
			showOriginLocations = false;
		}

		if (!target.closest('.destination-location')) {
			showDestinationLocations = false;
		}

		if (!target.closest('.flight-options')) displayFlightPassengers = false;
	}

	type FlightSearchType = {
		origin: string;
		destination: string;
		departure: string;
		return?: string;
		adult: number | string;
		child?: number | string;
		infant?: number | string;
		travelClass: string;
	};

	function handleFlightSearch(data: FlightSearchType) {
		const url = new URL('/flight/search', window.location.origin);
		url.searchParams.append('origin', data.origin);
		url.searchParams.append('destination', data.destination);
		url.searchParams.append('departure', data.departure);
		data.return ? url.searchParams.append('return', data.return) : undefined;
		url.searchParams.append('adult', data.adult as string);
		url.searchParams.append('child', data.child as string);
		url.searchParams.append('infant', data.infant as string);
		url.searchParams.append('travelClass', data.travelClass);

		window.open(url.toString(), '_blank');
	}

	let swiper: Swiper;

	onMount(() => {
		swiper = new Swiper('.mySwiper', {
			slidesPerView: 'auto',
			grid: {
				rows: 1,
				fill: 'row'
			},
			loop: true,
			direction: 'horizontal',
			speed: 400,
			effect: 'slide',
			a11y: {
				prevSlideMessage: 'Previous slide',
				nextSlideMessage: 'Next slide'
			},
			spaceBetween: 30,
			slidesOffsetAfter: 0,
			pagination: {
				el: '.swiper-pagination',
				clickable: true
			},
			// Navigation arrows
			navigation: {
				nextEl: '.swiper-next',
				prevEl: '.swiper-prev'
			}
		});
		window.document.addEventListener('click', handleClickOutside);
	});

	onDestroy(() => {
		if (typeof window !== 'undefined')
			window.document.removeEventListener('click', handleClickOutside);
	});
</script>

<div>
	<!-- Hero -->
	<Hero heroImgs={[Hero1, Hero2, Hero3]} />
	<!-- Flight Search -->
	<section id="search-content">
		<div class="w-11/12 lg:w-9/12 mx-auto">
			<div
				class="relative bottom-24 bg-white text-neutral-800 px-7 py-3 shadow-lg rounded-md grid gap-y-5"
			>
				<div class="flex gap-x-6 mt-4 border-b-2 w-max">
					<button
						type="button"
						on:click={() => {
							activeFlightSearchTab = 'flight';
						}}
						class="{activeFlightSearchTab === 'flight'
							? 'border-b-4 border-blue-600 text-blue-600'
							: 'border-gray-500 text-gray-500'} flight hover:border-b-4 hover:bg-neutral-100 hover:rounded-t-lg flex gap-x-2 p-3 !pb-1 text-md font-bold transition-all ease-linear"
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 512 512">
							<path
								fill="currentColor"
								d="M186.62 464H160a16 16 0 0 1-14.57-22.6l64.46-142.25L113.1 297l-35.3 42.77C71.07 348.23 65.7 352 52 352H34.08a17.66 17.66 0 0 1-14.7-7.06c-2.38-3.21-4.72-8.65-2.44-16.41l19.82-71c.15-.53.33-1.06.53-1.58a.4.4 0 0 0 0-.15a15 15 0 0 1-.53-1.59l-19.84-71.45c-2.15-7.61.2-12.93 2.56-16.06a16.83 16.83 0 0 1 13.6-6.7H52c10.23 0 20.16 4.59 26 12l34.57 42.05l97.32-1.44l-64.44-142A16 16 0 0 1 160 48h26.91a25 25 0 0 1 19.35 9.8l125.05 152l57.77-1.52c4.23-.23 15.95-.31 18.66-.31C463 208 496 225.94 496 256c0 9.46-3.78 27-29.07 38.16c-14.93 6.6-34.85 9.94-59.21 9.94c-2.68 0-14.37-.08-18.66-.31l-57.76-1.54l-125.36 152a25 25 0 0 1-19.32 9.75"
							/>
						</svg>
						Flight
					</button>

					<button
						on:click={() => {
							activeFlightSearchTab = 'hotels';
						}}
						type="button"
						class="{activeFlightSearchTab === 'hotels'
							? 'border-b-4 border-blue-600 text-blue-600'
							: 'border-gray-500 text-gray-500'} hotels hover:border-b-4 hover:bg-neutral-100 hover:rounded-t-lg flex gap-x-2 p-3 !pb-1 text-md font-bold transition-all ease-linear"
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
							<path
								fill="currentColor"
								d="M2 18v-5q0-.675.275-1.225T3 10.8V8q0-1.25.875-2.125T6 5h4q.575 0 1.075.213T12 5.8q.425-.375.925-.587T14 5h4q1.25 0 2.125.875T21 8v2.8q.45.425.725.975T22 13v5q0 .425-.288.713T21 19t-.712-.288T20 18v-1H4v1q0 .425-.288.713T3 19t-.712-.288T2 18m11-8h6V8q0-.425-.288-.712T18 7h-4q-.425 0-.712.288T13 8zm-8 0h6V8q0-.425-.288-.712T10 7H6q-.425 0-.712.288T5 8z"
							/>
						</svg>
						Hotels
					</button>

					<a
						href="/tour-packages"
						target="_blank"
						class="{activeFlightSearchTab === 'tourPackages'
							? 'border-b-4 border-blue-600 text-blue-600'
							: 'border-gray-500 text-gray-500'} tour-packages hover:border-b-4 hover:bg-neutral-100 hover:rounded-t-lg flex gap-x-2 p-3 !pb-1 text-md font-bold transition-all ease-linear"
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 14 14">
							<path
								fill="currentColor"
								fill-rule="evenodd"
								d="M7.34 3.291a2.241 2.241 0 0 0-1.287.912a.75.75 0 1 1-1.24-.843a3.75 3.75 0 0 1 2.681-1.62a1.83 1.83 0 0 0-1.236-.193a.75.75 0 0 1-.29-1.471a3.33 3.33 0 0 1 3.52 1.588a3.53 3.53 0 0 1 3.825.908a.75.75 0 1 1-1.1 1.02a2.03 2.03 0 0 0-1.285-.641h-.006a3.3 3.3 0 0 1 .805 2.915a.75.75 0 1 1-1.468-.308a1.8 1.8 0 0 0-1.069-2.03c-.427.291-.786.769-1.059 1.43c-.272.658-.44 1.459-.504 2.332a5.595 5.595 0 0 1 1.58.678c.775.48 1.46 1.15 2.024 1.96a1.506 1.506 0 0 0-.908.643c-.086.138-.175.25-.262.339a1.012 1.012 0 0 1-1.416 0a1.986 1.986 0 0 1-.224-.28c-.387-.576-1.056-.701-1.452-.701c-.396 0-1.065.125-1.452.701a2.03 2.03 0 0 1-.224.28a1.012 1.012 0 0 1-1.416 0a2.064 2.064 0 0 1-.263-.339c-.37-.587-1.033-.71-1.412-.71c-.206 0-.49.036-.769.16c.576-.853 1.284-1.554 2.087-2.053a5.403 5.403 0 0 1 2.615-.831c.075-.978.269-1.926.61-2.752a5.55 5.55 0 0 1 .595-1.094M2.89 11.49a.75.75 0 0 0-1.382.007a1.491 1.491 0 0 1-.951.857a.75.75 0 1 0 .427 1.438a2.99 2.99 0 0 0 1.216-.707c.173.169.366.318.576.444c1.047.628 2.571.628 3.618 0a3.12 3.12 0 0 0 .575-.443c.173.168.365.317.575.443c1.047.628 2.571.628 3.618 0c.21-.126.403-.275.576-.444l.067.063c.33.297.723.517 1.149.643a.75.75 0 0 0 .427-1.437a1.491 1.491 0 0 1-.951-.857a.75.75 0 0 0-1.382-.007a1.625 1.625 0 0 1-.658.753c-.572.343-1.503.343-2.074 0a1.624 1.624 0 0 1-.658-.753a.75.75 0 0 0-1.378 0a1.624 1.624 0 0 1-.658.753c-.572.343-1.503.343-2.075 0a1.624 1.624 0 0 1-.657-.753"
								clip-rule="evenodd"
							/>
						</svg>
						Tour Packages
					</a>
				</div>

				<!-- Flight -->
				{#if activeFlightSearchTab === 'flight'}
					<form
						method="post"
						on:submit|preventDefault={() => handleFlightSearch($form)}
						class="grid gap-y-5"
					>
						<div class="flex justify-between items-center">
							<div class="route flex gap-x-4">
								<button
									type="button"
									on:click={() => (activeFlightSearchTabType = 'return')}
									class="{activeFlightSearchTabType === 'return'
										? 'text-blue-600 font-bold bg-blue-200'
										: ''} text-md rounded-md p-2"
								>
									Return
								</button>
								<button
									type="button"
									on:click={() => (activeFlightSearchTabType = 'oneWay')}
									class="{activeFlightSearchTabType === 'oneWay'
										? 'text-blue-600 font-bold bg-blue-200'
										: ''} text-md rounded-md p-2"
								>
									One-Way
								</button>
							</div>

							<div class="flex flight-class">
								<!-- Flight Class Dropdown -->
								<div class="flex relative">
									<div class="p-2 font-semibold text-md">
										<button
											on:click={() => {
												displayFlightClassTypeOpts = !displayFlightClassTypeOpts;
											}}
											type="button"
											class="inline-flex text-neutral-600 items-center gap-x-2 hover:bg-neutral-100 px-2 py-1 rounded-md border"
										>
											{$form.travelClass === 'PREMIUM_ECONOMY'
												? 'PREMIUM ECONOMY'
												: $form.travelClass === 'FIRST'
													? 'FIRST CLASS'
													: $form.travelClass === 'BUSINESS'
														? 'BUSINESS'
														: 'ECONOMY'}
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="22"
												height="22"
												viewBox="0 0 256 256"
											>
												<path
													fill="currentColor"
													d="m216.49 104.49l-80 80a12 12 0 0 1-17 0l-80-80a12 12 0 0 1 17-17L128 159l71.51-71.52a12 12 0 0 1 17 17Z"
												/>
											</svg>
										</button>

										<!-- <button
											type="button"
											class="inline-flex text-neutral-600 items-center gap-x-2 hover:bg-neutral-100 px-2 py-1 rounded-md border"
										>
											Premium Economy
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="22"
												height="22"
												viewBox="0 0 256 256"
											>
												<path
													fill="currentColor"
													d="m216.49 104.49l-80 80a12 12 0 0 1-17 0l-80-80a12 12 0 0 1 17-17L128 159l71.51-71.52a12 12 0 0 1 17 17Z"
												/>
											</svg>
										</button>

										<button
											type="button"
											class="inline-flex text-neutral-600 items-center gap-x-2 hover:bg-neutral-100 px-2 py-1 rounded-md border"
										>
											Business
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="22"
												height="22"
												viewBox="0 0 256 256"
											>
												<path
													fill="currentColor"
													d="m216.49 104.49l-80 80a12 12 0 0 1-17 0l-80-80a12 12 0 0 1 17-17L128 159l71.51-71.52a12 12 0 0 1 17 17Z"
												/>
											</svg>
										</button>

										<button
											type="button"
											class="inline-flex text-neutral-600 items-center gap-x-2 hover:bg-neutral-100 px-2 py-1 rounded-md border"
										>
											First Class
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="22"
												height="22"
												viewBox="0 0 256 256"
											>
												<path
													fill="currentColor"
													d="m216.49 104.49l-80 80a12 12 0 0 1-17 0l-80-80a12 12 0 0 1 17-17L128 159l71.51-71.52a12 12 0 0 1 17 17Z"
												/>
											</svg>
										</button> -->
									</div>

									{#if displayFlightClassTypeOpts}
										<div
											class="origin-top-right absolute right-0 top-10 mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-2 z-20 transition duration-200 text-lg grid gap-y-4 w-max"
										>
											<button
												on:click={() => {
													displayFlightClassTypeOpts = false;
													$form.travelClass = 'ECONOMY';
												}}
												type="button"
												class="px-2 py-1 hover:bg-neutral-100 rounded-md text-gray-700 flex items-center text-sm font-semibold"
												role="menuitem"
											>
												{$form.travelClass === 'ECONOMY' ? 'ECONOMY' : 'ECONOMY'}
											</button>
											<button
												on:click={() => {
													displayFlightClassTypeOpts = false;
													$form.travelClass = 'PREMIUM_ECONOMY';
												}}
												type="button"
												class="px-2 py-1 hover:bg-neutral-100 rounded-md text-gray-700 flex items-center text-sm font-semibold"
												role="menuitem"
											>
												{$form.travelClass === 'PREMIUM_ECONOMY'
													? 'PREMIUM ECONOMY'
													: 'PREMIUM ECONOMY'}
											</button>
											<button
												on:click={() => {
													displayFlightClassTypeOpts = false;
													$form.travelClass = 'BUSINESS';
												}}
												type="button"
												class="px-2 py-1 hover:bg-neutral-100 rounded-md text-gray-700 flex items-center text-sm font-semibold"
												role="menuitem"
											>
												{$form.travelClass === 'BUSINESS' ? 'BUSINESS' : 'BUSINESS'}
											</button>
											<button
												on:click={() => {
													displayFlightClassTypeOpts = false;
													$form.travelClass = 'FIRST';
												}}
												type="button"
												class="px-2 py-1 hover:bg-neutral-100 rounded-md text-gray-700 flex items-center text-sm font-semibold"
												role="menuitem"
											>
												{$form.travelClass === 'FIRST' ? 'FIRST CLASS' : 'FIRST CLASS'}
											</button>
										</div>
									{/if}
								</div>

								<!-- Flight Options -->
								<div class="inline-flex items-center relative flight-options">
									<button
										type="button"
										on:click={() => {
											displayFlightPassengers = !displayFlightPassengers;
										}}
										class="inline-flex items-center font-bold hover:bg-neutral-100 rounded px-2 py-1 border text-md"
									>
										<p class="flex gap-x-2 items-center">
											<svg
												class="text-gray-600"
												xmlns="http://www.w3.org/2000/svg"
												width="22"
												height="22"
												viewBox="0 0 24 24"
											>
												<path
													fill="currentColor"
													fill-rule="evenodd"
													d="M16.67 13.13C18.04 14.06 19 15.32 19 17v3h4v-3c0-2.18-3.57-3.47-6.33-3.87"
												/>
												<circle cx="9" cy="8" r="4" fill="currentColor" fill-rule="evenodd" />
												<path
													fill="currentColor"
													fill-rule="evenodd"
													d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4c-.47 0-.91.1-1.33.24a5.98 5.98 0 0 1 0 7.52c.42.14.86.24 1.33.24m-6 1c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4"
												/>
											</svg>
											<span class="flex items-center gap-x-1 font-bold">
												{$form.adult + $form.child + $form.infant}
											</span>
										</p>

										<span class="mx-2">
											<svg
												class="text-gray-600"
												xmlns="http://www.w3.org/2000/svg"
												width="22"
												height="22"
												viewBox="0 0 24 24"
											>
												<path
													fill="currentColor"
													fill-rule="evenodd"
													d="M11 3a3 3 0 0 0-3 3v1H5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-8a3 3 0 0 0-3-3h-3V6a3 3 0 0 0-3-3zm3 4h-4V6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1z"
													clip-rule="evenodd"
												/>
											</svg>
										</span>
										<svg
											class="text-gray-600"
											xmlns="http://www.w3.org/2000/svg"
											width="22"
											height="22"
											viewBox="0 0 256 256"
										>
											<path
												fill="currentColor"
												d="m216.49 104.49l-80 80a12 12 0 0 1-17 0l-80-80a12 12 0 0 1 17-17L128 159l71.51-71.52a12 12 0 0 1 17 17Z"
											/>
										</svg>
									</button>

									{#if displayFlightPassengers}
										<div
											class="flight-options absolute top-0 p-5 min-w-64 bg-white rounded-lg drop-shadow-xl z-[988]"
										>
											<p class="font-semibold">Passengers</p>

											<div class="mt-6 w-full grid gap-y-6">
												<div class="w-full flex items-center justify-between">
													<div class="flex items-center gap-x-4 w-full text-md">
														<svg
															class="text-gray-600"
															xmlns="http://www.w3.org/2000/svg"
															width="32"
															height="32"
															viewBox="0 0 24 24"
														>
															<path
																fill="currentColor"
																d="M12 12q-1.65 0-2.825-1.175T8 8t1.175-2.825T12 4t2.825 1.175T16 8t-1.175 2.825T12 12m-8 6v-.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2v.8q0 .825-.587 1.413T18 20H6q-.825 0-1.412-.587T4 18"
															/>
														</svg>
														<div class="flex flex-col w-full">
															<p class="text-md">Adult</p>
															<p class="text-neutral-500 text-sm">Over 11</p>
														</div>
													</div>
													<div class="w-full">
														<div class="flex items-center gap-x-2 w-full justify-between">
															<button
																on:click={() => {
																	if ($form.adult === 0) {
																		$form.adult = 0;
																		return;
																	}
																	$form.adult -= 1;
																}}
																type="button"
																class="flex-1 hover:bg-neutral-200 rounded-md font-bold border"
															>
																-
															</button>
															<span>{$form.adult}</span>
															<button
																on:click={() => {
																	$form.adult += 1;
																}}
																type="button"
																class="flex-1 hover:bg-neutral-200 rounded-md font-bold border"
															>
																+
															</button>
														</div>
													</div>
												</div>

												<div class="w-full flex items-center justify-between">
													<div class="flex items-center gap-x-4 w-full text-md">
														<svg
															class="text-gray-600"
															xmlns="http://www.w3.org/2000/svg"
															width="32"
															height="32"
															viewBox="0 0 24 24"
														>
															<path
																fill="currentColor"
																d="M14.38 11.442q.395 0 .671-.272t.276-.666t-.272-.67t-.666-.276t-.67.272t-.277.666t.273.67t.666.276m-4.77 0q.395 0 .67-.272q.277-.272.277-.666t-.273-.67t-.666-.276t-.67.272t-.276.666t.272.67t.666.276M12 16.231q1.212 0 2.222-.604T15.846 14H8.154q.613 1.023 1.624 1.627q1.01.604 2.222.604M12.001 20q-1.665 0-3.12-.626T6.34 17.66t-1.713-2.54T4 12t.626-3.12T6.34 6.34t2.54-1.714T12 4t3.12.626t2.54 1.714t1.713 2.54T20 12t-.626 3.12t-1.714 2.542t-2.54 1.713T12 20m.4-11.808q.425 0 .809-.124q.383-.124.383-.465q0-.178-.112-.312t-.28-.133q-.2 0-.359.075t-.435.075q-.646 0-1.105-.459q-.459-.458-.459-1.099q0-.256.02-.395q.02-.14.1-.272q-.245.05-.464.086t-.452.116q-.044.113-.066.232t-.022.233q0 1.01.716 1.726q.717.716 1.726.716"
															/>
														</svg>
														<div class="flex flex-col w-full">
															<p class="text-md">Child</p>
															<p class="text-neutral-500 text-sm">2-11</p>
														</div>
													</div>
													<div class="w-full">
														<div class="flex items-center gap-x-2 w-full justify-between">
															<button
																on:click={() => {
																	if ($form.child === 0) $form.child = 0;
																	else $form.child -= 1;
																}}
																type="button"
																class="flex-1 hover:bg-neutral-200 rounded-md font-bold border"
															>
																-
															</button>
															<span>{$form.child}</span>
															<button
																on:click={() => {
																	$form.child += 1;
																}}
																type="button"
																class="flex-1 hover:bg-neutral-200 rounded-md font-bold border"
															>
																+
															</button>
														</div>
													</div>
												</div>

												<div class="w-full flex items-center justify-between">
													<div class="flex items-center gap-x-4 w-full text-md">
														<svg
															class="text-gray-600"
															xmlns="http://www.w3.org/2000/svg"
															width="32"
															height="32"
															viewBox="0 0 24 24"
														>
															<path
																fill="currentColor"
																d="M13 2v8h8a8 8 0 0 0-8-8m6.32 13.89A7.95 7.95 0 0 0 21 11H6.44L5.5 9H2v2h2.22s1.89 4.07 2.12 4.42C5.24 16 4.5 17.17 4.5 18.5A3.5 3.5 0 0 0 8 22c1.76 0 3.22-1.3 3.46-3h2.08c.24 1.7 1.7 3 3.46 3a3.5 3.5 0 0 0 3.5-3.5c0-1.04-.46-1.97-1.18-2.61M8 20a1.5 1.5 0 0 1-1.5-1.5A1.5 1.5 0 0 1 8 17a1.5 1.5 0 0 1 1.5 1.5A1.5 1.5 0 0 1 8 20m9 0a1.5 1.5 0 0 1-1.5-1.5A1.5 1.5 0 0 1 17 17a1.5 1.5 0 0 1 1.5 1.5A1.5 1.5 0 0 1 17 20"
															/>
														</svg>
														<div class="flex flex-col w-full">
															<p class="text-md">Infant</p>
															<p class="text-neutral-500 text-sm">Under 2</p>
														</div>
													</div>
													<div class="w-full">
														<div class="flex items-center gap-x-2 w-full justify-between">
															<button
																on:click={() => {
																	if ($form.infant === 0) $form.infant = 0;
																	else $form.infant -= 1;
																}}
																type="button"
																class="flex-1 hover:bg-neutral-200 rounded-md font-bold border"
															>
																-
															</button>
															<span>{$form.infant}</span>
															<button
																on:click={() => {
																	$form.infant += 1;
																}}
																type="button"
																class="flex-1 hover:bg-neutral-200 rounded-md font-bold border"
															>
																+
															</button>
														</div>
													</div>
												</div>
											</div>

											<div class="flex items-center justify-between mt-8">
												<button
													on:click={() => {
														displayFlightPassengers = false;
													}}
													class="px-4 py-2 bg-neutral-300 rounded-md text-md font-semibold"
													type="button">Cancel</button
												>
												<button
													on:click={() => {
														displayFlightPassengers = false;
													}}
													class="px-4 py-2 bg-blue-700 text-white text-md font-semibold rounded-md"
													type="button">Done</button
												>
											</div>
										</div>
									{/if}
								</div>
							</div>
						</div>

						<div class="grid grid-cols-2 items-end gap-5 mx-1.5 my-2 md:grid-cols-6 w-full">
							<div class="md:col-span-4 col-span-1">
								<div class="relative mt-2 flex items-center gap-x-3 w-full">
									<div class="w-full relative origin-location">
										<label for="from" class="block text-xs font-medium leading-6 text-gray-600"
											>From</label
										>
										<input
											on:input={(e) => {
												isOriginLoading = true;
												autocomplete({
													origin: e.currentTarget.value
												});
											}}
											on:focus={() => {
												showDestinationLocations = false;
												showOriginLocations = originResults.length > 0;
											}}
											type="text"
											name="origin"
											id="origin"
											bind:value={$form.origin}
											class="outline-none peer block w-full border-0 bg-neutral-100 py-1.5 px-1.5 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6 border-b"
											placeholder="From?"
										/>

										{#if isOriginLoading}
											<div
												class="bg-neutral-50 p-4 border absolute z-[5] w-full drop-shadow-xl rounded-b-md"
											>
												<Loading class="w-8 h-8 mx-auto" />
											</div>
										{:else if originResults.length > 0 && showOriginLocations}
											<ul
												id="origin-options"
												class="bg-neutral-50 border absolute z-[5] w-full drop-shadow-xl max-h-[150px] overflow-y-auto rounded-b-md"
											>
												{#each originResults as origin}
													<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
													<!-- svelte-ignore a11y-click-events-have-key-events -->
													<li
														on:click={() => {
															$form.origin = origin.iataCode;
															showOriginLocations = false;
														}}
														class="text-sm px-2 py-3 hover:bg-neutral-100 cursor-pointer flex items-start justify-between gap-4"
													>
														<div class="grid">
															<small class="text-xs font-semibold">{origin.name} Airport</small>
															<p
																class="text-xs font-semibold px-1 rounded-full bg-neutral-300 w-fit"
															>
																{origin.address.cityName}, {origin.address.countryCode}
															</p>
														</div>
														<div class="border px-1 font-semibold rounded">
															<p>
																{origin.iataCode}
															</p>
														</div>
													</li>
												{/each}
											</ul>
										{:else if showOriginLocations && showOriginError.length > 0}
											<div
												class="bg-neutral-50 p-4 border absolute z-[5] w-full drop-shadow-xl rounded-b-md"
											>
												<p class="text-red-500 font-semibold">An error has occured!</p>
											</div>
										{/if}
									</div>

									<div class="w-full relative destination-location">
										<label for="to" class="block text-xs font-medium leading-6 text-gray-600"
											>To</label
										>
										<input
											on:input={(e) => {
												isDestinationLoading = true;
												autocomplete({
													destination: e.currentTarget.value
												});
											}}
											on:focus={() => {
												showOriginLocations = false;
												showDestinationLocations = destinationResults.length > 0;
											}}
											type="text"
											name="destination"
											id="destination"
											bind:value={$form.destination}
											class="outline-none peer block w-full border-0 bg-neutral-100 py-1.5 px-1.5 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6 border-b"
											placeholder="To?"
										/>
										{#if isDestinationLoading}
											<div
												class="bg-neutral-50 p-4 border absolute z-[5] w-full drop-shadow-xl rounded-b-md"
											>
												<Loading class="w-8 h-8 mx-auto" />
											</div>
										{:else if destinationResults.length > 0 && showDestinationLocations}
											<ul
												id="destination-options"
												class="bg-neutral-50 border absolute z-[5] w-full drop-shadow-xl max-h-[150px] overflow-y-auto rounded-b-md"
											>
												{#each destinationResults as destination}
													<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
													<!-- svelte-ignore a11y-click-events-have-key-events -->
													<li
														on:click={() => {
															$form.destination = destination.iataCode;
															showDestinationLocations = false;
														}}
														class="text-sm px-2 py-3 hover:bg-neutral-100 cursor-pointer flex items-start justify-between gap-4"
													>
														<div class="grid">
															<small class="text-xs font-semibold"
																>{destination.name}
																Airport</small
															>
															<p
																class="text-xs font-semibold px-1 rounded-full bg-neutral-300 w-fit"
															>
																{destination.address.cityName}, {destination.address.countryCode}
															</p>
														</div>
														<div class="border px-1 font-semibold rounded">
															<p>
																{destination.iataCode}
															</p>
														</div>
													</li>
												{/each}
											</ul>
										{:else if showDestinationLocations && showDestinationError.length > 0}
											<div
												class="bg-neutral-50 p-4 border absolute z-[5] w-full drop-shadow-xl rounded-b-md"
											>
												<p class="text-red-500 font-semibold">An error has occured!</p>
											</div>
										{/if}
									</div>

									<!-- <div class="absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-indigo-600"
								aria-hidden="true"></div> -->
								</div>
							</div>
							<div
								class={activeFlightSearchTabType === 'oneWay'
									? 'md:col-span-2 col-span-2'
									: 'md:col-span-1 col-span-1'}
							>
								<label for="name" class="block text-xs font-medium leading-6 text-gray-600"
									>Departure</label
								>
								<div class="relative mt-2">
									<input
										type="date"
										name="departure"
										id="departure"
										bind:value={$form.departure}
										class="outline-none peer block w-full border-0 bg-neutral-100 py-1.5 px-1.5 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
										placeholder="Jane Smith"
									/>
									<div
										class="absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-indigo-600"
										aria-hidden="true"
									></div>
								</div>
							</div>
							{#if activeFlightSearchTabType === 'return'}
								<div class="md:col-span-1 col-span-1">
									<label for="name" class="block text-xs font-medium leading-6 text-gray-600"
										>Return</label
									>
									<div class="relative mt-2">
										<input
											type="date"
											name="return"
											id="return"
											bind:value={$form.return}
											class="outline-none peer block w-full border-0 bg-neutral-100 py-1.5 px-1.5 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
											placeholder="Jane Smith"
										/>
										<div
											class="absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-indigo-600"
											aria-hidden="true"
										></div>
									</div>
								</div>
							{/if}
						</div>

						<div class="block">
							<button type="submit" class="btn-primary float-right">Search</button>
						</div>
					</form>
				{:else if activeFlightSearchTab === 'hotels'}
					<form method="post" on:submit|preventDefault={() => alert('Hotels')} class="grid gap-y-2">
						<input
							type="text"
							name="return"
							id="return"
							bind:value={$form.return}
							class="outline-none peer block w-full border-0 bg-neutral-100 p-4 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
							placeholder="Search for hotels..."
						/>
						<div class="block">
							<button type="submit" class="btn-primary float-right">Search</button>
						</div>
					</form>
				{:else if activeFlightSearchTab === 'tourPackages'}
					<form
						method="post"
						on:submit|preventDefault={() => alert('Tour packages')}
						class="grid gap-y-2"
					>
						<input
							type="text"
							name="return"
							id="return"
							bind:value={$form.return}
							class="outline-none peer block w-full border-0 bg-neutral-100 p-4 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
							placeholder="Search for tour packages..."
						/>
						<div class="block">
							<button type="submit" class="btn-primary float-right">Search</button>
						</div>
					</form>
				{/if}
			</div>
		</div>
	</section>

	<Services serviceList={services} swipe={swiper} />

	<WhoWeAre />

	<section id="jumbotron-content">
		<div class="relative isolate overflow-hidden bg-gray-900 py-32">
			<img
				src={JumboImage}
				alt="Aerial view of beach with colorful umbrellas and boats in the water."
				class="absolute inset-0 -z-10 h-full w-full object-cover"
			/>
		</div>
	</section>

	<!-- <section id="partners-content">
		<div class="py-10 bg-white sm:py-16 lg:py-12">
			<div class="mx-auto max-w-7xl px-5">
				<div class="flex flex-col justify-center items-center mx-auto gap-y-8">
					<div class="lg:col-span-2">
						<h2
							class="text-3xl font-semibold leading-tight text-gray-800 sm:text-4xl lg:text-4xl lg:leading-tight"
						>
							Our Partners
						</h2>
					</div>

					<div class="w-full grid gap-y-5 md:gap-y-8">
						<div class="hidden md:block">
							<div
								class="slide grid md:flex items-center max-w-6xl grid-cols-3 mx-auto lg:grid-cols-4 gap-x-3 gap-y-3 w-full"
							>
								<div class="w-full">
									<img
										class="object-contain w-full h-12 mx-auto"
										src={Amadeus}
										alt="Amadeus logo"
										width="48"
										height="48"
									/>
								</div>
								<div class="w-full">
									<img
										class="object-contain w-full h-12 mx-auto"
										src={Qatar}
										alt="Qatar airways logo"
										width="48"
										height="48"
									/>
								</div>
								<div class="w-full">
									<img
										class="object-contain w-full h-12 mx-auto"
										src={Lufthansa}
										alt="Lufthansa logo"
										width="48"
										height="48"
									/>
								</div>
								<div class="w-full">
									<img
										class="object-contain w-full h-12 mx-auto"
										src={Asky}
										alt="Asky logo"
										width="48"
										height="48"
									/>
								</div>
								<div class="w-full">
									<img
										class="object-contain w-full h-12 mx-auto"
										src={AirFrance}
										alt="Air france logo"
										width="48"
										height="48"
									/>
								</div>
								<div class="w-full">
									<img
										class="object-contain w-full h-12 mx-auto"
										src={BritishAirways}
										alt="British airways logo"
										width="48"
										height="48"
									/>
								</div>
								<div class="w-full">
									<img
										class="object-contain w-full h-12 mx-auto"
										src={Emirates}
										alt="Emirates logo"
										width="48"
										height="48"
									/>
								</div>
								<div class="w-full">
									<img
										class="object-contain w-full h-12 mx-auto"
										src={DeltaAirline}
										alt="Delta airlines"
										width="48"
										height="48"
									/>
								</div>
							</div>

							<div
								class="items-center grid md:flex max-w-6xl grid-cols-3 mx-auto lg:grid-cols-4 gap-x-3 gap-y-3"
							>
								<div>
									<img
										class="object-contain w-full h-12 mx-auto"
										src={Ethiopian}
										alt="Ethiopian airways"
										width="48"
										height="48"
									/>
								</div>
								<div>
									<img
										class="object-contain w-full h-12 mx-auto"
										src={IATA}
										alt="Iata logo"
										width="48"
										height="48"
									/>
								</div>
								<div>
									<img
										class="object-contain w-full h-12 mx-auto"
										src={KenyaAirways}
										alt="Kenya airways logo"
										width="48"
										height="48"
									/>
								</div>
								<div>
									<img
										class="object-contain w-full h-12 mx-auto"
										src={AirCote}
										alt="Air cote logo"
										width="48"
										height="48"
									/>
								</div>
								<div>
									<img
										class="object-contain w-full h-12 mx-auto"
										src={RwandaAir}
										alt="Rwandair logo"
										width="48"
										height="48"
									/>
								</div>
								<div>
									<img
										class="object-contain w-full h-12 mx-auto"
										src={Tolichocore}
										alt="Touchcore solutions logo"
										width="48"
										height="48"
									/>
								</div>
								<div>
									<img
										class="object-contain w-full h-12 mx-auto"
										src={TurkishAirline}
										alt="Turkish airlines logo"
										width="48"
										height="48"
									/>
								</div>
								<div>
									<img
										class="object-contain w-full h-12 mx-auto"
										src={SaAirways}
										alt="South african airways"
										width="48"
										height="48"
									/>
								</div>
							</div>
						</div>

						<div class="md:hidden block">
							<div
								class="slide grid md:flex items-center max-w-6xl grid-cols-3 mx-auto lg:grid-cols-4 gap-x-3 gap-y-3 w-full"
							>
								<div class="w-full">
									<img
										class="object-contain w-full h-12 mx-auto"
										src={Amadeus}
										alt="Amadeus logo"
										width="48"
										height="48"
									/>
								</div>
								<div class="w-full">
									<img
										class="object-contain w-full h-12 mx-auto"
										src=""
										alt="Qatar airways logo"
										width="48"
										height="48"
									/>
								</div>
								<div class="w-full">
									<img
										class="object-contain w-full h-12 mx-auto"
										src=""
										alt="Lufthansa logo"
										width="48"
										height="48"
									/>
								</div>
								<div class="w-full">
									<img
										class="object-contain w-full h-12 mx-auto"
										src=""
										alt="Asky logo"
										width="48"
										height="48"
									/>
								</div>
								<div class="w-full">
									<img
										class="object-contain w-full h-12 mx-auto"
										src=""
										alt="Air france logo"
										width="48"
										height="48"
									/>
								</div>
								<div class="w-full">
									<img
										class="object-contain w-full h-12 mx-auto"
										src=""
										alt="British airways logo"
										width="48"
										height="48"
									/>
								</div>
								<div class="w-full">
									<img
										class="object-contain w-full h-12 mx-auto"
										src=""
										alt="Emirates logo"
										width="48"
										height="48"
									/>
								</div>
								<div class="w-full">
									<img
										class="object-contain w-full h-12 mx-auto"
										src=""
										alt="Delta airlines"
										width="48"
										height="48"
									/>
								</div>
							</div>

							<div
								class="items-center grid md:flex max-w-6xl grid-cols-3 mx-auto lg:grid-cols-4 gap-x-3 gap-y-3"
							>
								<div>
									<img
										class="object-contain w-full h-12 mx-auto"
										src=""
										alt="Ethiopian airways"
										width="48"
										height="48"
									/>
								</div>
								<div>
									<img
										class="object-contain w-full h-12 mx-auto"
										src=""
										alt="Iata logo"
										width="48"
										height="48"
									/>
								</div>
								<div>
									<img
										class="object-contain w-full h-12 mx-auto"
										src=""
										alt="Kenya airways logo"
										width="48"
										height="48"
									/>
								</div>
								<div>
									<img
										class="object-contain w-full h-12 mx-auto"
										src=""
										alt="Air cote logo"
										width="48"
										height="48"
									/>
								</div>
								<div>
									<img
										class="object-contain w-full h-12 mx-auto"
										src=""
										alt="Rwandair logo"
										width="48"
										height="48"
									/>
								</div>
								<div>
									<img
										class="object-contain w-full h-12 mx-auto"
										src=""
										alt="Touchcore solutions logo"
										width="48"
										height="48"
									/>
								</div>
								<div>
									<img
										class="object-contain w-full h-12 mx-auto"
										src=""
										alt="Turkish airlines logo"
										width="48"
										height="48"
									/>
								</div>
								<div>
									<img
										class="object-contain w-full h-12 mx-auto"
										src=""
										alt="South african airways"
										width="48"
										height="48"
									/>
								</div>
							</div>
						</div>
						<div class="flex md:hidden items-center justify-center mt-4 space-x-3">
							<div class="w-2.5 h-2.5 rounded-full block cursor-pointer"></div>
							<div class="w-2.5 h-2.5 rounded-full block cursor-pointer"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section> -->

	<CallOut />
</div>
