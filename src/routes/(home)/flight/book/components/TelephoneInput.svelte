<script lang="ts">
	import ArrowDown from '$lib/components/ArrowDown.svelte';
	import { countries } from '../done/countries';
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';

	interface CountryCode {
		name: string;
		code: string;
		dialCode: string;
		emoji: string;
	}
	// Variables to hold the selected code and the phone number
	let selectedCode: string = countries[0].dialCode; // Default to first country's dial code
	let phoneNumber: string = '';
	let selectedCountry: {
		name: string;
		dialCode: string;
		code: string;
	} = {
		name: countries[0].name,
		dialCode: countries[0].dialCode,
		code: countries[0].code
	};

	let showDialCodeList: boolean = false;

	let filteredCountries: CountryCode[] = countries;

	export let error: boolean | undefined = false;

	// Define events to emit changes
	let dispatch = createEventDispatcher();

	export let handlePhoneChange = (event: Event) => {
		const target = event.target as HTMLInputElement;
		if (target.value !== '0' && (!parseInt(target.value) || !Number(target.value))) {
			error = true;
			return;
		}

		phoneNumber = target.value;
		dispatch('phoneChange', { fullPhoneNumber: `${selectedCountry.dialCode}${phoneNumber}`, selectedCountryCode: selectedCountry.dialCode });
	};

	export let onInput: (e: Event & {
		currentTarget: EventTarget & HTMLInputElement;
	} ) => void

	function handleClickOutside(event: MouseEvent): void {
		const target = event.target as HTMLElement;

		if (!target.closest('.countries')) {
			showDialCodeList = false;
		}
	}

	onMount(() => {
		window.document.addEventListener('click', handleClickOutside);
		dispatch('codeChange', { selectedCode: selectedCountry.dialCode });
	});

	onDestroy(() => {
		if (typeof window !== 'undefined')
			window.document.removeEventListener('click', handleClickOutside);
	});

	// Combine the dialing code and phone number into a single value
	$: fullPhoneNumber = `${selectedCode}${phoneNumber}`;
</script>

<div class="grid">
	<div class="flex relative countries border {error ? 'border-red-500' : 'border-neutral-300'} ">
		<button
			type="button"
			on:click={() => {
				showDialCodeList = !showDialCodeList;
			}}
			class="w-fit border-r relative cursor-pointer flex justify-end items-center px-2 gap-4 group hover:bg-neutral-100 text-sm focus:outline-none"
		>
			<span class="cursor-pointer w-full flex gap-1 items-center text-sm">
				<img
					src="https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/{selectedCountry.code}.svg"
					alt={selectedCountry.name}
					class="w-6 h-6"
				/>
				{selectedCountry.dialCode}
			</span>
			<span class="ml-2">
				<ArrowDown class="w-8 h-8" />
			</span>
		</button>

		<input
			required
			id="phone-number"
			type="tel"
			placeholder="Enter your phone number"
			class="border-l w-full bg-neutral-100 px-4 py-2 text-sm focus:outline-none"
			on:input={(e) => {
				onInput(e);
				handlePhoneChange(e);
			}}
		/>
		{#if showDialCodeList}
			<div class="absolute top-0 bg-transparent left-0 w-full">
				<div
					class="bg-white flex w-auto max-h-[200px] overflow-hidden overflow-y-auto h-auto absolute z-[999] top-[37px] flex-col shadow-xl divide-y divide-slate-200 border"
				>
					<input
						on:input={(e) => {
							filteredCountries = countries.filter((c) =>
								c.dialCode.includes(e.currentTarget.value)
							);
						}}
						type="text"
						placeholder="Search"
						class="w-full p-2 focus:outline-none bg-neutral-100 sticky top-0"
					/>
					{#each filteredCountries as country}
						<button
							type="button"
							on:click={() => {
								selectedCountry.code = country.code;
								selectedCountry.dialCode = country.dialCode;
								selectedCountry.name = country.name;
								showDialCodeList = false;
								filteredCountries = countries;
								dispatch('codeChange', { selectedCode: selectedCountry.dialCode });
							}}
							class="hover:bg-neutral-200 cursor-pointer w-full flex gap-1 items-center last:border-b pl-3 pr-8 py-3"
						>
							<img
								src="https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/{country.code}.svg"
								alt={country.name}
								class="w-8 h-8"
							/>
							{country.dialCode}
						</button>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</div>
