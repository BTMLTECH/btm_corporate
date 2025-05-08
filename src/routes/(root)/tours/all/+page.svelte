<script lang="ts">
  import type { PageData } from "./$types";
  import TourCard from "./components/TourCard.svelte";

  export let data: PageData;

  let { tourPackages } = data;

  console.log("data", data);
</script>

<div class="max-w-7xl mx-auto py-16 p-4">
  <!-- Search and Sort Bar -->
  <div
    class="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4"
  >
    <div class="relative w-full sm:w-1/2 shadow-sm">
      <span
        class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
      >
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
          ><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg
        >
      </span>
      <input
        type="text"
        placeholder="Search Package..."
        class="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white"
        id="searchInput"
        aria-label="Search Packages"
      />
      <button
        type="button"
        class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
        id="clearSearch"
        aria-label="Clear Search"
        style="display:none;"
      >
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          /></svg
        >
      </button>
    </div>
    <div class="relative dropdown shadow-sm">
      <button
        class="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition"
        aria-haspopup="true"
        aria-expanded="false"
        id="sortDropdownBtn"
      >
        <svg
          class="w-5 h-5 text-gray-500"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3 6h18M6 12h12M9 18h6"
          /></svg
        >
        <span class="text-gray-700 font-medium" id="sortLabel">Sort By</span>
        <svg
          class="w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19 9l-7 7-7-7"
          /></svg
        >
      </button>
      <div
        class="dropdown-content absolute right-0 mt-2 border border-gray-100"
      >
        <button type="button" data-label="Price: Low to High"
          >Price: Low to High</button
        >
        <button type="button" data-label="Price: High to Low"
          >Price: High to Low</button
        >
        <button type="button" data-label="Nights: Most to Least"
          >Nights: Most to Least</button
        >
      </div>
    </div>
  </div>

  <!-- Packages Grid -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    {#each tourPackages as tourPackage}
      <TourCard
        tourID={tourPackage.id}
        title={tourPackage.title}
        description={tourPackage.description ?? ""}
        package_type={tourPackage.package_type}
        duration_nights={tourPackage.duration_nights}
        price_per_family_usd={tourPackage.price_per_family_usd}
        price_per_person_usd={tourPackage.price_per_person_usd}
        thumbnail_url={tourPackage.thumbnail_url}
        price_type={tourPackage.price_type === "PER_FAMILY" ? "PER_FAMILY" : "PER_PERSON"}
      />
    {/each}
  </div>
</div>

<style>
  @keyframes bounce-once {
    0%,
    100% {
      transform: translateY(0);
    }

    50% {
      transform: translateY(-5px);
    }
  }

  .animate-bounce-once {
    animation: bounce-once 0.5s ease-in-out;
  }

  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .fade-in {
    animation: fadeInUp 0.7s cubic-bezier(0.23, 1, 0.32, 1);
  }
  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translateY(40px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .ripple {
    position: relative;
    overflow: hidden;
  }
  .ripple:after {
    content: "";
    display: block;
    position: absolute;
    left: 50%;
    top: 50%;
    width: 0;
    height: 0;
    background: rgba(37, 99, 235, 0.2);
    border-radius: 100%;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition:
      width 0.4s,
      height 0.4s,
      opacity 0.8s;
  }
  .ripple:active:after {
    width: 200%;
    height: 200%;
    opacity: 1;
    transition: 0s;
  }
  .pulse {
    animation: pulseDot 1.5s infinite;
  }
  @keyframes pulseDot {
    0%,
    100% {
      box-shadow: 0 0 0 0 #22c55e44;
    }
    50% {
      box-shadow: 0 0 0 6px #22c55e22;
    }
  }
  .badge-shadow {
    box-shadow: 0 2px 8px 0 #2563eb22;
  }
  .icon-animate:hover {
    animation: wiggle 0.4s;
  }
  @keyframes wiggle {
    0%,
    100% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(-10deg);
    }
    75% {
      transform: rotate(10deg);
    }
  }
  .gradient-overlay {
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.08) 60%,
      rgba(0, 0, 0, 0.25) 100%
    );
  }
  .dropdown-content {
    display: none;
    position: absolute;
    z-index: 10;
    min-width: 180px;
    background: #fff;
    border-radius: 0.5rem;
    box-shadow: 0 4px 16px #0001;
  }
  .dropdown:hover .dropdown-content,
  .dropdown:focus-within .dropdown-content {
    display: block;
  }
  .dropdown-content button {
    width: 100%;
    text-align: left;
    padding: 0.75rem 1rem;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 0.95rem;
    color: #222;
  }
  .dropdown-content button:hover {
    background: #f1f5f9;
  }
</style>
