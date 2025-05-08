<script lang="ts">
  import Tamale from "$lib/images/tamale.webp";
  import CastleView from "$lib/images/castle_view.webp";
  import Statue from "$lib/images/statue.webp";
  import BikeTrip from "$lib/images/bike-trip.webp";
  import Festival from "$lib/images/festival.webp";
  import Tourist from "$lib/images/tourist.webp";
  import Heading from "./components/Heading.svelte";
  import Tours from "./components/Tours.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;

  let { tourPackages } = data;
</script>

<Heading />

{#if tourPackages && tourPackages.length}
  <section class="container mx-auto p-10 md:p-20 antialiased">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <Tours tours={tourPackages} />
    </div>

    <div class="pt-16 flex justify-center items-center">
      <a
        href="/tours/all"
        class="rounded-full px-4 py-2 border border-blue-500 hover:bg-blue-100 transition-all ease-in duration-200"
        >See more</a
      >
    </div>
  </section>
{/if}

<section id="main-content">
  <div class="relative">
    <div class="">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="text-center my-16">
          <h2 class="text-3xl font-bold text-gray-700">
            Start Your Perfect Adventure Here!
          </h2>
          <p class="mt-2 text-lg text-gray-600">
            Plan, book, and travel effortlessly—your journey begins now.
          </p>
        </div>

        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-6"
        >
          <div class="relative overflow-hidden rounded-md shadow-md">
            <img src={Tamale} alt="Tamale" class="w-full h-64 object-cover" />
            <div class="flex items-center justify-between p-4 bg-white">
              <span class="font-semibold text-gray-700">Tamale</span>
              <span class="text-blue-500 text-xl">➔</span>
            </div>
          </div>

          <div class="relative overflow-hidden rounded-md shadow-md">
            <img
              src={CastleView}
              alt="Cape Coast"
              class="w-full h-64 object-cover"
            />
            <div class="flex items-center justify-between p-4 bg-white">
              <span class="font-semibold text-gray-700">Cape Coast</span>
              <span class="text-blue-500 text-xl">➔</span>
            </div>
          </div>

          <div class="relative overflow-hidden rounded-md shadow-md">
            <img src={Statue} alt="Kumasi" class="w-full h-64 object-cover" />
            <div class="flex items-center justify-between p-4 bg-white">
              <span class="font-semibold text-gray-700">Kumasi</span>
              <span class="text-blue-500 text-xl">➔</span>
            </div>
          </div>

          <div class="relative overflow-hidden rounded-md shadow-md">
            <img src={BikeTrip} alt="Accra" class="w-full h-64 object-cover" />
            <div class="flex items-center justify-between p-4 bg-white">
              <span class="font-semibold text-gray-700">Accra</span>
              <span class="text-blue-500 text-xl">➔</span>
            </div>
          </div>

          <div class="relative overflow-hidden rounded-md shadow-md">
            <img
              src={Festival}
              alt="Takoradi"
              class="w-full h-64 object-cover"
            />
            <div class="flex items-center justify-between p-4 bg-white">
              <span class="font-semibold text-gray-700">Takoradi</span>
              <span class="text-blue-500 text-xl">➔</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="bg-gray-50 p-8">
    <div class="text-center mb-8">
      <h2 class="text-3xl font-bold mt-12 text-gray-700">
        Travel is better as a BTM Rewards member
      </h2>
      <p class="mt-2 text-gray-600">
        After your first trip, you'll automatically join BTM Rewards, gaining
        access to exclusive tour benefits, including:
      </p>
    </div>
    <div class="flex flex-col lg:flex-row items-center lg:space-x-8 my-12">
      <div class="w-full lg:w-1/2 mb-8 lg:mb-0">
        <img
          src={Tourist}
          alt="A lady enjoying a view"
          class="rounded-lg shadow-lg w-full object-cover"
        />
      </div>
      <div class="w-full lg:w-1/2 space-y-6">
        <div class="flex items-start space-x-4">
          <span class="text-2xl">&#10084;&#65039;</span>
          <div>
            <h2 class="font-semibold text-lg text-gray-700">
              Members-only pricing
            </h2>
            <p class="text-gray-600">5% discount on guided tours</p>
          </div>
        </div>
        <div class="flex items-start space-x-4">
          <span class="text-2xl">&#128142;</span>
          <div>
            <h2 class="font-semibold text-lg text-gray-700">
              Priority first look
            </h2>
            <p class="text-gray-600">
              You're the first to find out about new trips & offers
            </p>
          </div>
        </div>
        <div class="flex items-start space-x-4">
          <span class="text-2xl">&#11088;</span>
          <div>
            <h2 class="font-semibold text-lg text-gray-700">
              Special recognition
            </h2>
            <p class="text-gray-600">
              From your Travel Director on your next tour
            </p>
          </div>
        </div>
        <div class="flex items-start space-x-4">
          <span class="text-2xl">&#127758;</span>
          <div>
            <h2 class="font-semibold text-lg text-gray-700">
              Access to our family of brands
            </h2>
            <p class="text-gray-600">Enjoy your rewards across the portfolio</p>
          </div>
        </div>
        <div class="flex items-start space-x-4">
          <span class="text-2xl">&#128100;</span>
          <div>
            <h2 class="font-semibold text-lg text-gray-700">
              Referral program
            </h2>
            <p class="text-gray-600">Give discounts and get travel credits</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
