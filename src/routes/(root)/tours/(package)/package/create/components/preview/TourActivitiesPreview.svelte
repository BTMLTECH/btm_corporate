<script lang="ts">
  import type { PackageSchema } from "$lib/validations/package";
  import type { SuperFormData } from "sveltekit-superforms/client";

  export let form: SuperFormData<typeof PackageSchema._type>;
</script>

<div id="tour" class="mx-auto w-full mt-10">
  <h2 class="text-xl font-semibold mt-5">Tour selection</h2>
  <div class="mt-5">

    <fieldset class="border border-gray-300 p-4 rounded-lg mt-5">
      <legend class="text-lg font-medium">Activities</legend>

      <div class="space-y-1">
        {#if $form.activities.length > 0}
          {#each $form.activities as activity, activityIdx}
            <label class="flex items-center space-x-2">
              <input
                type="checkbox"
                name="site"
                checked={$form.activities &&
                  $form.activities[activityIdx]?.id === activity.id}
                  disabled={true}
                class="rounded w-4 h-4 text-blue-600 focus:ring-blue-500"
              />
              <span>{activity.name}</span>
            </label>
          {/each}
        {/if}
      </div>
    </fieldset>
  </div>
</div>
