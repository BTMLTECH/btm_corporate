<script lang="ts">
  import Hero from "./components/Hero.svelte";
  import Hero1 from "$lib/images/hero/hero-1.webp";
  import Hero2 from "$lib/images/hero/hero-2.webp";
  import Hero3 from "$lib/images/hero/hero-3.webp";
  import JumboImage from "$lib/images/jumbo-image.webp";
  import CallOut from "./components/CallOut.svelte";
  import { onDestroy, onMount } from "svelte";
  import { Swiper } from "swiper";
  import services from "$lib/data/services";
  import Services from "./components/Services.svelte";
  import WhoWeAre from "./components/WhoWeAre.svelte";
  import Amadeus from "$lib/images/brands/amadeus.png";
  import Qatar from "$lib/images/brands/Qater.png";
  import Lufthansa from "$lib/images/brands/Lufthansa.png";
  import Asky from "$lib/images/brands/asky.png";
  import AirFrance from "$lib/images/brands/air france.png";
  import BritishAirways from "$lib/images/brands/British airways.png";
  import Emirates from "$lib/images/brands/emirate.png";
  import DeltaAirline from "$lib/images/brands/delta air lines.png";
  import Ethiopian from "$lib/images/brands/Ethiopain.png";
  import IATA from "$lib/images/brands/IATA.png";
  import KenyaAirways from "$lib/images/brands/kenya airways.png";
  import RwandaAir from "$lib/images/brands/RwandAir.png";
  import AirCote from "$lib/images/brands/air cote.png";
  import Touchcore from "$lib/images/brands/Touchcore.png";
  import TurkishAirline from "$lib/images/brands/Turkish airlines.png";
  import SaAirways from "$lib/images/brands/south africa airways.png";
  import Obt from "./components/OBT.svelte";

  let displayFlightPassengers: boolean = false;

  let showOriginLocations: boolean = false;
  let showDestinationLocations: boolean = false;

  export let data;

  function handleClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    if (!target.closest(".origin-location")) {
      showOriginLocations = false;
    }

    if (!target.closest(".destination-location")) {
      showDestinationLocations = false;
    }

    if (!target.closest(".flight-options")) displayFlightPassengers = false;
  }

  let swiper: Swiper;

  onMount(() => {
    swiper = new Swiper(".mySwiper", {
      slidesPerView: "auto",
      grid: {
        rows: 1,
        fill: "row",
      },
      loop: true,
      direction: "horizontal",
      speed: 400,
      effect: "slide",
      a11y: {
        prevSlideMessage: "Previous slide",
        nextSlideMessage: "Next slide",
      },
      spaceBetween: 30,
      slidesOffsetAfter: 0,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      // Navigation arrows
      navigation: {
        nextEl: ".swiper-next",
        prevEl: ".swiper-prev",
      },
    });
    window.document.addEventListener("click", handleClickOutside);
  });

  onDestroy(() => {
    if (typeof window !== "undefined")
      window.document.removeEventListener("click", handleClickOutside);
  });
</script>

<div>
  <!-- Hero -->
  <Hero heroImgs={[Hero1, Hero2, Hero3]} />

  <!-- Flight Search -->
  <Obt {data} />

  <Services serviceList={services} swipe={swiper} />

  <WhoWeAre />

  <section id="jumbotron-content">
    <div class="relative isolate overflow-hidden bg-gray-900 py-32">
      <img
        src={JumboImage}
        alt="Aerial view of beach with colorful umbrellas and boats in the water."
        class="absolute inset-0 -z-10 h-full w-full object-cover"
      />
    </div>
  </section>

  <section id="partners-content">
    <div class="py-10 bg-white sm:py-16 lg:py-12">
      <div class="mx-auto max-w-7xl px-2 sm:px-5">
        <div class="flex flex-col justify-center items-center mx-auto gap-y-8">
          <div class="lg:col-span-2">
            <h2
              class="text-3xl font-semibold leading-tight text-gray-800 sm:text-4xl lg:text-4xl lg:leading-tight"
            >
              Our Partners
            </h2>
          </div>

          <div class="w-full">
            <!-- First row of partners -->
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-6 items-center justify-center">
              {#each [Amadeus, Qatar, Lufthansa, Asky, AirFrance, BritishAirways, Emirates, DeltaAirline] as logo, i}
                <div class="flex items-center justify-center p-2">
                  <img
                    class="object-contain h-8 sm:h-12 w-auto max-w-full"
                    src={logo}
                    alt={`Partner logo ${i + 1}`}
                    loading="lazy"
                  />
                </div>
              {/each}
            </div>

            <!-- Second row of partners -->
            <div class="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-6 items-center justify-center">
              {#each [Ethiopian, IATA, KenyaAirways, AirCote, RwandaAir, Touchcore, TurkishAirline, SaAirways] as logo, i}
                <div class="flex items-center justify-center p-2">
                  <img
                    class="object-contain h-8 sm:h-12 w-auto max-w-full"
                    src={logo}
                    alt={`Partner logo ${i + 9}`}
                    loading="lazy"
                  />
                </div>
              {/each}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <CallOut />
</div>

<style lang="postcss">
</style>
