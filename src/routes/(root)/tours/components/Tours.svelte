<script lang="ts">
  import { goto } from "$app/navigation";
  import type { Tour, User } from "$lib/types";

    export let tours: Tour[]
</script>

{#each tours as tour, idx}
        <article
          class="flex flex-col shadow-lg group cursor-pointer transform duration-500 hover:-translate-y-1"
        >
          <img
            class="w-full h-48 object-cover"
            src={tour.image}
            alt={tour.title}
          />
          <div class="flex-1">
            <div class="p-5 pb-10">
              <h1 class="text-xl font-semibold text-gray-800 mt-4">
                {tour.title}
              </h1>
              <p class="text-gray-400 mt-2 leading-relaxed text-sm">
                {tour.description.slice(0, 80)}...
              </p>
              <!-- Added Pricing Section -->
              <div class="mt-4">
                <div class="flex gap-4 justify-center mb-4">
                  <svg
                    class="h-5 w-5 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <svg
                    class="h-5 w-5 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <svg
                    class="h-5 w-5 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div class="text-center">
                  <p class="text-gray-500 text-sm font-medium">Starting From</p>
                  <p class="text-2xl font-bold text-gray-700">
                    USD {tour.price}
                  </p>
                  <p class="text-gray-400 text-xs mt-1">
                    Per Person On Double Sharing Basis
                  </p>
                </div>
              </div>
            </div>
            <div class="p-5 mt-auto border-t border-dotted border-gray-300">
              <a href="/tours/{tour.id}/book" class="w-full grid text-center btn-primary"> Book Ticket </a>
            </div>
          </div>
        </article>
      {/each}