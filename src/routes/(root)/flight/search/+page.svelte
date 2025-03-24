<script lang="ts">
  import { enhance } from "$app/forms";
  import type { FlightsOfferSearchType } from "$lib/utils/flightTypes";
  import Clock from "./components/Clock.svelte";
  import EditIcon from "./components/EditIcon.svelte";
  import FlightIcon from "./components/FlightIcon.svelte";
  import ReturnFlight from "./components/ReturnFlight.svelte";
  import Loading from "$lib/components/Loading.svelte";
  import { redirect } from "@sveltejs/kit";
  import { flightStore } from "../../../../store";
  import { goto } from "$app/navigation";
  import NoFlight from "./components/NoFlight.svelte";
  import { page } from "$app/stores";
  import Airline from "./components/Airline.svelte";
  import Plane from "./components/Plane.svelte";
  import Home from "../book/components/Home.svelte";
  import { onMount } from "svelte";
  import DateIcon from "./components/DateIcon.svelte";
  import Airport from "./components/Airport.svelte";

  let booking: {
    id: string;
    isLoading: boolean;
  } = {
    id: "",
    isLoading: false,
  };

  let totalPassengers: number;
  let origin: string;
  let destination: string;
  let passengers: {
    adults: number;
    children: number;
    infants: number;
  } = { adults: 1, children: 0, infants: 0 };

  export let data;

  const flightTravelPath = (
    segments: [
      {
        departure: { iataCode: string; at: string };
        arrival: { iataCode: string; at: string };
        duration: string;
      },
    ]
  ) => {
    return segments.flatMap(({ arrival, departure }, index, segments) => {
      if (index === segments.length - 1) {
        return [departure.iataCode, arrival.iataCode];
      }
      return [departure.iataCode];
    });
  };

  const travelDuration = (
    segments: [
      {
        departure: { iataCode: string; at: string };
        arrival: { iataCode: string; at: string };
        duration: string;
      },
    ]
  ) => {
    return segments.flatMap(({ arrival, departure }, index, segments) => {
      if (index === segments.length - 1) {
        return [departure.at, arrival.at];
      }
      return [departure.at];
    });
  };

  const checkFlightPriceAndProceed = async (
    flightData: FlightsOfferSearchType & {
      dictionaries?: { carriers: { [x: string]: string } };
    },
    idx: string = ""
  ) => {
    booking.id = idx as string;
    booking.isLoading = true;
    try {
      const form = new FormData();
      form.append("flightData", JSON.stringify(flightData));

      const request = await fetch("/api/flight-price", {
        method: "POST",
        body: form,
      });

      const response = await request.json();

      if (!response.warnings) {
        flightStore.set({
          ...flightData,
          dictionaries: flightData.dictionaries,
        });
        goto("book");
        return;
      }

      booking.id = "";
      booking.isLoading = false;
      return response;
    } catch (err: any) {
      console.log("an error has occured", err);
      return null;
    }
  };

  onMount(() => {
    console.log(window.location.href);
    const url = new URL(window.location.href);
    const urlParams = new URLSearchParams(url.searchParams);

    origin = urlParams.get("origin") as string;
    destination = urlParams.get("destination") as string;

    passengers.adults = urlParams.get("adult")
      ? parseInt(urlParams.get("adult") as string)
      : 1;
    passengers.children = urlParams.get("child")
      ? parseInt(urlParams.get("child") as string)
      : 0;
    passengers.infants = urlParams.get("infant")
      ? parseInt(urlParams.get("infant") as string)
      : 0;

    totalPassengers = [passengers].reduce(
      (sum, { adults, children, infants }) => {
        return sum + adults + children + infants;
      },
      0
    );
  });

  $: console.log("flight", data.data);
</script>

