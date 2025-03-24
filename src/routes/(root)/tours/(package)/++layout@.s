<script lang="ts">
  import Header from "$lib/components/shared/Header.svelte";
  import "$lib/css/app.css";
</script>

<Header />

<svelte:head>
  <title>Business Travel Management - Create A Tour Package</title>
</svelte:head>

<div class="relative mt-[120px] md:mt-[150px]">
  <slot />
</div>
