<script lang="ts">
  import type { SectionItem } from "$lib/types";


  export let title: string = '';
  export let color: 'sky' | 'teal' | 'pink' | 'orange' = 'sky'; // limit colors for safety
  export let id: string = '';
  export let items: SectionItem[] = [];
</script>

<div id={id} class="bg-gradient-to-br from-{color}-50 to-{color}-100/50 rounded-2xl overflow-hidden shadow-sm border border-{color}-100 hover:shadow-md transition-all duration-300">
  <div class="p-8">
    <!-- Heading and Icon -->
    <div class="flex items-center gap-4 mb-8">
      <div class="w-12 h-12 bg-white/90 rounded-lg flex items-center justify-center shadow-sm">
        {#if color === 'sky'}
          <!-- Itinerary Icon -->
          <svg class="w-6 h-6 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        {:else if color === 'teal'}
          <!-- Inclusions Icon -->
          <svg class="w-6 h-6 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        {:else if color === 'pink'}
          <!-- Exclusions Icon -->
          <svg class="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        {:else if color === 'orange'}
          <!-- Terms & Conditions Icon -->
          <svg class="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        {/if}
      </div>
      <h3 class="text-2xl font-bold text-gray-900">{title}</h3>
    </div>

    <!-- Section content -->
    <div class="space-y-8">
      {#each items as item}
        {#if item.day}
          <!-- Timeline style for Itinerary -->
          <div class="relative pl-8 group">
            <div class="absolute left-0 top-0 bottom-0 w-0.5 bg-{color}-100"></div>
            <div class="absolute left-0 top-0 w-4 h-4 rounded-full bg-{color}-400 -translate-x-1/2"></div>
            <div class="space-y-4">
              <div class="flex items-center gap-3">
                <span class="text-sm font-medium text-{color}-600 bg-white/90 px-3 py-1 rounded-full shadow-sm">
                  Day {item.day}
                </span>
                <h4 class="text-lg font-semibold text-gray-900">{item.heading}</h4>
              </div>
              <p class="text-gray-700 leading-relaxed">{item.text}</p>
            </div>
          </div>
        {:else}
          <!-- Just paragraph text for inclusions, exclusions, terms -->
          <p class="text-gray-700">{item.text}</p>
        {/if}
      {/each}
    </div>
  </div>
</div>
