<script lang="ts">
  import type { FlightsOfferSearchType } from "$lib/utils/flightTypes";
  import { onDestroy, onMount } from "svelte";
  import { flightStore } from "../../../../store";
  import FlightIcon from "./components/FlightIcon.svelte";
  import Takeoff from "./components/Takeoff.svelte";
  import DateIcon from "./components/DateIcon.svelte";
  import Clock from "./components/Clock.svelte";
  import Nationality from "./components/Nationality.svelte";
  import BookError from "./components/BookError.svelte";
  import Padlock from "./components/Padlock.svelte";
  import Person from "./components/Person.svelte";
  import Label from "./components/Label.svelte";
  import Home from "./components/Home.svelte";
  import Airline from "../search/components/Airline.svelte";
  import { Notifications, acts } from "@tadashi/svelte-notification";
  import {
    BookingPayment,
    flightBookingInfoSchema,
    PaymentOTP,
    PaymentPin,
    primaryPassengerBooking,
    type BookingPaymentType,
    type PrimaryPassenger,
    type SecondaryPassenger,
  } from "$lib/validation";
  import { superForm, type SuperValidated } from "sveltekit-superforms";
  import { zod } from "sveltekit-superforms/adapters";
  import type { PageData } from "./$types";
  import ArrowDown from "$lib/components/ArrowDown.svelte";
  import ArrowUp from "$lib/components/ArrowUp.svelte";
  import PageLoading from "../../components/PageLoading.svelte";
  import Warning from "./components/Warning.svelte";
  import Countries from "./components/Countries.svelte";
  import TelephoneInput from "./components/TelephoneInput.svelte";
  import Close from "$lib/components/Close.svelte";
  import type { z } from "zod";
  import ErrorIcon from "$lib/components/ErrorIcon.svelte";

  let pageLoading = true;

  export let data: PageData;

  const formData = new FormData();

  let formError: boolean = false;

  let error1: SuperValidated<SecondaryPassenger, any>;
  let error2: SuperValidated<PrimaryPassenger, any>;

  let displayCCModal: boolean = false;
  let displayCCFields: boolean = false;
  let displayCCFieldsErr: boolean = false;
  let displayPinModal: boolean = false;
  let displayOTPModal: boolean = false;
  let isBookingLoading = false;

  let travelers: {
    [x: number]: {
      id: string;
      isOpen: boolean;
    };
  } = {};

  let bookingPaymentErrors: SuperValidated<z.infer<typeof BookingPayment>, any>;
  let bookingPinErrors: SuperValidated<z.infer<typeof PaymentPin>, any>;
  let otpErrors: SuperValidated<z.infer<typeof PaymentOTP>, any>;
  let cardPaymentError: boolean = false;
  let cardPaymentErrorMsg: string;
  let updatePayment: boolean = false;

  let paymentBtnDisabled: boolean = true;
  let pinBtnDisabled: boolean = true;
  let otpBtnDisabled: boolean = true;
  let paymentLoading: boolean = false;
  let pinLoading: boolean = false;
  let otpLoading: boolean = false;
  let redirectPage: boolean = false;

  let travelerError: {
    [x: number]: {
      name: {
        firstName: string;
        lastName: string;
      };
      documents: {
        number: string;
        issuanceDate: string;
        expiryDate: string;
        issuanceCountry: string;
        nationality: string;
        documentType: string;
        holder: boolean;
      };
      dateOfBirth: string;
      gender: string;
    };
  } = {};

  const { form, validateForm: validateForm1 } = superForm(data.form, {
    customValidity: true,
    validators: zod(flightBookingInfoSchema),
    dataType: "json",
  });

  const { form: primaryPassenger, validateForm: validateForm2 } = superForm(
    data.form2,
    {
      customValidity: true,
      validators: zod(primaryPassengerBooking),
      dataType: "json",
    }
  );

  const {
    form: BookingPaymentForm,
    validateForm: BookingPaymentValidate,
    enhance: BookingEnhance,
  } = superForm(
    {
      name: "",
      cardNumber: "",
      cvv: "",
      month: "",
      year: "",
      totalAmount: "",
      city: "",
      address: "",
      country: "",
      zipCode: "",
      state: "",
    },
    {
      validators: zod(BookingPayment),
      customValidity: true,
    }
  );

  const { form: BookingPinForm, validateForm: BookingPinValidate } = superForm(
    {
      pin: "",
    },
    {
      validators: zod(PaymentPin),
      customValidity: true,
    }
  );

  const { form: OTPForm, validateForm: OTPValidate } = superForm(
    {
      otp: "",
    },
    {
      validators: zod(PaymentOTP),
      customValidity: true,
    }
  );

  let flightData:
    | (FlightsOfferSearchType & {
        dictionaries?: { carriers: { [x: string]: string } };
      })
    | null = null;

  const unsubscriber = flightStore.subscribe((flight) => {
    flightData = flight as FlightsOfferSearchType & {
      dictionaries: { carriers: { [x: string]: string } };
    };
  });

  const calculateNoOfPersons = (
    { travelerPricings }: Pick<FlightsOfferSearchType, "travelerPricings">,
    travelerType: string
  ) => {
    return travelerPricings.filter(
      (traveler) => traveler.travelerType === travelerType
    ).length;
  };

  const calculatePersonsFare = (
    { travelerPricings }: Pick<FlightsOfferSearchType, "travelerPricings">,
    travelerType: string,
    priceType: "base" | "total" = "base"
  ) => {
    return travelerPricings
      .filter((traveler) => traveler.travelerType === travelerType)
      .reduce(
        (sum, traveler) => sum + parseFloat(traveler.price[priceType]),
        0
      );
  };

  const hasNonEmptyField = (obj: any): boolean => {
    if (typeof obj !== "object" || obj === null) {
      return false;
    }

    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const value = obj[key];

        if (
          (key === "city" || key === "state") &&
          (value === "" || value !== "")
        ) {
          return true;
        }

        if (typeof value === "object" && value !== null) {
          // Recursively check nested objects
          if (!hasNonEmptyField(value)) {
            return false;
          }
          // Recursively check nested objects
          // if (Array.isArray(value)) {
          // 	console.log("first", value)
          // 	// Check if array is empty
          // 	if (value.length === 0) {
          // 		return false;
          // 	}
          // } else if (!hasNonEmptyField(value)) {
          // 	return false;
          // }
        } else if (value === undefined || value === null || value === "") {
          return false;
        }
      }
    }

    return true;
  };

  const confirmInput = (
    primaryPassenger: typeof $primaryPassenger,
    secondaryPassenger: typeof $form.travelers,
    display: boolean = false
  ) => {
    isBookingLoading = true;

    if (
      hasNonEmptyField(primaryPassenger) &&
      hasNonEmptyField(secondaryPassenger)
    ) {
      formError = false;

      let travelers = [primaryPassenger, ...secondaryPassenger];

      console.log("primary traveler", travelers);
      localStorage.setItem("travelers", JSON.stringify(travelers));
      displayCCModal = display;

      return true;
    }

    formError = true;
    isBookingLoading = false;
    window.scrollTo(0, 0);
    console.log(primaryPassenger, secondaryPassenger)
    return false;
  };

  onMount(() => {
    // flw
    const script = document.createElement("script");
    script.src = "https://checkout.flutterwave.com/v3.js";
    document.body.appendChild(script);

    let flightDataLS = localStorage.getItem("flightData");

    if ((!flightData && flightDataLS === "null") || flightDataLS === null) {
      flightData = null;
    } else {
      flightData = JSON.parse(flightDataLS);
    }

    pageLoading = false;
  });

  onMount(async () => {
    $BookingPaymentForm.totalAmount = flightData
      ? flightData.price.grandTotal
      : "0";
    error1 = await validateForm1();
    error2 = await validateForm2();

    bookingPaymentErrors = await BookingPaymentValidate();
    bookingPinErrors = await BookingPinValidate();
    otpErrors = await OTPValidate();

    const travelersLS = localStorage.getItem("travelers") as string;

    if (flightData) {
      $primaryPassenger.documents = {
        nationality: "",
        documentType: "PASSPORT",
        holder: true,
        expiryDate: "",
        issuanceCountry: "",
        issuanceDate: "",
        number: "",
      };

      $primaryPassenger.id = "1";

      $primaryPassenger.contact.phones = {
        number: "",
        deviceType: "",
        countryCallingCode: "",
      };
      

      flightData.travelerPricings.slice(1).map((_, index) => {
        travelers = {
          ...travelers,
          [index]: {
            id: "",
            isOpen: false,
          },
        };

        travelerError = {
          ...travelerError,
          [index]: {
            name: {
              firstName: "",
              lastName: "",
            },
            documents: {
              number: "",
              issuanceDate: "",
              expiryDate: "",
              issuanceCountry: "",
              nationality: "",
              documentType: "",
              holder: true,
            },
            dateOfBirth: "",
            gender: "",
          },
        };
      });
    }

    console.log(travelers, "travelers", JSON.parse(travelersLS));

    const travelersFromLS = JSON.parse(travelersLS);

    if (travelersFromLS && travelersFromLS.length > 0) {
      travelersFromLS.slice(0, 1).map((_: any, index: number) => {
        $primaryPassenger = {
          ...$primaryPassenger,
          name: {
            firstName: _.name.firstName,
            lastName: _.name.lastName,
          },
          contact: {
            emailAddress: _.contact.emailAddress,
            phones: {
              countryCallingCode: _.contact.phones.countryCallingCode,
              number: _.contact.phones.number,
              deviceType: _.contact.phones.deviceType,
            },
          },
          documents: {
            nationality: _.documents.nationality,
            issuanceCountry: _.documents.issuanceCountry,
            expiryDate: _.documents.expiryDate,
            issuanceDate: _.documents.issuanceDate,
            number: _.documents.number,
            holder: true,
            documentType: "PASSPORT",
          },
          dateOfBirth: _.dateOfBirth,
          gender: _.gender,
        };

        travelers = {
          ...travelers,
          [index]: {
            id: "",
            isOpen: false,
          },
        };

        travelerError = {
          ...travelerError,
          [index]: {
            name: {
              firstName: "",
              lastName: "",
            },
            documents: {
              number: "",
              issuanceDate: "",
              expiryDate: "",
              issuanceCountry: "",
              nationality: "",
              documentType: "",
              holder: true,
            },
            dateOfBirth: "",
            gender: "",
          },
        };
      });

      travelersFromLS.slice(1).map((_: any, index: number) => {
        $form.travelers.push({
          id: _.id,
          name: {
            firstName: _.name.firstName,
            lastName: _.name.lastName,
          },
          documents: {
            documentType: "PASSPORT",
            expiryDate: _.documents.expiryDate,
            holder: true,
            issuanceCountry: _.documents.issuanceCountry,
            issuanceDate: _.documents.issuanceDate,
            nationality: _.documents.nationality,
            number: _.documents.number,
          },
          dateOfBirth: _.dateOfBirth,
          gender: _.gender,
        });
      
      });
    } else {
      // $form.travelers = [
      //   ...$form.travelers,
      //   {
      //     id: "",
      //     name: {
      //       firstName: "",
      //       lastName: "",
      //     },
      //     documents: {
      //       documentType: "PASSPORT",
      //       expiryDate: "",
      //       holder: true,
      //       issuanceCountry: "",
      //       issuanceDate: "",
      //       nationality: "",
      //       number: "",
      //     },
      //     dateOfBirth: "",
      //     gender: "",
      //   },
      // ];
    }
  });

  onDestroy(() => {
    unsubscriber();
  });

  $: console.log("form travelers", $form.travelers);
