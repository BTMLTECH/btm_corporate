<script lang="ts">
  import type { User } from "$lib/types";
  import type { PackageSchema } from "$lib/validations/package";
  import { onMount } from "svelte";
  import type {
    SuperFormErrors,
    SuperFormData,
  } from "sveltekit-superforms/client";

  export let errors: SuperFormErrors<typeof PackageSchema._type>;
  export let form: SuperFormData<typeof PackageSchema._type>;
  export let disabled: boolean | undefined = false;
</script>

<div id="personal-information" class="mx-auto w-full">
  <h2 class="text-xl font-semibold mt-5">Personal Information</h2>
  <div class="grid grid-cols-2 gap-6">
    <div class="mt-5">
      <label
        for="name"
        class="block text-sm font-medium leading-6 text-gray-900">Name</label
      >
      <div class="mt-2">
        <input
          type="text"
          name="name"
          id="name"
          aria-invalid={$errors.user?.name ? "true" : undefined}
          {disabled}
          bind:value={$form.user.name}
          on:input={(e) => {
            if (e.currentTarget.value.length >= 4) {
              $errors.user = {
                ...$errors.user,
                name: [],
              };
            }
          }}
          class="btm-input {$errors.user?.name && $errors.user.name.length
            ? 'btm-input-focus-err'
            : 'btm-input-focus'} sm:text-sm sm:leading-6"
          placeholder="Tinubu Buhari Addo"
        />
        {#if $errors.user?.name}<span class="text-xs text-red-500 font-bold"
            >{$errors.user.name}</span
          >{/if}
      </div>
    </div>
    <div class="mt-5">
      <label
        for="email"
        class="block text-sm font-medium leading-6 text-gray-900">Email</label
      >
      <div class="mt-2">
        <input
          type="email"
          name="email"
          id="email"
          {disabled}
          aria-invalid={$errors.user?.email ? "true" : undefined}
          bind:value={$form.user.email}
          class="btm-input {$errors.user?.email && $errors.user.email.length
            ? 'btm-input-focus-err'
            : 'btm-input-focus'} sm:text-sm sm:leading-6"
          placeholder="you@example.com"
        />
        {#if $errors.user?.email}<span class="text-xs text-red-500 font-bold"
            >{$errors.user.email}</span
          >{/if}
      </div>
    </div>
  </div>
  <div class="grid grid-cols-2 gap-6">
    <div class="mt-5">
      <label
        for="contact"
        class="block text-sm font-medium leading-6 text-gray-900">Contact</label
      >
      <div class="mt-2">
        <input
          type="text"
          name="contact"
          id="contact"
          aria-invalid={$errors.user?.phone ? "true" : undefined}
          bind:value={$form.user.phone}
          {disabled}
          class="btm-input {$errors.user?.phone && $errors.user.phone.length
            ? 'btm-input-focus-err'
            : 'btm-input-focus'} sm:text-sm sm:leading-6"
          placeholder="0547899099"
        />
        {#if $errors.user?.phone}<span class="text-xs text-red-500 font-bold"
            >{$errors.user.phone}</span
          >{/if}
      </div>
    </div>
    <div class="mt-5">
      <label
        for="address"
        class="block text-sm font-medium leading-6 text-gray-900">Address</label
      >
      <div class="mt-2">
        <input
          type="text"
          name="address"
          id="address"
          aria-invalid={$errors.user?.address ? "true" : undefined}
          bind:value={$form.user.address}
          {disabled}
          class="btm-input {$errors.user?.address
            ? 'btm-input-focus-err'
            : 'btm-input-focus'} sm:text-sm sm:leading-6"
          placeholder="Tema, Greater Accra"
        />
      </div>
    </div>
  </div>
</div>
