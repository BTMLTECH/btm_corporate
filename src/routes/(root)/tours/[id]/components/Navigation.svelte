<script lang="ts">
  let activeSection: string = "overview";

  function linkClasses(section: string) {
    const colors: Record<string, string> = {
      overview: "green",
      itinerary: "blue",
      inclusions: "teal",
      exclusions: "pink",
      terms: "orange",
    };
    const color = colors[section] || "green";

    return activeSection === section
      ? `text-${color}-600 bg-${color}-100`
      : `text-gray-600 hover:text-${color}-600 hover:bg-${color}-200`;
  }

  function handleClick(section: string) {
    activeSection = section;

    window.location.href = location.pathname + `#${section}`;

    const el = document.getElementById(section);

    if (el) {
      const yOffset = -180;
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }
</script>

<nav
  class="max-w-5xl mx-auto mt-8 sticky top-[6.2rem] z-[205] bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-sm"
>
  <div
    class="flex overflow-x-auto py-4 px-4 space-x-4 scrollbar-hide snap-x snap-mandatory touch-pan-x"
  >
    <a
      href="#overview"
      on:click|preventDefault={() => handleClick("overview")}
      class="flex items-center gap-2 px-3 py-2 rounded-lg whitespace-nowrap transition-all duration-300 group snap-start relative {activeSection ===
      'overview'
        ? 'text-green-600 bg-green-100'
        : 'text-gray-600 hover:text-green-600 hover:bg-green-200'}"
    >
      <div
        class="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center group-hover:bg-green-200 transition-colors"
      >
        <svg
          class="w-5 h-5 text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
      <span class="font-medium">Overview</span>
      <div
        class="absolute -bottom-1 left-0 right-0 h-0.5 bg-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
      ></div>
    </a>

    <a
      on:click|preventDefault={() => handleClick("itinerary")}
      href="#itinerary"
      class="flex items-center gap-2 px-3 py-2 rounded-lg whitespace-nowrap transition-all duration-300 group snap-start relative {activeSection ===
      'itinerary'
        ? 'text-blue-600 bg-blue-100'
        : 'text-gray-600 hover:text-blue-600 hover:bg-blue-200'}"
    >
      <div
        class="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center group-hover:bg-sky-200 transition-colors"
      >
        <svg
          class="w-5 h-5 text-sky-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
      <span class="font-medium">Itinerary</span>
      <div
        class="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
      ></div>
    </a>

    <a
      href="#inclusions"
      on:click|preventDefault={() => handleClick("inclusions")}
      class="flex items-center gap-2 px-3 py-2 rounded-lg whitespace-nowrap transition-all duration-300 group snap-start relative {activeSection ===
      'inclusions'
        ? 'text-teal-600 bg-teal-100'
        : 'text-gray-600 hover:text-teal-600 hover:bg-teal-200'}"
    >
      <div
        class="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center group-hover:bg-teal-200 transition-colors"
      >
        <svg
          class="w-5 h-5 text-teal-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <span class="font-medium">Inclusions</span>
      <div
        class="absolute -bottom-1 left-0 right-0 h-0.5 bg-teal-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
      ></div>
    </a>

    <a
      href="#exclusions"
      on:click|preventDefault={() => handleClick("exclusions")}
      class="flex items-center gap-2 px-3 py-2 rounded-lg whitespace-nowrap transition-all duration-300 group snap-start relative {activeSection ===
      'exclusions'
        ? 'text-pink-600 bg-pink-100'
        : 'text-gray-600 hover:text-pink-600 hover:bg-pink-200'}"
    >
      <div
        class="w-8 h-8 rounded-lg bg-pink-50 flex items-center justify-center group-hover:bg-pink-200 transition-colors"
      >
        <svg
          class="w-5 h-5 text-pink-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <span class="font-medium">Exclusions</span>
      <div
        class="absolute -bottom-1 left-0 right-0 h-0.5 bg-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
      ></div>
    </a>

    <a
      href="#terms"
      on:click|preventDefault={() => handleClick("terms")}
      class="flex items-center gap-2 px-3 py-2 rounded-lg whitespace-nowrap transition-all duration-300 group snap-start relative {activeSection ===
      'terms'
        ? 'text-orange-600 bg-orange-100'
        : 'text-gray-600 hover:text-orange-600 hover:bg-orange-200'}"
    >
      <div
        class="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center group-hover:bg-orange-200 transition-colors"
      >
        <svg
          class="w-5 h-5 text-orange-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </div>
      <span class="font-medium">Terms & Conditions</span>
      <div
        class="absolute -bottom-1 left-0 right-0 h-0.5 bg-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
      ></div>
    </a>
  </div>
</nav>
