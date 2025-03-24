<script lang="ts">
  import type { PackageSchema } from "$lib/validations/package";
  import type {
    SuperFormErrors,
    SuperFormData,
    Infer,
  } from "sveltekit-superforms/client";
  import Airplane from "../Airplane.svelte";
  import Bus from "../Bus.svelte";
  import Car from "../Car.svelte";
  import type { RegionSchema } from "$lib/validations/region";
  import type { z } from "zod";
  import type { AccommodationSchema } from "$lib/validations/accommodation";
  import type { TouristSiteSchema } from "$lib/validations/touristSite";
  import { TransportationSchema } from "$lib/validations/transportation";
  import type { Activity } from "$lib/types";
  import type { ActivitySchema } from "$lib/validations/activity";

  type Regions = z.infer<typeof RegionSchema>;
  type Accommodation = {
    id: string;
    name: string;
    type: string;
    price: number;
  };
  type Activities = z.infer<typeof ActivitySchema>;
  type TouristSite = z.infer<typeof TouristSiteSchema>;
  type Transportation = z.infer<typeof TransportationSchema>;

  export let errors: SuperFormErrors<typeof PackageSchema._type>;
  export let form: SuperFormData<typeof PackageSchema._type>;
  export let regions: Regions[];
  export let accommodations: Accommodation[];
  // export let activities: Activities[];
  export let touristSites: TouristSite[];
  export let transportations: Transportation[];
  export let disabled: boolean | undefined = false;

  let selectedTour;
</script>

