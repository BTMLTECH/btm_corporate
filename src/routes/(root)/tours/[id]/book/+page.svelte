<script lang="ts">
  import { superForm } from "sveltekit-superforms/client";
  import { z } from "zod";
  import { createEventDispatcher } from "svelte";
  import type { PageData } from "./$types";
  import { fade } from "svelte/transition";
  import { get } from "svelte/store";
  import { zod } from "sveltekit-superforms/adapters";

  export let data: PageData;

  // Card type detection regex patterns
  const cardPatterns = {
    visa: /^4/,
    mastercard: /^5[1-5]/,
    amex: /^3[47]/,
    discover: /^6(?:011|5)/,
    dinersclub: /^3(?:0[0-5]|[68])/,
    jcb: /^(?:2131|1800|35\d{3})/,
  };

  // Zod schema for form validation
  const schema = z.object({
    fullName: z.string().min(1, { message: "Full name is required" }),
    email: z.string().email({ message: "Valid email is required" }),
    phone: z
      .string()
      .regex(/^\d{10,14}$/, { message: "Phone must be 10-14 digits" }),
    billingAddress: z
      .string()
      .min(1, { message: "Billing address is required" }),
    cardholderName: z
      .string()
      .min(1, { message: "Cardholder name is required" }),
    cardNumber: z
      .string()
      .regex(/^[0-9]{13,19}$/, { message: "Card number must be 13-19 digits" })
      .refine((val) => luhnCheck(val), { message: "Invalid card number" }),
    expiryDate: z
      .string()
      .regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, {
        message: "Expiry date must be in MM/YY format",
      })
      .refine(
        (val) => {
          const [month, year] = val.split("/");
          const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
          return expiry > new Date();
        },
        { message: "Card has expired" }
      ),
    cvv: z
      .string()
      .regex(/^[0-9]{3,4}$/, { message: "CVV must be 3 or 4 digits" }),
  });

  // Initialize the form
  const { form, errors, enhance, submitting } = superForm(data.form, {
    validators: zod(schema),
    dataType: "json",
    resetForm: false,
    onSubmit: (e) => {
      // You would typically handle the payment processing here
      // if (e.type === "success") {
      //   // Handle successful submission
      //   dispatch("success");
      // }
    },
  });

  // Card type detection
  let cardType = "";
  let cardTypeIcon = "";

  function detectCardType(cardNumber: string) {
    // Remove spaces and non-numeric characters
    const cleanNumber = cardNumber.replace(/\D/g, "");

    if (cardPatterns.visa.test(cleanNumber)) {
      cardType = "Visa";
      cardTypeIcon = "💳";
    } else if (cardPatterns.mastercard.test(cleanNumber)) {
      cardType = "MasterCard";
      cardTypeIcon = "💳";
    } else if (cardPatterns.amex.test(cleanNumber)) {
      cardType = "American Express";
      cardTypeIcon = "💳";
    } else if (cardPatterns.discover.test(cleanNumber)) {
      cardType = "Discover";
      cardTypeIcon = "💳";
    } else if (cardPatterns.dinersclub.test(cleanNumber)) {
      cardType = "Diners Club";
      cardTypeIcon = "💳";
    } else if (cardPatterns.jcb.test(cleanNumber)) {
      cardType = "JCB";
      cardTypeIcon = "💳";
    } else {
      cardType = "";
      cardTypeIcon = "";
    }
  }

  // Format card number with spaces
  function formatCardNumber(e: Event) {
    const input = e.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, "");

    // Format with spaces every 4 digits
    if (value.length > 0) {
      value = value.match(/.{1,4}/g)?.join(" ") || "";
    }

    input.value = value;
    $form.cardNumber = value.replace(/\s/g, "");
    detectCardType($form.cardNumber);
  }

  // Format expiry date
  function formatExpiryDate(e: Event) {
    const input = e.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, "");

    if (value.length > 2) {
      value = value.substring(0, 2) + "/" + value.substring(2, 4);
    }

    input.value = value;
    $form.expiryDate = value;
  }

  // Luhn algorithm for card number validation
  function luhnCheck(cardNumber: string): boolean {
    if (!cardNumber) return false;

    // Remove spaces and non-numeric characters
    const value = cardNumber.replace(/\D/g, "");

    let sum = 0;
    let shouldDouble = false;

    // Loop through values starting from the rightmost digit
    for (let i = value.length - 1; i >= 0; i--) {
      let digit = parseInt(value.charAt(i));

      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }

      sum += digit;
      shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
  }
</script>

