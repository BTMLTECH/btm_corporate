<script lang="ts">
  export let thumbnail_url: string;
  export let title: string;
  export let package_type: string;
  export let duration_nights: number;
  export let description: string | undefined;
  export let price_per_family_usd: number | undefined;
  export let price_per_person_usd: number | undefined;
  export let price_type: "PER_PERSON" | "PER_FAMILY";
  export let tourID: string;
</script>

<div
  class="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition group border border-transparent hover:border-blue-200 fade-in"
>
  <div class="relative">
    <img
      src={thumbnail_url}
      alt={title}
      class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
    />
    <div class="absolute inset-0 gradient-overlay"></div>
    <span
      class="absolute top-4 left-4 flex items-center gap-1 bg-white/90 badge-shadow px-3 py-1 rounded-full text-blue-700 text-xs font-semibold"
    >
      <svg
        class="w-4 h-4 text-blue-500"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
        ><path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 8c-1.657 0-3 1.343-3 3 0 2.25 3 5 3 5s3-2.75 3-5c0-1.657-1.343-3-3-3z"
        /></svg
      >
      {package_type}
    </span>
    <!-- <button
            class="absolute bottom-4 right-4 bg-white/90 text-blue-700 font-medium px-4 py-1 rounded-full shadow hover:bg-blue-50 transition text-sm"
            aria-label="View All Photos"
          >
            <svg
              class="w-4 h-4 inline-block mr-1"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
              ><rect x="3" y="5" width="18" height="14" rx="2" /><circle
                cx="8.5"
                cy="12.5"
                r="1.5"
              /><path d="M21 15l-5-5-4 4-2-2-5 5" /></svg
            >
            View All Photos
          </button> -->
  </div>
  <div class="p-7">
    <div class="flex items-center justify-between mb-1">
      <h3 class="text-lg font-bold text-gray-900">{title}</h3>
      <span class="text-sm text-gray-400 flex items-center gap-1"
        ><svg
          class="w-4 h-4 text-blue-500"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
          ><rect x="3" y="4" width="18" height="18" rx="2" /><path
            d="M16 2v4M8 2v4M3 10h18"
          /></svg
        >{duration_nights} Nights</span
      >
    </div>
    <div class="text-gray-500 text-sm font-light mb-4">
      {description}
    </div>
    <hr class="my-3 border-gray-100" />
    <div class="flex flex-wrap gap-2 text-gray-500 mb-5">
      <span
        class="flex items-center gap-1 bg-blue-50 px-2 py-0.5 rounded-full text-xs"
        title="Flight"
        aria-label="Flight"
        ><svg
          class="w-3.5 h-3.5 text-blue-500"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10.5 7.5l7 7m0 0l-7 7m7-7H3"
          /></svg
        >Flight</span
      >
      <span
        class="flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded-full text-xs"
        title="Hotel"
        aria-label="Hotel"
        ><svg
          class="w-3.5 h-3.5 text-green-500"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
          ><rect x="3" y="7" width="18" height="13" rx="2" /><path
            d="M16 3v4M8 3v4"
          /></svg
        >Hotel</span
      >
      <span
        class="flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded-full text-xs"
        title="Car"
        aria-label="Car"
        ><svg
          class="w-3.5 h-3.5 text-green-500"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
          ><rect x="3" y="11" width="18" height="7" rx="2" /><circle
            cx="7.5"
            cy="18.5"
            r="1.5"
          /><circle cx="16.5" cy="18.5" r="1.5" /></svg
        >Car</span
      >
      <span
        class="flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded-full text-xs"
        title="Sightseeing"
        aria-label="Sightseeing"
        ><svg
          class="w-3.5 h-3.5 text-green-500"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
          ><circle cx="12" cy="12" r="10" /><circle
            cx="12"
            cy="12"
            r="4"
          /></svg
        >Sightseeing</span
      >
    </div>
    <hr class="my-3 border-gray-100" />
    <div class="flex flex-col sm:flex-row items-end justify-between mt-6 gap-4">
      <div>
        <span class="text-gray-400 text-xs">STARTING FROM</span>
        <div class="text-xl font-extrabold text-blue-700">
          USD {price_per_person_usd ?? price_per_family_usd}
        </div>
        <div class="text-green-600 text-xs flex items-center gap-1 mt-1">
          <span class="w-2 h-2 bg-green-500 rounded-full inline-block pulse"
          ></span>{price_type}
        </div>
      </div>
      <a
        class="flex items-center gap-2 px-7 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow transition text-base ripple"
        aria-label="Book Now"
        href="/tours/{tourID}"
      >
        <svg
          class="w-5 h-5 icon-animate"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16 12H8m0 0l4-4m-4 4l4 4"
          /></svg
        >
        Book Now
      </a>
    </div>
  </div>
</div>
