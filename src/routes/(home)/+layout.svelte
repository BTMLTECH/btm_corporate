<script>
	import { page } from '$app/stores';
	import Footer from '$lib/components/shared/Footer.svelte';
	import Header from '$lib/components/shared/Header.svelte';
	import '$lib/css/app.css';

	const currentLocation = $page.url.pathname
</script>

<svelte:head>
	<title>Business Travel Management - Travel Management Company</title>
</svelte:head>

<Header />

<div class="{currentLocation === "/flight/search"  || currentLocation === "/flight/book/done" ? "" : "min-h-screen"} relative mt-[98px] md:mt-[115px]">
	<slot />
</div>
<a
	href="https://wa.me/234163161009?text=I%20need%20a%20flight%20package"
	class="rounded-full bg-blue-500 hover:bg-blue-700 text-neutral-100 w-14 h-14 flex justify-center items-center fixed z-[99999] right-8 bottom-8 transition-all hover:-translate-y-2"
>
	<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
		<path
			fill="currentColor"
			d="M12 3c5.5 0 10 3.58 10 8s-4.5 8-10 8c-1.24 0-2.43-.18-3.53-.5C5.55 21 2 21 2 21c2.33-2.33 2.7-3.9 2.75-4.5C3.05 15.07 2 13.13 2 11c0-4.42 4.5-8 10-8m5 9v-2h-2v2zm-4 0v-2h-2v2zm-4 0v-2H7v2z"
		/>
	</svg>
</a>
<Footer />