<div class="bg-gray-100 w-full">
  <div class="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
    <div class="mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div class="bg-blue-600 px-6 py-4">
        <h2 class="text-xl font-bold text-white">Book Your Tour Package</h2>
        <p class="text-blue-100 text-sm">
          Complete your {data.tourPackage.title} booking by filling out the form
          below
        </p>
      </div>
    </div>
    <form
      method="POST"
      use:enhance
      class="px-6 py-8 space-y-6 grid md:gridcols-2 gap-8"
    >
      <div class="flex w-full gap-8"><!-- User Information Section -->
      <div class="space-y-4 w-full grid h-full">
        <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h3 class="text-2xl font-medium text-gray-900 pb-4">
            Personal Information
          </h3>

          <div class="space-y-4">
            <div>
              <label
                for="fullName"
                class="block text-sm font-medium text-gray-700">Full Name</label
              >
              <input
                type="text"
                id="fullName"
                bind:value={$form.fullName}
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none {$errors.fullName
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                  : 'focus:ring-blue-500 focus:border-blue-500'}"
                placeholder="John Doe"
              />
              {#if $errors.fullName}
                <p class="mt-1 text-sm text-red-600" transition:fade>
                  {$errors.fullName}
                </p>
              {/if}
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-gray-700"
                >Email Address</label
              >
              <input
                type="email"
                id="email"
                bind:value={$form.email}
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none {$errors.email
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                  : 'focus:ring-blue-500 focus:border-blue-500'}"
                placeholder="john@example.com"
              />
              {#if $errors.email}
                <p class="mt-1 text-sm text-red-600" transition:fade>
                  {$errors.email}
                </p>
              {/if}
            </div>

            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700"
                >Phone Number</label
              >
              <input
                type="tel"
                id="phone"
                bind:value={$form.phone}
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none {$errors.phone
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                  : 'focus:ring-blue-500 focus:border-blue-500'}"
                placeholder="1234567890"
              />
              {#if $errors.phone}
                <p class="mt-1 text-sm text-red-600" transition:fade>
                  {$errors.phone}
                </p>
              {/if}
            </div>

            <div>
              <label
                for="billingAddress"
                class="block text-sm font-medium text-gray-700"
                >Billing Address</label
              >
              <textarea
                id="billingAddress"
                bind:value={$form.billingAddress}
                rows="3"
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none {$errors.billingAddress
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                  : 'focus:ring-blue-500 focus:border-blue-500'}"
                placeholder="Enter your full billing address"
              ></textarea>
              {#if $errors.billingAddress}
                <p class="mt-1 text-sm text-red-600" transition:fade>
                  {$errors.billingAddress}
                </p>
              {/if}
            </div>
          </div>
        </div>
      </div>

      <!-- Card Payment Section -->
      <div class="grid gap-8 w-full m-0">
        <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h3 class="text-2xl font-medium text-gray-900 pb-4">
            Payment Details
          </h3>

          <div class="space-y-4">
            <div>
              <label
                for="cardholderName"
                class="block text-sm font-medium text-gray-700"
                >Cardholder Name</label
              >
              <input
                type="text"
                id="cardholderName"
                bind:value={$form.cardholderName}
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none {$errors.cardholderName
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                  : 'focus:ring-blue-500 focus:border-blue-500'}"
                placeholder="John Doe"
              />
              {#if $errors.cardholderName}
                <p class="mt-1 text-sm text-red-600" transition:fade>
                  {$errors.cardholderName}
                </p>
              {/if}
            </div>

            <div>
              <label
                for="cardNumber"
                class="block text-sm font-medium text-gray-700"
                >Card Number</label
              >
              <div class="mt-1 relative rounded-md shadow-sm">
                <input
                  type="text"
                  id="cardNumber"
                  on:input={formatCardNumber}
                  class="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none {$errors.cardNumber
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                    : 'focus:ring-blue-500 focus:border-blue-500'} pr-10"
                  placeholder="1234 5678 9012 3456"
                  maxlength="19"
                />
                {#if cardType}
                  <div
                    class="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <span class="text-gray-500">{cardTypeIcon} {cardType}</span>
                  </div>
                {/if}
              </div>
              {#if $errors.cardNumber}
                <p class="mt-1 text-sm text-red-600" transition:fade>
                  {$errors.cardNumber}
                </p>
              {/if}
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label
                  for="expiryDate"
                  class="block text-sm font-medium text-gray-700"
                  >Expiry Date</label
                >
                <input
                  type="text"
                  id="expiryDate"
                  on:input={formatExpiryDate}
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none {$errors.expiryDate
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                    : 'focus:ring-blue-500 focus:border-blue-500'}"
                  placeholder="MM/YY"
                  maxlength="5"
                />
                {#if $errors.expiryDate}
                  <p class="mt-1 text-sm text-red-600" transition:fade>
                    {$errors.expiryDate}
                  </p>
                {/if}
              </div>

              <div>
                <label for="cvv" class="block text-sm font-medium text-gray-700"
                  >CVV</label
                >
                <input
                  type="text"
                  id="cvv"
                  bind:value={$form.cvv}
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none {$errors.cvv
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                    : 'focus:ring-blue-500 focus:border-blue-500'}"
                  placeholder="123"
                  maxlength="4"
                />
                {#if $errors.cvv}
                  <p class="mt-1 text-sm text-red-600" transition:fade>
                    {$errors.cvv}
                  </p>
                {/if}
              </div>
            </div>
          </div>
        </div>

        <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 class="mb-4 text-xl font-semibold text-gray-900">
            Order Summary
          </h2>

          <div class="space-y-2">
            <div
              class="flex items-center justify-between border-b border-gray-200 pb-4"
            >
              <span class="text-gray-600">Tour Package</span>
              <span class="font-medium">${(30000.5965).toFixed(2)}</span>
            </div>
            <div
              class="flex items-center justify-between border-b border-gray-200 pb-2"
            >
              <span class="text-gray-600">Service Fee</span>
              <span class="font-medium">$19.99</span>
            </div>
            <div class="mt-4 flex items-center justify-between pt-2">
              <span class="text-lg font-semibold">Total</span>
              <span class="text-lg font-bold text-blue-600">
                ${(30000.5965 + 19.99).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white btn-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            disabled={$submitting}
          >
            {$submitting ? "Processing..." : "Complete Booking"}
          </button>
        </div>
      </div></div>
      
    </form>
  </div>
</div>
