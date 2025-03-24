<script lang="ts">
  import Close from "$lib/components/Close.svelte";
</script>

<div class="fixed inset-0 z-[9999] overflow-y-auto">
  <div class="flex items-center justify-center min-h-screen px-4 sm:px-0">
    <div class="fixed inset-0 bg-black opacity-75"></div>
    <div
      class="bg-white rounded-lg p-6 max-w-xl w-full mx-auto z-50 relative h-fit"
    >
      <div class="flex justify-between items-center text-neutral-700">
        <h2 class="text-xl font-bold">Payment details</h2>

        <button
          on:click={() => {
            // displayCCModal = false;
          }}
          class="p-2 rounded-full border border-neutral-400"
        >
          <Close class="w-6 h-6" />
        </button>
      </div>

      <slot />
    </div>
  </div>
</div>
