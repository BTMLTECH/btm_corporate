<script lang="ts">
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	export let heroImgs: Array<string>;

	const currentImageIndex = writable(0);
	const delay = 3000; // time in ms between image changes

	let interval: number;

	onMount(() => {
		interval = setInterval(() => {
			currentImageIndex.update((n) => (n + 1) % heroImgs.length);
		}, delay);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<section id="hero-content" class="relative">
	<div style="height: 500px !important;" class="relative overflow-hidden">
		{#each heroImgs as heroImg, i}
			{#if $currentImageIndex === i}
				<div
					class="slide absolute inset-0 bg-cover bg-center"
					style="background-image: url({heroImg});"
					transition:fade
				></div>
			{/if}
		{/each}
		<div class="absolute top-48 inset-x-0 flex justify-center items-center">
			<div class="text-center text-white">
				<h1 class="text-4xl md:text-5xl font-bold">Helping Africans Travel More</h1>
				<p class="text-base md:text-lg w-10/12 mx-auto mt-4">
					Let us transform your travel dreams into extraordinary adventures with personalized
					experiences, tailored just for you.
				</p>
			</div>
		</div>
	</div>
</section>
