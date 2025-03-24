<script lang="ts">
  import ArrowDown from "$lib/components/ArrowDown.svelte";
  import { flightSearchSchema } from "$lib/validation";
  import { superForm } from "sveltekit-superforms";
  import { zod } from "sveltekit-superforms/adapters";
  import OutboundFlight from "./icons/OutboundFlight.svelte";
  import Person from "./icons/Person.svelte";
  import ReturnFlight from "./icons/ReturnFlight.svelte";
  import type { PageData } from "../$types";
  import DoubleArrow from "./icons/DoubleArrow.svelte";
  import FlightClass from "./icons/FlightClass.svelte";
  import Airport from "./icons/Airport.svelte";
  import Loading from "./Loading.svelte";
  import { onDestroy, onMount } from "svelte";

  export let data: PageData;

  const { form } = superForm(data.form, {
    customValidity: true,
    validators: zod(flightSearchSchema),
    taintedMessage: null,
  });

  // obt flight options
  let displayPassengerDialog: boolean = false;

  let autocompleteTimeoutHandle = 0;

  // origin search results
  let from: string;
  let isOriginLoading: boolean = false;
  let showOriginResults: boolean = false;
  let originError: string;
  let originResults:
    | Array<{
        id: string;
        city: string;
        continent: string;
        country: string;
        country_code: string;
        name: string;
        state: string;
        type: string;
        iata: string;
      }>
    | [] = [];

  // destination search results
  let to: string;
  let isDestinationLoading: boolean = false;
  let showDestinationResults: boolean = false;
  let destinationError: string;
  let destinationResults:
    | Array<{
        id: string;
        city: string;
        continent: string;
        country: string;
        country_code: string;
        name: string;
        state: string;
        type: string;
        iata: string;
      }>
    | [] = [];

  // flight search auto-complete
  const autocomplete = ({
    origin,
    destination,
  }: {
    origin?: string;
    destination?: string;
  }) => {
    if (autocompleteTimeoutHandle) clearTimeout(autocompleteTimeoutHandle);
    autocompleteTimeoutHandle = setTimeout(async () => {
      try {
        if (origin && origin.length > 0) {
          const payload = new FormData();

          payload.append("location", origin);

          const response = await fetch(
            `https://btm-live.onrender.com/api/flights/iata-codes/${origin}`
          );

          const data = await response.json();
          originResults = data.length > 0 ? data : [];

          if (!originResults.length) {
            isOriginLoading = false;
            showOriginResults = true;
            originError = "No result found. Try another keyword";
            return;
          }

          isOriginLoading = false;

          showOriginResults = originResults.length > 0;
          originError = "";
        }

        if (destination && destination.length > 0) {
          const payload = new FormData();

          payload.append("location", destination);

          const response = await fetch(
            `https://btm-live.onrender.com/api/flights/iata-codes/${destination}`
          );

          const data = await response.json();
          destinationResults = data.length > 0 ? data : [];

          if (!destinationResults.length) {
            isDestinationLoading = false;
            showDestinationResults = true;
            destinationError = "No result found. Try another keyword";
            return;
          }

          isDestinationLoading = false;

          showDestinationResults = destinationResults.length > 0;
          destinationError = "";
        }

        isOriginLoading = false;
        isDestinationLoading = false;
      } catch (error) {
        console.error(error);
      }
    }, 1500);
  };

  // click outside handler
  function handleClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    if (!target.closest(".origin")) {
      showOriginResults = false;
    }

    if (!target.closest(".destination")) {
      showDestinationResults = false;
    }

    if (!target.closest(".flight-passengers")) displayPassengerDialog = false;
  }

  // handle flight search
  function handleFlightSearch(data: typeof $form) {
    console.log("dfghjhgf", data);
    const url = new URL("/flight/search", window.location.origin);
    url.searchParams.append("origin", data.origin);
    url.searchParams.append("destination", data.destination);
    url.searchParams.append("departure", data.departure);
    data.flightType === "roundTrip" && data.return
      ? url.searchParams.append("return", data.return)
      : undefined;
    url.searchParams.append("adult", `${data.adult}`);
    url.searchParams.append("child", `${data.child}`);
    url.searchParams.append("infant", `${data.infant}`);
    url.searchParams.append("travelClass", data.travelClass);

    window.open(url.toString(), "_blank");
  }

  onMount(() => {
    window.document.addEventListener("click", handleClickOutside);
  });

  onDestroy(() => {
    if (typeof window !== "undefined")
      window.document.removeEventListener("click", handleClickOutside);
  });
