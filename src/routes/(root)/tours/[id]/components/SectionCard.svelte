<script lang="ts">
  import type { SectionItem } from "$lib/types";
  import type {
    Exclusion,
    Inclusion,
    Itineraries,
    TermsAndConditions,
  } from "$lib/types/tourPackage";

  export let itineraries: Itineraries[] = [];
  export let inclusions: Inclusion[] = [];
  export let exclusions: Exclusion[] = [];
  export let termsAndCondtions: TermsAndConditions[] = [];
</script>

<!-- Itineraries card -->
<div
  id="itinerary"
  class="bg-gradient-to-br from-sky-50 to-sky-100/50 rounded-2xl overflow-hidden shadow-sm border border-sky-100 hover:shadow-md transition-all duration-300"
>
  <div class="p-8">
    <div class="flex items-center gap-4 mb-8">
      <div
        class="w-12 h-12 bg-white/90 rounded-lg flex items-center justify-center shadow-sm"
      >
        <svg
          class="w-6 h-6 text-sky-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          >
          </path>
        </svg>
      </div>
      <h3 class="text-2xl font-bold text-gray-900">Itinerary</h3>
    </div>

    <div class="space-y-8">
      {#each itineraries as itinerary}
        <div class="relative pl-8 group">
          <div class="absolute left-0 top-0 bottom-0 w-0.5 bg-sky-100"></div>
          <div
            class="absolute left-0 top-0 w-4 h-4 rounded-full bg-sky-400 -translate-x-1/2"
          ></div>
          <div class="space-y-4">
            <div class="flex items-center gap-3">
              <span
                class="text-sm font-medium text-sky-600 bg-white/90 px-3 py-1 rounded-full shadow-sm"
                >Day {itinerary.day_number}</span
              >
              <h4 class="text-lg font-semibold text-gray-900">
                {itinerary.title}
              </h4>
            </div>
            <p class="text-gray-700 leading-relaxed">
              {itinerary.description}
            </p>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

<!-- Inclusions card -->
<div
  id="inclusions"
  class="bg-gradient-to-br from-teal-50 to-teal-100/50 rounded-2xl overflow-hidden shadow-sm border border-teal-100 hover:shadow-md transition-all duration-300"
>
  <div class="p-8">
    <div class="flex items-center gap-4 mb-8">
      <div
        class="w-12 h-12 bg-white/90 rounded-lg flex items-center justify-center shadow-sm"
      >
        <svg
          class="w-6 h-6 text-teal-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      </div>
      <h3 class="text-2xl font-bold text-gray-900">Inclusions</h3>
    </div>
    {#each inclusions as inclusion}
      <p class="text-gray-700">{inclusion.description}</p>
    {/each}
  </div>
</div>

<!-- Exclusions card -->
<div
  id="exclusions"
  class="bg-gradient-to-br from-pink-50 to-pink-100/50 rounded-2xl overflow-hidden shadow-sm border border-pink-100 hover:shadow-md transition-all duration-300"
>
  <div class="p-8">
    <div class="flex items-center gap-4 mb-8">
      <div
        class="w-12 h-12 bg-white/90 rounded-lg flex items-center justify-center shadow-sm"
      >
        <svg
          class="w-6 h-6 text-pink-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      </div>
      <h3 class="text-2xl font-bold text-gray-900">Exclusions</h3>
    </div>
    {#each exclusions as exclusion}
      <p class="text-gray-700">{exclusion.description}</p>
    {/each}
  </div>
</div>

<!-- Terms and conditions card -->
<div
  id="terms"
  class="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-2xl overflow-hidden shadow-sm border border-orange-100 hover:shadow-md transition-all duration-300 mb-16"
>
  <div class="p-8">
    <div class="flex items-center gap-4 mb-8">
      <div
        class="w-12 h-12 bg-white/90 rounded-lg flex items-center justify-center shadow-sm"
      >
        <svg
          class="w-6 h-6 text-orange-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          ></path>
        </svg>
      </div>
      <h3 class="text-2xl font-bold text-gray-900">Terms &amp; Conditions</h3>
    </div>

    <div class="space-y-6">
      <div class="group">
        {#each termsAndCondtions as termsAndCondtion}
          <h4 class="text-lg font-semibold text-gray-900">
            {termsAndCondtion.title}
          </h4>
          <p class="text-gray-700 mt-2 leading-relaxed">
            {termsAndCondtion.description}
          </p>
        {/each}
      </div>
    </div>
  </div>
</div>
