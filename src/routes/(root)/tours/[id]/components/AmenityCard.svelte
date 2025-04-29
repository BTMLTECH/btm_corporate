<script lang="ts">
  export let label: string;
  export let color: string; // Tailwind color like "blue", "amber"
  export let svgPaths: string[];
</script>

<div class="flex items-center gap-3 group">
  <div
    class="w-10 h-10 rounded-lg bg-{color}-50 flex items-center justify-center group-hover:bg-{color}-100 transition-colors"
  >
    <svg
      class="w-5 h-5 text-{color}-600"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      {#each svgPaths as svgPath}
        <path d={svgPath} />
      {/each}
    </svg>
  </div>
  <div>
    <p class="text-sm font-medium text-gray-900">{label}</p>
  </div>
</div>
