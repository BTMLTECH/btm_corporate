<script lang="ts">
	import AboutHero from '$lib/images/about-hero.webp';
	import Sam from '$lib/images/team/sam.png';
	import Bola from '$lib/images/team/bola.png';
	import Bolanle from '$lib/images/team/bolanle.jpg';
	import Olufemi from '$lib/images/team/olufemi.png';
	import Ademola from '$lib/images/team/ademola.png';
	import Chioma from '$lib/images/team/chioma.png';
	import Lola from '$lib/images/team/lola.jpg';
	import CallOut from '../components/CallOut.svelte';
	import WTA2015 from '$lib/images/awards/wta_2015-150x150.png'
	import WTA2016 from '$lib/images/awards/wta_2016-150x150.png'
	import WTA2017 from '$lib/images/awards/wta_2017-150x150.png'
	import WTA2018 from '$lib/images/awards/wta_2018-150x150.png'
	import WTA2019 from '$lib/images/awards/wta_2019-150x150.png'
	import WTA2020 from '$lib/images/awards/wta_2020-150x150.png'
	import WTA2021 from '$lib/images/awards/wta_2021-150x150.png'

</script>

<section id="main-content">
	<div class="bg-gray-100/40">
		<div class="relative isolate">
			<div class="px-6 pt-16 lg:px-8">
				<div class="mx-auto max-w-2xl pt-16 text-center">
					<h2 class="text-4xl font-bold font-display tracking-tight text-gray-800 sm:text-6xl">
						We Take Care Of Your Travel Needs
					</h2>
					<p class="mt-6 text-lg font-medium leading-8 text-gray-800 uppercase">Who we are</p>
				</div>
			</div>

			<div class="mx-auto mt-10 max-w-7xl px-6 lg:px-8">
				<div class="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
					<div
						class="grid max-w-xl grid-cols-1 gap-8 text-base leading-7 text-gray-500 lg:max-w-none lg:grid-cols-2"
					>
						<div>
							<p>
								Business Travel Management (BTM) Limited, is a member of the GHI Assets ltd group
								which houses several brands including but not limited to; Emirates Holidays, Sky
								Logistics Ltd and Rwandair. BTM Ltd was incorporated in 1998, and is an ISO
								9001:2015 accredited agent as well as being accredited by I.A.T.A. (International
								Air Transport Association).
							</p>
						</div>
						<div>
							<p>
								In July 1999, the company which specialises in comprehensive travel management,
								corporate services and logistics for businesses, became the top provider of
								corporate travel management, B2B logistic solutions, and the pacesetter in the
								application of technology and innovative travel management in Nigeria. BTM Ltd
								quickly expanded to service clients throughout West & Central Africa.
							</p>
						</div>
					</div>
					<dl
						class="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 sm:mt-20 sm:grid-cols-2 sm:gap-y-16 lg:mt-28 lg:grid-cols-4"
					>
						<div class="flex flex-col-reverse gap-y-3 border-l border-gray-500/20 pl-6">
							<dt class="text-base leading-7 text-gray-600">Business was founded</dt>
							<dd class="text-3xl font-medium tracking-tight text-gray-700">1998</dd>
						</div>
						<div class="flex flex-col-reverse gap-y-3 border-l border-gray-500/20 pl-6">
							<dt class="text-base leading-7 text-gray-600">People on the team</dt>
							<dd class="text-3xl font-medium tracking-tight text-gray-700">120+</dd>
						</div>
						<div class="flex flex-col-reverse gap-y-3 border-l border-gray-500/20 pl-6">
							<dt class="text-base leading-7 text-gray-600">Users on the platform</dt>
							<dd class="text-3xl font-medium tracking-tight text-gray-700">250k</dd>
						</div>
						<div class="flex flex-col-reverse gap-y-3 border-l border-gray-500/20 pl-6">
							<dt class="text-base leading-7 text-gray-600">World travel awards</dt>
							<dd class="text-3xl font-medium tracking-tight text-gray-700">7+</dd>
						</div>
					</dl>
				</div>
			</div>

			<div class="mt-16 xl:mx-auto xl:max-w-7xl xl:px-8">
				<img
					src={AboutHero}
					alt="A group of black women sitting in an office having a meeting."
					class="aspect-[9/4] w-full object-cover rounded-lg"
				/>
			</div>

			<div class="mx-auto max-w-7xl px-6 py-16">
				<div class="mx-auto max-w-2xl lg:mx-0">
					<h2 class="text-3xl font-semibold font-display tracking-tight text-gray-800 sm:text-4xl">
						Our values
					</h2>
					<p class="mt-3 text-md leading-6 text-gray-500">
						The guiding principles that shape our culture and drive our actions define who we are,
						how we work, and what we stand for. These values are deeply ingrained in everything we
						do, from the way we interact with each other to how we serve our customers.
					</p>
				</div>
				<dl
					class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-base leading-7 text-gray-300 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:gap-x-16"
				>
					<div class="relative pl-9">
						<dt class="inline font-semibold text-gray-800">
							<svg
								class="absolute left-1 top-1 h-5 w-5 text-gray-500"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
							>
								<path
									fill-rule="evenodd"
									d="M4.606 12.97a.75.75 0 01-.134 1.051 2.494 2.494 0 00-.93 2.437 2.494 2.494 0 002.437-.93.75.75 0 111.186.918 3.995 3.995 0 01-4.482 1.332.75.75 0 01-.461-.461 3.994 3.994 0 011.332-4.482.75.75 0 011.052.134z"
									clip-rule="evenodd"
								/>
								<path
									fill-rule="evenodd"
									d="M5.752 12A13.07 13.07 0 008 14.248v4.002c0 .414.336.75.75.75a5 5 0 004.797-6.414 12.984 12.984 0 005.45-10.848.75.75 0 00-.735-.735 12.984 12.984 0 00-10.849 5.45A5 5 0 001 11.25c.001.414.337.75.751.75h4.002zM13 9a2 2 0 100-4 2 2 0 000 4z"
									clip-rule="evenodd"
								/>
							</svg>
							Dedication.
						</dt>
						<dd class="inline text-gray-500">
							We go extraordinary lengths to get our travelers to their destinations on time and
							ready to do business
						</dd>
					</div>
					<div class="relative pl-9">
						<dt class="inline font-semibold text-gray-800">
							<svg
								class="absolute left-1 top-1 h-5 w-5 text-gray-500"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
							>
								<path
									fill-rule="evenodd"
									d="M11 2a1 1 0 10-2 0v6.5a.5.5 0 01-1 0V3a1 1 0 10-2 0v5.5a.5.5 0 01-1 0V5a1 1 0 10-2 0v7a7 7 0 1014 0V8a1 1 0 10-2 0v3.5a.5.5 0 01-1 0V3a1 1 0 10-2 0v5.5a.5.5 0 01-1 0V2z"
									clip-rule="evenodd"
								/>
							</svg>
							Consideration.
						</dt>
						<dd class="inline text-gray-500">
							With an outstanding suite of products, we customize every step of each trip whilst
							keeping track of your expenses and safety too.
						</dd>
					</div>
					<div class="relative pl-9">
						<dt class="inline font-semibold text-gray-800">
							<svg
								class="absolute left-1 top-1 h-5 w-5 text-gray-500"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
							>
								<path
									d="M10 9a3 3 0 100-6 3 3 0 000 6zM6 8a2 2 0 11-4 0 2 2 0 014 0zM1.49 15.326a.78.78 0 01-.358-.442 3 3 0 014.308-3.516 6.484 6.484 0 00-1.905 3.959c-.023.222-.014.442.025.654a4.97 4.97 0 01-2.07-.655zM16.44 15.98a4.97 4.97 0 002.07-.654.78.78 0 00.357-.442 3 3 0 00-4.308-3.517 6.484 6.484 0 011.907 3.96 2.32 2.32 0 01-.026.654zM18 8a2 2 0 11-4 0 2 2 0 014 0zM5.304 16.19a.844.844 0 01-.277-.71 5 5 0 019.947 0 .843.843 0 01-.277.71A6.975 6.975 0 0110 18a6.974 6.974 0 01-4.696-1.81z"
								/>
							</svg>
							Customer-Centricity.
						</dt>
						<dd class="inline text-gray-500">
							We know what it takes to keep our clients moving. We understand what modern,
							successful businesses need.
						</dd>
					</div>
					<div class="relative pl-9">
						<dt class="inline font-semibold text-gray-800">
							<svg
								class="absolute left-1 top-1 h-5 w-5 text-gray-500"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
							>
								<path
									fill-rule="evenodd"
									d="M9.664 1.319a.75.75 0 01.672 0 41.059 41.059 0 018.198 5.424.75.75 0 01-.254 1.285 31.372 31.372 0 00-7.86 3.83.75.75 0 01-.84 0 31.508 31.508 0 00-2.08-1.287V9.394c0-.244.116-.463.302-.592a35.504 35.504 0 013.305-2.033.75.75 0 00-.714-1.319 37 37 0 00-3.446 2.12A2.216 2.216 0 006 9.393v.38a31.293 31.293 0 00-4.28-1.746.75.75 0 01-.254-1.285 41.059 41.059 0 018.198-5.424zM6 11.459a29.848 29.848 0 00-2.455-1.158 41.029 41.029 0 00-.39 3.114.75.75 0 00.419.74c.528.256 1.046.53 1.554.82-.21.324-.455.63-.739.914a.75.75 0 101.06 1.06c.37-.369.69-.77.96-1.193a26.61 26.61 0 013.095 2.348.75.75 0 00.992 0 26.547 26.547 0 015.93-3.95.75.75 0 00.42-.739 41.053 41.053 0 00-.39-3.114 29.925 29.925 0 00-5.199 2.801 2.25 2.25 0 01-2.514 0c-.41-.275-.826-.541-1.25-.797a6.985 6.985 0 01-1.084 3.45 26.503 26.503 0 00-1.281-.78A5.487 5.487 0 006 12v-.54z"
									clip-rule="evenodd"
								/>
							</svg>
							Reliability.
						</dt>
						<dd class="inline text-gray-500">
							Getting corporate travellers to where they want to be, safely, hassle-free and on time
							is the reason we are here.
						</dd>
					</div>
					<div class="relative pl-9">
						<dt class="inline font-semibold text-gray-800">
							<svg
								class="absolute left-1 top-1 h-5 w-5 text-gray-500"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
							>
								<path
									d="M15.98 1.804a1 1 0 00-1.96 0l-.24 1.192a1 1 0 01-.784.785l-1.192.238a1 1 0 000 1.962l1.192.238a1 1 0 01.785.785l.238 1.192a1 1 0 001.962 0l.238-1.192a1 1 0 01.785-.785l1.192-.238a1 1 0 000-1.962l-1.192-.238a1 1 0 01-.785-.785l-.238-1.192zM6.949 5.684a1 1 0 00-1.898 0l-.683 2.051a1 1 0 01-.633.633l-2.051.683a1 1 0 000 1.898l2.051.684a1 1 0 01.633.632l.683 2.051a1 1 0 001.898 0l.683-2.051a1 1 0 01.633-.633l2.051-.683a1 1 0 000-1.898l-2.051-.683a1 1 0 01-.633-.633L6.95 5.684zM13.949 13.684a1 1 0 00-1.898 0l-.184.551a1 1 0 01-.632.633l-.551.183a1 1 0 000 1.898l.551.183a1 1 0 01.633.633l.183.551a1 1 0 001.898 0l.184-.551a1 1 0 01.632-.633l.551-.183a1 1 0 000-1.898l-.551-.184a1 1 0 01-.633-.632l-.183-.551z"
								/>
							</svg>
							Trusted.
						</dt>
						<dd class="inline text-gray-500">
							Trust us to work around the clock to seamlessly fit together the pieces of your travel
							programme.
						</dd>
					</div>
					<div class="relative pl-9">
						<dt class="inline font-semibold text-gray-800">
							<svg
								class="absolute left-1 top-1 h-5 w-5 text-gray-500"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
							>
								<path
									d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6zM15.657 5.404a.75.75 0 10-1.06-1.06l-1.061 1.06a.75.75 0 001.06 1.06l1.06-1.06zM6.464 14.596a.75.75 0 10-1.06-1.06l-1.06 1.06a.75.75 0 001.06 1.06l1.06-1.06zM18 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0118 10zM5 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 015 10zM14.596 15.657a.75.75 0 001.06-1.06l-1.06-1.061a.75.75 0 10-1.06 1.06l1.06 1.06zM5.404 6.464a.75.75 0 001.06-1.06l-1.06-1.06a.75.75 0 10-1.061 1.06l1.06 1.06z"
								/>
							</svg>
							Adaptability.
						</dt>
						<dd class="inline text-gray-500">
							We understand the importance of managing your travel or meetings program and providing
							flexible, user-friendly technologies to streamline bookings and payments.
						</dd>
					</div>
				</dl>
			</div>

			<div class="bg-white py-20">
				<div class="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
					<div class="max-w-2xl">
						<h2
							class="text-3xl font-semibold font-display tracking-tight text-gray-900 sm:text-4xl"
						>
							Our leadership
						</h2>
						<p class="mt-3 text-md leading-6 text-gray-500">Meet the team driving our success.</p>
					</div>
					<div class="xl:col-span-2">
						<ul role="list" class="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
							<li>
								<div class="flex items-center gap-x-6">
									<img
										class="h-20 w-20 rounded-full border border-gray-100"
										width="80"
										height="80"
										src={Sam}
										alt="Sam Cookey"
									/>
									<div>
										<h3 class="text-base font-medium leading-7 tracking-tight text-gray-800">
											Mr Sam Cookey Jr
										</h3>
										<p class="text-sm font-medium leading-6 text-gray-500">Chairman</p>
									</div>
								</div>
							</li>
							<li>
								<div class="flex items-center gap-x-6">
									<img
										class="h-20 w-20 rounded-full border border-gray-100"
										width="80"
										height="80"
										src={Bola}
										alt="Bola Adefobe"
									/>
									<div>
										<h3 class="text-base font-medium leading-7 tracking-tight text-gray-800">
											Mrs Bola Adefope
										</h3>
										<p class="text-sm font-medium leading-6 text-gray-500">Director</p>
									</div>
								</div>
							</li>
							<li>
								<div class="flex items-center gap-x-6">
									<img
										class="h-20 w-20 rounded-full border border-gray-100"
										src={Olufemi}
										width="80"
										height="80"
										alt="Olufemi Adefope"
									/>
									<div>
										<h3 class="text-base font-medium leading-7 tracking-tight text-gray-800">
											Mr Olufemi Adefope
										</h3>
										<p class="text-sm font-medium leading-6 text-gray-500">Director</p>
									</div>
								</div>
							</li>
							<li>
								<div class="flex items-center gap-x-6">
									<img
										class="h-20 w-20 rounded-full border border-gray-100"
										src={Bolanle}
										width="80"
										height="80"
										alt="Bolanle Oluwayemisi Adeniji"
									/>
									<div>
										<h3 class="text-base font-medium leading-7 tracking-tight text-gray-800">
											Ms. Bolanle Oluwayemisi Adeniji
										</h3>
										<p class="text-sm font-medium leading-6 text-gray-500">Director</p>
									</div>
								</div>
							</li>
							<li>
								<div class="flex items-center gap-x-6">
									<img
										class="h-20 w-20 rounded-full border border-gray-100"
										src={Chioma}
										width="80"
										height="80"
										alt="Chioma Nweke"
									/>
									<div>
										<h3 class="text-base font-medium leading-7 tracking-tight text-gray-800">
											Mrs Chioma Nweke
										</h3>
										<p class="text-sm font-medium leading-6 text-gray-500">Director</p>
									</div>
								</div>
							</li>
							<li>
								<div class="flex items-center gap-x-6">
									<img
										class="h-20 w-20 rounded-full border border-gray-100"
										src={Ademola}
										width="80"
										height="80"
										alt="Ademola Adefarasin
                                        "
									/>
									<div>
										<h3 class="text-base font-medium leading-7 tracking-tight text-gray-800">
											Mr. Ademola Adefarasin
										</h3>
										<p class="text-sm font-medium leading-6 text-gray-500">Director</p>
									</div>
								</div>
							</li>
							<li>
								<div class="flex items-center gap-x-6">
									<img
										class="w-20 h-20 object-contain rounded-full border border-gray-100"
										src={Lola}
										width="80"
										height="80"
										alt="Ademola Adefarasin
                                        "
									/>
									<div>
										<h3 class="text-base font-medium leading-7 tracking-tight text-gray-800">
											Ms. Lola Adefope
										</h3>
										<p class="text-sm font-medium leading-6 text-gray-500">Managing Director</p>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<section class="bg-neutral-100 p-8">
	<h1 class="text-center font-bold text-xl md:text-2xl">Nigeria's Leading Travel Management Company
	</h1>
	<div class="mt-10 relative">
		<div class="relative grid justify-items-center grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
			<div class="relative w-32 h-32 flex">
				<img src={WTA2015} alt="2015 WTA" class="object-contain w-full h-full absolute">
			</div>

			<div class="relative w-32 h-32 flex">
				<img src={WTA2016} alt="2015 WTA" class="object-contain w-full h-full absolute">
			</div>

			<div class="relative w-32 h-32 flex">
				<img src={WTA2017} alt="2015 WTA" class="object-contain w-full h-full absolute">
			</div>

			<div class="relative w-32 h-32 flex">
				<img src={WTA2018} alt="2015 WTA" class="object-contain w-full h-full absolute">
			</div>

			<div class="relative w-32 h-32 flex">
				<img src={WTA2019} alt="2015 WTA" class="object-contain w-full h-full absolute">
			</div>

			<div class="relative w-32 h-32 flex">
				<img src={WTA2020} alt="2015 WTA" class="object-contain w-full h-full absolute">
			</div>

			<div class="relative w-32 h-32 flex">
				<img src={WTA2021} alt="2015 WTA" class="object-contain w-full h-full absolute">
			</div>
		</div>
	</div>
</section>

<CallOut />