<div id="destination" class="mx-auto w-full mt-10">
  <h2 class="text-xl font-semibold mt-5">Destination details</h2>
  <div class="grid grid-cols-2 gap-6">
    <div class="mt-5">
      <label
        for="name"
        class="block text-sm font-medium leading-6 text-gray-900"
        >Destination</label
      >
      <div class="mt-2">
        <select
          name="destination"
          id="destination"
          aria-invalid={$errors.region?.name?.length ? "true" : undefined}
          on:input={(e) => {
            if (e.currentTarget.value.length) {
              $form.region = {
                ...$form.region,
                ...JSON.parse(e.currentTarget.value),
              };

              return;
            }

            $form.region = {
              ...$form.region,
              id: "",
            };
          }}
          {disabled}
          class="btm-input !p-[9px] {$errors.region?.name
            ? 'btm-input-focus-err'
            : 'btm-input-focus'} sm:text-sm sm:leading-6"
        >
          {#if regions && regions.length > 0}
            <option value="">Please select region</option>
            {#each regions as region, regionId}
              <option
                value={JSON.stringify(region)}
                selected={$form.region.id === region.id}>{region.name}</option
              >
            {/each}
          {:else}
            <option value="">Please select region</option>
          {/if}
        </select>
        {#if $errors.region?.name}
          <span class="text-xs text-red-500 font-bold"
            >{$errors.region.name}</span
          >{/if}
      </div>
    </div>
    <div class="mt-5">
      <label
        for="accommodation"
        class="block text-sm font-medium leading-6 text-gray-900"
        >Accommodation</label
      >
      <div class="mt-2">
        <select
          name="accommodation"
          id="accommodation"
          aria-invalid={$errors.accommodation?.name?.length
            ? "true"
            : undefined}
          on:input={(e) => {
            if (e.currentTarget.value.length) {
              $form.accommodation = {
                ...$form.accommodation,
                ...JSON.parse(e.currentTarget.value),
              };

              return;
            }

            $form.accommodation = {
              ...$form.accommodation,
              id: "",
            };
          }}
          {disabled}
          class="btm-input !p-[9px] {$errors.accommodation?.name
            ? 'btm-input-focus-err'
            : 'btm-input-focus'} sm:text-sm sm:leading-6"
        >
          <!-- <option value="">Please select accommodation</option> -->
          {#if accommodations && accommodations.length > 0}
            <option value="">Please select accommodation</option>
            {#each accommodations as accommodation, accommodationIdx}
              <option
                value={JSON.stringify(accommodation)}
                selected={$form.accommodation?.id === accommodation.id}
                >{accommodation.name}</option
              >
            {/each}
          {:else}
            <option value="">Please select accommodation</option>
          {/if}
        </select>
        {#if $errors.accommodation?.name}
          <span class="text-xs text-red-500 font-bold"
            >{$errors.accommodation.name}</span
          >
        {/if}
      </div>
    </div>
  </div>

  <div class="grid w-full">
    {#if touristSites.length > 0}
      <fieldset class="border border-gray-300 p-4 rounded-lg mt-5">
        <legend class="text-lg font-medium">Tourist Sites</legend>
        {#each touristSites as tourSite, tourSiteId}
          {#if tourSite.region_id === $form.region.id}
            <div class="space-y-2">
              <label class="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="site"
                  id={tourSite.id}
                  checked={$form.tourSites &&
                    $form.tourSites[tourSiteId]?.id === tourSite.id}
                  aria-invalid={$errors.tourSites?._errors?.length
                    ? "true"
                    : undefined}
                  {disabled}
                  on:change={(e) => {
                    if (e.currentTarget.checked) {
                      $form.tourSites = [...$form.tourSites, tourSite];
                    } else {
                      $form.tourSites = [
                        ...$form.tourSites.filter(
                          (site) => site.id !== tourSite.id
                        ),
                      ];
                    }
                  }}
                  class="rounded w-4 h-4 {$errors.tourSites &&
                  $errors.tourSites._errors?.length
                    ? 'focus:ring-red-500 ring-2 ring-inset ring-red-500'
                    : 'text-blue-600 focus:ring-blue-500'}"
                />
                <span>{tourSite.name}</span>
              </label>
            </div>
          {/if}
        {/each}
      </fieldset>
      {#if $errors.tourSites?._errors?.length}
        <span class="text-xs text-red-500 font-bold"
          >{$errors.tourSites._errors}</span
        >
      {/if}
    {/if}
  </div>

  <div class="grid w-full">
    {#if $form.tourSites.length > 0}
      <fieldset class="border border-gray-300 p-4 rounded-lg mt-5">
        <legend class="text-lg font-medium">Activities</legend>
        {#each $form.tourSites as tourSite, tourSiteId}
          <p>{tourSite.name}</p>
          {#each tourSite.activities as activity, activityId}
            <div class="space-y-2">
              <label class="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name={activity.name}
                  id={activity.id}
                  checked={$form.activities &&
                    $form.activities[activityId]?.id === activity.id}
                  aria-invalid={$errors.activities?._errors?.length
                    ? "true"
                    : undefined}
                  {disabled}
                  on:change={(e) => {
                    if (e.currentTarget.checked) {
                      $form.activities = [...$form.activities, activity];
                    } else {
                      console.log("unchecked");
                      $form.activities = [
                        ...$form.activities.filter(
                          (activity_) => activity_.id !== activity.id
                        ),
                      ];
                    }
                  }}
                  class="rounded w-4 h-4 {$errors.tourSites &&
                  $errors.tourSites._errors?.length
                    ? 'focus:ring-red-500 ring-2 ring-inset ring-red-500'
                    : 'text-blue-600 focus:ring-blue-500'}"
                />
                <span>{activity.name}</span>
              </label>
            </div>
          {/each}

          <!-- {#if tourSite.region_id === $form.region.id}
            <div class="space-y-2">
              <label class="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="site"
                  id={tourSite.id}
                  checked={$form.tourSites &&
                    $form.tourSites[tourSiteId]?.id === tourSite.id}
                  aria-invalid={$errors.tourSites?._errors?.length
                    ? "true"
                    : undefined}
                  {disabled}
                  on:change={(e) => {
                    if (e.currentTarget.checked) {
                      $form.tourSites = [...$form.tourSites, tourSite];
                    } else {
                      $form.tourSites = [
                        ...$form.tourSites.filter(
                          (site) => site.name !== tourSite.name
                        ),
                      ];
                    }
                  }}
                  class="rounded w-4 h-4 {$errors.tourSites &&
                  $errors.tourSites._errors?.length
                    ? 'focus:ring-red-500 ring-2 ring-inset ring-red-500'
                    : 'text-blue-600 focus:ring-blue-500'}"
                />
                <span>{tourSite.name}</span>
              </label>
            </div>
          {/if} -->
        {/each}
      </fieldset>
      {#if $errors.tourSites?._errors?.length}
        <span class="text-xs text-red-500 font-bold"
          >{$errors.tourSites._errors}</span
        >
      {/if}
    {/if}
  </div>

  <div class="grid grid-cols-1 gap-6">
    <div class="mt-5">
      <label
        for="transport"
        class="block text-sm font-medium leading-6 text-gray-900"
        >Transportation</label
      >
      <div class="transportation grid grid-cols-2 sm:grid-cols-3 gap-4 p-4">
        {#if transportations.length > 0}
          {#each transportations as transport, transportId}
            <div class="flex items-center space-x-2">
              <input
                type="checkbox"
                id={transport.name}
                name={transport.name}
                checked={$form.transportation &&
                  $form.transportation[transportId]?.id === transport.id}
                aria-invalid={$errors.tourSites?._errors?.length
                  ? "true"
                  : undefined}
                data-invalid={!$form.transportation[transportId]
                  ? "Transport is required"
                  : ""}
                {disabled}
                on:change={(e) => {
                  if (!e.currentTarget.checked) {
                    $form.transportation = [
                      ...$form.transportation.filter(
                        (item) =>
                          item.id?.toString() !== transport.name.toString()
                      ),
                    ];
                  } else {
                    $form.transportation = [...$form.transportation, transport];
                  }
                }}
                class="form-checkbox {$errors.transportation &&
                $errors.transportation._errors?.length
                  ? 'ring-2 ring-inset ring-red-500'
                  : ''} h-5 w-5 rounded"
              />
              <label
                for={transport.name}
                id={transport.name}
                class="flex items-center"
              >
                {#if transport.name === "Airplane"}
                  <Airplane />
                {:else if transport.name === "Bus"}
                  <Bus />
                {:else}
                  <Car />
                {/if}
                <span class="ml-2 whitespace-pre break-all"
                  >{transport.name}</span
                >
              </label>
            </div>
          {/each}
        {/if}
      </div>
      {#if $errors.transportation && $errors.transportation._errors?.length}<span
          class="text-xs text-red-500 font-bold"
          >{$errors.transportation._errors}</span
        >{/if}
    </div>
    <div class="w-full">
      <label
        for="nrOfPeople"
        class="block text-sm font-medium leading-6 text-gray-900"
        >Number of people including you</label
      >
      <div class="mt-2">
        <input
          type="number"
          name="nrOfPeople"
          id="nrOfPeople"
          aria-invalid={$errors.nrOfPeople ? "true" : undefined}
          bind:value={$form.nrOfPeople}
          {disabled}
          class="btm-input {$errors.nrOfPeople && $errors.nrOfPeople.length
            ? 'btm-input-focus-err'
            : 'btm-input-focus'} sm:text-sm sm:leading-6"
          placeholder="5"
        />
        {#if $errors.nrOfPeople}
          <span class="text-xs text-red-500 font-bold"
            >{$errors.nrOfPeople}</span
          >
        {/if}
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div>
        <label
          for="startDate"
          class="block text-sm font-medium leading-6 text-gray-900"
          >Start Date
        </label>
        <input
          bind:value={$form.startDate}
          {disabled}
          type="date"
          name="startDate"
          class="w-full text-sm focus:outline-none border rounded p-2"
          required
        />
      </div>

      <div>
        <label
          for="endDate"
          class="block text-sm font-medium leading-6 text-gray-900"
          >End Date
        </label>
        <input
          bind:value={$form.endDate}
          {disabled}
          type="date"
          name="endDate"
          class="w-full text-sm focus:outline-none border rounded p-2"
          required
        />
      </div>
    </div>
  </div>
</div>
