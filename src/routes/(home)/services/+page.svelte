<script lang="ts">
	import { serviceStore } from '../../../store';
	import CallOut from '../components/CallOut.svelte';
	import Hero from './components/Hero.svelte';
	import services from '$lib/data/services'

	const serviceInfo = {
		title: '',
		href: '',
		img: { alt: '', src: '' },
		description: ''
	};

	let serviceType: string;
	let isOpen: boolean;

	serviceStore.subscribe((value) => {
		serviceType = value.serviceType;
		isOpen = value.isOpen;
	});

	function toggleServiceStatus(value: string) {
		serviceStore.set({ serviceType: value, isOpen: true });
	}

	function resetServiceStatus() {
		serviceStore.set({ serviceType: '', isOpen: false });
	}
</script>

<div class="services-container">
	<Hero />

	<section id="services" class="mb-16">
		<div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 px-8 mx-auto mt-8">
			{#each services as service}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div
					role="button"
					tabindex="0"
					class="grid"
					on:click={(e) => {
						toggleServiceStatus(service.title);
						Object.assign(serviceInfo, service);
					}}
				>
					<article
						class="relative isolate flex flex-col justify-end overflow-hidden rounded-xl px-8 pb-8 pt-40 cursor-pointer transform transition duration-300 ease-in-out hover:translate-x-2 hover:shadow-3xl"
					>
						<img
							src={service.img.src}
							alt={service.img.alt}
							class="absolute inset-0 h-full w-full object-cover"
						/>
						<div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
						<h3
							class="z-10 mt-3 text-md md:text-xl font-semibold text-white break-words md:break-keep"
						>
							{service.title}
						</h3>
					</article>
				</div>
			{/each}

			<!-- Modal -->
			{#if serviceType === serviceInfo.title && isOpen}
				<div class="fixed inset-0 z-[99999] overflow-y-auto">
					<div class="flex items-cener justify-cnter min-h-screen px-4 sm:px-0">
						<div class="fixed inset-0 bg-black opacity-75"></div>
						<div class="bg-white rounded-lg p-6 max-w-md mx-auto z-50 relative h-fit">
							<!-- Modal content -->
							<h2 class="text-xl font-semibold mb-4">{serviceInfo.title}</h2>
							<div class="flex relative w-full h-64">
								<img
									src={serviceInfo.img.src}
									alt={serviceInfo.img.alt}
									class="absolute inset-0 h-full w-full object-cover bg-center rounded-lg"
								/>
							</div>
							<p class="text-gray-700 my-4">
								{serviceInfo.description}
							</p>

							<a
								href={serviceInfo.href}
								class="bg-blue-500 hover:bg-blue-700 text-white font-semibold tracking-wider uppercase text-sm py-2 px-4 border-b-2 border-blue-700 rounded transform transition duration-100 ease-in-out hover:-translate-y-1"
								>Read more</a
							>
							<button
								type="button"
								on:click={() => {
									resetServiceStatus();
									Object.assign(serviceInfo, {
										title: '',
										href: '',
										img: {
											alt: '',
											src: ''
										},
										description: ''
									});
								}}
								class="absolute top-4 right-4 cursor-pointer"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-6 w-6 text-gray-500 hover:text-gray-800"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
									/>
								</svg>
							</button>
						</div>
					</div>
				</div>
			{/if}
		</div>
	</section>

	<CallOut />
</div>
