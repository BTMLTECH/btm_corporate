<script lang="ts">
  import type { PackageSchema } from "$lib/validations/package";
  import type { ActivitySchema } from "$lib/validations/activity";
  import type {
    SuperFormErrors,
    SuperFormData,
  } from "sveltekit-superforms/client";
  import { z } from "zod";

  type Activity = z.infer<typeof ActivitySchema>

  export let errors: SuperFormErrors<typeof PackageSchema._type>;
  export let form: SuperFormData<typeof PackageSchema._type>;
  export let activities: Activity[];
  export let disabled: boolean | undefined = false;

  let selectedActivities = new Set()
</script>

<div id="tour" class="mx-auto w-full mt-10">
  <h2 class="text-xl font-semibold mt-5">Tour selection</h2>
  <div class="mt-5">
    <div class="rounded-md bg-blue-50 p-4">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg
            class="h-5 w-5 text-blue-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            data-slot="icon"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="ml-3 flex-1 md:flex md:justify-between">
          <p class="text-sm text-blue-700">
            Please note some activities may be not be available at some tourist
            sites.
          </p>
        </div>
      </div>
    </div>

    <fieldset class="border border-gray-300 p-4 rounded-lg mt-5">
      <legend class="text-lg font-medium">Activities</legend>

      <div class="space-y-2">
        {#if activities.length > 0}
          {#each activities as activity, activityIdx}
            <label class="flex items-center space-x-2">
              <input
                type="checkbox"
                name="site"
                aria-invalid={!$form.activities[activityIdx]?.id
                  ? "true"
                  : undefined}
                checked={$form.activities &&
                  $form.activities[activityIdx]?.id === activity.id}
                on:change={(e) => {
                  if (e.currentTarget.checked) {
                    $form.activities = [...$form.activities, activity];
                    // $form.activities.push(activity);
                  } else {
                    $form.activities = [
                      ...$form.activities.filter((activit) => {
                        if (activit.id) {
                          return activit.id !== activity.id;
                        }
                      }),
                    ];
                  }
                  console.log("jhgfrtyhjk", $form.activities)
                }}
                class="rounded w-4 h-4 {$errors.activities &&
                $errors.activities._errors &&
                $errors.activities._errors.length
                  ? 'focus:ring-red-500 ring-2 ring-inset ring-red-500'
                  : 'text-blue-600 focus:ring-blue-500'}"
              />
              <span>{activity.name}</span>
            </label>
          {/each}
        {/if}
      </div>
    </fieldset>
    {#if $errors.activities && $errors.activities._errors?.length}<span
        class="text-xs text-red-500 font-bold"
        >{$errors.activities._errors}</span
      >{/if}
  </div>
</div>
