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
  import ThankYou from "./components/ThankYou.svelte";

  export let data: PageData;
  export let showAVS: boolean = false;
  export let showPin: boolean = false;

  let showThankYouPage: boolean = false;

  const {
    accommodations,
    activities,
    regions,
    touristSites,
    transportations,
    user,
  } = data;

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
    resetForm: false,
    onResult: (e) => {
      if (e.result.status === 401 || e.result.status === 403) {
        acts.add({
          mode: "error",
          message: "Your session has expired",
          lifetime: 4,
        });

        return goto("/login");
      }

      if (e.result.status === 200 && e.result.type === "success") {
        acts.add({
          mode: "success",
          lifetime: 1.5,
          message: "Your package was created successfully",
        });

        setTimeout(() => {
          showThankYouPage = true;
          window.scrollTo(0, 0);
        }, 2000);

        return;
      } else if (e.result.type === "failure") {
        acts.add({
          mode: "error",
          lifetime: 3,
          message: "Failed",
        });
      }
    },
  });

  const {
    form: paymentForm,
    errors: paymentErrors,
    enhance: paymentEnhance,
    reset: paymentReset,
    submit: submitPayment,
    validateForm: validatePayment,
    submitting: submittingPayment,
  } = superForm(data.paymentForm, {
    // customValidity: true,
    validators: zod(PaymentSchema),
    dataType: "json",
    resetForm: false,
    onResult: (e) => {
      if (e.result.status !== 200) {
        return;
      }

      if (e.result.type === "success" && e.result.status === 200) {
        if (e.result.data?.success === "pending") {
          if (e.result.data?.redirect) {
            window.location.href = e.result.data?.redirect;
            return;
          }
        }

        if (e.result.data?.success === "success") {
          acts.add({
            mode: "success",
            lifetime: 3,
            message: e.result.data?.message,
          });

          // show pin modal
          showPin = true;
        }
      }
    },
  });

  $: filteredTourSite =
    touristSites && touristSites.length
      ? touristSites.filter((site) => site.region_id === $form.region.id)
      : [];

  $: if (user)
    $form.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      provider: user.provider as string,
    };
</script>

