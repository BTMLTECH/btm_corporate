<script lang="ts">
  import type { enhance } from "$app/forms";
  import type { PaymentSchema } from "$lib/validation";
  import { acts } from "@tadashi/svelte-notification";
  import type { SuperFormEvents } from "sveltekit-superforms";
  import type {
    SuperFormData,
    SuperFormErrors,
    SuperValidated,
  } from "sveltekit-superforms/client";
  import { z } from "zod";

  type ValidateFunction<T extends Record<string, unknown>> = (
    formData: FormData | Record<string, unknown>
  ) => Promise<SuperValidated<T>>;

  export let paymentEnhance: (
    el: HTMLFormElement,
    events?:
      | SuperFormEvents<
          {
            name: string;
            month: string;
            year: string;
            cvv: string;
            cardNumber: string;
            address?: string | undefined;
            country?: string | undefined;
            city?: string | undefined;
            state?: string | undefined;
            zipCode?: string | undefined;
            totalAmount?: string | undefined;
          },
          any
        >
      | undefined
  ) => ReturnType<typeof enhance>;

  export let paymentForm: SuperFormData<z.infer<typeof PaymentSchema>>;
  export let paymentErrors: SuperFormErrors<z.infer<typeof PaymentSchema>>;
  export let submitPayment: (
    submitter?: HTMLElement | Event | EventTarget | null
  ) => void;
  export let validatePayment: ValidateFunction<z.infer<typeof PaymentSchema>>;
  export let email: string | undefined = undefined;
</script>

<div class="mt-8">
  <form
    name="payment-form"
    method="post"
    use:paymentEnhance
    action="?/payment"
    class="space-y-4"
  >
    <div class="flex justify-between gap-x-8">
      <input bind:value={email} name="email" id="email" type="hidden" />
      <div class="card-holder-name w-full">
        <label for="card-name" class="text-sm">Name on card</label>
        <input
          type="text"
          name="name"
          id="name"
          bind:value={$paymentForm.name}
          class="btm-input !p-2 {$paymentErrors &&
          $paymentErrors.name &&
          $paymentErrors.name.length > 0
            ? 'btm-input-focus-err'
            : 'btm-input-focus'}"
          aria-invalid={$paymentErrors.name ? "true" : "false"}
          placeholder="Full name"
          required
        />
        {#if $paymentErrors && $paymentErrors.name && $paymentErrors.name.length > 0}
          <span class="text-red-500 leading-tight text-sm"
            >{$paymentErrors.name}</span
          >
        {/if}
      </div>

      <div class="w-full max-w-[150px]">
        <label for="card-expiry" class="text-sm"> Expiry </label>
        <div class="flex items-start gap-x-3">
          <div class="grid w-full">
            <input
              bind:value={$paymentForm.month}
              type="text"
              name="month"
              id="month"
              class="btm-input !p-2 {$paymentErrors &&
              $paymentErrors.month &&
              $paymentErrors.month.length > 0
                ? 'btm-input-focus-err'
                : 'btm-input-focus'}"
              placeholder="MM"
              minlength="2"
              maxlength="2"
              pattern="[0-9]*"
              inputmode="numeric"
              required
            />
            {#if $paymentErrors && $paymentErrors.month}
              <span class="text-red-500 leading-tight text-sm"
                >{$paymentErrors.month}</span
              >
            {/if}
          </div>
          <div class="grid w-full">
            <input
              bind:value={$paymentForm.year}
              type="text"
              name="year"
              id="year"
              class="btm-input !p-2 {$paymentErrors &&
              $paymentErrors.year &&
              $paymentErrors.year.length > 0
                ? 'btm-input-focus-err'
                : 'btm-input-focus'}"
              placeholder="YYYY"
              minlength="2"
              maxlength="4"
              pattern="[0-9]*"
              inputmode="numeric"
              required
            />
            {#if $paymentErrors && $paymentErrors.year}
              <span class="text-red-500 leading-tight text-sm"
                >{$paymentErrors.year}</span
              >
            {/if}
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-between items-start gap-x-3 mt-7">
      <div class="card-number w-full">
        <label for="card-number" class="text-sm">Card Number</label>
        <input
          bind:value={$paymentForm.cardNumber}
          name="cardNumber"
          id="cardNumber"
          type="text"
          class="btm-input !p-2 {$paymentErrors.cardNumber
            ? 'btm-input-focus-err'
            : 'btm-input-focus'}"
          placeholder="0000 0000 0000 0000"
          required
        />
        {#if $paymentErrors && $paymentErrors.cardNumber}
          <span class="text-red-500 leading-tight text-sm"
            >{$paymentErrors.cardNumber}</span
          >
        {/if}
      </div>

      <div class="card-cvv max-w-[150px]">
        <label for="card-cvv" class="text-sm">CVV</label>
        <input
          bind:value={$paymentForm.cvv}
          name="cvv"
          id="cvv"
          type="text"
          class="btm-input !p-2 {$paymentErrors.cvv
            ? 'btm-input-focus-err'
            : 'btm-input-focus'}"
          placeholder="123"
          maxlength="3"
          required
        />
        {#if $paymentErrors && $paymentErrors.cvv}
          <span class="text-red-500 leading-tight text-sm"
            >{$paymentErrors.cvv}</span
          >
        {/if}
      </div>
    </div>

    <div class="w-full flex justify-end mt-4">
      <button
        type="button"
        class="btn-primary"
        on:click={(e) => {
          validatePayment({ ...$paymentForm }).then((pf) => {
            if (!pf.valid) {
              acts.add({
                message: "Please check your entries",
                lifetime: 4,
                mode: "error",
              });
              submitPayment();
              return;
            }
            submitPayment(e.currentTarget);
          });
        }}>Continue</button
      >
    </div>
  </form>
</div>