</script>

{#if pageLoading}
  <PageLoading />
{:else if !flightData || flightData === null}
  <section class="w-full px-10">
    <div
      class="error grid gap-5 items-center justify-center place-items-center pt-32 text-neutral-500"
    >
      <BookError class="w-44 h-44" />
      <p class="text-3xl font-bold">You cannot perform this action</p>
      <a
        href="/"
        class="flex items-center gap-x-1 bg-neutral-600 rounded-md text-white font-semibold px-3 py-2 transition-all hover:scale-110 ease-in"
      >
        <Home />
        Go back home</a
      >
    </div>
  </section>
{:else}
  <div class="min-h-screen bg-neutral-200/50 pb-20 relative">
    <section class="px-5 md:px-14 pt-28 booking-page">
      <div class="info w-fit bg-green-200 mb-8 rounded-lg text-xs">
        <div class="flex items-cener gap-x-2 p-3">
          <Padlock class="w-4 h-4 text-green-900" />
          <p class="flex-1">
            We take privacy issues seriously. You can be sure that your personal
            data is securely protected.
          </p>
        </div>
      </div>
      {#if formError}
        <div class="bg-red-600 w-fit rounded-lg text-sm text-white mb-5">
          <div class="flex items-center gap-x-2 p-3">
            <Warning class="w-6 h-6" />
            <p class="flex-1">
              Please check your form entries and submit again
            </p>
          </div>
        </div>
      {/if}
      <form
        method="post"
        class="flex flex-col lg:flex-row items-start w-full gap-y-12 lg:gap-x-12"
      >
        <div
          class="lg:hidden w-full rounded-md border border-neutral-300 bg-white py-4 px-6"
        >
          {#if flightData}
            <div class="grid gap-y-4">
              {#each flightData.itineraries as flight, index}
                <div class="flex flex-col">
                  <div class="flex gap-x-2 mb-2">
                    <Takeoff />
                    {#each flight.segments as segment}
                      <div
                        class="flex items-center gap-x-1 font-semibold text-neutral-700 text-lg"
                      >
                        <p>
                          {segment.departure.iataCode}
                        </p>
                        <FlightIcon />
                        <p>
                          {segment.arrival.iataCode}
                        </p>
                      </div>
                    {/each}
                  </div>

                  <div
                    class="grid items-center text-sm {flightData.itineraries
                      .length >
                    index + 1
                      ? 'border-b pb-3'
                      : ''}"
                  >
                    <div class="flex items-center gap-x-2">
                      <Clock class="text-neutral-500" />
                      <div
                        class="flex gap-x-[3px] font-semibold text-neutral-700"
                      >
                        <p>
                          {new window.Date(flight.segments[0].departure.at)
                            .toLocaleString("en-GB", {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            })
                            .replace(",", "")}
                        </p>
                        <p>{"-"}</p>

                        <p>
                          {new window.Date(flight.segments[0].arrival.at)
                            .toLocaleString("en-GB", {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            })
                            .replace(",", "")}
                        </p>
                      </div>
                    </div>
                    <div class="flex items-center gap-x-2 font-semibold">
                      <DateIcon class="text-neutral-500" />
                      <p class="text-neutral-700">
                        {new window.Date(flight.segments[0].arrival.at)
                          .toLocaleString("en-GB", {
                            weekday: "short",
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                          .replace(",", "")}
                      </p>
                    </div>
                    <div class="flex items-center gap-x-2 font-semibold">
                      <Airline class="text-neutral-500" />
                      <p class="text-neutral-700">
                        {flightData.dictionaries &&
                          flightData.dictionaries.carriers[
                            flightData.itineraries[0].segments[0]
                              .carrierCode
                          ]}
                      </p>
                    </div>
                  </div>
                </div>
              {/each}
            </div>
          {/if}
        </div>

        <div class="w-full flex flex-col lg:col-span-2 flex-1">
          <!-- Contact Information -->
          <div
            class="contact-details border-b bg-white border border-neutral-300 px-6 py-3 rounded-md"
          >
            <p class="text-lg font-bold mb-2">Contact Details</p>

            <div
              class="flex flex-col gap-y-5 md:flex-row mt-4 items-start gap-x-4 mb-5"
            >
              <div class="w-full">
                <label
                  for="email"
                  class="after:content-['*'] after:text-lg after:ml-0.5 after:text-red-500 font-semibold text-xs w-max flex flex-row items-center gap-x-1"
                  >Enter your email
                </label>
                <input
                  required
                  bind:value={$primaryPassenger.contact.emailAddress}
                  on:input={(e) => {
                    if (e.currentTarget.value.length >= 1) {
                      if (
                        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                          e.currentTarget.value
                        )
                      ) {
                        error2.errors.contact = {
                          ...error2.errors.contact,
                          emailAddress: ["Invalid email address"],
                        };
                      } else {
                        if (error2 && error2.errors.contact)
                          error2.errors.contact.emailAddress = [];
                      }
                    } else {
                      error2.errors.contact = {
                        ...error2.errors.contact,
                        emailAddress: ["Email is required"],
                      };
                    }
                  }}
                  type="email"
                  class="w-full border {error2 &&
                  error2.errors.contact?.emailAddress?.length
                    ? 'border-red-500'
                    : 'border-neutral-300'} bg-neutral-100 px-4 py-2 text-sm focus:outline-none"
                  placeholder="john.doe@example.com"
                />
                {#if error2 && error2.errors.contact?.emailAddress?.length}
                  <span class="text-xs text-red-500 font-bold"
                    >{error2.errors.contact.emailAddress}</span
                  >
                {/if}
              </div>

              <div class="w-full">
                <label
                  for="email"
                  class="after:content-['*'] after:text-lg after:ml-0.5 after:text-red-500 font-semibold text-xs w-max flex flex-row items-center gap-x-1"
                  >Enter your phone number</label
                >
                <TelephoneInput
                  error={!!error2?.errors?.contact?.phones?.number?.length}
                  onInput={(e) => {
                    if (e.currentTarget.value.length >= 1) {
                      if (
                        e.currentTarget.value !== "0" &&
                        (!parseInt(e.currentTarget.value) ||
                          !Number(e.currentTarget.value))
                      ) {
                        error2.errors = {
                          contact: {
                            ...error2.errors.contact,
                            phones: {
                              number: ["Invalid number"],
                            },
                          },
                        };
                      } else {
                        error2.errors = {
                          ...error2.errors.contact,
                          contact: {
                            phones: {
                              number: [],
                            },
                          },
                        };
                      }

                      if (
                        e instanceof InputEvent &&
                        e.inputType === "deleteContentBackward" &&
                        Number(e.currentTarget.value)
                      ) {
                        error2.errors = {
                          ...error2.errors.contact,
                          contact: {
                            phones: {
                              number: [],
                            },
                          },
                        };
                      }
                    } else {
                      error2.errors = {
                        ...error2.errors.contact,
                        contact: {
                          phones: {
                            number: ["Phone number is required"],
                          },
                        },
                      };
                    }
                  }}
                  on:phoneChange={(e) => {
                    $primaryPassenger.contact.phones.countryCallingCode =
                      e.detail.selectedCountryCode;
                    $primaryPassenger.contact.phones.number =
                      e.detail.fullPhoneNumber;
                    $primaryPassenger.contact.phones.deviceType = "MOBILE";
                  }}
                />
                {#if error2 && error2.errors?.contact?.phones?.number?.length}
                  <span class="text-xs text-red-500 font-bold"
                    >{error2.errors.contact.phones.number}</span
                  >
                {/if}
              </div>
            </div>
          </div>
          <!-- Personal Information -->
          {#if flightData && flightData.travelerPricings.length}
            <div
              class="grid gap-y-4 relative border-b mt-10 bg-white border border-neutral-300 px-6 py-3 rounded-md"
            >
              <h1 class="font-bold text-lg">Passenger Information</h1>
              <div class="personal-information border-t pt-4">
                <p class="font-bold mb-2">Primary Passenger</p>

                <div class="gap-y-6 mt-4 flex flex-col">
                  <div
                    class="name flex flex-col gap-y-5 md:flex-row items-start gap-x-3"
                  >
                    <div class="w-full flex flex-col">
                      <label
                        for="firstName"
                        class="after:content-['*'] after:text-lg after:ml-0.5 after:text-red-500 font-semibold text-xs w-max flex flex-row items-center gap-x-1"
                      >
                        First Name
                      </label>
                      <input
                        required
                        bind:value={$primaryPassenger.name.firstName}
                        on:input={(e) => {
                          if (!e.currentTarget.value.length) {
                            error2.errors.name = {
                              ...error2.errors.name,
                              firstName: ["First name is required"],
                            };
                          } else if (e.currentTarget.value.length <= 2) {
                            error2.errors.name = {
                              ...error2.errors.name,
                              firstName: ["First name is too short"],
                            };
                          } else {
                            error2.errors.name = {
                              ...error2.errors.name,
                              firstName: [],
                            };
                          }
                        }}
                        type="text"
                        name="firstName"
                        class="w-full border {error2 &&
                        error2.errors?.name?.firstName?.length
                          ? 'border-red-500'
                          : 'border-neutral-300'} bg-neutral-100 px-4 py-2 text-sm focus:outline-none"
                      />
                      {#if error2 && error2.errors.name?.firstName?.length}
                        <span class="text-xs text-red-500 font-bold"
                          >{error2.errors.name.firstName}</span
                        >
                      {/if}
                    </div>

                    <div class="w-full flex flex-col">
                      <label
                        for="middleName"
                        class="py-[6px] font-semibold text-xs w-max flex flex-row items-center gap-x-1"
                      >
                        Middle Name
                      </label>
                      <input
                        type="text"
                        name="middleName"
                        class="w-full border border-neutral-300 bg-neutral-100 px-4 py-2 text-sm focus:outline-none"
                      />
                    </div>

                    <div class="w-full flex flex-col">
                      <label
                        for="lastName"
                        class="after:content-['*'] after:text-lg after:ml-0.5 after:text-red-500 font-semibold text-xs w-max flex flex-row items-center gap-x-1"
                      >
                        Last Name
                      </label>
                      <input
                        required
                        bind:value={$primaryPassenger.name.lastName}
                        on:input={(e) => {
                          if (!e.currentTarget.value.length) {
                            error2.errors.name = {
                              ...error2.errors.name,
                              lastName: ["Last name is required"],
                            };
                          } else if (e.currentTarget.value.length <= 2) {
                            error2.errors.name = {
                              ...error2.errors.name,
                              lastName: ["Last name is too short"],
                            };
                          } else {
                            error2.errors.name = {
                              ...error2.errors.name,
                              lastName: [],
                            };
                          }
                        }}
                        type="text"
                        name="lastName"
                        class="w-full border {error2 &&
                        error2.errors.name?.lastName?.length
                          ? 'border-red-500'
                          : 'border-neutral-300'} bg-neutral-100 px-4 py-2 text-sm focus:outline-none"
                      />
                      {#if error2 && error2.errors.name?.lastName?.length}
                        <span class="text-xs text-red-500 font-bold"
                          >{error2.errors.name.lastName}</span
                        >
                      {/if}
                    </div>
                  </div>

                  <div
                    class="flex flex-col items-start gap-y-5 md:flex-row gap-x-3"
                  >
                    <div class="grid w-full">
                      <label
                        for="nationality"
                        class="after:content-['*'] after:text-lg after:ml-0.5 after:text-red-500 font-semibold text-xs flex items-center gap-x-1"
                        >Nationality</label
                      >
                      <Countries
                        value={$primaryPassenger.documents.nationality}
                        error={!!error2?.errors?.documents?.nationality?.length}
                        onInput={(e) => {
                          if (e.currentTarget.value.length < 1) {
                            error2.errors.documents = {
                              ...error2.errors.documents,
                              nationality: ["Nationality is required"],
                            };

                            return;
                          }

                          $primaryPassenger.documents = {
                            ...$primaryPassenger.documents,
                            nationality: e.currentTarget.value,
                          };

                          error2.errors.documents = {
                            ...error2.errors.documents,
                            nationality: [],
                          };
                        }}
                      />
                      <!-- <Nationality
                        error={!!error2?.errors?.documents?.nationality?.length}
                        onInput={(e) => {
                          if (e.currentTarget.value.length < 1) {
                            error2.errors.documents = {
                              ...error2.errors.documents,
                              nationality: ["Nationality is required"],
                            };

                            return;
                          }

                          $primaryPassenger.documents = {
                            ...$primaryPassenger.documents,
                            nationality: e.currentTarget.value,
                          };

                          error2.errors.documents = {
                            ...error2.errors.documents,
                            nationality: [],
                          };
                        }}
                      /> -->
                      {#if error2 && error2.errors.documents?.nationality?.length}
                        <span class="text-xs text-red-500 font-bold"
                          >{error2.errors.documents.nationality}</span
                        >
                      {/if}
                    </div>

                    <div class="grid w-full">
                      <label
                        for="dob"
                        class="after:content-['*'] after:text-lg after:ml-0.5 after:text-red-500 font-semibold text-xs flex items-center gap-x-1"
                        >Date of birth</label
                      >
                      <input
                        bind:value={$primaryPassenger.dateOfBirth}
                        required
                        type="date"
                        name="dob"
                        id="dob"
                        on:input={(e) => {
                          if (e.currentTarget.value.length >= 1) {
                            error2.errors = {
                              ...error2.errors,
                              dateOfBirth: [],
                            };
                          } else {
                            error2.errors = {
                              ...error2.errors,
                              dateOfBirth: ["Date of birth is required"],
                            };
                          }
                        }}
                        class="w-full border {error2 &&
                        error2.errors?.dateOfBirth?.length
                          ? 'border-red-500'
                          : 'border-neutral-300'} bg-neutral-100 px-4 py-2 text-sm focus:outline-none"
                      />
                      {#if error2 && error2.errors.dateOfBirth?.length}
                        <span class="text-xs text-red-500 font-bold"
                          >{error2.errors.dateOfBirth}</span
                        >
                      {/if}
                    </div>

                    <div class="grid w-full">
                      <label
                        for="gender"
                        class="after:content-['*'] after:text-lg after:ml-0.5 after:text-red-500 font-semibold text-xs flex items-center gap-x-1"
                        >Gender</label
                      >
                      <select
                        bind:value={$primaryPassenger.gender}
                        required
                        name="gender"
                        id="gender"
                        on:input={(e) => {
                          if (e.currentTarget.value.length < 1) {
                            error2.errors = {
                              ...error2.errors,
                              gender: ["Gender is required"],
                            };

                            return;
                          }
                          error2.errors = {
                            ...error2.errors,
                            gender: [],
                          };
                        }}
                        class="w-full border {error2 &&
                        error2.errors?.gender?.length
                          ? 'border-red-500'
                          : 'border-neutral-300'} bg-neutral-100 px-4 py-2 text-sm focus:outline-none"
                      >
                        <option value="">Select an option</option>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                      </select>
                      {#if error2 && error2.errors.gender?.length}
                        <span class="text-xs text-red-500 font-bold"
                          >{error2.errors.gender}</span
                        >
                      {/if}
                    </div>
                  </div>

                  <div
                    class="flex flex-col gap-y-5 md:grid md:grid-cols-3 gap-x-3"
                  >
                    <!-- {#if $primaryPassenger.documents.documentType === 'PASSPORT'} -->
                    <div class="w-full">
                      <label
                        for="passport-id"
                        class="after:content-['*'] after:text-lg after:ml-0.5 after:text-red-500 font-semibold text-xs w-max flex flex-row items-center gap-x-1"
                      >
                        Passport Number</label
                      >
                      <input
                        bind:value={$primaryPassenger.documents.number}
                        on:input={(e) => {
                          if (e.currentTarget.value.length < 1) {
                            error2.errors.documents = {
                              ...error2.errors.documents,
                              number: ["Passport Number is required"],
                            };
                            return;
                          }

                          if (e.currentTarget.value.length > 9) {
                            error2.errors.documents = {
                              ...error2.errors.documents,
                              number: [
                                "Passport Number should be less than 9 characters",
                              ],
                            };
                            return;
                          }

                          error2.errors.documents = {
                            ...error2.errors.documents,
                            number: [],
                          };
                        }}
                        required
                        type="text"
                        class="w-full border {error2 &&
                        error2.errors?.documents?.number?.length
                          ? 'border-red-500'
                          : 'border-neutral-300'} bg-neutral-100 px-4 py-2 text-sm focus:outline-none"
                      />
                      {#if error2 && error2.errors.documents?.number?.length}
                        <span
                          class="text-xs text-red-500 font-bold leading-tight block"
                          >{error2.errors.documents.number}</span
                        >
                      {/if}
                    </div>

                    <div class="w-full">
                      <label
                        for="passport-iss"
                        class="after:content-['*'] after:text-lg after:ml-0.5 after:text-red-500 font-semibold text-xs w-max flex flex-row items-center gap-x-1"
                      >
                        Passport Issuance Date
                      </label>
                      <input
                        bind:value={$primaryPassenger.documents.issuanceDate}
                        on:input={(e) => {
                          if (e.currentTarget.value.length >= 1) {
                            error2.errors.documents = {
                              ...error2.errors.documents,
                              issuanceDate: [],
                            };
                          }

                          if (e.currentTarget.value.length < 1) {
                            error2.errors.documents = {
                              ...error2.errors.documents,
                              issuanceDate: [
                                "Passport issuance date is required",
                              ],
                            };
                          }
                        }}
                        required
                        type="date"
                        name="passport-iss"
                        class="w-full border {error2 &&
                        error2.errors?.documents?.issuanceDate?.length
                          ? 'border-red-500'
                          : 'border-neutral-300'} bg-neutral-100 px-4 py-2 text-sm focus:outline-none"
                      />
                      {#if error2 && error2.errors.documents?.issuanceDate?.length}
                        <span
                          class="text-xs text-red-500 font-bold leading-tight block"
                          >{error2.errors.documents.issuanceDate}</span
                        >
                      {/if}
                    </div>

                    <div class="w-full">
                      <label
                        for="passport-exp"
                        class="after:content-['*'] after:text-lg after:ml-0.5 after:text-red-500 font-semibold text-xs w-max flex flex-row items-center gap-x-1"
                      >
                        Passport Expiration Date
                      </label>
                      <input
                        bind:value={$primaryPassenger.documents.expiryDate}
                        on:input={(e) => {
                          if (e.currentTarget.value.length >= 1) {
                            error2.errors.documents = {
                              ...error2.errors.documents,
                              expiryDate: [],
                            };
                          }

                          if (e.currentTarget.value.length < 1) {
                            error2.errors.documents = {
                              ...error2.errors.documents,
                              expiryDate: [
                                "Passport issuance expiry date is required",
                              ],
                            };
                          }
                        }}
                        required
                        type="date"
                        name="passport-exp"
                        class="w-full border {error2 &&
                        error2.errors?.documents?.expiryDate?.length
                          ? 'border-red-500'
                          : 'border-neutral-300'} bg-neutral-100 px-4 py-2 text-sm focus:outline-none"
                      />
                      {#if error2 && error2.errors.documents?.expiryDate?.length}
                        <span
                          class="text-xs text-red-500 font-bold leading-tight block"
                          >{error2.errors.documents.expiryDate}</span
                        >
                      {/if}
                    </div>

                    <div class="w-full">
                      <label
                        for="passport-iss-country"
                        class="after:content-['*'] after:text-lg after:ml-0.5 after:text-red-500 font-semibold text-xs w-max flex flex-row items-center gap-x-1"
                      >
                        Passport Issuance Country
                      </label>
                      <Countries
                        value={$primaryPassenger.documents.issuanceCountry}
                        error={!!error2?.errors?.documents?.issuanceCountry
                          ?.length}
                        index={"1"}
                        onInput={(e) => {
                          if (e.currentTarget.value.length < 1) {
                            error2.errors.documents = {
                              ...error2.errors.documents,
                              issuanceCountry: [
                                "Passport issuance country is required",
                              ],
                            };

                            return;
                          }

                          $primaryPassenger.documents = {
                            ...$primaryPassenger.documents,
                            issuanceCountry: e.currentTarget.value,
                          };

                          error2.errors.documents = {
                            ...error2.errors.documents,
                            issuanceCountry: [],
                          };
                        }}
                      />
                      {#if error2 && error2.errors.documents?.issuanceCountry?.length}
                        <span
                          class="text-xs text-red-500 font-bold leading-tight block"
                          >{error2.errors.documents.issuanceCountry}</span
                        >
                      {/if}
                    </div>

                    <!-- {/if} -->
                  </div>
                </div>
              </div>

              <!-- Passenger(s) -->
              {#each $form.travelers as _, index}
                <div
                  class="personal-information border-b mt-10 bg-white border border-neutral-300 px-6 py-4 mb-4 rounded-md"
                >
                  <button
                    type="button"
                    on:click={() => {
                      if (travelers[index].id === `${index + 2}`) {
                        travelers[index].isOpen = !travelers[index].isOpen;
                        return;
                      }
                      travelers[index].id = `${index + 2}`;
                      travelers[index].isOpen = !travelers[index].isOpen;
                    }}
                    class="w-full accordion flex justify-between items-center"
                  >
                    <p class="text-lg font-bold mb-2">
                      Passenger #{index + 2} |
                      <span class="text-sm">
                        {flightData &&
                          flightData.travelerPricings[index + 1] &&
                          flightData.travelerPricings[index + 1].travelerType}
                      </span>
                    </p>

                    <div>
                      {#if travelers && travelers[index] && travelers[index].isOpen && travelers[index].id === `${index + 2}`}
                        <ArrowUp class="w-6 h-6" />
                      {:else}
                        <ArrowDown class="w-6 h-6" />
                      {/if}
                    </div>
                  </button>
                  {#if travelers && travelers[index] && travelers[index].id === `${index + 2}` && travelers[index].isOpen}
                    <div class="gap-y-6 mt-4 flex flex-col">
                      <div
                        class="name flex flex-col gap-y-5 md:flex-row md:items-start gap-x-3"
                      >
                        <div class="w-full flex flex-col">
                          <label
                            for="firstName-${index + 2}"
                            class="after:content-['*'] after:text-lg after:ml-0.5 after:text-red-500 font-semibold text-xs w-max flex flex-row items-center gap-x-1"
                          >
                            First Name
                          </label>

                          <input
                            id={"firstName"}
                            bind:value={_.name.firstName}
                            on:input={(e) => {
                              if (e.currentTarget.value.length === 0) {
                                travelerError[index].name = {
                                  ...travelerError[index].name,
                                  firstName: "First name is required",
                                };
                                return;
                              }
                              if (e.currentTarget.value.length <= 2) {
                                travelerError[index].name = {
                                  ...travelerError[index].name,
                                  firstName: "First name is too short",
                                };
                                return;
                              }

                              travelerError[index].name = {
                                ...travelerError[index].name,
                                firstName: "",
                              };
                            }}
                            type="text"
                            name="firstName-{index + 2}"
                            required
                            class="w-full border {travelerError &&
                            travelerError[index].name.firstName.length
                              ? 'border-red-500'
                              : 'border-neutral-300'} bg-neutral-100 px-4 py-2 text-sm focus:outline-none"
                          />

                          {#if travelerError && travelerError[index].name}
                            <span
                              class="text-xs text-red-500 font-bold leading-tight block"
                              >{travelerError[index].name.firstName}</span
                            >
                          {/if}
                        </div>

                        <div class="w-full flex flex-col">
                          <label
                            for="middleName"
                            class="after:content-['*'] after:text-lg after:ml-0.5 after:text-red-500 font-semibold text-xs w-max flex flex-row items-center gap-x-1"
                          >
                            Middle Name
                          </label>
                          <input
                            type="text"
                            name="middleName-{index + 2}"
                            class="w-full border border-neutral-300 bg-neutral-100 px-4 py-2 text-sm focus:outline-none"
                          />
                        </div>

                        <div class="w-full grid">
                          <label
                            for="lastName"
                            class="after:content-['*'] after:text-lg after:ml-0.5 after:text-red-500 font-semibold text-xs w-max flex flex-row items-center gap-x-1"
                          >
                            Last Name
                          </label>
                          <input
                            required
                            bind:value={_.name.lastName}
                            on:input={(e) => {
                              if (e.currentTarget.value.length === 0) {
                                travelerError[index].name = {
                                  ...travelerError[index].name,
                                  lastName: "Last name is required",
                                };
                                return;
                              }
                              if (e.currentTarget.value.length <= 2) {
                                travelerError[index].name = {
                                  ...travelerError[index].name,
                                  lastName: "Last name is too short",
                                };
                                return;
                              }

                              travelerError[index].name = {
                                ...travelerError[index].name,
                                lastName: "",
                              };
                            }}
                            type="text"
                            name="lastName-{index + 2}"
                            class="w-full border {travelerError &&
                            travelerError[index].name.lastName.length
                              ? 'border-red-500'
                              : 'border-neutral-300'} bg-neutral-100 px-4 py-2 text-sm focus:outline-none"
                          />
                          {#if travelerError && travelerError[index].name}
                            <span
                              class="text-xs text-red-500 font-bold leading-tight block"
                              >{travelerError[index].name.lastName}</span
                            >
                          {/if}
                        </div>
                      </div>

                      <div
                        class="flex flex-col gap-y-5 md:flex-row gap-x-3 items-start"
                      >
                        <div class="grid w-full">
                          <label
                            for="nationality"
                            class="after:content-['*'] after:text-lg after:ml-0.5 after:text-red-500 font-semibold text-xs flex items-center gap-x-1"
                            >Nationality</label
                          >
                          <Countries
                            value={_.documents.nationality}
                            index={`${index + 1}`}
                            error={travelerError &&
                              travelerError[index].documents.nationality
                                .length > 0}
                            onInput={(e) => {
                              if (e.currentTarget.value.length === 0) {
                                travelerError[index].documents = {
                                  ...travelerError[index].documents,
                                  nationality: "Nationality is required",
                                };
                                return;
                              }

                              _.documents.nationality = e.currentTarget.value;
                            }}
                          />
                          <!-- <Nationality
                            value={_.documents.nationality}
                            index={`${index + 1}`}
                            error={travelerError &&
                              travelerError[index].documents.nationality
                                .length > 0}
                            onInput={(e) => {
                              if (e.currentTarget.value.length === 0) {
                                travelerError[index].documents = {
                                  ...travelerError[index].documents,
                                  nationality: "Nationality is required",
                                };
                                return;
                              }

                              _.documents.nationality = e.currentTarget.value;
                            }}
                          /> -->
                          {#if travelerError && travelerError[index].documents.nationality.length}
                            <span
                              class="text-xs text-red-500 font-bold leading-tight block"
                              >{travelerError[index].documents
                                .nationality}</span
                            >
                          {/if}
                        </div>

                        <div class="grid w-full relative">
                          <label
                            for="dob-{index + 2}"
                            class="after:content-['*'] after:text-lg after:ml-0.5 after:text-red-500 font-semibold text-xs flex items-center gap-x-1"
                            >Date of birth</label
                          >
                          <input
                            bind:value={_.dateOfBirth}
                            on:input={(e) => {
                              if (e.currentTarget.value.length < 1) {
                                travelerError[index].dateOfBirth =
                                  "Date of birth is required";
                                return;
                              }
                              travelerError[index].dateOfBirth = "";
                            }}
                            required
                            type="date"
                            name="dob"
                            id="dob"
                            class="w-full border {travelerError &&
                            travelerError[index].dateOfBirth.length
                              ? 'border-red-500'
                              : 'border-neutral-300'} bg-neutral-100 px-4 py-2 text-sm focus:outline-none"
                          />
                          {#if travelerError && travelerError[index].dateOfBirth.length}
                            <span
                              class="text-xs text-red-500 font-bold leading-tight block"
                              >{travelerError[index].dateOfBirth}</span
                            >
                          {/if}
                        </div>

                        <div class="grid w-full">
                          <label
                            for="gender"
                            class="after:content-['*'] after:text-lg after:ml-0.5 after:text-red-500 font-semibold text-xs flex items-center gap-x-1"
                            >Gender</label
                          >
                          <select
                            bind:value={_.gender}
                            on:input={(e) => {
                              if (e.currentTarget.value.length < 1) {
                                travelerError[index].gender =
                                  "Gender is required";
                                return;
                              }
                              travelerError[index].gender = "";
                            }}
                            required
                            name="gender"
                            id="gender"
                            class="w-full border {travelerError &&
                            travelerError[index].gender.length
                              ? 'border-red-500'
                              : 'border-neutral-300'} bg-neutral-100 py-2 px-4 text-sm focus:outline-none flex items-center2"
                          >
                            <option value="">Select an option</option>
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                          </select>
                          {#if travelerError && travelerError[index].gender.length}
                            <span
                              class="text-xs text-red-500 font-bold leading-tight block"
                              >{travelerError[index].gender}</span
                            >
                          {/if}
                        </div>
                      </div>

                      <div
                        class="flex flex-col gap-y-5 md:grid md:grid-cols-3 gap-x-3 items-start"
                      >
                        <div class="w-full">
                          <label
                            for="passport-id"
                            class="after:content-['*'] after:text-lg after:ml-0.5 after:text-red-500 font-semibold text-xs w-max flex flex-row items-center gap-x-1"
                          >
                            Passport Number</label
                          >
                          <input
                            bind:value={_.documents.number}
                            on:input={(e) => {
                              if (e.currentTarget.value.length < 1) {
                                travelerError[index].documents = {
                                  ...travelerError[index].documents,
                                  number: "Passport number is required",
                                };
                                return;
                              }

                              if (e.currentTarget.value.length > 9) {
                                travelerError[index].documents = {
                                  ...travelerError[index].documents,
                                  number:
                                    "Passport number must not be more than 9 characters",
                                };
                                return;
                              }
                              travelerError[index].documents = {
                                ...travelerError[index].documents,
                                number: "",
                              };
                              _.documents.number = e.currentTarget.value;
                            }}
                            type="text"
                            name="passport-id"
                            class="w-full border {travelerError &&
                            travelerError[index].documents.number.length
                              ? 'border-red-500'
                              : 'border-neutral-300'} bg-neutral-100 px-4 py-2 text-sm focus:outline-none"
                          />
                          {#if travelerError && travelerError[index].documents}
                            <span
                              class="text-xs text-red-500 font-bold leading-tight block"
                              >{travelerError[index].documents.number}</span
                            >
                          {/if}
                        </div>

                        <div class="w-full">
                          <label
                            for="passport-iss"
                            class="after:content-['*'] after:text-lg after:ml-0.5 after:text-red-500 font-semibold text-xs w-max flex flex-row items-center gap-x-1"
                          >
                            Passport Issuance Date
                          </label>
                          <input
                            bind:value={_.documents.issuanceDate}
                            on:input={(e) => {
                              if (e.currentTarget.value.length < 1) {
                                travelerError[index].documents = {
                                  ...travelerError[index].documents,
                                  issuanceDate:
                                    "Passport issuance date is required",
                                };
                                return;
                              }

                              travelerError[index].documents = {
                                ...travelerError[index].documents,
                                issuanceDate: "",
                              };
                              _.documents.issuanceDate = e.currentTarget.value;
                            }}
                            type="date"
                            name="passport-iss"
                            class="w-full border {travelerError &&
                            travelerError[index].documents.issuanceDate.length
                              ? 'border-red-500'
                              : 'border-neutral-300'} bg-neutral-100 px-4 py-2 text-sm focus:outline-none"
                          />
                          {#if travelerError && travelerError[index].documents}
                            <span
                              class="text-xs text-red-500 font-bold leading-tight block"
                              >{travelerError[index].documents
                                .issuanceDate}</span
                            >
                          {/if}
                        </div>

                        <div class="w-full">
                          <label
                            for="passport-exp"
                            class="after:content-['*'] after:text-lg after:ml-0.5 after:text-red-500 font-semibold text-xs w-max flex flex-row items-center gap-x-1"
                          >
                            Passport Expiration Date
                          </label>
                          <input
                            bind:value={_.documents.expiryDate}
                            on:input={(e) => {
                              if (e.currentTarget.value.length < 1) {
                                travelerError[index].documents = {
                                  ...travelerError[index].documents,
                                  expiryDate:
                                    "Passport expiry date is required",
                                };
                                return;
                              }

                              travelerError[index].documents = {
                                ...travelerError[index].documents,
                                expiryDate: "",
                              };
                              _.documents.expiryDate = e.currentTarget.value;
                            }}
                            type="date"
                            name="passport-exp"
                            class="w-full border {travelerError &&
                            travelerError[index].documents.expiryDate.length
                              ? 'border-red-500'
                              : 'border-neutral-300'} bg-neutral-100 px-4 py-2 text-sm focus:outline-none"
                          />
                          {#if travelerError && travelerError[index].documents}
                            <span
                              class="text-xs text-red-500 font-bold leading-tight block"
                              >{travelerError[index].documents.expiryDate}</span
                            >
                          {/if}
                        </div>

                        <div class="w-full">
                          <label
                            for="passport-iss-country"
                            class="after:content-['*'] after:text-lg after:ml-0.5 after:text-red-500 font-semibold text-xs w-max flex flex-row items-center gap-x-1"
                          >
                            Passport Issuance Country
                          </label>
                          <Countries
                            value={_.documents.issuanceCountry}
                            error={travelerError &&
                              travelerError[index].documents.issuanceCountry
                                .length > 0}
                            index={`${index}`}
                            onInput={(e) => {
                              if (e.currentTarget.value.length < 1) {
                                travelerError[index].documents = {
                                  ...travelerError[index].documents,
                                  issuanceCountry:
                                    "Passport issuance country is required",
                                };
                                return;
                              }

                              travelerError[index].documents = {
                                ...travelerError[index].documents,
                                issuanceCountry: "",
                              };
                              _.documents.issuanceCountry =
                                e.currentTarget.value;
                            }}
                          />
                          {#if travelerError && travelerError[index].documents}
                            <span
                              class="text-xs text-red-500 font-bold leading-tight block"
                              >{travelerError[index].documents
                                .issuanceCountry}</span
                            >
                          {/if}
                        </div>
                      </div>
                    </div>
                  {/if}
                </div>
              {/each}
            </div>
          {/if}
        </div>

        <div
          class="w-full h-full flex flex-col md:max-w-[300px] xl:max-w-[370px]"
        >
          <div class="grid w-full gap-y-8 sticky top-0">
            <div
              class="hidden lg:block w-full rounded-md border border-neutral-300 bg-white py-4 px-6"
            >
              {#if flightData}
                <div class="grid gap-y-4">
                  {#each flightData.itineraries as flight, index}
                    <div class="flex flex-col">
                      <div class="flex items-center gap-x-2 mb-2">
                        <Takeoff />
                        {#each flight.segments as segment}
                          <div
                            class="flex items-center gap-x-1 font-semibold text-neutral-700 text-lg"
                          >
                            <p>
                              {segment.departure.iataCode}
                            </p>
                            <FlightIcon class="text-neutral-700" />
                            <p>
                              {segment.arrival.iataCode}
                            </p>
                          </div>
                        {/each}
                      </div>

                      <div
                        class="grid items-center text-sm {flightData.itineraries
                          .length >
                        index + 1
                          ? 'border-b pb-3'
                          : ''}"
                      >
                        <div class="flex items-center gap-x-2">
                          <Clock />
                          <div
                            class="flex gap-x-[3px] font-semibold text-neutral-700"
                          >
                            <p>
                              {new window.Date(flight.segments[0].departure.at)
                                .toLocaleString("en-GB", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: true,
                                })
                                .replace(",", "")}
                            </p>
                            <p>{"-"}</p>
                            <p>
                              {new window.Date(flight.segments[0].arrival.at)
                                .toLocaleString("en-GB", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: true,
                                })
                                .replace(",", "")}
                            </p>
                          </div>
                        </div>
                        <div class="flex items-center gap-x-2 font-semibold">
                          <DateIcon />
                          <p class="text-neutral-700">
                            {new window.Date(flight.segments[0].arrival.at)
                              .toLocaleString("en-GB", {
                                weekday: "short",
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })
                              .replace(",", "")}
                          </p>
                        </div>
                        <div class="flex items-center gap-x-2 font-semibold">
                          <Airline />
                          <p class="text-neutral-700">
                            {flightData.dictionaries &&
                              flightData.dictionaries.carriers[
                                flightData.itineraries[0].segments[0]
                                  .carrierCode
                              ]}
                          </p>
                        </div>
                      </div>
                    </div>
                  {/each}
                </div>
              {/if}
            </div>

            <!-- Flight Price Summary -->
            {#if flightData}
              <div
                class="w-full rounded-md border border-neutral-300 bg-white py-4 px-6"
              >
                <div class="font-bold text-neutral-700">
                  <h1>Price Summary</h1>
                </div>

                <div class="grid gap-y-5 mt-3">
                  <div class="grid gap-y-2">
                    {#if flightData.travelerPricings.length > 0}
                      <div class="grid mb-2">
                        <div class="flex items-center justify-between">
                          <div class="flex gap-x-2 items-center">
                            <Person />
                            <div class="flex items-center justify-between">
                              <div class="info">
                                <p>
                                  {calculateNoOfPersons(
                                    {
                                      travelerPricings:
                                        flightData.travelerPricings,
                                    },
                                    "ADULT"
                                  )}x Adult
                                </p>
                              </div>
                            </div>
                          </div>
                          <p class="font-bold text-xs">
                            {calculatePersonsFare(
                              {
                                travelerPricings: flightData.travelerPricings,
                              },
                              "ADULT",
                              "total"
                            ).toFixed(2)}
                            {flightData.price.currency}
                          </p>
                        </div>

                        <div class="flex items-center justify-between">
                          <div class="flex items-center gap-x-2">
                            <div class="w-[1em]"></div>
                            <p>Base fare</p>
                          </div>
                          <p class="font-bold text-xs">
                            {calculatePersonsFare(
                              {
                                travelerPricings: flightData.travelerPricings,
                              },
                              "ADULT",
                              "base"
                            ).toFixed(2)}
                            {flightData.price.currency}
                          </p>
                        </div>
                      </div>

                      {#if calculateNoOfPersons({ travelerPricings: flightData.travelerPricings }, "CHILD") > 0}
                        <div class="grid mb-2">
                          <div class="flex justify-between items-center">
                            <div class="flex items-center gap-x-2">
                              <Person />
                              <div class="flex justify-between">
                                <div class="info">
                                  <p>
                                    {calculateNoOfPersons(
                                      {
                                        travelerPricings:
                                          flightData.travelerPricings,
                                      },
                                      "CHILD"
                                    )}x Child
                                  </p>
                                </div>
                              </div>
                            </div>
                            <p class="font-bold text-xs">
                              {calculatePersonsFare(
                                {
                                  travelerPricings: flightData.travelerPricings,
                                },
                                "CHILD",
                                "total"
                              ).toFixed(2)}
                              {flightData.price.currency}
                            </p>
                          </div>
                          <div class="flex items-center justify-between">
                            <div class="flex items-center gap-x-2">
                              <div class="w-[1em]"></div>
                              <p>Base fare</p>
                            </div>
                            <p class="font-bold text-xs">
                              {calculatePersonsFare(
                                {
                                  travelerPricings: flightData.travelerPricings,
                                },
                                "CHILD",
                                "base"
                              ).toFixed(2)}
                              {flightData.price.currency}
                            </p>
                          </div>
                        </div>
                      {/if}

                      {#if calculateNoOfPersons({ travelerPricings: flightData.travelerPricings }, "HELD_INFANT") > 0}
                        <div class="grid mb-2">
                          <div class="flex justify-between items-center">
                            <div class="flex items-center gap-x-2">
                              <Person />
                              <div class="flex justify-between">
                                <div class="info">
                                  <p>
                                    {calculateNoOfPersons(
                                      {
                                        travelerPricings:
                                          flightData.travelerPricings,
                                      },
                                      "HELD_INFANT"
                                    )}x Infant
                                  </p>
                                </div>
                              </div>
                            </div>
                            <p>
                              {#if calculatePersonsFare({ travelerPricings: flightData.travelerPricings }, "HELD_INFANT", "base") > 0}
                                {calculatePersonsFare(
                                  {
                                    travelerPricings:
                                      flightData.travelerPricings,
                                  },
                                  "HELD_INFANT",
                                  "base"
                                )}
                                {flightData.price.currency}
                              {:else}
                                -
                              {/if}
                            </p>
                          </div>
                          <div class="flex items-center justify-between">
                            <div class="flex items-center gap-x-2">
                              <div class="w-[1em]"></div>
                              <p>Flight fare</p>
                            </div>
                            <p>
                              {#if calculatePersonsFare({ travelerPricings: flightData.travelerPricings }, "HELD_INFANT", "total") > 0}
                                {calculatePersonsFare(
                                  {
                                    travelerPricings:
                                      flightData.travelerPricings,
                                  },
                                  "HELD_INFANT",
                                  "total"
                                )}
                                {flightData.price.currency}
                              {:else}
                                -
                              {/if}
                            </p>
                          </div>
                        </div>
                      {/if}
                    {/if}
                  </div>

                  <div class="grid pt-5 gap-y-2 border-t">
                    {#if flightData && flightData.travelerPricings}
                      <!-- <div class="flex justify-between items-center">
                        <div class="flex gap-x-2 items-center">
                          <Label />
                          <p>Total Base Fares</p>
                        </div>
                        <p class="font-bold text-xs">
                          {flightData.price.base}
                          {flightData.price.currency}
                        </p>
                      </div> -->

                      <div class="flex justify-between items-center">
                        <div class="flex gap-x-2 items-center">
                          <Label />
                          <p>Total Flight Fares</p>
                        </div>
                        <p class="font-bold text-xs">
                          {flightData.price.total}
                          {flightData.price.currency}
                        </p>
                      </div>
                    {/if}
                  </div>

                  <div class="grid pt-5 gap-y-2 border-t">
                    {#if flightData && flightData.travelerPricings}
                      <div
                        class="flex items-center justify-between font-bold text-lg"
                      >
                        <p>Total</p>
                        <p>
                          {parseFloat(flightData.price.grandTotal).toFixed(2)}
                          {flightData.price.currency}
                        </p>
                      </div>
                    {/if}
                    <div class="w-full grid gap-y-2 justify-ed mt-8">
                      <button
                        type="button"
                        on:click={() => {
                          if (flightData) {
                            if (
                              confirmInput(
                                $primaryPassenger,
                                $form.travelers,
                                false
                              )
                            )
                              window.location.href = "/flight/book/done";
                            return;
                          }
                        }}
                        class="btn-primary !bg-transparent !text-blue-500 !border !border-blue-500"
                        >Book now & Pay later</button
                      >
                      <p class="text-center">OR</p>
                      <button
                        type="button"
                        on:click={() => {
                          if (flightData)
                            confirmInput(
                              $primaryPassenger,
                              $form.travelers,
                              true
                            );
                        }}
                        class="btn-primary">Make payment Now</button
                      >
                    </div>
                  </div>
                </div>
              </div>
            {/if}
          </div>
        </div>
      </form>
    </section>
  </div>

  <!-- Modal -->
  {#if displayCCModal}
    <div class="fixed inset-0 z-[9999] overflow-y-auto">
      <div class="flex items-cener justify-cnter min-h-screen px-4 sm:px-0">
        <div class="fixed inset-0 bg-black opacity-75"></div>

        <div class="flex flex-col m-auto items-center">
          {#if cardPaymentError}
            <div
              class="mb-4 rounded-lg p-6 max-w-xl w-full mx-auto z-50 relative h-fit bg-red-500"
            >
              <div class="text-white flex font-bold items-center gap-3">
                <ErrorIcon class="w-8 h-8" />
                <p class="flex-1 leading-[18px]">
                  {cardPaymentErrorMsg
                    ? cardPaymentErrorMsg
                    : "Payment Failed. Please try again or use another another card."}
                </p>
              </div>
            </div>
          {/if}

          {#if displayCCFieldsErr}
            <div
              class="mb-4 rounded-lg p-6 max-w-xl w-full mx-auto z-50 relative h-fit bg-yellow-500"
            >
              <div class="text-white flex text-xl font-bold items-center gap-3">
                <Warning class="w-8 h-8" />
                <p>Additional information required to proceed</p>
              </div>
            </div>
          {/if}

          <div
            class="bg-white rounded-lg p-6 max-w-xl w-full mx-auto z-50 relative h-fit"
          >
            <!-- Modal content -->
            <div class="flex justify-between items-center">
              <h2 class="text-xl font-bold">Payment details</h2>

              <button
                on:click={() => {
                  displayCCModal = false;
                }}
                class="p-2 rounded-full border border-neutral-300"
              >
                <Close class="w-8 h-8" />
              </button>
            </div>

            <div class="mt-8">
              <form
                use:BookingEnhance
                method="post"
                on:input={() => {
                  cardPaymentError = false;
                  paymentLoading = false;
                  displayCCFieldsErr = false;

                  if (hasNonEmptyField($BookingPaymentForm))
                    paymentBtnDisabled = false;
                }}
              >
                <div class="flex justify-between items-start gap-x-3">
                  <div class="card-holder-name w-full">
                    <label for="card-name" class="text-sm font-semibold"
                      >Name on card</label
                    >
                    <input
                      bind:value={$BookingPaymentForm.name}
                      on:change={(e) => {
                        if (e.currentTarget.value.length < 1) {
                          bookingPaymentErrors.errors = {
                            ...bookingPaymentErrors.errors,
                            name: ["Card holder name is required"],
                          };

                          return;
                        }

                        if (e.currentTarget.value.length > 24) {
                          bookingPaymentErrors.errors = {
                            ...bookingPaymentErrors.errors,
                            name: ["Card number is invalid"],
                          };

                          return;
                        }

                        bookingPaymentErrors.errors = {
                          ...bookingPaymentErrors.errors,
                          name: [],
                        };
                      }}
                      type="text"
                      name="card-name"
                      id="card-name"
                      class="w-full px-4 py-2 border {bookingPaymentErrors &&
                      bookingPaymentErrors?.errors?.name?.length
                        ? 'border-red-500'
                        : 'border-neutral-300'} rounded-md focus:outline-none"
                      placeholder="Full name"
                      required
                    />
                    {#if bookingPaymentErrors && bookingPaymentErrors.errors.name}
                      <span class="text-red-500 leading-tight text-sm"
                        >{bookingPaymentErrors.errors.name}</span
                      >
                    {/if}
                  </div>

                  <div class="w-full max-w-[150px]">
                    <label for="card-expiry" class="text-sm font-semibold">
                      Expiry
                    </label>
                    <div class="flex items-start gap-x-3">
                      <div class="grid w-full">
                        <input
                          bind:value={$BookingPaymentForm.month}
                          on:input={(e) => {
                            if (e.currentTarget.value.length < 1) {
                              bookingPaymentErrors.errors = {
                                ...bookingPaymentErrors.errors,
                                month: ["Required"],
                              };

                              return;
                            }

                            if (!parseInt(e.currentTarget.value)) {
                              bookingPaymentErrors.errors = {
                                ...bookingPaymentErrors.errors,
                                month: ["Invalid"],
                              };

                              return;
                            }

                            if (parseInt(e.currentTarget.value) > 12) {
                              bookingPaymentErrors.errors = {
                                ...bookingPaymentErrors.errors,
                                month: ["Invalid month"],
                              };

                              return;
                            }

                            bookingPaymentErrors.errors = {
                              ...bookingPaymentErrors.errors,
                              month: [],
                            };
                          }}
                          type="text"
                          name="card-expiry"
                          id="card-expiry-month"
                          class="w-full px-4 py-2 border {bookingPaymentErrors &&
                          bookingPaymentErrors?.errors?.month?.length
                            ? 'border-red-500'
                            : 'border-neutral-300'} rounded-md focus:outline-none max-w-[100px] text-center"
                          placeholder="MM"
                          minlength="2"
                          maxlength="2"
                          pattern="[0-9]*"
                          inputmode="numeric"
                          required
                        />
                        {#if bookingPaymentErrors && bookingPaymentErrors.errors.month}
                          <span class="text-red-500 leading-tight text-sm"
                            >{bookingPaymentErrors.errors.month}</span
                          >
                        {/if}
                      </div>
                      <div class="grid w-full">
                        <input
                          bind:value={$BookingPaymentForm.year}
                          on:input={(e) => {
                            if (e.currentTarget.value.length < 1) {
                              bookingPaymentErrors.errors = {
                                ...bookingPaymentErrors.errors,
                                year: ["Required"],
                              };

                              return;
                            }

                            if (!parseInt(e.currentTarget.value)) {
                              bookingPaymentErrors.errors = {
                                ...bookingPaymentErrors.errors,
                                year: ["Invalid"],
                              };

                              return;
                            }

                            if (
                              parseInt(e.currentTarget.value) <
                              new Date().getFullYear()
                            ) {
                              bookingPaymentErrors.errors = {
                                ...bookingPaymentErrors.errors,
                                year: ["Invalid year"],
                              };

                              return;
                            }

                            bookingPaymentErrors.errors = {
                              ...bookingPaymentErrors.errors,
                              year: [],
                            };
                          }}
                          type="text"
                          name="card-expiry-year"
                          id="card-expiry"
                          class="w-full px-4 py-2 border {bookingPaymentErrors &&
                          bookingPaymentErrors?.errors?.year?.length
                            ? 'border-red-500'
                            : 'border-neutral-300'} rounded-md focus:outline-none max-w-[130px] text-center"
                          placeholder="YYYY"
                          minlength="2"
                          maxlength="4"
                          pattern="[0-9]*"
                          inputmode="numeric"
                          required
                        />
                        {#if bookingPaymentErrors && bookingPaymentErrors.errors.year}
                          <span class="text-red-500 leading-tight text-sm"
                            >{bookingPaymentErrors.errors.year}</span
                          >
                        {/if}
                      </div>
                    </div>
                  </div>
                </div>

                <div class="flex justify-between items-start gap-x-3 mt-7">
                  <div class="card-number w-full">
                    <label for="card-number" class="text-sm font-semibold"
                      >Card Number</label
                    >
                    <input
                      bind:value={$BookingPaymentForm.cardNumber}
                      on:input={(e) => {
                        if (e.currentTarget.value.length < 1) {
                          bookingPaymentErrors.errors = {
                            ...bookingPaymentErrors.errors,
                            cardNumber: ["Card number is required"],
                          };

                          return;
                        }

                        if (e.currentTarget.value.length > 20) {
                          bookingPaymentErrors.errors = {
                            ...bookingPaymentErrors.errors,
                            cardNumber: ["Card number is invalid"],
                          };

                          return;
                        }

                        if (
                          e.currentTarget.value !== "0" &&
                          (!parseInt(e.currentTarget.value) ||
                            !Number(e.currentTarget.value))
                        ) {
                          bookingPaymentErrors.errors = {
                            ...bookingPaymentErrors.errors,
                            cardNumber: ["Card number is invalid"],
                          };

                          return;
                        }

                        bookingPaymentErrors.errors = {
                          ...bookingPaymentErrors.errors,
                          cardNumber: [],
                        };
                      }}
                      type="text"
                      class="w-full px-4 py-2 border {bookingPaymentErrors &&
                      bookingPaymentErrors?.errors?.cardNumber?.length
                        ? 'border-red-500'
                        : 'border-neutral-300'} rounded-md focus:outline-none"
                      placeholder="0000 0000 0000 0000"
                      required
                    />
                    {#if bookingPaymentErrors && bookingPaymentErrors.errors.cardNumber}
                      <span class="text-red-500 leading-tight text-sm"
                        >{bookingPaymentErrors.errors.cardNumber}</span
                      >
                    {/if}
                  </div>

                  <div class="card-cvv max-w-[150px]">
                    <label for="card-cvv" class="text-sm font-semibold"
                      >CVV</label
                    >
                    <input
                      bind:value={$BookingPaymentForm.cvv}
                      on:input={(e) => {
                        if (e.currentTarget.value.length < 1) {
                          bookingPaymentErrors.errors = {
                            ...bookingPaymentErrors.errors,
                            cvv: ["CVV is required"],
                          };

                          return;
                        }

                        if (e.currentTarget.value.length > 3) {
                          bookingPaymentErrors.errors = {
                            ...bookingPaymentErrors.errors,
                            cvv: ["CVV is invalid"],
                          };

                          return;
                        }

                        if (
                          e.currentTarget.value !== "0" &&
                          (!parseInt(e.currentTarget.value) ||
                            !Number(e.currentTarget.value))
                        ) {
                          bookingPaymentErrors.errors = {
                            ...bookingPaymentErrors.errors,
                            cvv: ["CVV is invalid"],
                          };

                          return;
                        }

                        bookingPaymentErrors.errors = {
                          ...bookingPaymentErrors.errors,
                          cvv: [],
                        };
                      }}
                      type="text"
                      class="w-full px-4 py-2 border {bookingPaymentErrors &&
                      bookingPaymentErrors?.errors?.cvv?.length
                        ? 'border-red-500'
                        : 'border-neutral-300'} rounded-md focus:outline-none"
                      placeholder="123"
                      maxlength="3"
                      required
                    />
                    {#if bookingPaymentErrors && bookingPaymentErrors.errors.cvv}
                      <span class="text-red-500 leading-tight text-sm"
                        >{bookingPaymentErrors.errors.cvv}</span
                      >
                    {/if}
                  </div>
                </div>

                {#if displayCCFields}
                  <div class="grid">
                    <div class="flex justify-between items-start gap-x-3 mt-7">
                      <div class="country w-full">
                        <label for="country" class="text-sm font-semibold"
                          >Country</label
                        >
                        <Countries
                          classes="!py-[11px] rounded-md !bg-white"
                          value={$BookingPaymentForm.country}
                          error={!!bookingPaymentErrors?.errors?.country
                            ?.length}
                          onInput={(e) => {
                            if (e.currentTarget.value.length < 1) {
                              bookingPaymentErrors.errors = {
                                ...bookingPaymentErrors.errors,
                                country: ["Country is required"],
                              };

                              return;
                            }

                            $BookingPaymentForm.country = e.currentTarget.value;

                            bookingPaymentErrors.errors = {
                              ...bookingPaymentErrors.errors,
                              country: [],
                            };
                          }}
                        />
                        {#if bookingPaymentErrors && bookingPaymentErrors.errors.country}
                          <span class="text-red-500 leading-tight text-sm"
                            >{bookingPaymentErrors.errors.country}</span
                          >
                        {/if}
                      </div>

                      <div class="state w-full">
                        <label for="state" class="text-sm font-semibold"
                          >State</label
                        >
                        <input
                          bind:value={$BookingPaymentForm.state}
                          on:input={(e) => {
                            if (e.currentTarget.value.length < 1) {
                              bookingPaymentErrors.errors = {
                                ...bookingPaymentErrors.errors,
                                state: ["State is required"],
                              };

                              return;
                            }

                            bookingPaymentErrors.errors = {
                              ...bookingPaymentErrors.errors,
                              state: [],
                            };
                          }}
                          type="text"
                          class="w-full px-4 py-2 border {bookingPaymentErrors &&
                          bookingPaymentErrors?.errors?.state?.length
                            ? 'border-red-500'
                            : 'border-neutral-300'} rounded-md focus:outline-none"
                          placeholder="Ahafo"
                          required
                          name="state"
                        />
                        {#if bookingPaymentErrors && bookingPaymentErrors.errors.state}
                          <span class="text-red-500 leading-tight text-sm"
                            >{bookingPaymentErrors.errors.state}</span
                          >
                        {/if}
                      </div>

                      <div class="city w-full">
                        <label for="city" class="text-sm font-semibold"
                          >City</label
                        >
                        <input
                          bind:value={$BookingPaymentForm.city}
                          on:input={(e) => {
                            if (e.currentTarget.value.length < 1) {
                              bookingPaymentErrors.errors = {
                                ...bookingPaymentErrors.errors,
                                city: ["City is required"],
                              };

                              return;
                            }

                            bookingPaymentErrors.errors = {
                              ...bookingPaymentErrors.errors,
                              city: [],
                            };
                          }}
                          type="text"
                          class="w-full px-4 py-2 border {bookingPaymentErrors &&
                          bookingPaymentErrors?.errors?.city?.length
                            ? 'border-red-500'
                            : 'border-neutral-300'} rounded-md focus:outline-none"
                          placeholder="Takoradi"
                          required
                          name="city"
                        />
                        {#if bookingPaymentErrors && bookingPaymentErrors.errors.city}
                          <span class="text-red-500 leading-tight text-sm"
                            >{bookingPaymentErrors.errors.city}</span
                          >
                        {/if}
                      </div>
                    </div>

                    <div class="flex justify-between items-start gap-x-3 mt-7">
                      <div class="address w-full">
                        <label for="address" class="text-sm font-semibold"
                          >Address</label
                        >
                        <input
                          bind:value={$BookingPaymentForm.address}
                          on:input={(e) => {
                            if (e.currentTarget.value.length < 1) {
                              bookingPaymentErrors.errors = {
                                ...bookingPaymentErrors.errors,
                                address: ["Address is required"],
                              };

                              return;
                            }

                            formData.append("address", e.currentTarget.value);

                            bookingPaymentErrors.errors = {
                              ...bookingPaymentErrors.errors,
                              address: [],
                            };
                          }}
                          type="text"
                          class="w-full px-4 py-2 border {bookingPaymentErrors &&
                          bookingPaymentErrors?.errors?.address?.length
                            ? 'border-red-500'
                            : 'border-neutral-300'} rounded-md focus:outline-none"
                          placeholder="45 Kofi Annan St, Accra,"
                          required
                          name="address"
                        />
                        {#if bookingPaymentErrors && bookingPaymentErrors.errors.address}
                          <span class="text-red-500 leading-tight text-sm"
                            >{bookingPaymentErrors.errors.address}</span
                          >
                        {/if}
                      </div>

                      <div class="zipcode w-full">
                        <label for="zipcode" class="text-sm font-semibold"
                          >Zip code</label
                        >
                        <input
                          bind:value={$BookingPaymentForm.zipCode}
                          on:input={(e) => {
                            if (e.currentTarget.value.length < 1) {
                              bookingPaymentErrors.errors = {
                                ...bookingPaymentErrors.errors,
                                zipCode: ["Zipcode is required"],
                              };

                              return;
                            }

                            bookingPaymentErrors.errors = {
                              ...bookingPaymentErrors.errors,
                              zipCode: [],
                            };
                          }}
                          type="text"
                          class="w-full px-4 py-2 border {bookingPaymentErrors &&
                          bookingPaymentErrors?.errors?.zipCode?.length
                            ? 'border-red-500'
                            : 'border-neutral-300'} rounded-md focus:outline-none"
                          placeholder="12345"
                          required
                          name="zipcode"
                        />
                        {#if bookingPaymentErrors && bookingPaymentErrors.errors.zipCode}
                          <span class="text-red-500 leading-tight text-sm"
                            >{bookingPaymentErrors.errors.zipCode}</span
                          >
                        {/if}
                      </div>
                    </div>
                  </div>
                {/if}

                <div class="block mt-7">
                  <div class="flex justify-between items-center">
                    <p class="font-bold">Total</p>
                    <p class="font-bold">
                      {parseFloat(flightData.price.grandTotal).toFixed(2)}
                      {flightData.price.currency}
                    </p>
                  </div>
                </div>

                <div class="w-full mt-7">
                  <button
                    type="button"
                    on:click={async () => {
                      paymentLoading = true;
                      cardPaymentError = false;

                      if (flightData) {
                        $BookingPaymentForm.totalAmount =
                          flightData.price.grandTotal;
                        // confirmInput($primaryPassenger, $form.travelers);

                        formData.append("fullname", $BookingPaymentForm.name);
                        formData.append("month", $BookingPaymentForm.month);

                        formData.append("year", $BookingPaymentForm.year);
                        formData.append(
                          "card_number",
                          $BookingPaymentForm.cardNumber
                        );

                        formData.append("cvv", $BookingPaymentForm.cvv);
                        formData.append(
                          "totalAmount",
                          $BookingPaymentForm.totalAmount
                        );

                        formData.append(
                          "email",
                          $primaryPassenger.contact.emailAddress
                        );

                        // formData.append("country", $BookingPaymentForm.country);
                        // formData.append("city", $BookingPaymentForm.city);

                        // formData.append("state", $BookingPaymentForm.state);
                        // formData.append("address", $BookingPaymentForm.address);

                        // formData.append("zipCode", $BookingPaymentForm.zipCode);

                        if (updatePayment) {
                          formData.append("updatePayment", "true");

                          formData.append(
                            "country",
                            $BookingPaymentForm.country
                          );
                          formData.append("city", $BookingPaymentForm.city);

                          formData.append("state", $BookingPaymentForm.state);
                          formData.append(
                            "address",
                            $BookingPaymentForm.address
                          );

                          formData.append(
                            "zipCode",
                            $BookingPaymentForm.zipCode
                          );

                          let req = await fetch("/api/book/pay", {
                            method: "POST",
                            body: formData,
                          });

                          let resp = await req.json();

                          console.log(
                            "this should work now == redirect",
                            resp,
                            formData.get("address"),
                            $BookingPaymentForm.address
                          );

                          if (!resp.data && resp.status === "error") {
                            paymentLoading = false;
                            cardPaymentError = true;
                            cardPaymentErrorMsg = resp.message;
                            return;
                          }

                          if (
                            resp.meta &&
                            resp.meta.authorization &&
                            resp.meta.authorization.mode === "redirect"
                          ) {
                            window.location.href =
                              resp.meta.authorization.redirect;
                            return;
                          }

                          return;
                        }

                        try {
                          let req = await fetch("/api/book/pay", {
                            method: "POST",
                            body: formData,
                          });

                          let resp = await req.json();

                          console.log("conf", resp);

                          if (!resp.data && resp.status === "error") {
                            paymentLoading = false;
                            cardPaymentError = true;
                            pinLoading = false;
                            isBookingLoading = false;
                            cardPaymentErrorMsg = resp.message;
                            return;
                          }

                          if (
                            resp.meta &&
                            resp.meta.authorization &&
                            resp.meta.authorization.mode === "redirect"
                          ) {
                            window.location.href =
                              resp.meta.authorization.redirect;
                            return;
                          }

                          if (
                            resp.meta &&
                            resp.meta.authorization.mode === "pin"
                          ) {
                            // display pin modal
                            displayPinModal = true;
                            paymentLoading = false;
                            return;
                          }

                          if (
                            resp.meta &&
                            resp.meta.authorization &&
                            resp.meta.authorization.mode === "avs_noauth"
                          ) {
                            formData.set("mode", "avs_noauth");

                            bookingPaymentErrors.errors = {
                              ...bookingPaymentErrors.errors,
                              country: ["Country is required"],
                              city: ["City is required"],
                              state: ["State is required"],
                              address: ["Address is required"],
                              zipCode: ["Zipcode is required"],
                            };

                            displayCCFields = true;
                            paymentLoading = false;
                            updatePayment = true;
                            displayCCFieldsErr = true;

                            return;
                          }

                          paymentLoading = false;

                          if (
                            resp.data &&
                            resp.data.auth_url &&
                            resp.data.flw_ref &&
                            resp.data.status === "successful"
                          ) {
                            displayCCModal = false;

                            acts.add({
                              mode: "success",
                              message: "Payment successful",
                              lifetime: 4,
                            });

                            let respData = {
                              id: resp.data.id,
                              tx_ref: resp.data.tx_ref,
                              flw_ref: resp.data.flw_ref,
                              status: resp.data.status,
                            };

                            setTimeout(() => {
                              acts.add({
                                mode: "info",
                                message: "Redirecting...",
                                lifetime: 2,
                              });
                            }, 2000);

                            setTimeout(() => {
                              const redirect_url = new URL(
                                "https://www.btmghana.net/flight/book/done"
                              );
                              // redirect_url.searchParams.set(
                              //   "response",
                              //   encodeURIComponent(JSON.stringify(respData))
                              // );
                              window.location.href = redirect_url.toString();
                            }, 5000);
                            return;
                          }

                          console.log("final result not handled yet");
                          console.log(resp);
                        } catch (err) {
                          console.log(err);
                        }
                      }
                    }}
                    disabled={paymentBtnDisabled || paymentLoading}
                    class="btn-primary {paymentLoading
                      ? 'opacity-50'
                      : ''} w-full"
                    >{paymentLoading ? "Processing" : "Proceed"}</button
                  >
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}

  {#if displayPinModal}
    <div class="fixed inset-0 z-[99999] overflow-y-auto">
      <div class="flex items-cener justify-cnter min-h-screen px-4 sm:px-0">
        <div class="fixed inset-0 bg-black opacity-75"></div>
        <div
          class="m-auto bg-white rounded-lg p-6 max-w-sm w-full mx-auto z-50 relative h-fit"
        >
          <!-- Modal content -->

          <div class="">
            <form
              method="post"
              on:input={() => {
                pinBtnDisabled = false;
              }}
            >
              <div class="pin">
                <label
                  for="pin"
                  class="after:content-['*'] after:text-lg after:ml-0.5 after:text-red-500 font-semibold w-max flex flex-row items-center gap-x-1"
                  >Enter your pin</label
                >
                <input
                  bind:value={$BookingPinForm.pin}
                  on:input={(e) => {
                    if (e.currentTarget.value.length < 1) {
                      bookingPinErrors.errors = {
                        ...bookingPinErrors.errors,
                        pin: ["Pin is required"],
                      };

                      return;
                    }

                    if (
                      e.currentTarget.value !== "0" &&
                      (!parseInt(e.currentTarget.value) ||
                        !Number(e.currentTarget.value))
                    ) {
                      bookingPinErrors.errors = {
                        ...bookingPinErrors.errors,
                        pin: ["Pin should be numeric"],
                      };

                      return;
                    }

                    bookingPinErrors.errors = {
                      ...bookingPinErrors.errors,
                      pin: [],
                    };
                  }}
                  type="password"
                  class="w-full px-4 py-2 border {bookingPinErrors &&
                  bookingPinErrors?.errors?.pin?.length
                    ? 'border-red-500'
                    : 'border-neutral-300'} rounded-md focus:outline-none"
                  placeholder="0000"
                  required
                  maxlength="4"
                  pattern="[0-9]*"
                  inputmode="numeric"
                />
                {#if bookingPinErrors && bookingPinErrors.errors.pin}
                  <span class="text-red-500 leading-tight text-sm"
                    >{bookingPinErrors.errors.pin}</span
                  >
                {/if}
              </div>

              <div class="flex justify-end mt-3 gap-3">
                <button
                  on:click={async () => {
                    pinLoading = true;
                    if (flightData) {
                      $BookingPaymentForm.totalAmount =
                        flightData.price.grandTotal;
                      // confirmInput($primaryPassenger, $form.travelers);

                      formData.append("fullname", $BookingPaymentForm.name);
                      formData.append("month", $BookingPaymentForm.month);
                      formData.append("year", $BookingPaymentForm.year);
                      formData.append(
                        "card_number",
                        $BookingPaymentForm.cardNumber
                      );
                      formData.append("cvv", $BookingPaymentForm.cvv);
                      formData.append(
                        "totalAmount",
                        $BookingPaymentForm.totalAmount
                      );
                      formData.append(
                        "email",
                        $primaryPassenger.contact.emailAddress
                      );
                      formData.append("pin", $BookingPinForm.pin);
                      formData.append("mode", "pin");

                      try {
                        let req = await fetch("/api/book/pay", {
                          method: "POST",
                          body: formData,
                        });

                        let resp = await req.json();

                        if (!resp.data && resp.status === "error") {
                          pinLoading = false;
                          cardPaymentError = true;
                          cardPaymentErrorMsg = resp.message;
                          displayPinModal = false;
                          return;
                        }

                        if (
                          resp.meta &&
                          resp.meta.authorization &&
                          resp.meta.authorization.mode === "otp"
                        ) {
                          //  display OTP modal
                          console.log("mode is otp");
                          console.log(resp);
                          formData.append("mode", resp.meta.authorization.mode);
                          displayPinModal = false;
                          displayOTPModal = true;
                          localStorage.setItem("flw_ref", resp.data.flw_ref);
                          return;
                        }

                        if (
                          resp.meta &&
                          resp.meta.authorization &&
                          resp.meta.authorization.mode === "redirect"
                        ) {
                          window.location.href =
                            resp.meta.authorization.redirect;
                          return;
                        }

                        if (
                          resp.data &&
                          resp.data.status === "successful" &&
                          !resp.meta
                        ) {
                          paymentLoading = false;
                          displayPinModal = false;
                          displayCCModal = false;

                          acts.add({
                            mode: "success",
                            message: "Payment successful",
                            lifetime: 4,
                          });

                          let respData = {
                            id: resp.data.id,
                            tx_ref: resp.data.tx_ref,
                            flw_ref: resp.data.flw_ref,
                            status: resp.data.status,
                          };

                          setTimeout(() => {
                            acts.add({
                              mode: "info",
                              message: "Redirecting...",
                              lifetime: 2,
                            });
                          }, 2000);

                          setTimeout(() => {
                            const redirect_url = new URL(
                              "https://www.btmghana.net/flight/book/done"
                            );
                            // redirect_url.searchParams.set(
                            //   "response",
                            //   encodeURIComponent(JSON.stringify(respData))
                            // );
                            window.location.href = redirect_url.toString();
                          }, 5000);
                        }
                      } catch (err) {
                        console.log(err);
                        cardPaymentErrorMsg = "An unknown error has occured";
                      }
                    }
                  }}
                  disabled={pinLoading}
                  type="button"
                  class="btn-primary {pinLoading ? 'opacity-50' : ''}"
                  >{pinLoading ? "Processing..." : "Continue"}</button
                >
                <button
                  class="btn-neutral"
                  disabled={pinLoading}
                  on:click={() => (displayPinModal = !displayPinModal)}
                  >Close</button
                >
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  {/if}

  {#if displayOTPModal}
    <div class="fixed inset-0 z-[99999] overflow-y-auto">
      <div class="flex items-cener justify-cnter min-h-screen px-4 sm:px-0">
        <div class="fixed inset-0 bg-black opacity-75"></div>

        <div
          class="m-auto bg-white rounded-lg p-6 max-w-fit w-full mx-auto z-50 relative h-fit"
        >
          <!-- Modal content -->
          <div class="">
            <form
              method="post"
              on:input={() => {
                otpBtnDisabled = false;
                otpLoading = false;
                formData.append("mode", "otp");
              }}
            >
              <div class="otp">
                <label
                  for="otp"
                  class="after:content-['*'] after:text-lg after:ml-0.5 after:text-red-500 font-semibold w-max flex flex-row items-center gap-x-1"
                  >Enter the OTP that was sent to your mobile and email</label
                >
                <input
                  bind:value={$OTPForm.otp}
                  on:input={(e) => {
                    if (e.currentTarget.value.length < 1) {
                      otpErrors.errors = {
                        ...otpErrors.errors,
                        otp: ["OTP is required"],
                      };

                      return;
                    }

                    if (
                      e.currentTarget.value !== "0" &&
                      (!parseInt(e.currentTarget.value) ||
                        !Number(e.currentTarget.value))
                    ) {
                      otpErrors.errors = {
                        ...otpErrors.errors,
                        otp: ["OTP should be numeric"],
                      };

                      return;
                    }

                    otpErrors.errors = {
                      ...otpErrors.errors,
                      otp: [],
                    };
                  }}
                  type="text"
                  class="w-full px-4 py-2 border {otpErrors &&
                  otpErrors?.errors?.otp?.length
                    ? 'border-red-500'
                    : 'border-neutral-300'} rounded-md focus:outline-none"
                  placeholder="12345"
                  required
                  maxlength="10"
                  pattern="[0-9]*"
                  inputmode="numeric"
                />
                {#if otpErrors && otpErrors.errors.otp}
                  <span class="text-red-500 leading-tight text-sm"
                    >{otpErrors.errors.otp}</span
                  >
                {/if}
              </div>

              <div class="flex justify-end mt-3 gap-3">
                <button
                  on:click={async () => {
                    otpLoading = true;
                    let flw_ref =
                      JSON.stringify(localStorage.getItem("flw_ref")) ?? "";

                    formData.set("mode", "otp");
                    formData.append("otp", $OTPForm.otp);

                    formData.append("flw_ref", JSON.parse(flw_ref));

                    //  send otp with flw_ref

                    try {
                      const req = await fetch("/api/book/pay", {
                        method: "POST",
                        body: formData,
                      });

                      const response = await req.json();

                      console.log("response", response);

                      if (
                        response.data &&
                        response.data.status === "successful"
                      ) {
                        otpLoading = false;
                        otpBtnDisabled = false;
                        displayOTPModal = false;
                        displayCCModal = false;

                        acts.add({
                          mode: "success",
                          lifetime: 4,
                          message: "Payment successful",
                        });

                        let respData = {
                          id: response.data.id,
                          tx_ref: response.data.tx_ref,
                          flw_ref: response.data.flw_ref,
                          status: response.data.status,
                        };

                        setTimeout(() => {
                          acts.add({
                            mode: "info",
                            message: "Redirecting...",
                            lifetime: 2,
                          });
                        }, 2000);

                        setTimeout(() => {
                          const redirect_url = new URL(
                            "https://www.btmghana.net/flight/book/done"
                          );
                          // redirect_url.searchParams.set(
                          //   "response",
                          //   encodeURIComponent(JSON.stringify(respData))
                          // );
                          window.location.href = redirect_url.toString();
                        }, 5000);
                      }
                    } catch (err) {
                      console.error("error", err);
                    }
                  }}
                  disabled={otpLoading || otpBtnDisabled}
                  type="button"
                  class="btn-primary {otpLoading ? 'opacity-50' : ''}"
                  >{otpLoading ? "Processing..." : "Continue"}</button
                >
                <button
                  class="btn-neutral"
                  disabled={otpLoading}
                  on:click={() => (displayOTPModal = !displayOTPModal)}
                  >Close</button
                >
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  {/if}
{/if}

<Notifications />

<style lang="postcss">
  #birthday {
    font-size: 13px;
    padding: 5px;
    width: 120px;
    border-radius: 8px;
    border-style: solid;
    border-color: RGBA(0, 0, 0, 0.1);
  }
  #birthday-span {
    margin-left: -133px;
    color: RGBA(0, 0, 0, 0.4);
    font-weight: bold;
    font-size: 15px;
  }
  .input-birthday {
    font-size: 13px;
    border: 0;
    outline: 0;
    margin: 3px;
    color: black;
  }
  #month,
  #day {
    width: 25px;
  }
  #year {
    width: 35px;
  }

  :root {
    --tadashi_svelte_notifications_zindex: 99999;
  }
</style>