<div class="relative w-4/5 lg:w-3/4 mx-auto">
  {#if !showThankYouPage}
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

        <!-- Destination step content -->
        <Destination
          {errors}
          {form}
          {regions}
          {accommodations}
          {activities}
          {transportations}
          touristSites={filteredTourSite}
        />
        <div class="mx-auto w-full flex gap-x-4 justify-end mt-6">
          <button
            type="button"
            disabled={$submittingPackage}
            class="px-3 py-1 {$submittingPackage
              ? 'opacity-50'
              : ''} bg-indigo-600 hover:bg-indigo-800 ease-in transition-all text-white rounded"
            on:click={(e) => {
              validatePackage().then((pf) => {
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
  {:else}
    <!-- <form
      name="payment-form"
      method="POST"
      action="?/payment"
      use:paymentEnhance
      class="w-full"
    >
      <div
        class="payment mx-auto w-full mt-10 pt-10 md:pt-8 sm:w-5/6 md:w-4/5 lg:w-3/4"
      >
        <h2 class="text-xl font-semibold mt-5">Payment Details</h2>
        <fieldset class="border border-gray-300 p-4 rounded-lg mt-5">
          <legend class="text-lg font-medium"
            >Enter your credit card information</legend
          >

          <div class="space-y-2">
            <input type="hidden" value={data.form.data.id} name="tour_package_id">
            <div class="md:flex justify-between gap-x-6 w-full">
              <label
                for="cardNumber"
                class="w-full block text-sm font-medium leading-6 text-gray-900"
              >
                Card number
                <input
                  name="cardNumber"
                  bind:value={$paymentForm.cardNumber}
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  class="btm-input {$paymentErrors?.cardNumber &&
                  $paymentErrors.cardNumber.length
                    ? 'btm-input-focus-err'
                    : 'btm-input-focus'} sm:text-sm sm:leading-6"
                />
                {#if $paymentErrors?.cardNumber}<span
                    class="text-xs text-red-500 font-bold"
                    >{$paymentErrors.cardNumber}</span
                  >{/if}
              </label>

              <label
                for="cvv"
                class="w-full block text-sm font-medium leading-6 text-gray-900"
              >
                CVV
                <input
                  name="cvv"
                  bind:value={$paymentForm.cvv}
                  type="text"
                  placeholder="123"
                  class="btm-input {$paymentErrors?.cvv &&
                  $paymentErrors.cvv.length
                    ? 'btm-input-focus-err'
                    : 'btm-input-focus'} sm:text-sm sm:leading-6"
                />
                {#if $paymentErrors?.cvv}<span
                    class="text-xs text-red-500 font-bold"
                    >{$paymentErrors.cvv}</span
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
                  bind:value={$paymentForm.expiryMonth}
                  type="text"
                  placeholder="09"
                  class="btm-input {$paymentErrors?.expiryMonth &&
                  $paymentErrors.expiryMonth.length
                    ? 'btm-input-focus-err'
                    : 'btm-input-focus'} sm:text-sm sm:leading-6"
                />
                {#if $paymentErrors?.expiryMonth}<span
                    class="text-xs text-red-500 font-bold"
                    >{$paymentErrors.expiryMonth}</span
                  >{/if}
              </label>
              <label
                for="expiryYear"
                class="w-full block text-sm font-medium leading-6 text-gray-900"
              >
                Expiry Year
                <input
                  name="expiryYear"
                  bind:value={$paymentForm.expiryYear}
                  type="text"
                  placeholder="32"
                  class="btm-input {$paymentErrors?.expiryYear &&
                  $paymentErrors.expiryYear.length
                    ? 'btm-input-focus-err'
                    : 'btm-input-focus'} sm:text-sm sm:leading-6"
                />
                {#if $paymentErrors?.expiryYear}<span
                    class="text-xs text-red-500 font-bold"
                    >{$paymentErrors.expiryYear}</span
                  >{/if}
              </label>
            </div>
            {#if showAVS}
              <input type="hidden" name="mode" bind:value={$paymentForm.mode} />
              <div class="md:flex justify-between gap-x-6 w-full">
                <label
                  for="country"
                  class="w-full block text-sm font-medium leading-6 text-gray-900"
                >
                  Country
                  <Countries
                    className="btm-input {$paymentErrors &&
                    $paymentErrors.country &&
                    $paymentErrors.country.length
                      ? 'btm-input-focus-err'
                      : 'btm-input-focus'} sm:text-sm sm:leading-6"
                    bind:value={$paymentForm.country}
                  />
                  {#if $paymentErrors?.country}<span
                      class="text-xs text-red-500 font-bold"
                      >{$paymentErrors.country}</span
                    >{/if}
                </label>

                <label
                  for="state"
                  class="w-full block text-sm font-medium leading-6 text-gray-900"
                >
                  State
                  <input
                    name="state"
                    bind:value={$paymentForm.state}
                    on:input={(e) => {
                      $paymentForm.mode = "avs_noauth";
                    }}
                    type="text"
                    placeholder="Enter state"
                    class="btm-input {$paymentErrors?.state &&
                    $paymentErrors.state.length
                      ? 'btm-input-focus-err'
                      : 'btm-input-focus'} sm:text-sm sm:leading-6"
                  />
                  {#if $paymentErrors?.state}<span
                      class="text-xs text-red-500 font-bold"
                      >{$paymentErrors.state}</span
                    >{/if}
                </label>
              </div>

              <div class="md:flex justify-between gap-x-6 w-full">
                <label
                  for="city"
                  class="w-full block text-sm font-medium leading-6 text-gray-900"
                >
                  City
                  <input
                    name="city"
                    bind:value={$paymentForm.city}
                    type="text"
                    placeholder="Enter city"
                    class="btm-input {$paymentErrors?.city &&
                    $paymentErrors.city.length
                      ? 'btm-input-focus-err'
                      : 'btm-input-focus'} sm:text-sm sm:leading-6"
                  />
                  {#if $paymentErrors?.city}<span
                      class="text-xs text-red-500 font-bold"
                      >{$paymentErrors.city}</span
                    >{/if}
                </label>
                <label
                  for="address"
                  class="w-full block text-sm font-medium leading-6 text-gray-900"
                >
                  Address
                  <input
                    name="address"
                    bind:value={$paymentForm.address}
                    type="text"
                    placeholder="Enter address"
                    class="btm-input {$paymentErrors?.address &&
                    $paymentErrors.address.length
                      ? 'btm-input-focus-err'
                      : 'btm-input-focus'} sm:text-sm sm:leading-6"
                  />
                  {#if $paymentErrors?.address}<span
                      class="text-xs text-red-500 font-bold"
                      >{$paymentErrors.address}</span
                    >{/if}
                </label>

                <label
                  for="zipcode"
                  class="w-full block text-sm font-medium leading-6 text-gray-900"
                >
                  Zipcode
                  <input
                    name="zipcode"
                    bind:value={$paymentForm.zipcode}
                    type="text"
                    placeholder="Enter zip code"
                    class="btm-input {$paymentErrors?.zipcode &&
                    $paymentErrors.zipcode.length
                      ? 'btm-input-focus-err'
                      : 'btm-input-focus'} sm:text-sm sm:leading-6"
                  />
                  {#if $paymentErrors?.zipcode}<span
                      class="text-xs text-red-500 font-bold"
                      >{$paymentErrors.zipcode}</span
                    >{/if}
                </label>
              </div>
            {:else if showPin}
            <input type="hidden" name="mode" value="pin">
            <label
                for="pin"
                class="w-full block text-sm font-medium leading-6 text-gray-900"
              >
                PIN
                <input
                  name="pin"
                  bind:value={$paymentForm.field.pin}
                  type="text"
                  placeholder="3310"
                  class="btm-input {$paymentErrors &&
                  $paymentErrors.field
                    ? 'btm-input-focus-err'
                    : 'btm-input-focus'} sm:text-sm sm:leading-6"
                />
                {#if $paymentErrors?.field}<span
                    class="text-xs text-red-500 font-bold"
                    >{$paymentErrors.field.pin}</span
                  >{/if}
              </label>
              {/if}
          </div>
        </fieldset>
      </div>

      <div class="mx-auto w-full flex gap-x-4 justify-end mt-6">
        <button
          name="paymentBtn"
          type="submit"
          disabled={$submittingPayment}
          class="px-3 py-1 {$submittingPayment
            ? 'opacity-50'
            : ''} bg-indigo-600 hover:bg-indigo-800 ease-in transition-all text-white rounded"
          >{$submittingPayment ? "Please wait..." : "Continue"}</button
        >
      </div>
    </form> -->
    <ThankYou />
  {/if}
</div>

<Notifications />
