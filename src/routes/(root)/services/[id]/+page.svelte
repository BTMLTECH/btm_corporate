<script lang="ts">
	import SideNav from './components/SideNav.svelte';

	export let data;
</script>

<div class="flex">
	<aside
		class="hidden md:block max-w-[300px] w-full max-h-[100vh] h-full bg-neutral-1 p-4 overflow-y-scroll"
	>
		<SideNav />
	</aside>

	<main class="bg-neutral-200/50 w-full min-h-screen md:h-full relative">
		<div class="bg-white p-6 md:p-10 text-xl md:text-3xl font-bold flex items-center gap-x-3">
			<div class="flex md:hidden">
				<button
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
			<p>{data.title}</p>
		</div>

		<div
			class="bg-neutral-100 w-full h-full overflow-y-auto md:overflow-none pb-20 md:pb-0 relative"
		>
			<div class="overflow-y-auto min-h-screen h-full relative pb-14 max-h-[500px] p-6 md:p-10">
				<div
					class="relative max-w-sm w-full md:w-auto h-full max-h-[300px] md:float-left mx-auto mr-8 mb-8"
				>
					<img
						src={data.img.src}
						alt={data.img.alt}
						class="rounded-lg w-full h-full bg-center object-center object-cover"
					/>
				</div>

				<div class="md:pl-10 text-lg md:contents gap-8 mb-14 md:text-justify">
					<p>
						{data.description}
					</p>
					<div class="flex">
						<a href="#" class="bg-blue-500 text-white p-3 rounded-md w-fit block mt-5 mb-20">
							Click To Book now</a
						>
					</div>
				</div>
			</div>
		</div>
	</main>
</div>