{#if !data.data}
  <div class="w-full pt-40 pb-20">
    <div class="grid items-center justify-center place-items-center gap-3">
      <NoFlight class="w-20 h-20 text-neutral-500" />
      <p class="text-xl font-semibold text-neutral-700">
        No flight(s) to this destination at the moment
      </p>
      <a
        href="/"
        class="flex items-center gap-x-1 bg-neutral-600 rounded-md text-white font-semibold px-3 py-2 transition-all hover:scale-110 ease-in"
      >
        <Home />
        Go back home</a
      >
    </div>
  </div>
{:else if data.data.length > 0}
  <section class="w-full">
    <div class="bg-neutral-100">
      <div class="px-10 py-8">
        <div class="flex gap-x-8 items-center">
          <!-- <button
						class="bg-blue-600 hover:bg-blue-700 text-white rounded px-3 py-2 flex items-center"
					>
						<span class="mr-1">
							<EditIcon />
						</span>
						Edit Search
					</button> -->

          <div class="flex items-center gap-x-2 text-neutral-600">
            <p class="text-lg font-semibold">
              {data.data[0].segments[0].departureLocation}
            </p>
            <FlightIcon class="w-6 h-6" />
            <p class="text-lg font-semibold">
              {data.data[0].segments[0].arrivalLocation}
            </p>
          </div>

          <p class="font-medium">
            {totalPassengers}
            {totalPassengers > 1 ? "Passengers" : "Passenger"}
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Flight Results Page -->
  <section class="px-10 mb-20">
    <div class="my-8">
      <p class="font-semibold">
        Showing {data.data.length}
        {data.data.length > 1 ? "flights" : "flight"}
      </p>
    </div>

    <div class="flight-search-wrapper w-full">
      <ul class="flex flex-col gap-y-8">
        {#each data.data as flights, idx}
          {#if idx === 0 && flights.segments[0]}
            <!-- <li
              class="rounded-md border bg-white flex flex-col md:flex-row relative w-full md:pr-4 hover:drop-shadow-xl transition-all ease-in"
            >
              <div
                class="bg-neutral-600 text-white w-full md:w-fit p-4 h-auto rounded-t-md md:rounded-t-none md:!rounded-l-md flex items-center"
              >
                <p
                  class="w-full md:w-fit md:-rotate-180 h-auto text-center md:[writing-mode:_tb] font-bold"
                >
                  {flights.segments[0] &&
                  flights.segments[0].cabin.toLowerCase().includes("eco")
                    ? "ECONOMY"
                    : flights.segments[0] && flights.segments[0].cabin}
                </p>
              </div>

              <div
                class="p-4 w-full flex-1 flex md:flex-row flex-col items-center"
              >
                <div class="flx justify-between flex-1">
                  <div class="flex-1 flx flex-col justify-between">
                    <div class="grid">
                      <div class="flex justify-between">
                        {#each flights.segments[0].flights as flight, id}
                          <div class="grid flex-1 text-sm">
                            <div class="grid gap-y-1">
                              <div
                                class="flex items-center gap-x-2 text-neutral-600"
                              >
                                <Plane class="w-5 h-5" />
                                <div
                                  class="flex text-neutral-600 text-base font-semibold items-center gap-x-1"
                                >
                                  <p>{flights.segments[0].departureLocation}</p>
                                  <FlightIcon class="w-4 h-4" />
                                  <p>{flights.segments[0].arrivalLocation}</p>
                                </div>
                              </div>

                              <div
                                class="flex items-center gap-x-2 text-neutral-600"
                              >
                                <Clock class="w-5 h-5 text-neutral-600" />
                                <div
                                  class="flexfont-semibold items-center gap-x-1"
                                >
                                  <p>{flights.segments[0].duration}</p>
                                </div>
                              </div>

                              <div
                                class="flex itemscenter gap-x-2 text-neutral-600"
                              >
                                <DateIcon class="w-5 h-5 text-neutral-600" />
                                <div
                                  class="flex items-center gap-x-1 max-w-[180px]"
                                >
                                  <p class="break-words leading-tight">
                                    {new Intl.DateTimeFormat("en-US", {
                                      weekday: "short", // Sat
                                      year: "numeric", // 2024
                                      month: "short",
                                      day: "numeric", // 28
                                      hour: "numeric", // 16 (converted to 12-hour format)
                                      minute: "numeric", // 20
                                      hour12: true, // 12-hour format with AM/PM
                                    }).format(
                                      new Date(
                                        `${flights.segments[0].departureDate}T${flights.segments[0].departureTime}:00`
                                      )
                                    )}
                                  </p>
                                </div>
                              </div>

                              <div
                                class="flex items-center gap-x-2 text-neutral-600"
                              >
                                <Airport class="w-5 h-5 text-neutral-600" />
                                <div
                                  class="flex items-center gap-x-1 max-w-[180px]"
                                >
                                  <p class="break-words leading-tight">
                                    {flight.departureAirportName}
                                  </p>
                                </div>
                              </div>

                              <div
                                class="flex items-center gap-x-2 text-neutral-600"
                              >
                                <Airline class="w-5 h-5 text-neutral-600" />
                                <div
                                  class="flex items-center gap-x-1 max-w-[180px]"
                                >
                                  <span class="flex w-7 h-7 relative">
                                    <img
                                      src={flight.carrierIcon}
                                      alt={flight.carrierName}
                                      class="w-full h-full absolute object-contain"
                                    />
                                  </span>
                                  <p class="break-words leading-tight">
                                    {flight.carrierName}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        {/each}
                      </div>
                    </div>
                  </div>
                </div>

                <div class="flx justify-between flex-1">
                  {#if flights.segments.length === 2}
                    <div class="flex-1 flex flex-col justify-between">
                      <div class="grid">
                        <div class="flex justify-between">
                          {#each flights.segments[1].flights as flight, id}
                            <div class="grid flex-1 text-sm">
                              <div class="grid gap-y-1">
                                <div
                                  class="flex items-center gap-x-2 text-neutral-600"
                                >
                                  <Plane class="w-5 h-5" />
                                  <div
                                    class="flex text-neutral-600 text-base font-semibold items-center gap-x-1"
                                  >
                                    <p>{flight.departureLocation}</p>
                                    <FlightIcon class="w-4 h-4" />
                                    <p>{flight.arrivalLocation}</p>
                                  </div>
                                </div>

                                <div
                                  class="flex items-center gap-x-2 text-neutral-600"
                                >
                                  <Clock class="w-5 h-5 text-neutral-600" />
                                  <div
                                    class="flexfont-semibold items-center gap-x-1"
                                  >
                                    <p>{flights.segments[1].duration}</p>
                                  </div>
                                </div>

                                <div
                                  class="flex items-center gap-x-2 text-neutral-600"
                                >
                                  <DateIcon class="w-5 h-5 text-neutral-600" />
                                  <div
                                    class="flex items-center gap-x-1 max-w-[180px]"
                                  >
                                    <p class="break-words leading-tight">
                                      {new Intl.DateTimeFormat("en-US", {
                                        weekday: "short", // Sat
                                        year: "numeric", // 2024
                                        month: "short",
                                        day: "numeric", // 28
                                        hour: "numeric", // 16 (converted to 12-hour format)
                                        minute: "numeric", // 20
                                        hour12: true, // 12-hour format with AM/PM
                                      }).format(
                                        new Date(
                                          `${flights.segments[1].departureDate}T${flights.segments[1].departureTime}:00`
                                        )
                                      )}
                                    </p>
                                  </div>
                                </div>

                                <div
                                  class="flex items-start gap-x-2 text-neutral-600"
                                >
                                  <Airport class="w-5 h-5 text-neutral-600" />
                                  <div
                                    class="flex items-center gap-x-1 max-w-[180px]"
                                  >
                                    <p class="break-words leading-tight">
                                      {flight.departureAirportName}
                                    </p>
                                  </div>
                                </div>

                                <div
                                  class="flex items-center gap-x-2 text-neutral-600"
                                >
                                  <Airline class="w-5 h-5 text-neutral-600" />
                                  <div
                                    class="flex items-center gap-x-1 max-w-[180px]"
                                  >
                                    <span class="flex w-7 h-7 relative">
                                      <img
                                        src={flight.carrierIcon}
                                        alt={flight.carrierName}
                                        class="w-full h-full absolute object-contain"
                                      />
                                    </span>
                                    <p class="break-words leading-tight">
                                      {flight.carrierName}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          {/each}
                        </div>
                      </div>
                    </div>
                  {/if}
                </div>
                <div class="sm:col-span-2 md:flex flex-col items-end">
                  <div class="price w-full md:w-fit flex justify-end mb-2">
                    <p
                      class="w-fit md:w-full border border-neutral-500 text-neutral-500 px-4 rounded-full font-bold"
                    >
                      {flights.formatedTotalAmount.replace(/\.\d+$/, "")}
                      {flights.currency}
                    </p>
                  </div>
                  <div
                    class="price w-full md:w-fit flex justify-end md:justify-normal"
                  >
                    <button
                      type="submit"
                      disabled={booking.isLoading}
                      class="{booking.isLoading
                        ? 'opacity-50 items-center'
                        : ''} px-4 py-2 rounded w-fit md:w-full border flex text-white bg-blue-600 font-semibold hover:bg-blue-700 transition-all ease-in"
                    >
                      {#if booking.isLoading && booking.id}
                        Please wait...
                        <Loading class="w-5 h-5 ml-2" />
                      {:else}
                        Book
                      {/if}
                    </button>
                  </div>
                </div>
              </div>
            </li> -->

            <li
              class="rounded-md border bg-white flex flex-col md:flex-row relative w-full md:pr-4 hover:drop-shadow-xl transition-all ease-in"
            >
              <div
                class="bg-neutral-600 text-white w-full md:w-fit p-4 h-auto rounded-t-md md:rounded-t-none md:!rounded-l-md flex items-center"
              >
                <p
                  class="w-full md:w-fit md:-rotate-180 h-auto text-center md:[writing-mode:_tb] font-bold"
                >
                  {flights.segments[0].cabin.toLowerCase().includes("eco")
                    ? "ECONOMY"
                    : flights.segments[0].cabin}
                </p>
              </div>
              <div class="flight-details-container p-4 w-full flex-1">
                <div
                  class="flight-details-wrapper {flights.segments[idx]
                    ? 'flex'
                    : ''} w-full md:border-r"
                >
                  {#each flights.segments as segment, segmentID}
                    <div class="flight-details flex w-full">
                      {#each segment.flights as flight, flightID}
                        <div class="w-full grid flex-1">
							{#if segmentID === 0}
                            <p class="border border-neutral-600 rounded-full px-2 text-sm font-semibold text-neutral-700 w-fit mb-2">Depart</p>
                          {:else if segmentID >= 1}
                            <p class="border border-neutral-600 rounded-full px-2 text-sm font-semibold text-neutral-700 w-fit mb-2">Return</p>
                          {/if}
                          <div
                            class="flex items-center gap-x-2 text-neutral-600 font-semibold"
                          >
                            <Plane class="w-5 h-5" />

                            <div class="flex items-center gap-x-1">
                              <p>{flight.departureLocation}</p>
                              <FlightIcon class="w-4 h-4" />
                              <p>{flight.arrivalLocation}</p>
                            </div>
                          </div>

                          <div
                            class="flex items-center gap-x-2 text-neutral-600"
                          >
                            <Clock class="w-5 h-5 text-neutral-600" />
                            <div class="flexfont-semibold items-center gap-x-1">
                              <p>{segment.duration}</p>
                            </div>
                          </div>

                          <div
                            class="flex itemscenter gap-x-2 text-neutral-600"
                          >
                            <DateIcon class="w-5 h-5 text-neutral-600" />
                            <div
                              class="flex items-center gap-x-1 max-w-[180px]"
                            >
                              <p class="break-words leading-tight">
                                {new Intl.DateTimeFormat("en-US", {
                                  weekday: "short",
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                  hour: "numeric",
                                  minute: "numeric",
                                  hour12: true,
                                }).format(
                                  new Date(
                                    `${flight.departureDate}T${flight.departureTime}:00`
                                  )
                                )}
                              </p>
                            </div>
                          </div>

                          <div
                            class="flex items-center gap-x-2 text-neutral-600"
                          >
                            <Airport class="w-5 h-5 text-neutral-600" />
                            <div
                              class="flex items-center gap-x-1 max-w-[180px]"
                            >
                              <p class="break-words leading-tight">
                                {flight.departureAirportName}
                              </p>
                            </div>
                          </div>

                          <div
                            class="flex items-center gap-x-2 text-neutral-600"
                          >
                            <Airline class="w-5 h-5 text-neutral-600" />
                            <div
                              class="flex items-center gap-x-1 max-w-[180px]"
                            >
                              <span class="flex w-7 h-7 relative">
                                <img
                                  src={flight.carrierIcon}
                                  alt={flight.carrierName}
                                  class="w-full h-full absolute object-contain"
                                />
                              </span>
                              <p class="break-words leading-tight">
                                {flight.carrierName}
                              </p>
                            </div>
                          </div>
                        </div>
                      {/each}
                    </div>
                    {#if segment.numberOfStops > 0 && segmentID !== segment.flights.length - 1}
                      <div class="flex justify-center my-8 font-semibold">
                        <p class="bg-neutral-600 text-white rounded-full px-3">
                          {segment.numberOfStops}
                          {segment.numberOfStops > 1 ? "Stopovers" : "Stopver"}
                        </p>
                      </div>
                    {/if}
                  {/each}
                </div>
              </div>

              <div class="flex flex-col items-end justify-center p-4 md:p-0">
                <div class="price w-full md:w-fit flex justify-end mb-2">
                  <p
                    class="w-fit md:w-full border border-neutral-500 text-neutral-500 px-4 rounded-full font-bold"
                  >
                    {flights.formatedTotalAmount.replace(/\.\d+$/, "")}
                    {flights.currency}
                  </p>
                </div>
                <div
                  class="flightBtn w-full md:w-fit flex justify-end md:justify-normal"
                >
                  <button
                    type="submit"
                    disabled={booking.isLoading}
                    class="{booking.isLoading
                      ? 'opacity-50 items-center'
                      : ''} px-4 py-2 rounded w-fit md:w-full border flex text-white bg-blue-600 font-semibold hover:bg-blue-700 transition-all ease-in"
                  >
                    {#if booking.isLoading && booking.id}
                      Please wait...
                      <Loading class="w-5 h-5 ml-2" />
                    {:else}
                      Book
                    {/if}
                  </button>
                </div>
              </div>
            </li>
          {:else}
            <li
              class="rounded-md border bg-white flex flex-col md:flex-row relative w-full md:pr-4 hover:drop-shadow-xl transition-all ease-in"
            >
              <div
                class="bg-neutral-600 text-white w-full md:w-fit p-4 h-auto rounded-t-md md:rounded-t-none md:!rounded-l-md flex items-center"
              >
                <p
                  class="w-full md:w-fit md:-rotate-180 h-auto text-center md:[writing-mode:_tb] font-bold"
                >
                  {flights.segments[0].cabin.toLowerCase().includes("eco")
                    ? "ECONOMY"
                    : flights.segments[0].cabin}
                </p>
              </div>

              <div class="flight-details-container p-4 w-full flex-1">
                <div
                  class="flight-details-wrapper {flights.segments[idx]
                    ? 'flex'
                    : ''} w-full md:border-r"
                >
                  {#each flights.segments as segment, segmentID}
                    <div class="flight-details flex w-full">
                      {#each segment.flights as flight, flightID}
                        <div class="w-full grid flex-1">
                          {#if segmentID === 0}
                            <p class="border border-neutral-600 rounded-full px-2 text-sm font-semibold text-neutral-700 w-fit mb-2">Depart</p>
                          {:else if segmentID >= 1}
                            <p class="border border-neutral-600 rounded-full px-2 text-sm font-semibold text-neutral-700 w-fit mb-2">Return</p>
                          {/if}

                          <div
                            class="flex items-center gap-x-2 text-neutral-600 font-semibold"
                          >
                            <Plane class="w-5 h-5" />

                            <div class="flex items-center gap-x-1">
                              <p>{flight.departureLocation}</p>
                              <FlightIcon class="w-4 h-4" />
                              <p>{flight.arrivalLocation}</p>
                            </div>
                          </div>

                          <div
                            class="flex items-center gap-x-2 text-neutral-600"
                          >
                            <Clock class="w-5 h-5 text-neutral-600" />
                            <div class="flexfont-semibold items-center gap-x-1">
                              <p>{segment.duration}</p>
                            </div>
                          </div>

                          <div
                            class="flex itemscenter gap-x-2 text-neutral-600"
                          >
                            <DateIcon class="w-5 h-5 text-neutral-600" />
                            <div
                              class="flex items-center gap-x-1 max-w-[180px]"
                            >
                              <p class="break-words leading-tight">
                                {new Intl.DateTimeFormat("en-US", {
                                  weekday: "short",
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                  hour: "numeric",
                                  minute: "numeric",
                                  hour12: true,
                                }).format(
                                  new Date(
                                    `${flight.departureDate}T${flight.departureTime}:00`
                                  )
                                )}
                              </p>
                            </div>
                          </div>

                          <div
                            class="flex items-center gap-x-2 text-neutral-600"
                          >
                            <Airport class="w-5 h-5 text-neutral-600" />
                            <div
                              class="flex items-center gap-x-1 max-w-[180px]"
                            >
                              <p class="break-words leading-tight">
                                {flight.departureAirportName}
                              </p>
                            </div>
                          </div>

                          <div
                            class="flex items-center gap-x-2 text-neutral-600"
                          >
                            <Airline class="w-5 h-5 text-neutral-600" />
                            <div
                              class="flex items-center gap-x-1 max-w-[180px]"
                            >
                              <span class="flex w-7 h-7 relative">
                                <img
                                  src={flight.carrierIcon}
                                  alt={flight.carrierName}
                                  class="w-full h-full absolute object-contain"
                                />
                              </span>
                              <p class="break-words leading-tight">
                                {flight.carrierName}
                              </p>
                            </div>
                          </div>
                        </div>
                      {/each}
                    </div>
                    {#if segment.numberOfStops > 0 && segmentID !== segment.flights.length - 1}
                      <div class="flex justify-center my-8 font-semibold">
                        <p class="bg-neutral-600 text-white rounded-full px-3">
                          {segment.numberOfStops}
                          {segment.numberOfStops > 1 ? "Stopovers" : "Stopver"}
                        </p>
                      </div>
                    {/if}
                  {/each}
                </div>
              </div>

              <div class="flex flex-col items-end justify-center p-4 md:p-0">
                <div class="price w-full md:w-fit flex justify-end mb-2">
                  <p
                    class="w-fit md:w-full border border-neutral-500 text-neutral-500 px-4 rounded-full font-bold"
                  >
                    {flights.formatedTotalAmount.replace(/\.\d+$/, "")}
                    {flights.currency}
                  </p>
                </div>
                <div
                  class="flightBtn w-full md:w-fit flex justify-end md:justify-normal"
                >
                  <button
                    type="submit"
                    disabled={booking.isLoading}
                    class="{booking.isLoading
                      ? 'opacity-50 items-center'
                      : ''} px-4 py-2 rounded w-fit md:w-full border flex text-white bg-blue-600 font-semibold hover:bg-blue-700 transition-all ease-in"
                  >
                    {#if booking.isLoading && booking.id}
                      Please wait...
                      <Loading class="w-5 h-5 ml-2" />
                    {:else}
                      Book
                    {/if}
                  </button>
                </div>
              </div>
            </li>
          {/if}
        {/each}
      </ul>
    </div>
  </section>
{:else}
  <section class="w-full px-10 border-b pb-20">
    <div
      class="error grid gap-5 items-center justify-center place-items-center pt-32 text-neutral-500"
    >
      <NoFlight class="w-24 h-24" />
      <p class="text-3xl font-bold">
        {data.data.length <= 0 ? data.error : ""}
      </p>
      <button
        type="button"
        on:click={() => {
          location.reload();
        }}
        class="bg-neutral-600 rounded-md text-white font-semibold px-3 py-2 transition-all hover:scale-110 ease-in"
        >Try Again</button
      >
    </div>
  </section>
{/if}
