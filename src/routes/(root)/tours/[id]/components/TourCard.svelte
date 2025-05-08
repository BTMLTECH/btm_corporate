<script lang="ts">
  export let title: string;
  export let price: number;
  export let nights: number;
  export let days: number;
  export let imageUrl: string;

  type Amenities = {
    label: string;
    color: string;
    svgPaths: string[];
  };
  let amenities: Amenities[] = [
    {
      label: "Return Airfare",
      color: "blue",
      svgPaths: [
        "M6.428 1.151C6.708.591 7.213 0 8 0s1.292.592 1.572 1.151C9.861 1.73 10 2.431 10 3v3.691l5.17 2.585a1.5 1.5 0 0 1 .83 1.342V12a.5.5 0 0 1-.582.493l-5.507-.918-.375 2.253 1.318 1.318A.5.5 0 0 1 10.5 16h-5a.5.5 0 0 1-.354-.854l1.319-1.318-.376-2.253-5.507.918A.5.5 0 0 1 0 12v-1.382a1.5 1.5 0 0 1 .83-1.342L6 6.691V3c0-.568.14-1.271.428-1.849m.894.448C7.111 2.02 7 2.569 7 3v4a.5.5 0 0 1-.276.447l-5.448 2.724a.5.5 0 0 0-.276.447v.792l5.418-.903a.5.5 0 0 1 .575.41l.5 3a.5.5 0 0 1-.14.437L6.708 15h2.586l-.647-.646a.5.5 0 0 1-.14-.436l.5-3a.5.5 0 0 1 .576-.411L15 11.41v-.792a.5.5 0 0 0-.276-.447L9.276 7.447A.5.5 0 0 1 9 7V3c0-.432-.11-.979-.322-1.401C8.458 1.159 8.213 1 8 1s-.458.158-.678.599",
      ],
    },
    {
      label: "Breakfast",
      color: "purple",
      svgPaths: [
        "M8 15a5 5 0 0 1-5-5c0-1.956.69-4.286 1.742-6.12.524-.913 1.112-1.658 1.704-2.164C7.044 1.206 7.572 1 8 1s.956.206 1.554.716c.592.506 1.18 1.251 1.704 2.164C12.31 5.714 13 8.044 13 10a5 5 0 0 1-5 5m0 1a6 6 0 0 0 6-6c0-4.314-3-10-6-10S2 5.686 2 10a6 6 0 0 0 6 6",
      ],
    },
    {
      label: "Airport Transfers",
      color: "green",
      svgPaths: [
        "M4 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0m10 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0M6 8a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2zM4.862 4.276 3.906 6.19a.51.51 0 0 0 .497.731c.91-.073 2.35-.17 3.597-.17s2.688.097 3.597.17a.51.51 0 0 0 .497-.731l-.956-1.913A.5.5 0 0 0 10.691 4H5.309a.5.5 0 0 0-.447.276",
        "M2.52 3.515A2.5 2.5 0 0 1 4.82 2h6.362c1 0 1.904.596 2.298 1.515l.792 1.848c.075.175.21.319.38.404.5.25.855.715.965 1.262l.335 1.679q.05.242.049.49v.413c0 .814-.39 1.543-1 1.997V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.338c-1.292.048-2.745.088-4 .088s-2.708-.04-4-.088V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.892c-.61-.454-1-1.183-1-1.997v-.413a2.5 2.5 0 0 1 .049-.49l.335-1.68c.11-.546.465-1.012.964-1.261a.8.8 0 0 0 .381-.404l.792-1.848ZM4.82 3a1.5 1.5 0 0 0-1.379.91l-.792 1.847a1.8 1.8 0 0 1-.853.904.8.8 0 0 0-.43.564L1.03 8.904a1.5 1.5 0 0 0-.03.294v.413c0 .796.62 1.448 1.408 1.484 1.555.07 3.786.155 5.592.155s4.037-.084 5.592-.155A1.48 1.48 0 0 0 15 9.611v-.413q0-.148-.03-.294l-.335-1.68a.8.8 0 0 0-.43-.563 1.8 1.8 0 0 1-.853-.904l-.792-1.848A1.5 1.5 0 0 0 11.18 3z",
      ],
    },
  ];
</script>

<div
  class="max-w-5xl mx-auto bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 flex flex-col md:flex-row group hover:shadow-xl transition-all duration-300"
>
  <!-- Left side: Image -->
  <div class="relative md:w-2/5 h-64 md:h-auto overflow-hidden">
    <img
      src={imageUrl}
      alt={title}
      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
    />
    <div
      class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
    ></div>
    
  </div>

  <!-- Right side: Info -->
  <div class="md:w-3/5 flex flex-col">
    <div class="p-8 flex-grow">
      <div class="mb-8">
        <!-- <div class="flex items-center justify-between mb-3">
          <div class="flex text-yellow-400">
            {#each Array(5) as _, i}
              {#if i <= 4}
                <svg
                  class="w-5 h-5"
                  fill={i < 4 ? "currentColor" : "none"}
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  >
                  </path>
                </svg>
              {:else}
                <svg
                  class="w-5 h-5"
                  fill="currentColor"
                  stroke="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    stroke-width="1.5"
                  ></path>
                </svg>
              {/if}
            {/each}
          </div>
          <span class="text-gray-500 text-sm">({rvws} rvws)</span>
        </div> -->
        <h2 class="text-3xl font-bold text-gray-900 leading-tight">{title}</h2>
        <div class="flex items-center gap-2 mt-3">
          <svg
            class="w-5 h-5 text-gray-500"
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
          <p class="text-gray-600 font-medium">
            {nights}
            {nights > 1 ? "Nights" : "Night"} / {days}
            {days > 1 ? "Days" : "Day"}
          </p>
        </div>
      </div>

      <div class="border-t border-gray-200 my-6"></div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        {#each amenities as amenity}
          <div id={amenity.label} class="flex items-center gap-3 group">
            <div
              class="w-10 h-10 rounded-lg bg-{amenity.color}-50 flex items-center justify-center group-hover:bg-{amenity.color}-100 transition-colors"
            >
              <svg
                class="w-5 h-5 text-{amenity.color}-600"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                {#each amenity.svgPaths as svgPath}
                  <path d={svgPath} />
                {/each}
              </svg>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-900">{amenity.label}</p>
            </div>
          </div>
        {/each}
      </div>
    </div>

    <div class="bg-gray-50 p-8 border-t border-gray-100 mt-auto">
      <div
        class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
      >
        <div>
          <p class="text-xs uppercase tracking-wider text-gray-500 font-medium">
            Starting From
          </p>
          <div class="flex items-baseline mt-1">
            <span class="text-2xl font-bold text-blue-600">USD {price}</span>
          </div>
          <div class="flex items-center gap-2 mt-2">
            <span class="inline-block w-2 h-2 rounded-full bg-green-500"></span>
            <p class="text-sm text-green-700 font-medium">Per Person</p>
          </div>
        </div>

        <button
          class="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3.5 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3 group"
        >
          <svg
            class="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <span class="relative">
            Book Now
            <span
              class="absolute -bottom-1 left-0 w-full h-0.5 bg-white/30 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
            ></span>
          </span>
        </button>
      </div>
    </div>
  </div>
</div>
