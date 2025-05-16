<script lang="ts">
  import { page } from "$app/stores";
  import Footer from "$lib/components/shared/Footer.svelte";
  import Header from "$lib/components/shared/Header.svelte";
  import "$lib/css/app.css";
  import "$lib/css/animations.css";
  import { Notifications } from "@tadashi/svelte-notification";
  import { onMount } from "svelte";
  const currentLocation = $page.url.pathname;

  export let data;
 
</script>

<svelte:head>
  <title>Business Travel Management - Travel Management Company</title>
  <script src="https://accounts.google.com/gsi/client" async defer></script>
</svelte:head>

<Header isLoggedIn={data.user ? true : false} user={data.user}  />

<div
  class="{currentLocation === '/flight/search' ||
  currentLocation === '/flight/book/done'
    ? ''
    : 'min-h-screen'} relative mt-[55px]"
>
  <slot />
</div>
<a
  href="https://wa.me/233598117590?text=I%20visited%20your%20website%20and%20I%20would%20like%20more%20information%20on%20your%20travel%20services."
  class="rounded-full bg-blue-500 hover:bg-blue-700 text-neutral-100 w-14 h-14 flex justify-center items-center fixed z-[99999] right-8 bottom-20 transition-all hover:-translate-y-2"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M12 3c5.5 0 10 3.58 10 8s-4.5 8-10 8c-1.24 0-2.43-.18-3.53-.5C5.55 21 2 21 2 21c2.33-2.33 2.7-3.9 2.75-4.5C3.05 15.07 2 13.13 2 11c0-4.42 4.5-8 10-8m5 9v-2h-2v2zm-4 0v-2h-2v2zm-4 0v-2H7v2z"
    />
  </svg>
</a>
<Footer />

<Notifications />
