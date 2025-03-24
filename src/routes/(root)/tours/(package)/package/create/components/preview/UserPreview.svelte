<script lang="ts">
  import type { PackageSchema } from "$lib/validations/package";
  import type { SuperFormData } from "sveltekit-superforms/client";

  export let form: SuperFormData<typeof PackageSchema._type>;
  export let packageFromLs: typeof $form | undefined = undefined;
</script>

<div id="personal-information" class="mx-auto w-full">
  <h2 class="text-xl font-semibold mt-5">Personal Information</h2>
  <div class="grid grid-cols-2 gap-6">
    <div class="mt-5">
      <label
        for="name"
        class="block text-sm font-medium leading-6 text-gray-900">Name</label
      >
      <input
        type="text"
        name="name"
        id="name"
        disabled={true}
        value={$form.user.name}
        class="btm-input btm-input-focus sm:text-sm sm:leading-6"
        placeholder="Tinubu Buhari Addo"
      />
    </div>
    <div class="mt-5">
      <label
        for="email"
        class="block text-sm font-medium leading-6 text-gray-900">Email</label
      >
      <input
        type="email"
        name="email"
        id="email"
        disabled={true}
        bind:value={$form.user.email}
        class="btm-input btm-input-focus sm:text-sm sm:leading-6"
        placeholder="you@example.com"
      />
    </div>
  </div>
  <div class="grid grid-cols-2 gap-6">
    <div class="mt-5">
      <label
        for="contact"
        class="block text-sm font-medium leading-6 text-gray-900">Contact</label
      >
      <input
        type="text"
        name="contact"
        id="contact"
        bind:value={$form.user.phone}
        disabled={true}
        class="btm-input btm-input-focus sm:text-sm sm:leading-6"
      />
    </div>
    <div class="mt-5">
      <label
        for="address"
        class="block text-sm font-medium leading-6 text-gray-900">Address</label
      >
      <input
        type="text"
        name="address"
        id="address"
        bind:value={$form.user.address}
        disabled
        class="btm-input btm-input-focus sm:text-sm sm:leading-6"
        placeholder="Tema, Greater Accra"
      />
    </div>
  </div>
</div>
