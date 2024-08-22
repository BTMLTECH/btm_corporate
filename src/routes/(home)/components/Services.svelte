<script lang="ts">
	import type Swiper from 'swiper';

	export let swipe: Swiper;
	export let serviceList:
		| Array<{
				title: string;
				href: string;
				img: {
					alt: string;
					src: string;
				};
				description: string;
		  }>
		| [];
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
</svelte:head>

<section id="services-content" class="relative">
	<div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
		<div class="text-center">
			<h2 class="text-3xl font-bold font-display leading-tight text-gray-900">Services</h2>
			<p class="mt-2 text-base leading-7 text-gray-500">
				Discover seamless travel experiences with our services
			</p>
		</div>

		<div class="swiper mySwiper sm:shadow-none !pb-1 mt-8 !relative !z-[100]">
			<div class="swiper-wrapper !w-max !z-[105]">
				{#each serviceList as service}
					<div
						class="swiper-slide !w-[130px] !h-[130px] sm:max-w-max sm:!w-[12.8rem] md:!w-[11.6rem] lg:!w-[150px] lg:!h-[150px] xl:!w-[150px] xl:!h-[150px] rounded-lg drop-shadow-xl"
					>
						<a href={service.href} class="w-full h-full">
							<article
								class="relative w-full h-full isolate flex flex-col justify-end overflow-hidden rounded-xl p-3 lg:p-[10px] cursor-pointer transform transition duration-300 ease-in-out hover:translate-x-2 hover:shadow-3xl"
							>
								<img
									src={service.img.src}
									alt={service.img.alt}
									class="absolute inset-0 h-full w-full object-cover"
								/>
								<div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
								<h3 class="z-10 mt-1 text-xs font-semibold text-white break-words">
									{service.title}
								</h3>
							</article>
						</a>
					</div>
				{/each}
			</div>
		</div>
		<div
			class="w-full lg:relative flex justify-center items-center gap-4 z-auto min-h-[70px] lg:min-h-fit mt-2 md:mt-0"
		>
			<div class="lg:absolute top-[-95px] left-[-20px] z-[101]">
				<button
					on:click={() => swipe.slidePrev()}
					type="button"
					class="swiper-prev bg-blue-600 text-white p-2 rounded-full z-[999]"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="lg:w-6 lg:h-6 xl:w-fit xl:h-fit"
						width="32"
						height="32"
						viewBox="0 0 24 24"
					>
						<path
							fill="currentColor"
							d="m12 16l1.4-1.4l-1.6-1.6H16v-2h-4.2l1.6-1.6L12 8l-4 4zm0 6q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"
						/>
					</svg>
				</button>
			</div>

			<div class="lg:absolute top-[-95px] right-[-20px] z-[101]">
				<button
					on:click={() => swipe.slideNext()}
					type="button"
					class="swiper-next bg-blue-600 text-white p-2 rounded-full z-[999]"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="lg:w-6 lg:h-6 xl:w-fit xl:h-fit"
						width="32"
						height="32"
						viewBox="0 0 24 24"
					>
						<path
							fill="currentColor"
							d="m12 16l4-4l-4-4l-1.4 1.4l1.6 1.6H8v2h4.2l-1.6 1.6zm0 6q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"
						/>
					</svg>
				</button>
			</div>
		</div>

		<div class="max-w-7xl mx-auto text-center mt-8 mb-12">
			<button class="btn-primary">
				<a href="services.html">Discover more</a>
			</button>
		</div>
	</div>
</section>

<style lang="postcss">
	.slide {
		transition: opacity 2s ease-in-out;
	}

	.swiper {
		width: 100%;
		height: 100%;
		margin-left: auto;
		margin-right: auto;
	}

	.swiper-slide {
		text-align: center;
		/* background: #fff; */
		/* height: auto !important; */
		/* height: calc((100% - 30px) / 2) !important; */

		/* Center slide text vertically */
		display: flex;
		justify-content: center;
		align-items: center;
		width: calc(250px * 15);
	}

	.swiper-grid-column > .swiper-wrapper {
		/* width: inherit !important; */
		flex-direction: row;
		/* display: grid !important; */
		/* grid-template-columns: repeat(3, minmax(0, 1fr)); */
		/* grid-template-rows: repeat(1, minmax(0, 1fr)); */
		/* justify-content: center; */
		gap: 40px;
		height: 100%;
		/* width: 80vw !important; */
	}

	@media (min-width: 10px) and (max-width: 640px) {
		.swiper-button-next {
			right: 3px;
			top: 100px;
			/* transform: rotate(90deg); */
		}

		.swiper-button-prev {
			left: 3px;
			top: 100px;
			/* transform: rotate(90deg); */
		}

		.swiper-wrapper {
			/* height: 400px; */
			@apply shadow-inner;
		}
	}

	.swiper-wrapper {
		width: 80vw !important;
	}

	.from-result,
	.to-result {
		display: none;
	}
</style>
