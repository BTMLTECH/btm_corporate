<script lang="ts">
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  
  export let heroImgs: Array<string>;

  const currentImageIndex = writable(0);
  const delay = 3000; // time in ms between image changes

  let interval: NodeJS.Timeout;

  onMount(() => {
    interval = setInterval(() => {
      currentImageIndex.update((n) => (n + 1) % heroImgs.length);
    }, delay);

    return () => {
      clearInterval(interval);
    };
  });
</script>

<section id="hero-content" class="relative w-full">
  <div
    class="relative overflow-hidden w-full h-full aspect-square md:h-[480px]"
  >
    {#each heroImgs as heroImg, i}
      {#if $currentImageIndex === i}
        <div
          class="slide absolute inset-0 bg-cover bg-center h-full w-full"
          style="background-image: url({heroImg});"
          transition:fade
        ></div>
      {/if}
    {/each}
    <div
      class="absolute md:top-44 inset-x-0 flex flex-col justify-center items-center aspect-square md:aspect-auto"
    >
      <div class="text-center text-white w-[90%] mx-auto">
        <h1 class="text-[7.2vmin] leading-tight font-bold">
          Helping Africans Travel More
        </h1>
        <p
          class="text-[3.6vmin] sm:text-[2.8vmin] w-10/12 md:w-7/12 lg:w-6/12 mx-auto mt-4"
        >
          Let us transform your travel dreams into extraordinary adventures with
          personalized experiences, tailored just for you.
        </p>
      </div>
    </div>
  </div>
</section>