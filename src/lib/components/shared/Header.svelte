<script lang="ts">
	import BTMLogo from '$lib/images/logo.png';

	let isCountryDialogOpen: boolean = false;
	let selectedCountry: string = 'Nigeria';
	let isMobileMenuOpen: boolean = false;
	let isBrandSubMenuOpen: boolean = false;
	let isHelpSubMenuOpen: boolean = false;

	function showSubMenu(menuType: 'Brand' | 'Help' = 'Brand') {
		if (menuType === 'Brand') {
			isBrandSubMenuOpen = true;
			return;
		}

		isHelpSubMenuOpen = true;
	}

	function hideSubMenu(menuType: 'Brand' | 'Help' = 'Brand') {
		if (menuType === 'Brand') {
			isBrandSubMenuOpen = false;
			return;
		}
		isHelpSubMenuOpen = false;
	}

</script>

<header class="bg-white fixed inset-x-0 top-0 shadow-md z-[106]">
	<div class="relative bg-gray-50">
		<div class="mx-auto max-w-7xl px-2 py-2">
			<div class="flex justify-end space-x-6 items-center">
				<a
					href="/help#maps-content"
					class="text-sm text-gray-600 hover:underline flex items-center"
				>
					Locate us
				</a>

				<!-- Dropdown structure -->
				<div class="relative inline-block">
					<div>
						<button
							on:click={() => {
								isCountryDialogOpen = !isCountryDialogOpen;
							}}
							class="inline-flex justify-center items-center w-full rounded-md border border-gray-300 shadow-sm px-2 py-1 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 focus:outline-none relative z-10 transition duration-200"
						>
							<img
								src="https://upload.wikimedia.org/wikipedia/commons/7/79/Flag_of_Nigeria.svg"
								alt="BTM Nigeria"
								class="w-4 h-3 mr-1"
							/>
							{#if selectedCountry === 'Ghana'}
								<img
									src="https://upload.wikimedia.org/wikipedia/commons/1/19/Flag_of_Ghana.svg"
									alt="BTM Ghana"
									class="w-4 h-3 mr-1"
								/>
							{/if}
							Nigeria
							<svg
								class="-mr-1 ml-1 h-4 w-4"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
							>
								<path
									fill-rule="evenodd"
									d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
									clip-rule="evenodd"
								/>
							</svg>
						</button>
					</div>
					{#if isCountryDialogOpen}
						<div
							class="origin-top-right absolute right-0 mt-1 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-2 z-20 transition duration-200"
						>
							<a
								href="https://btmghana.net"
								target="_blank"
								class="px-2 py-1 text-xs text-gray-700 hover:bg-gray-100 flex items-center"
								role="menuitem"
							>
								<img
									src="https://upload.wikimedia.org/wikipedia/commons/1/19/Flag_of_Ghana.svg"
									alt="BTM Ghana"
									class="w-4 h-3 mr-1"
								/> Ghana
							</a>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>

	<nav class="flex items-center justify-between p-3 lg:px-8" aria-label="Global">
		<div class="flex lg:flex-1">
			<a href="/" class="-m-1.5 p-1.5">
				<span class="sr-only">BTM</span>
				<img class="h-8 w-auto" src={BTMLogo} width="32" height="32" alt="BTM logo" />
			</a>
		</div>
		<div class="flex md:hidden">
			<button
				on:click={() => (isMobileMenuOpen = true)}
				type="button"
				class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-800"
			>
				<span class="sr-only">Open main menu</span>
				<svg
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="#000"
					aria-hidden="true"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
					/>
				</svg>
			</button>
		</div>
		<div class="hidden md:flex md:gap-x-6 lg:gap-x-12 uppercase">
			<a href="/" class="text-sm font-semibold leading-6 text-gray-800 hover:text-gray-500">Home</a>
			<a href="/about" class="text-sm font-semibold leading-6 text-gray-800 hover:text-gray-500"
				>About</a
			>
			<a href="/services" class="text-sm font-semibold leading-6 text-gray-800 hover:text-gray-500"
				>Services</a
			>
			<div class="relative">
				<a
					on:mouseover={() => showSubMenu('Brand')}
					on:mouseleave={() => hideSubMenu('Brand')}
					href="#"
					class="text-sm font-semibold leading-6 text-gray-800 hover:text-gray-500 flex items-center"
				>
					Our brands
					<svg class="ml-2 h-4 w-4 fill-current" viewBox="0 0 20 20">
						<path
							d="M5.23 7.79a.75.75 0 011.06 0L10 11.47l3.71-3.68a.75.75 0 111.06 1.06l-4.24 4.2a.75.75 0 01-1.06 0L5.23 8.85a.75.75 0 010-1.06z"
						/>
					</svg>
				</a>
				<div
					on:mouseenter={() => showSubMenu('Brand')}
					on:mouseleave={() => hideSubMenu('Brand')}
					class="{isBrandSubMenuOpen
						? 'absolute block'
						: 'hidden'} w-48 bg-white shadow-lg rounded-sm py-2 z-10"
				>
					<a
						href="https://www.btmholidays.com/"
						target="_blank"
						class="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">BTM Holidays</a
					>
					<a
						href="https://www.journeyeasy.net"
						target="_blank"
						class="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">JourneyEasy</a
					>
					<a href="#" class="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">TrekBuyFly</a>
					<a
						href="https://marketplace.btmlimited.net/"
						target="_blank"
						class="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
						>BTM Marketplace
					</a>
				</div>
			</div>
			<div class="relative">
				<a
					on:mouseover={() => showSubMenu('Help')}
					on:mouseleave={() => hideSubMenu('Help')}
					href="/help"
					class="text-sm font-semibold leading-6 text-gray-800 hover:text-gray-500 flex items-center"
				>
					Help
					<svg class="ml-2 h-4 w-4 fill-current" viewBox="0 0 20 20">
						<path
							d="M5.23 7.79a.75.75 0 011.06 0L10 11.47l3.71-3.68a.75.75 0 111.06 1.06l-4.24 4.2a.75.75 0 01-1.06 0L5.23 8.85a.75.75 0 010-1.06z"
						/>
					</svg>
				</a>
				<div
					on:mouseenter={() => showSubMenu('Help')}
					on:mouseleave={() => hideSubMenu('Help')}
					class="{isHelpSubMenuOpen
						? 'absolute block'
						: 'hidden'} w-48 bg-white shadow-lg rounded-sm py-2 z-10"
				>
					<a
						href="/faqs"
						target="_blank"
						class="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">FAQS</a
					>
					<a
						href="/contact"
						target="_blank"
						class="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">Contact</a
					>
				</div>
			</div>
			<!-- <a href="help.html"
                class="text-sm font-semibold leading-6 text-gray-800 hover:text-gray-500">Blog</a> -->
		</div>
		<div class="hidden md:flex lg:flex-1 lg:justify-end">
			<div
				class="cursor-pointer relative before:absolute before:bg-gray-200 before:bottom-0 before:left-0 before:h-full before:w-full before:origin-bottom before:scale-y-[0.35] hover:before:scale-y-100 before:transition-transform before:ease-in-out before:duration-500"
			>
				<span class="relative">
					<span class="text-xs text-gray-500">Speak to an agent</span>
					<a
						href="tel:+234163161009"
						class="flex items-center text-gray-700 hover:text-gray-900 font-medium"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="2"
							stroke="currentColor"
							class="w-4 h-4 mr-1"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
							/>
						</svg>+234-163-161-009
					</a>
				</span>
			</div>
		</div>
	</nav>

	<!-- Mobile menu, show/hide based on menu open state. -->
	{#if isMobileMenuOpen}
		<div class="lg:hidden font-semibold w-full" role="dialog" aria-modal="true">
			<div class="fixed inset-0 z-50"></div>
			<div
				class="fixed inset-y-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-full sm:ring-1 sm:ring-white/10"
			>
				<div class="flex items-center justify-between">
					<a href="/" class="-m-1.5 p-1.5">
						<span class="sr-only">BTM logo</span>
						<img class="h-8 w-auto" src={BTMLogo} width="32" height="32" alt="BTM logo" />
					</a>
					<button
						on:click={() => (isMobileMenuOpen = false)}
						type="button"
						class="-m-2.5 rounded-md p-2.5 text-gray-400"
					>
						<span class="sr-only">Close menu</span>
						<svg
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="#000"
							aria-hidden="true"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>
				<div class="mt-4 uppercase font-semibold">
					<a
						href="/"
						class="block px-4 py-2 text-sm font-semibold leading-6 text-gray-800 hover:text-gray-500"
						>Home</a
					>
					<a href="/about" class="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">About</a>
					<div>
						<a
							on:click={() => (isBrandSubMenuOpen = !isBrandSubMenuOpen)}
							href="#"
							class="px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 flex items-center justify-between"
						>
							Our brands
							<svg class="ml-2 h-4 w-4 fill-current" viewBox="0 0 20 20">
								<path
									d="M5.23 7.79a.75.75 0 011.06 0L10 11.47l3.71-3.68a.75.75 0 111.06 1.06l-4.24 4.2a.75.75 0 01-1.06 0L5.23 8.85a.75.75 0 010-1.06z"
								/>
							</svg>
						</a>
						{#if isBrandSubMenuOpen}
							<div class="pl-4 py-2">
								<a
									href="https://www.btmholidays.com"
									target="_blank"
									class="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">BTM Holidays</a
								>
								<a
									href="https://www.journeyeasy.net"
									target="_blank"
									class="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">JourneyEasy</a
								>
								<a href="#" class="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
									>TrekBuyFly</a
								>
								<a
									href="https://marketplace.btmlimited.net"
									target="_blank"
									class="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
									>BTM Marketplace
								</a>
							</div>
						{/if}
					</div>
					<a href="/services" class="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
						>Services</a
					>
					<a href="/help" class="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">Help</a>
				</div>

				<div class="mx-4 my-2 border-t border-gray-200"></div>

				<div class="lg:flex lg:flex-1 lg:justify-end px-4 py-2">
					<div>
						<span class="relative">
							<span class="text-xs text-gray-500 font-normal">Speak to an agent</span>
							<a
								href="tel:+234163161009"
								class="flex items-center text-gray-600 hover:text-gray-900 font-medium"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="2"
									stroke="currentColor"
									class="w-4 h-4 mr-1"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
									/>
								</svg>0234-8990-00
							</a>
						</span>
					</div>
				</div>
			</div>
		</div>
	{/if}
</header>
