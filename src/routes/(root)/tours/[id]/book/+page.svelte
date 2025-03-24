<script lang="ts">
  import { zod } from "sveltekit-superforms/adapters";
  import type { PageData } from "./$types";
  import { superForm } from "sveltekit-superforms";
  import { CreatePackageSchema, PackageSchema } from "$lib/validations/package";
  import PersonalInformation from "./components/package/PersonalInformation.svelte";
  import Destination from "./components/package/Destination.svelte";
  import TourActivities from "./components/package/TourActivities.svelte";
  import { acts, Notifications } from "@tadashi/svelte-notification";
  import { onMount } from "svelte";
  import { PaymentSchema } from "$lib/validation";
  import { goto } from "$app/navigation";
  import Countries from "./components/Countries.svelte";

  export let data: PageData;
  export let showAVS: boolean = false;

  let showPayment: boolean = false;

  const { accommodations, activities, regions, touristSites, transportations } =
    data;

  const {
    form,
    errors,
    enhance,
    reset,
    submit: submitPackage,
    validateForm: validatePackage,
    submitting: submittingPackage,
  } = superForm(data.form, {
    // customValidity: true,
    validators: zod(PackageSchema),
    dataType: "json",
    resetForm: true,
    onResult: (e) => {
      if (e.result.type === "success") {
        acts.add({
          mode: "info",
          lifetime: 1,
          message: "Initiating payment...",
        });

        if (e.result.data) {
          if (e.result.data.authorization) {
            console.log(e.result.data);
            if (
              e.result.data.authorization.mode &&
              e.result.data.authorization.mode === "redirect"
            ) {
              window.location.href = e.result.data.authorization.redirect;
              return;
            } else if (
              e.result.data.authorization.mode &&
              e.result.data.authorization.mode === "avs_noauth"
            ) {
              showAVS = true;
            }
          }
          return;
        }

        acts.add({
          mode: "info",
          lifetime: 4,
          message: "Your package was created successfully",
        });
      }
    },
  });

  $: filteredTourSite =
    touristSites && touristSites.length
      ? touristSites.filter((site) => site.region_id === $form.region.id)
      : [];
  $: console.log($form.paymentData);
</script>

<div class="relative w-4/5 lg:w-3/4 mx-auto">
  <!-- <PackageNav {form} {previewPackage} /> -->
  <div class="mx-auto pt-10 md:pt-8 w-full sm:w-5/6 md:w-4/5 lg:w-3/4">
    <form
      name="package-form"
      method="POST"
      action="?/createPackage"
      use:enhance
      class="w-full"
    >
      <!-- Personal information step content -->
      <PersonalInformation {errors} {form} />

      <div class="payment mx-auto w-full mt-10">
        <h2 class="text-xl font-semibold mt-5">Payment Details</h2>
        <fieldset class="border border-gray-300 p-4 rounded-lg mt-5">
          <legend class="text-lg font-medium"
            >Enter your credit card information</legend
          >

          <div class="space-y-2">
            <div class="md:flex justify-between gap-x-6 w-full">
              <label
                for="cardNumber"
                class="w-full block text-sm font-medium leading-6 text-gray-900"
              >
                Card number
                <input
                  name="cardNumber"
                  bind:value={$form.paymentData.cardNumber}
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  class="btm-input {$errors.paymentData?.cardNumber &&
                  $errors.paymentData.cardNumber.length
                    ? 'btm-input-focus-err'
                    : 'btm-input-focus'} sm:text-sm sm:leading-6"
                />
                {#if $errors.paymentData?.cardNumber}<span
                    class="text-xs text-red-500 font-bold"
                    >{$errors.paymentData.cardNumber}</span
                  >{/if}
              </label>

              <label
                for="cvv"
                class="w-full block text-sm font-medium leading-6 text-gray-900"
              >
                CVV
                <input
                  name="cvv"
                  bind:value={$form.paymentData.cvv}
                  type="text"
                  placeholder="123"
                  class="btm-input {$errors.paymentData?.cvv &&
                  $errors.paymentData.cvv.length
                    ? 'btm-input-focus-err'
                    : 'btm-input-focus'} sm:text-sm sm:leading-6"
                />
                {#if $errors.paymentData?.cvv}<span
                    class="text-xs text-red-500 font-bold"
                    >{$errors.paymentData.cvv}</span
                  >{/if}
              </label>
            </div>

            <div class="md:flex justify-between gap-x-6 w-full">
              <label
                for="expiryMonth"
                class="w-full block text-sm font-medium leading-6 text-gray-900"
              >
                Expiry Month
                <input
                  name="expiryMonth"
                  bind:value={$form.paymentData.expiryMonth}
                  type="text"
                  placeholder="09"
                  class="btm-input {$errors.paymentData?.expiryMonth &&
                  $errors.paymentData.expiryMonth.length
                    ? 'btm-input-focus-err'
                    : 'btm-input-focus'} sm:text-sm sm:leading-6"
                />
                {#if $errors.paymentData?.expiryMonth}<span
                    class="text-xs text-red-500 font-bold"
                    >{$errors.paymentData.expiryMonth}</span
                  >{/if}
              </label>
              <label
                for="expiryYear"
                class="w-full block text-sm font-medium leading-6 text-gray-900"
              >
                Expiry Year
                <input
                  name="expiryYear"
                  bind:value={$form.paymentData.expiryYear}
                  type="text"
                  placeholder="32"
                  class="btm-input {$errors.paymentData?.expiryYear &&
                  $errors.paymentData.expiryYear.length
                    ? 'btm-input-focus-err'
                    : 'btm-input-focus'} sm:text-sm sm:leading-6"
                />
                {#if $errors.paymentData?.expiryYear}<span
                    class="text-xs text-red-500 font-bold"
                    >{$errors.paymentData.expiryYear}</span
                  >{/if}
              </label>
            </div>
          </div>
        </fieldset>
      </div>

      <div class="mx-auto w-full flex gap-x-4 justify-end mt-6">
        <button
          type="button"
          disabled={$submittingPackage}
          class="px-3 py-1 {$submittingPackage
            ? 'opacity-50'
            : ''} bg-indigo-600 hover:bg-indigo-800 ease-in transition-all text-white rounded"
          on:click={(e) => {
            validatePackage().then((pf) => {
              console.log(pf);
              if (!pf.valid) {
                acts.add({
                  message: "Please check your entries",
                  lifetime: 4,
                  mode: "error",
                });
                return;
              }
              submitPackage(e.currentTarget);
            });
          }}>{$submittingPackage ? "Please wait..." : "Continue"}</button
        >
      </div>
    </form>

    <div class="border-1 border-t border-gray-200 mt-12"></div>
    <p class="text-gray-500 text-sm mt-5">
      For any challenges, please contact support.
    </p>
  </div>
</div>

<Notifications />

<!-- <style lang="postcss">
  :global(.btm-input) {
    @apply block w-full rounded-md p-1.5 text-gray-900 shadow-sm ring-1 ring-inset  outline-none;
  }

  :global(.btm-input::placeholder) {
    @apply text-gray-400;
  }

  :global(.btm-input:focus) {
    @apply ring-inset;
  }

  :global(.btm-input-focus:focus) {
    @apply ring-indigo-600 ring-2;
  }

  :global(.btm-input-focus) {
    @apply ring-gray-300;
  }

  :global(.btm-input-focus-err) {
    @apply ring-red-300 border border-red-600;
  }

  :global(.btm-input-focus-err:focus) {
    @apply ring-red-600;
  }
</style> -->