</script>

<section
  class="grid relative -top-[70px] sm:-top-[130px] md:-top-[100px] min-h-[300px] mb-[-40px] sm:mb-[-70px]"
>
  <div class="w-full px-4 relative">
    <!-- OBT -->
    <div
      class="obt w-full max-w-[100%] sm:w-11/12 md:w-10/12 lg:w-8/12 mx-auto py-4 flex flex-col bg-white relative rounded shadow-lg px-6"
      id="obt"
    >
      <div class="mx-auto flex-1 bg-white w-full">
        <form
          on:submit|preventDefault={(e) => {
            localStorage.setItem("flightDetails", JSON.stringify($form));
            handleFlightSearch($form);
          }}
          on:input={(e) => {
            localStorage.removeItem("flightDetails");
          }}
          method="post"
          class="w-full text-neutral-800 py-3 rounded-md grid"
        >
          <div class="flex flex-wrap gap-2 md:max-w-md flight-type">
            <!-- flight type -->
            <div
              class="flightt flex-1 max-w-fit flex items-center border-b-[3px] border-blue-500 hover:bg-blue-100/70 cursor-pointer transition-all ease-in p-1 h-auto"
            >
              <DoubleArrow class="w-5 h-5" />
              <select
                on:input={(e) => {
                  $form.flightType = e.currentTarget.value;
                }}
                name="flightType"
                id="flightType"
                class="bg-transparent focus:outline-none w-fit max-w-[-webkit-fill-available] text-xs sm:text-sm"
              >
                <option value="roundTrip">ROUND TRIP</option>
                <option value="oneWay">ONE WAY</option>
              </select>
            </div>

            <div
              class="flight-passengers border-b-[3px] border-blue-500 hover:bg-blue-100/70 cursor-pointer transition-all ease-in relative w-full max-w-fit h-auto grid"
            >
              <button
                type="button"
                on:click={(e) => {
                  displayPassengerDialog = !displayPassengerDialog;
                }}
                class="flex items-center justify-center gap-x-1 relative px-1"
              >
                <span class="flex items-center gap-x-1">
                  <Person class="w-5 h-5" />
                  {$form.adult + $form.child + $form.infant}
                </span>
                <ArrowDown class="w-4 h-4" />
              </button>

              {#if displayPassengerDialog}
                <div
                  class="absolute border right-[-90px] bg-white shadow-xl top-[30px] w-[240px] max-w-lg z-[99]"
                >
                  <div class="flex flex-col gap-y-4 p-3 w-full">
                    <div
                      class="w-full flex items-center justify-between gap-x-8"
                    >
                      <div class="w-full">
                        <p class="font-semibold">Adult</p>
                        <p class="text-sm">Over 11</p>
                      </div>
                      <div class="flex-1 flex items-center w-full">
                        <button
                          disabled={$form.adult === 1}
                          type="button"
                          on:click={(e) => {
                            if ($form.adult === 1) {
                              return;
                            }
                            $form.adult -= 1;
                          }}
                          class="{$form.adult > 1
                            ? 'bg-slate-300'
                            : 'bg-slate-200'} rounded px-3">-</button
                        >
                        <span class="mx-2 text-sm">{$form.adult}</span>
                        <button
                          type="button"
                          on:click={(e) => {
                            $form.adult += 1;
                          }}
                          class="bg-slate-300 rounded px-3">+</button
                        >
                      </div>
                    </div>

                    <div
                      class="w-full flex items-center justify-between gap-x-8"
                    >
                      <div class="w-full">
                        <p class="font-semibold">Child</p>
                        <p class="text-sm">2-11</p>
                      </div>
                      <div class="flex-1 flex items-center w-full">
                        <button
                          disabled={$form.child === 0}
                          type="button"
                          on:click={(e) => {
                            if ($form.child === 0) {
                              return;
                            }
                            $form.child -= 0;
                          }}
                          class="{$form.child > 0
                            ? 'bg-slate-300'
                            : 'bg-slate-200'} rounded px-3">-</button
                        >
                        <span class="mx-2 text-sm">{$form.child}</span>
                        <button
                          type="button"
                          on:click={(e) => {
                            $form.child += 1;
                          }}
                          class="bg-slate-300 rounded px-3">+</button
                        >
                      </div>
                    </div>

                    <div
                      class="w-full flex items-center justify-between gap-x-8"
                    >
                      <div class="w-full">
                        <p class="font-semibold">Infant</p>
                        <p class="text-sm">Under 2</p>
                      </div>
                      <div class="flex-1 flex items-center w-full">
                        <button
                          disabled={$form.infant === 0}
                          type="button"
                          on:click={(e) => {
                            if ($form.infant === 0) {
                              return;
                            }
                            $form.infant -= 1;
                          }}
                          class="{$form.infant > 0
                            ? 'bg-slate-300'
                            : 'bg-slate-200'} rounded px-3">-</button
                        >
                        <span class="mx-2 text-sm">{$form.infant}</span>
                        <button
                          type="button"
                          on:click={(e) => {
                            $form.infant += 1;
                          }}
                          class="bg-slate-300 rounded px-3">+</button
                        >
                      </div>
                    </div>

                    <div class="flex justify-end gap-x-6 mb-4">
                      <button
                        type="button"
                        on:click={(e) => {
                          displayPassengerDialog = false;
                        }}
                        class="btn-primary !bg-neutral-300 !border-neutral-500 !text-neutral-700"
                        >Cancel</button
                      >
                      <button
                        type="button"
                        on:click={(e) => {
                          displayPassengerDialog = false;
                        }}
                        class="btn-primary">Done</button
                      >
                    </div>
                  </div>
                </div>
              {/if}
            </div>

            <div
              class="flight-class flex-1 flex items-center border-b-[3px] border-blue-500 hover:bg-blue-100/70 cursor-pointer transition-all ease-in p-1 h-auto max-w-fit"
            >
              <FlightClass class="w-5 h-5" />
              <select
                name="flightClass"
                id="flightClass"
                on:input={(e) => {
                  $form.travelClass = e.currentTarget.value;
                }}
                class="max-w-fit bg-transparent focus:outline-none w-fit text-xs sm:text-sm"
              >
                <option value="ECONOMY">ECONOMY</option>
                <option value="BUSINESS">BUSINESS</option>
                <option value="PREMIUM_ECONOMY">PREMIUM ECONOMY</option>
                <option value="FIRST_CLASS">FIRST CLASS</option>
              </select>
            </div>
          </div>

          <div
            class="w-full block md:flex items-start justify-between gap-x-10 mt-5 lg:mb-5 flex-1"
          >
            <!-- location -->
            <div class="locations w-full flex items-start gap-x- my-4 md:my-0">
              <div class="w-full relative">
                <div class="border py-1 pt-2">
                  <div class="w-full px-3 origin">
                    <label
                      for="from"
                      class="text-xs sm:text-sm flex items-center gap-x-1 font-semibold text-neutral-500"
                    >
                      <OutboundFlight class="w-4 h-4" />
                      Origin
                    </label>
                    <input
                      bind:value={from}
                      on:input={(e) => {
                        isOriginLoading = true;
                        autocomplete({
                          origin: e.currentTarget.value,
                        });
                      }}
                      on:focus={() => {
                        showOriginResults = originResults.length > 0;
                      }}
                      name="origin"
                      type="text"
                      placeholder="From?"
                      class="outline-none peer block w-full focus:ring-0 sm:text-sm sm:leading-6"
                      required
                    />
                  </div>
                </div>
                {#if isOriginLoading}
                  <div
                    class="py-4 bg-white w-full shadow-md rounded-b-md {isOriginLoading
                      ? 'absolute top-[58px] z-[55] h-auto'
                      : ''}"
                  >
                    <Loading class="w-8 h-8 mx-auto" />
                  </div>
                {:else if originError && originError.length > 0}
                  <div
                    class="text-sm p-4 bg-white w-full shadow-md rounded-b-md {originError.length
                      ? ' absolute top-[58px] z-[55] h-auto flex justify-center'
                      : ''}"
                  >
                    <p>
                      {originError}
                    </p>
                  </div>
                {:else if originResults.length > 0 && showOriginResults}
                  <div
                    class="w-full grid bg-white shadow-md max-h-[150px] overflow-auto rounded-b-md {originResults.length
                      ? ' absolute top-[58px] z-[55] h-auto'
                      : ''}"
                  >
                    <ul class="flex flex-col">
                      {#each originResults as origin}
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                        <li
                          on:click={(e) => {
                            from = origin.city;
                            $form.origin = origin.iata;
                          }}
                          class="text-sm px-2 py-3 hover:bg-neutral-100 cursor-pointer flex items-start gap-2"
                        >
                          <Airport class="w-6 h-6" />
                          <p class="flex-1">{origin.name}</p>
                        </li>
                      {/each}
                    </ul>
                  </div>
                {/if}
                <!-- {/if} -->
              </div>

              <div class="w-full relative">
                <div class="border py-1 pt-2">
                  <div class="w-full px-3 destination">
                    <label
                      for="destination"
                      class="text-xs sm:text-sm flex items-center gap-x-1 font-semibold text-neutral-500"
                    >
                      <ReturnFlight class="w-4 h-4" />
                      Destination
                    </label>
                    <input
                      bind:value={to}
                      on:input={(e) => {
                        isDestinationLoading = true;
                        autocomplete({
                          destination: e.currentTarget.value,
                        });
                      }}
                      on:focus={() => {
                        showDestinationResults = destinationResults.length > 0;
                      }}
                      type="text"
                      placeholder="Where to?"
                      class="w-full focus:outline-none"
                      required
                    />
                  </div>
                </div>
                {#if isDestinationLoading}
                  <div
                    class="py-4 bg-white w-full shadow-md rounded-b-md {isDestinationLoading
                      ? 'absolute top-[58px] z-[55] h-auto'
                      : ''}"
                  >
                    <Loading class="w-8 h-8 mx-auto" />
                  </div>
                {:else if destinationError && destinationError.length > 0}
                  <div
                    class="text-sm p-4 bg-white w-full shadow-md rounded-b-md {destinationError.length
                      ? ' absolute top-[58px] z-[55] h-auto flex justify-center'
                      : ''}"
                  >
                    <p>
                      {destinationError}
                    </p>
                  </div>
                {:else if destinationResults.length > 0 && showDestinationResults}
                  <div
                    class="w-full grid bg-white shadow-md max-h-[150px] overflow-auto rounded-b-md {destinationResults.length
                      ? ' absolute top-[58px] z-[55] h-auto'
                      : ''}"
                  >
                    <ul class="flex flex-col">
                      {#each destinationResults as destination}
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                        <li
                          on:click={(e) => {
                            to = destination.city;
                            $form.destination = destination.iata;
                          }}
                          class="text-sm px-2 py-3 hover:bg-neutral-100 cursor-pointer flex items-start gap-2"
                        >
                          <Airport class="w-6 h-6" />
                          <p class="flex-1">{destination.name}</p>
                        </li>
                      {/each}
                    </ul>
                  </div>
                {/if}
              </div>
            </div>

            <!-- Dates -->
            <div class="flex flex-col items-start justify-center">
              <div class="flight-dates w-full flex items-center border rounded">
                <div class="departure w-full border-r">
                  <div class="px-3 py-1 grid">
                    <label
                      for="departure"
                      class="text-xs sm:text-sm w-full font-semibold"
                      >Departure</label
                    >
                    <input
                      on:input={(e) => {
                        $form.departure = e.currentTarget.value;
                      }}
                      type="date"
                      name="departure"
                      pattern="\d{2}\/\d{2}\/\d{4}"
                      placeholder="DD/MM/YYYY"
                      id="id7541838709"
                      min={new Date().toISOString().split("T")[0]}
                      aria-label="Return"
                      aria-invalid="true"
                      aria-describedby="id7541838709-error"
                      class="w-full text-sm focus:outline-none"
                      required
                    />
                  </div>
                </div>

                {#if $form.flightType === "roundTrip"}
                  <div class="return w-full border-l">
                    <div class="px-3 py-1 grid">
                      <label
                        for="return"
                        class="text-xs sm:text-sm w-full font-semibold"
                        >Return</label
                      >
                      <input
                        on:input={(e) => {
                          $form.return = e.currentTarget.value;
                        }}
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                        name="return"
                        class="w-full text-sm focus:outline-none"
                      />
                    </div>
                  </div>
                {/if}
              </div>
            </div>
          </div>

          <div class="submit mx-auto sm:mx-0 sm:flex justify-end mt-6 lg:mt-0">
            <button class="btn-primary"> Search </button>
          </div>
        </form>
      </div>
    </div>
    <!-- End OBT -->
  </div>
</section>

<style lang="postcss">
  @media (max-width: 420px) {
    .flight-dates {
      display: grid;
      @apply my-5;
    }

    .departure {
      border-right: 0px;
      padding-top: 5px;
      padding-bottom: 5px;
      margin: 0;
      @apply border-b;
    }

    .return {
      border-left: 0px;
      padding-top: 5px;
      padding-bottom: 5px;
      margin: 0;
      @apply border-t;
    }

    .locations {
      @apply mt-4 gap-y-4;
    }

    .flight-type {
      @apply flex flex-wrap;
    }
  }
</style>
