<script lang="ts">
  import { ForgotPasswordSchema } from "$lib/validations/user";
  import { acts } from "@tadashi/svelte-notification";
  import { superForm } from "sveltekit-superforms";
  import { zod } from "sveltekit-superforms/adapters";

  export let data

  const { form, errors, enhance, submitting } = superForm(data.form, {
    validators: zod(ForgotPasswordSchema),
    dataType: "json",
    customValidity: true,
    resetForm: false,
    // onResult(event) {
    //   // if (event.result.status === 200) {
    //   //   return goto(url.get("redirectTo") || "/dashboard");
    //   // }
    //   if (event.result.type === "failure") {
    //     formError = event.result.data?.error;

    //     if (formError) {
    //       acts.add({
    //         mode: "error",
    //         lifetime: 3,
    //         message: formError,
    //       });
    //     }

    //     allErrors = { ...event.result.data?.errors };
    //     $errors = {
    //       ...$errors,
    //       email: [event.result.data?.errors?.email],
    //       password: [event.result.data?.errors?.password],
    //     };
    //   }
    // },
  });
</script>

<div
  class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 mt-16 my-32"
>
  <div class="sm:mx-auto sm:w-full sm:max-w-md">
    <h2 class="text-center text-2xl/9 font-bold tracking-tight text-gray-900">
      Reset your password
    </h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
    <div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
      <form
        class="space-y-6"
        action="?/forgotPassword"
        method="POST"
        use:enhance
      >
        <div>
          <label for="email" class="block text-sm/6 font-medium text-gray-900"
            >Email Address</label
          >
          <div class="mt-2">
            <input
              class="{$errors?.email && $errors.email.length
                ? 'btm-input-focus-err'
                : 'btm-input-focus'} btm-input sm:text-sm sm:leading-6"
              id="email"
              type="email"
              placeholder="Enter your email"
              required
              bind:value={$form.email}
              aria-invalid={$errors?.email ? "true" : undefined}
              disabled={$submitting}
              name="email"
              autocomplete="email"
            />
            {#if $errors && $errors.email?.length}
                  <p class="text-red-500 font-semibold">
                    {$errors.email}
                  </p>
                {/if}
          </div>
        </div>

        <div>
          <button type="submit" class="btn-primary">Reset password</button>
        </div>
      </form>
    </div>
  </div>
</div>
