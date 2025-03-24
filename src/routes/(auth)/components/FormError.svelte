<script lang="ts">
  export let allErrors: { [x: string]: any };
  export let formError: string;

  $: console.log("form error component", allErrors);
</script>

{#if allErrors}
  <p class="mb-3 -mt-7 text-red-500 font-semibold">{formError}</p>
{/if}

<!-- {#if allErrors && allErrors.length}
  <div class="mb-3 text-red-500 font-semibold -mt-7">
    {#if formError}<p>Fix the following errors:</p>
      <ul>
        {#each allErrors as error}
          {#if error.message}
            <li class="list-disc ml-8">
              {error.message}
            </li>{/if}
        {/each}
      </ul>
    {:else}
      {#each allErrors as error}
        <p class="mb-3 -mt-7 text-red-500 font-semibold">
          {error.message}
        </p>
      {/each}
    {/if}
  </div>
{/if} -->
