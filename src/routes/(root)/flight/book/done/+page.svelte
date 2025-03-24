<script lang="ts">
  import Loading from "$lib/components/Loading.svelte";
  import type { FlightsOfferSearchType } from "$lib/utils/flightTypes";
  import { onMount } from "svelte";
  import TelephoneInput from "./components/TelephoneInput.svelte";
  import type { PageData } from "./$types";
  import BTMLogo from "$lib/images/logo.png";
  import ConfirmIcon from "./components/ConfirmIcon.svelte";
  import NoFlight from "../../search/components/NoFlight.svelte";
  import Home from "../components/Home.svelte";
  import PrintIcon from "./components/PrintIcon.svelte";
  import DownloadIcon from "./components/DownloadIcon.svelte";

  //   export let data: PageData;
  let flightItinerary: FlightsOfferSearchType;
  let flightDetails: {
    type: string;
    id: string;
    queuingOfficeId: string;
    associatedRecords: Array<{
      reference: string;
      flightOfferId: string;
      creationDate: string;
    }>;
    flightOffers: Array<FlightsOfferSearchType>;
    travelers: Array<{
      id: string;
      name: {
        firstName: string;
        lastName: string;
      };
      documents: Array<{
        number: string;
        issuanceDate: string;
        expiryDate: string;
        issuanceCountry: string;
        nationality: string;
        documentType: string;
        holder: boolean;
      }>;
      dateOfBirth: string;
      gender: string;
      contact: {
        emailAddress: string;
        phones: Array<{
          number: string;
          countryCallingCode: string;
        }>;
      };
    }>;
    ticketingAgreement: {
      delay: string;
      option: string;
    };
  };

  let pageLoading: boolean = false;
  let pageError: boolean = false;

  onMount(async () => {
    pageLoading = true;
    const flightData = JSON.parse(
      localStorage.getItem("flightData") as string
    ) as FlightsOfferSearchType | null;

    const travelers = JSON.parse(
      localStorage.getItem("travelers") as string
    ) as Array<any>;

    if (flightData) {
      flightItinerary = flightData;
      const formData = new FormData();

      formData.append("flightData", JSON.stringify(flightData));
      formData.append("travelers", JSON.stringify(travelers));

      try {
        // Send data to the server for booking
        const response = await fetch("/api/book", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();

        flightDetails = result;

        console.log("result", flightDetails, flightItinerary);
        pageLoading = false;
        pageError = false;
        if (result.code) throw Error("Booking failed!");
        else {
          // localStorage.removeItem("travelers");
          // localStorage.removeItem("flightData");
          localStorage.removeItem("flw_ref");
          pageError = false;
        }

        // get the generated PNR

        // send an email to the user who booked the flight with their flight details included
      } catch (err) {
        console.error("Booking failed!");
        pageError = true;
        pageLoading = false;
      }
    } else {
      pageLoading = false;
      pageError = true;
    }
  });

  // function printFlightItinerary() {
  //   console.log("jhg");
  //   let printContent = document.getElementById("flight-itinerary")?.innerHTML;
  //   let originalContent = document.body.innerHTML;

  //   if (printContent) {
  //     document.body.innerHTML = printContent;
  //     window.print();
  //   } else {
  //     console.error("Print section not found.");
  //   }
  //   // Restore the original content after printing
  //   document.body.innerHTML = originalContent;
  // }

  function printFlightItinerary() {
    let printContent = document.getElementById("flight-itinerary")?.innerHTML;

    if (printContent) {
      // Create an iframe for printing
      let iframe = document.createElement("iframe");
      iframe.style.position = "absolute";
      iframe.style.width = "0px";
      iframe.style.height = "0px";
      iframe.style.border = "none";
      document.body.appendChild(iframe);

      let iframeDocument =
        iframe.contentDocument || iframe.contentWindow?.document;
      if (iframeDocument) {
        // Write the content to the iframe
        iframeDocument.open();
        iframeDocument.write(`
        <html>
          <head>
            <title>Flight Itinerary</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css">
            <!-- Include any other stylesheets here -->
            
            <style>
              /* Include your custom styles here */
              body {
                font-family: Arial, sans-serif;
                color: #333;
                margin: 0;
                padding: 0;
              }
              /* Add styles to ensure the print version looks like the web page */
              .btn-primary { display: none; } /* Hide buttons during print */
              .flight-options { display: none; }
            </style>
          </head>
          <body>${printContent}</body>
        </html>
      `);
        iframeDocument.close();

        // Clean up: remove the iframe after printing
        // setTimeout(() => document.body.removeChild(iframe), 1000);
        // Wait for the iframe to fully load before printing
        iframe.onload = () => {
          // Print the iframe content
          iframe.contentWindow?.focus();
          iframe.contentWindow?.print();

          // Clean up: remove the iframe after printing
          setTimeout(() => document.body.removeChild(iframe), 1000);
        };
      }
    } else {
      console.error("Print section not found.");
    }
  }

  $: console.log(flightItinerary);
</script>

{#if pageLoading}
  <div class="w-full pt-40 pb-20 bg-neutral-200/30 relative">
    <section class="mx-auto grid items-center justify-center">
      <div class="flex flex-col items-center">
        <Loading class="w-12 h-12" />
        <p>Please wait...</p>
      </div>
    </section>
  </div>
{:else if pageError}
  <div class="w-full pt-40 pb-20">
    <div class="grid items-center justify-center place-items-center gap-3">
      <NoFlight class="w-20 h-20 text-neutral-500" />
      <p class="text-xl font-semibold text-neutral-700 px-3 text-center">
        Booking has failed. Please try all over again
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
{:else if flightDetails && flightDetails.flightOffers.length > 0}
  <div class="min-h-screen bg-neutral-200/30 pb-20 relative flight-itinerary">
    <section class="px-5 sm:px-14 pt-16 booking-page">
      <div
        id="flight-itinerary"
        class="bg-white max-w-7xl md:max-w-4xl mx-auto py-6 px-5 sm:px-10 rounded"
      >
        <div
          class="flex flex-col md:flex-row items-center gap-y-3 sm:gap-0 justify-between border-b pb-6"
        >
          <div class="flex lg:flex-1">
            <a href="/" class="">
              <span class="sr-only">BTM</span>
              <img
                class="h-8 w-auto"
                src={BTMLogo}
                width="32"
                height="32"
                alt="BTM logo"
              />
            </a>
          </div>

          <h1 class="font-bold text-2xl text-neutral-600">Flight Itinerary</h1>
        </div>

        <div class="grid pt-8">
          <p class="text-xl font-semibold mb-6">
            Primary Passenger Information:
          </p>

          <div
            class="flex flex-col sm:grid sm:grid-cols-2 md:flex md:flex-row justify-between items-start gap-y-2 sm:gap-0 text-neutral-500"
          >
            <div class="w-full">
              <div class="w-full">
                <p class="font-bold">Full Name:</p>
                <p>
                  {flightDetails.travelers[0].name.firstName}
                  {flightDetails.travelers[0].name.lastName}
                </p>
              </div>
            </div>

            <div
              class="w-full border-t sm:border-none pt-2 pb-4 sm:pb-4 sm:pt-0"
            >
              <div class="w-full">
                <p class="font-bold">Email:</p>
                <p class="break break-all leading-tight">
                  {flightDetails.travelers[0].contact.emailAddress}
                </p>
              </div>
            </div>

            <div
              class="w-full border-t sm:border-none pt-2 pb-4 sm:pb-4 sm:pt-0"
            >
              <div class="w-full">
                <p class="font-bold">Reservation ID:</p>
                <p>{flightDetails.id}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="border rounded-md mt-12 text-neutral-500">
          <div
            class="bg-neutral-200/40 p-4 border-b flex items-center justify-between"
          >
            <p class="text-xl font-bold text-neutral-600">Flight Information</p>
            <!-- <p
              class="px-3 py-1 rounded-full bg-zinc-700 font-semibold text-gray-200"
            >
              {flightItinerary.oneWay ? "One Way" : "Return"}
            </p> -->
          </div>

          {#each flightDetails.flightOffers[0].itineraries as itinerary, index}
            <div
              class="w-full p-4 {index + 1 <
              flightDetails.flightOffers[0].itineraries.length
                ? 'border-b'
                : ''}"
            >
              <div class="grid sm:grid-cols-2 md:grid-cols-3">
                <div class="flex flex-col w-full gap-y-3">
                  <div class="airline">
                    <h3 class="font-bold">Flight Type:</h3>
                    <p>
                      {index === 0 ? "Outbound" : "Return"}
                    </p>
                  </div>

                  <div class="airline">
                    <h3 class="font-bold">Airline:</h3>
                    <p>
                      {flightItinerary?.dictionaries?.carriers[
                        flightDetails.flightOffers[0].validatingAirlineCodes[0]
                      ]}
                    </p>
                  </div>

                  <div class="flight-class">
                    <h3 class="font-bold">Class:</h3>
                    <p>
                      {flightDetails.travelers.length === 1 &&
                      flightDetails.travelers.length ===
                        flightItinerary.travelerPricings.length
                        ? flightItinerary.travelerPricings[0]
                            .fareDetailsBySegment[0].cabin
                        : flightItinerary.travelerPricings[index]
                            .fareDetailsBySegment[index].cabin}
                    </p>
                  </div>

                  <div class="flight-status w-fit">
                    <h3 class="font-bold">Status:</h3>
                    <div
                      class="flex items-center gap-x-1 w-fit p-1 rounded font-bold text-xs"
                    >
                      <ConfirmIcon class="w-5 h-5" />
                      <p>
                        {flightDetails.associatedRecords[0].reference
                          ? "Confirmed"
                          : "Pending"}
                      </p>
                    </div>
                  </div>

                  <div class="flight-class">
                    <h3 class="font-bold">Duration:</h3>
                    <p>
                      {#each flightDetails.flightOffers[0].itineraries[index].segments as itin}
                        {itin.duration}
                      {/each}
                    </p>
                  </div>
                </div>

                <div
                  class="w-full grid gap-y-3 mt-6 sm:mt-0 border-t sm:border-t-0 pt-4 sm:pt-0"
                >
                  <div class="airline max-w-[230px]">
                    <h3 class="font-bold">Departure:</h3>
                    <p>
                      {#each flightDetails.flightOffers[0].itineraries[index].segments as itin}
                        {itin.departure.iataCode}{itin.departure.terminal
                          ? `, Terminal ${itin.departure.terminal}`
                          : ""}
                      {/each}
                    </p>
                  </div>

                  <div class="airline max-w-[230px]">
                    <h3 class="font-bold">Departure Date:</h3>
                    <p class="whitespace-break-spaces">
                      {#each flightDetails.flightOffers[0].itineraries[index].segments as itin}
                        {new Date(itin.departure.at).toLocaleDateString(
                          "en-US",
                          {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                            weekday: "short",
                            hour12: true,
                            hour: "numeric",
                            minute: "numeric",
                          }
                        )}
                      {/each}
                    </p>
                  </div>

                  <div class="airline">
                    <h3 class="font-bold">Arrival:</h3>
                    <p>
                      {#each flightDetails.flightOffers[0].itineraries[index].segments as itin}
                        {itin.arrival.iataCode}{itin.arrival.terminal
                          ? `, Terminal ${itin.arrival.terminal}`
                          : ""}
                      {/each}
                      <!-- {flightDetails.flightOffers[0].itineraries[0].segments[0]
                        .arrival.iataCode}{flightDetails.flightOffers[0]
                        .itineraries[0].segments[0].arrival.terminal
                        ? `, Terminal ${
                            flightDetails.flightOffers[0].itineraries[0]
                              .segments[0].arrival.terminal
                          }`
                        : ""} -->
                    </p>
                  </div>

                  <div class="airline max-w-[230px]">
                    <h3 class="font-bold">Arrival Date:</h3>
                    <p class="whitespace-break-spaces">
                      {#each flightDetails.flightOffers[0].itineraries[index].segments as itin}
                        {new Date(itin.arrival.at).toLocaleDateString("en-US", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                          weekday: "short",
                          hour12: true,
                          hour: "numeric",
                          minute: "numeric",
                        })}
                      {/each}
                    </p>
                  </div>
                </div>

                <div
                  class="w-full flex flex-col gap-y-3 mt-6 sm:mt-3 md:mt-0 border-t sm:border-none pt-4 sm:pt-0"
                >
                  <div class="airline">
                    <h3 class="font-bold">Aircraft:</h3>
                    <p>
                      {flightItinerary.dictionaries?.aircraft[
                        flightDetails.flightOffers[0].itineraries[0].segments[0]
                          .aircraft.code
                      ]}
                    </p>
                  </div>

                  <div class="airline">
                    <h3 class="font-bold">PNR:</h3>
                    <p>#{flightDetails.associatedRecords[0].reference}</p>
                  </div>

                  <div class="airline">
                    <h3 class="font-bold">Ticketing Agreement:</h3>
                    <p>Delay: {flightDetails.ticketingAgreement.delay}</p>
                    <p>Option: {flightDetails.ticketingAgreement.option}</p>
                  </div>
                </div>
              </div>
            </div>
          {/each}
        </div>

        <div class="border rounded-md mt-12 text-neutral-500">
          <div class="bg-neutral-200/40 p-4 border-b">
            <p class="text-xl font-bold text-neutral-600">
              Traveler Information
            </p>
          </div>

          {#each flightDetails.travelers as traveler, index}
            <div class="w-full p-4 {index > 0 ? 'border-t' : ''}">
              <div class="grid sm:grid-cols-2 md:grid-cols-3 py-6">
                <div class="flex flex-col w-full gap-y-3">
                  <div class="airline">
                    <h3 class="font-bold">Name:</h3>
                    <p>{traveler.name.firstName} {traveler.name.lastName}</p>
                  </div>

                  <div class="flight-class">
                    <h3 class="font-bold">Gender:</h3>
                    <p>{traveler.gender}</p>
                  </div>

                  <div class="flight-class">
                    <h3 class="font-bold">Date Of Birth:</h3>
                    <p>
                      {new Date(traveler.dateOfBirth).toLocaleDateString(
                        "en-US",
                        {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        }
                      )}
                    </p>
                  </div>
                </div>

                <div
                  class="w-full grid gap-y-3 mt-6 sm:mt-0 border-t sm:border-t-0 pt-4 sm:pt-0"
                >
                  <div class="airline max-w-[230px]">
                    <h3 class="font-bold">Email Address:</h3>
                    <p class="break-all">
                      {traveler.contact.emailAddress}
                    </p>
                  </div>

                  <div class="airline max-w-[230px]">
                    <h3 class="font-bold">Phone:</h3>
                    <p class="whitespace-break-spaces">
                      {traveler.contact.phones[0].countryCallingCode}{traveler
                        .contact?.phones[0].number}
                    </p>
                  </div>

                  <div class="airline">
                    <h3 class="font-bold">Nationality:</h3>
                    <p>
                      {flightDetails.travelers[index].documents[index]
                        .nationality}
                    </p>
                  </div>
                </div>

                <div
                  class="w-full flex flex-col gap-y-3 mt-6 sm:mt-3 md:mt-0 border-t sm:border-none pt-4 sm:pt-0"
                >
                  <div class="flight-class">
                    <h3 class="font-bold">Traveler Type:</h3>
                    <p>
                      {flightDetails.flightOffers[index]?.travelerPricings[
                        index
                      ]?.travelerType ?? "Adults"}
                    </p>
                  </div>

                  <div class="airline max-w-[230px]">
                    <h3 class="font-bold">Document Type:</h3>
                    <p class="whitespace-break-spaces">
                      {flightDetails.travelers[index].documents[index]
                        .documentType}
                    </p>
                  </div>

                  <div class="airline">
                    <h3 class="font-bold">Document number:</h3>
                    <p>
                      {flightDetails.travelers[index].documents[index].number}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
      <div class="max-w-7xl md:max-w-4xl mx-auto">
        <div class="flight-options flex justify-center mt-6 gap-x-4">
          <button
            on:click={(e) => {
              console.log("clicked");
              printFlightItinerary();
            }}
            class="btn-primary !bg-transparent !text-neutral-800 border !border-neutral-800 flex items-center gap-x-1"
          >
            <PrintIcon class="w-4 h-4" />
            Print</button
          >
          <!-- <button class="btn-primary flex items-center gap-x-1">
            <DownloadIcon class="w-4 h-4" />
            Download</button
          > -->
        </div>
      </div>
    </section>
  </div>
{/if}
