<script lang="ts">
  import type { PackageSchema } from "$lib/validations/package";
  import type { SuperFormData } from "sveltekit-superforms/client";
  import Airplane from "../Airplane.svelte";
  import Bus from "../Bus.svelte";
  import Car from "../Car.svelte";

  export let form: SuperFormData<typeof PackageSchema._type>;
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
          disabled={true}
          class="btm-input btm-input-focus !p-[9px] sm:text-sm sm:leading-6"
        >
          <option value={$form.region.name} selected={true}>{$form.region.name}</option>
        </select>
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
          disabled={true}
          class="btm-input btm-input-focus !p-[9px] sm:text-sm sm:leading-6"
        >
          <option value={$form.accommodation.name} selected={true}
            >{$form.accommodation.name}</option
          >
        </select>
      </div>
    </div>
  </div>

  <div class="grid w-full">
    {#if $form.tourSites.length > 0}
      <fieldset class="border border-gray-300 p-4 rounded-lg mt-5">
        <legend class="text-lg font-medium">Tourist Sites</legend>
        {#each $form.tourSites as tourSite, tourSiteId}
          <div class="space-y-2">
            <label class="flex items-center space-x-2">
              <input
                type="checkbox"
                name="site"
                id={tourSite.id}
                checked={$form.tourSites &&
                  $form.tourSites[tourSiteId]?.id === tourSite.id}
                disabled={true}
                class="rounded w-4 h-4 text-blue-600 focus:ring-blue-500"
              />
              <span>{tourSite.name}</span>
            </label>
          </div>
        {/each}
      </fieldset>
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
        {#if $form.transportation.length > 0}
          {#each $form.transportation as transport, transportId}
            <div class="flex items-center space-x-2">
              <input
                type="checkbox"
                id={transport.name}
                name="transport"
                checked={$form.transportation &&
                  $form.transportation[transportId]?.id === transport.id}
                disabled={true}
                class="form-checkbox h-5 w-5 rounded"
              />
              <label for={transport.name} class="flex items-center">
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
    </div>
    <div class="w-full">
      <label
        for="nrOfPeople"
        class="block text-sm font-medium leading-6 text-gray-900"
        >Number of people including you</label
      >
      <div class="mt-2">
        {$form.nrOfPeople}
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
          disabled={true}
          type="date"
          name="startDate"
          class="w-auto text-sm focus:outline-none border rounded p-2"
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
          disabled={true}
          type="date"
          name="endDate"
          class="w-auto text-sm focus:outline-none border rounded p-2"
          required
        />
      </div>
    </div>
  </div>
</div>
