<script lang="ts">
  import type { PackageSchema } from "$lib/validations/package";
  import { acts } from "@tadashi/svelte-notification";
  import { onMount } from "svelte";
  import type {
    SuperFormData,
    SuperFormErrors,
  } from "sveltekit-superforms/client";

  let currentLocation: string = "";

  onMount(() => {
    currentLocation = window.location.href;
  });
  export let form: SuperFormData<typeof PackageSchema._type>;
  export let previewPackage: boolean | undefined = undefined;

  $: personalInfoComplete =
    $form.user.email.length > 0 &&
    $form.user.name.length > 0 &&
    $form.user.phone.length > 0;
  $: destinationComplete =
    $form.region.name.length &&
    $form.accommodation.name.length &&
    $form.tourSites.length > 0 &&
    $form.nrOfPeople &&
    $form.startDate.length &&
    $form.endDate.length &&
    $form.transportation.length > 0;
  $: tourActivitiesComplete = $form.activities.length > 0;
</script>

<nav
  aria-label="Progress"
  class="md:fixed relative bg-white mx-auto w-full md:w-[inherit] flex justify-center lg:w-3/4 md:z-[998]"
>
  <ol
    role="list"
    class="w-full divide-y divide-gray-300 rounded-md border border-gray-300 md:flex md:divide-y-0"
  >
    <li class="relative md:flex md:flex-1">
      <!-- Completed Step -->
      <a
        href="#personal-information"
        class="group flex w-full items-center p-6 md:p-6 text-sm font-medium"
        on:click={() => {
          currentLocation = `#personal-information`;
          previewPackage = false;
        }}
      >
        <span
          class="flex items-center {currentLocation === '#personal-information'
            ? 'text-indigo-600'
            : 'text-gray-500 group-hover:text-gray-900'}"
        >
          <span
            class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 {currentLocation ===
            '#personal-information'
              ? 'bg-indigo-800 group-hover:bg-indigo-900 text-white'
              : ''}  {personalInfoComplete
              ? 'bg-indigo-600 group-hover:bg-indigo-800'
              : 'border-gray-300 group-hover:border-gray-400'}"
          >
            {#if personalInfoComplete}
              <svg
                class="h-6 w-6 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  fill-rule="evenodd"
                  d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
                  clip-rule="evenodd"
                />
              </svg>
            {:else}
              01
            {/if}
          </span>

          <span class="ml-4">Personal Information</span>
        </span>
      </a>
      <!-- Arrow separator for lg screens and up -->
      <div
        class="absolute right-0 top-0 hidden h-full w-5 md:block"
        aria-hidden="true"
      >
        <svg
          class="h-full w-full text-gray-300"
          viewBox="0 0 22 80"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M0 -2L20 40L0 82"
            vector-effect="non-scaling-stroke"
            stroke="currentcolor"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </li>
    <li class="relative md:flex md:flex-1">
      <!-- Current Step -->
      <a
        href="#destination"
        class="group flex items-center p-6 md:p-6 text-sm font-medium"
        aria-current="step"
        on:click={() => {
          currentLocation = `#destination`;
          previewPackage = false;
        }}
      >
        <span
          class="flex items-center {currentLocation === '#destination'
            ? 'text-indigo-600'
            : 'text-gray-500 group-hover:text-gray-900'}"
        >
          <span
            class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 {currentLocation ===
            '#destination'
              ? 'group-hover:border-indigo-800 bg-indigo-800 group-hover:bg-indigo-900 text-white'
              : ''}  {destinationComplete
              ? 'bg-indigo-600 group-hover:bg-indigo-800'
              : 'border-gray-300 group-hover:border-gray-400'}"
          >
            {#if destinationComplete}
              <svg
                class="h-6 w-6 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  fill-rule="evenodd"
                  d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
                  clip-rule="evenodd"
                />
              </svg>
            {:else}
              02
            {/if}
          </span>

          <span class="ml-4">Destination details</span>
        </span>
      </a>
      <!-- Arrow separator for lg screens and up -->
      <div
        class="absolute right-0 top-0 hidden h-full w-5 md:block"
        aria-hidden="true"
      >
        <svg
          class="h-full w-full text-gray-300"
          viewBox="0 0 22 80"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M0 -2L20 40L0 82"
            vector-effect="non-scaling-stroke"
            stroke="currentcolor"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </li>
    <li class="relative md:flex md:flex-1">
      <!-- Upcoming Step -->
      <a
        href="#tour"
        class="group p-6 md:p-6 text-sm font-medium flex items-center"
        on:click={() => {
          currentLocation = "#tour";
          previewPackage = false;
        }}
      >
        <span
          class="flex items-center {currentLocation === '#tour'
            ? 'text-indigo-600'
            : 'text-gray-500 group-hover:text-gray-900'}"
        >
          <span
            class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 {currentLocation ===
            '#tour'
              ? 'group-hover:border-indigo-800 bg-indigo-800 group-hover:bg-indigo-900 text-white'
              : ''}  {tourActivitiesComplete
              ? 'bg-indigo-600 group-hover:bg-indigo-800'
              : 'border-gray-300 group-hover:border-gray-400'}"
          >
            {#if tourActivitiesComplete}
              <svg
                class="h-6 w-6 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  fill-rule="evenodd"
                  d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
                  clip-rule="evenodd"
                />
              </svg>
            {:else}
              03
            {/if}
          </span>

          <span class="ml-4">Tour selection</span>
        </span>
      </a>
      <!-- Arrow separator for lg screens and up -->
      <div
        class="absolute right-0 top-0 hidden h-full w-5 md:block"
        aria-hidden="true"
      >
        <svg
          class="h-full w-full text-gray-300"
          viewBox="0 0 22 80"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M0 -2L20 40L0 82"
            vector-effect="non-scaling-stroke"
            stroke="currentcolor"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </li>
    <li class="relative md:flex md:flex-1">
      <!-- Upcoming Step -->
      <button
        type="button"
        on:click={(e) => {
          if (
            personalInfoComplete &&
            destinationComplete &&
            tourActivitiesComplete
          ) {
            currentLocation = "";
            previewPackage = true;

            return;
          }

          acts.add({
            lifetime: 4,
            mode: "error",
            message: "Please check your form entries",
          });
        }}
        class="group p-6 md:p-6 text-sm font-medium flex items-center"
      >
        <span
          class="flex items-center {previewPackage
            ? 'text-indigo-600'
            : 'text-gray-500 group-hover:text-gray-900'}"
        >
          <span
            class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 {previewPackage
              ? 'group-hover:border-indigo-800 bg-indigo-800 group-hover:bg-indigo-900 text-white'
              : ''}  {previewPackage
              ? 'bg-indigo-600 group-hover:bg-indigo-800'
              : 'border-gray-300 group-hover:border-gray-400'}"
          >
            {#if previewPackage}
              <svg
                class="h-6 w-6 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  fill-rule="evenodd"
                  d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
                  clip-rule="evenodd"
                />
              </svg>
            {:else}
              04
            {/if}
          </span>

          <span class="ml-4">Preview</span>
        </span>
      </button>
    </li>
  </ol>
</nav>
