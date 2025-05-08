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
  import { acts, Notifications } from "@tadashi/svelte-notification";
  import Select from "./OBT/Select.svelte";
  import Add from "./icons/Add.svelte";
  import Remove from "./icons/Remove.svelte";
  import Button from "$lib/components/Button.svelte";

  export let data: PageData;

  const { form, errors } = superForm(data.form, {
    customValidity: true,
    scrollToError: true,
    validators: zod(flightSearchSchema),
    taintedMessage: null,
  });

  // obt flight options
  let displayPassengerDialog: boolean = false;

  let autocompleteTimeoutHandle: NodeJS.Timeout;

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
    $form.departure = new Date().toISOString().split("T")[0];
  });

  onMount(() => {
    window.document.addEventListener("click", handleClickOutside);
  });

  onDestroy(() => {
    if (typeof window !== "undefined")
      window.document.removeEventListener("click", handleClickOutside);
  });
</script>

<div
  class="obt-container grid relative -top-[70px] sm:-top-[130px] md:-top-[100px] min-h-[300px] mb-[-40px] sm:mb-[-70px]"
>
  <div class="w-full px-4 relative">
    <!-- OBT -->
    <div
      class="obt w-full max-w-[100%] sm:w-11/12 md:w-10/12 lg:w-8/12 mx-auto py-4 flex flex-col bg-white relative rounded shadow-lg px-6"
      id="obt"
    >
      <form>
        <div class="flight-itinerary grid">
          <div class="grid gap-9 w-full text-neutral-500">
            <div class="grid sm:grid-cols-[130px_1fr_1fr] gap-9">
              <div class="grid w-full peer">
                <label
                  for="fare"
                  class="w-full block text-sm hover:ring-1 transition-all ease-in duration-150 rounded-sm group"
                >
                  <span
                    class="p-1 group-focus-within:text-blue-500 group-focus-within:font-semibold transition-all duration-150 will-change-[font-weight,color]"
                    >Fare</span
                  >
                  <Select
                    bind:value={$form.flightType}
                    onInput={(e) => {
                      $form.flightType = e.currentTarget.value;
                    }}
                    name="fare"
                    id="fare"
                    options={[
                      { value: "roundTrip", text: "ROUND TRIP" },
                      { value: "oneWay", text: "One Way" },
                    ]}
                  />
                </label>
              </div>

              <div class="grid w-full peer">
                <label
                  for="origin"
                  class="w-full block text-sm hover:ring-1 transition-all ease-in duration-150 rounded-sm group"
                >
                  <span
                    class="p-1 group-focus-within:text-blue-500 group-focus-within:font-semibold transition-all duration-150 will-change-[font-weight,color]"
                    >Origin</span
                  >
                  <input
                    type="text"
                    name="origin"
                    id="origin"
                    class="w-full border-b-2 border-blue-500 px-2 pb-1 outline-none peer-focus:ring-1 focus:ring-blue-500 text-gray-900 rounded-none bg-white"
                    placeholder="From?"
                  />
                </label>
              </div>

              <div class="grid w-full peer">
                <label
                  for="arrival"
                  class="w-full block text-sm hover:ring-1 transition-all ease-in duration-150 rounded-sm group"
                >
                  <span
                    class="p-1 group-focus-within:text-blue-500 group-focus-within:font-semibold transition-all duration-150 will-change-[font-weight,color]"
                    >Destination</span
                  >
                  <input
                    type="text"
                    name="arrival"
                    class="w-full border-b-2 border-blue-500 px-2 pb-1 outline-none peer-focus:ring-1 focus:ring-blue-500 text-gray-900 rounded-none bg-white"
                    placeholder="Where to?"
                  />
                </label>
              </div>
            </div>

            <div
              class="grid {$form.flightType === 'roundTrip'
                ? 'sm:grid-cols-4'
                : 'sm:grid-cols-3'} gap-9"
            >
              <div class="grid w-full peer">
                <label
                  for="departure"
                  class="w-full grid text-sm hover:ring-1 transition-all ease-in duration-150 rounded-sm group border-b-2 border-blue-500"
                >
                  <p
                    class="p-1 group-focus-within:text-blue-500 group-focus-within:font-semibold transition-all duration-150 will-change-[font-weight,color]"
                  >
                    Departure
                  </p>
                  <input
                    bind:value={$form.departure}
                    type="date"
                    name="departure"
                    id="departure"
                    pattern="\d{2}\/\d{2}\/\d{4}"
                    placeholder="DD/MM/YYYY"
                    min={new Date().toISOString().split("T")[0]}
                    aria-label="Departure"
                    aria-invalid="true"
                    aria-describedby="id7541838709-error"
                    class="w-full grid px-2 pb-1 outline-none peer-focus:ring-1 focus:ring-blue-500 text-gray-900 rounded-none bg-white h-[35px] sm:h-auto text-left"
                  />
                </label>
              </div>

              {#if $form.flightType === "roundTrip"}
                <div class="grid w-full peer">
                  <label
                    for="return"
                    class="w-full grid text-sm hover:ring-1 transition-all ease-in duration-150 rounded-sm group border-b-2 border-blue-500"
                  >
                    <p
                      class="p-1 group-focus-within:text-blue-500 group-focus-within:font-semibold transition-all duration-150 will-change-[font-weight,color]"
                    >
                      Return
                    </p>
                    <input
                      bind:value={$form.return}
                      type="date"
                      name="return"
                      id="return"
                      pattern="\d{2}\/\d{2}\/\d{4}"
                      placeholder="DD/MM/YYYY"
                      aria-label="Return"
                      aria-invalid="true"
                      aria-describedby="id7541838709-error"
                      class="w-full grid px-2 pb-1 outline-none peer-focus:ring-1 focus:ring-blue-500 text-gray-900 rounded-none bg-white h-[35px] sm:h-auto text-left"
                    />
                  </label>
                </div>
              {/if}

              <div class="grid w-full peer">
                <label
                  for="cabin"
                  class="w-full grid text-sm hover:ring-1 transition-all ease-in duration-150 rounded-sm group"
                >
                  <span
                    class="p-1 group-focus-within:text-blue-500 group-focus-within:font-semibold transition-all duration-150 will-change-[font-weight,color]"
                    >Travel Class</span
                  >
                  <Select
                    bind:value={$form.travelClass}
                    onInput={(e) => {
                      $form.travelClass = e.currentTarget.value;
                    }}
                    name="cabin"
                    id="cabin"
                    options={[
                      { value: "ECONOMY", text: "ECONOMY" },
                      { value: "BUSINESS", text: "BUSINESS" },
                      { value: "PREMIUM_ECONOMY", text: "PREMIUM ECONOMY" },
                      { value: "FIRST_CLASS", text: "FIRST CLASS" },
                    ]}
                  />
                </label>
              </div>

              <div class="flight-passengers grid w-full peer relative">
                <div
                  class="w-full grid text-sm hover:ring-1 transition-all ease-in duration-150 rounded-sm group"
                >
                  <label
                    for="passengers"
                    class="p-1 group-focus-within:text-blue-500 group-focus-within:font-semibold transition-all duration-150 will-change-[font-weight,color]"
                    >Passengers</label
                  >
                  <div
                    class="flex justify-between group w-full border-b-2 {$errors
                      .adult?.length
                      ? 'border-red-500'
                      : 'border-blue-500'} px-2 pb-1 outline-none peer-focus:ring-1 focus:ring-blue-500 text-gray-900 text-left"
                  >
                    <button
                      id="passengers"
                      name="passengers"
                      on:click={(e) => {
                        displayPassengerDialog = !displayPassengerDialog;
                      }}
                      type="button"
                      class="w-full text-gray-900 text-left flex justify-between"
                      >{Number($form.adult)
                        ? $form.adult > 1
                          ? `${$form.adult} Adults`
                          : `${$form.adult} Adult`
                        : parseInt(`${$form.adult}`) &&
                            parseInt(`${$form.adult}`) > 1
                          ? `${parseInt(`${$form.adult}`)} Adults`
                          : `${Number(parseInt(`${$form.adult}`)) || 1} Adult`}{Number(
                        $form.child
                      )
                        ? $form.child > 1
                          ? `, ${$form.child} Children`
                          : `, ${$form.child} Child`
                        : parseInt(`${$form.child}`) &&
                            parseInt(`${$form.child}`) > 1
                          ? `, ${parseInt(`${$form.child}`)} Children`
                          : ""}{Number($form.infant)
                        ? $form.infant > 1
                          ? `, ${$form.infant} Babies`
                          : `, ${$form.infant} Baby`
                        : parseInt(`${$form.infant}`) &&
                            parseInt(`${$form.infant}`) > 1
                          ? `, ${parseInt(`${$form.infant}`)} Babies`
                          : ""}
                      <svg
                        class="w-6 h-6 fill-current {displayPassengerDialog
                          ? 'rotate-180'
                          : 'group-hover:rotate-180'} duration-300 transition-all"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M5.23 7.79a.75.75 0 011.06 0L10 11.47l3.71-3.68a.75.75 0 111.06 1.06l-4.24 4.2a.75.75 0 01-1.06 0L5.23 8.85a.75.75 0 010-1.06z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {#if displayPassengerDialog}
                  <div
                    class="w-full sm:absolute sm:top-[3.6rem] sm:right-0 p-4 z-[107] sm:max-w-[300px] sm:w-max bg-zinc-50 drop-shadow-lg rounded"
                  >
                    <div class="w-full grid gap-y-5 px-2">
                      <label for="adult" class="grid">
                        <span class="text-blue-600 font-semibold text-sm"
                          >Adults</span
                        >
                        <small>16+ years</small>

                        <div
                          class="flex mt-3 border {$errors.adult?.length
                            ? 'border-red-500'
                            : 'border-blue-500'} rounded-full p-2"
                        >
                          <button
                            type="button"
                            on:click={(e) => {
                              if (!Number($form.adult)) {
                                if (!parseInt(`${$form.adult}`)) {
                                  $form.adult = 1;

                                  return;
                                }

                                $form.adult = parseInt(`${$form.adult}`);
                                return;
                              }

                              if ($form.adult === 1) {
                                $errors = {
                                  ...$errors,
                                  adult: [
                                    "To book online, there must be at least one adult travelling.",
                                  ],
                                };
                              } else {
                                $form.adult -= 1;
                              }
                            }}
                          >
                            <Remove class="w-7 h-7 text-neutral-600" />
                          </button>

                          <input
                            pattern="[0-9]*"
                            bind:value={$form.adult}
                            on:input={(e) => {
                              if (!e.currentTarget.value.length) {
                                $errors = {
                                  ...$errors,
                                  adult: ["Required"],
                                };
                              } else {
                                if (Number(e.currentTarget.value)) {
                                  $form.adult = Number(e.currentTarget.value);

                                  $errors = {
                                    ...$errors,
                                    adult: undefined,
                                  };
                                } else {
                                  $errors = {
                                    ...$errors,
                                    adult: ["Please enter a number.."],
                                  };
                                }
                              }
                            }}
                            name="adult"
                            id="adult"
                            type="text"
                            class="w-full bg-transparent text-center outline-none text-lg font-semibold"
                          />

                          <button
                            type="button"
                            on:click={(e) => {
                              if (!Number($form.adult)) {
                                if (!parseInt(`${$form.adult}`)) {
                                  $form.adult = 1;

                                  return;
                                }

                                $form.adult = parseInt(`${$form.adult}`);
                                return;
                              }

                              $form.adult += 1;
                            }}
                          >
                            <Add class="w-7 h-7 text-blue-600" />
                          </button>
                        </div>
                        {#if $errors.adult?.length}
                          <span class="text-red-500 leading-tight text-sm"
                            >{$errors.adult}</span
                          >
                        {/if}
                      </label>

                      <label for="child" class="grid">
                        <span class="text-blue-600 font-semibold text-sm"
                          >Child</span
                        >
                        <small>2-11 years</small>

                        <div
                          class="flex mt-3 border {$errors.child?.length
                            ? 'border-red-500'
                            : 'border-blue-500'} rounded-full p-2"
                        >
                          <button
                            disabled={$form.child === 0}
                            on:click={(e) => {
                              if (!Number($form.child)) {
                                if (!parseInt(`${$form.child}`)) {
                                  $form.child = 1;

                                  return;
                                }

                                $form.child = parseInt(`${$form.child}`);
                                return;
                              }

                              $form.child -= 1;
                            }}
                            type="button"
                          >
                            <Remove class="w-7 h-7 text-neutral-600" />
                          </button>

                          <input
                            name="child"
                            id="child"
                            bind:value={$form.child}
                            pattern="[0-9]*"
                            on:input={(e) => {
                              if (!e.currentTarget.value.length) {
                                $errors = {
                                  ...$errors,
                                  child: ["Required"],
                                };
                              } else {
                                if (Number(e.currentTarget.value)) {
                                  $form.child = Number(e.currentTarget.value);

                                  $errors = {
                                    ...$errors,
                                    child: undefined,
                                  };
                                } else {
                                  $errors = {
                                    ...$errors,
                                    child: ["Please enter a number.."],
                                  };
                                }
                              }
                            }}
                            type="text"
                            class="w-full bg-transparent text-center outline-none text-lg font-semibold"
                          />

                          <button
                            type="button"
                            on:click={(e) => {
                              if (!Number($form.child)) {
                                if (!parseInt(`${$form.child}`)) {
                                  $form.child = 1;

                                  return;
                                }

                                $form.child = parseInt(`${$form.child}`);
                                return;
                              }

                              $form.child += 1;
                            }}
                          >
                            <Add class="w-7 h-7 text-blue-600" />
                          </button>
                        </div>
                        {#if $errors.child?.length}
                          <span class="text-red-500">{$errors.child}</span>
                        {/if}
                      </label>

                      <label class="grid" for="infant">
                        <p class="text-blue-600 font-semibold text-sm">
                          Infant
                        </p>
                        <small>{"<"}2 years</small>

                        <div
                          class="flex mt-3 border {$errors.infant?.length
                            ? 'border-red-500'
                            : 'border-blue-500'} rounded-full p-2"
                        >
                          <button
                            type="button"
                            disabled={$form.infant === 0}
                            on:click={(e) => {
                              if (!Number($form.infant)) {
                                $form.infant = 0;
                                return;
                              }

                              $form.infant -= 1;
                            }}
                          >
                            <Remove class="w-7 h-7 text-neutral-600" />
                          </button>

                          <input
                            name="infant"
                            id="infant"
                            bind:value={$form.infant}
                            on:input={(e) => {
                              if (!e.currentTarget.value.length) {
                                $errors = {
                                  ...$errors,
                                  infant: ["Required"],
                                };
                              } else {
                                if (Number(e.currentTarget.value)) {
                                  $form.infant = Number(e.currentTarget.value);

                                  $errors = {
                                    ...$errors,
                                    infant: undefined,
                                  };
                                } else {
                                  $errors = {
                                    ...$errors,
                                    infant: ["Please enter a number.."],
                                  };
                                }
                              }
                            }}
                            pattern="[0-9]*"
                            type="text"
                            class="w-full bg-transparent text-center outline-none text-lg font-semibold"
                          />

                          <button
                            type="button"
                            on:click={(e) => {
                              if ($form.infant !== 0 && !Number($form.infant)) {
                                if (!parseInt(`${$form.infant}`)) {
                                  $form.infant = 0;
                                  return;
                                }

                                $form.infant = parseInt(`${$form.infant}`);
                              } else {
                                $form.infant += 1;
                              }
                            }}
                          >
                            <Add class="w-7 h-7 text-blue-600" />
                          </button>
                        </div>
                        {#if $errors.infant?.length}
                          <span class="text-red-500">{$errors.infant}</span>
                        {/if}
                      </label>
                    </div>

                    <div class="flex justify-end px-2 mt-6">
                      <Button
                        btnText="Done"
                        className="btn-primary"
                        onInput={(e) => (displayPassengerDialog = false)}
                      />
                    </div>
                  </div>
                {/if}
              </div>
            </div>
          </div>
        </div>

        <div class="block mt-6 w-full sm:w-fit sm:float-right">
          <Button
            btnType="submit"
            btnText="Find flights"
            className="btn-primary w-full"
            onInput={(e) => (displayPassengerDialog = false)}
          />
        </div>
      </form>
    </div>
  </div>
</div>

<Notifications />

<style lang="postcss">
  @media (min-width: 320px) and (max-width: 420px) {
    .obt-container {
      top: -80px !important;
    }
  }

  @media (min-width: 420px) and (max-width: 640px) {
    .obt-container {
      top: -100px !important;
    }
  }
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
