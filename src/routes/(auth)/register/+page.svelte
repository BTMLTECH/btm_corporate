<script lang="ts">
  import { superForm } from "sveltekit-superforms";
  import { AuthSchema } from "$lib/validations/user";
  import { zod } from "sveltekit-superforms/adapters";
  import { goto } from "$app/navigation";
  import { acts, Notifications } from "@tadashi/svelte-notification";
  import { onMount } from "svelte";
  import { env } from "$env/dynamic/public";

  export let data;

  let allErrors: { [x: string]: any };
  let formError: string | undefined;
  let formSuccess: string | undefined;

  const { form, errors, submitting, enhance } = superForm(data.form, {
    customValidity: true,
    validators: zod(AuthSchema),
    dataType: "json",
    onResult: (e) => {
      if (e.result.type === "failure" && e.result.status === 400) {
        formError = e.result.data?.error;

        if (formError) {
          acts.add({
            mode: "error",
            lifetime: 3,
            message: formError,
          });
        }

        allErrors = { ...e.result.data?.errors };

        $errors = {
          ...$errors,
          email: [e.result.data?.errors?.email],
          password: [e.result.data?.errors?.password],
          cPassword: [e.result.data?.errors?.cPassword],
        };
        typeof window !== undefined ? window.scrollTo(0, 0) : null;
        return;
      }

      console.log(e.result);
      if (e.result.type === "success" && e.result.data && e.result.data?.user) {
        if (e.result.data.user.provider === "email")
          formSuccess =
            "We've sent a verification email to your inbox. Please check it to complete your sign-up.";
        else formSuccess = "Registration successful. Please login to continue";

        window.scrollTo(0, 0);
      }
    },
  });

  onMount(() => {
    console.log("data", data);
    if (data.success) {
      if (data.user) {
        if (data.user.provider === "email")
          formSuccess =
            "We've sent a verification email to your inbox. Please check it to complete your sign-up.";
        else formSuccess = "Registration successful. Please login to continue";
        window.scrollTo(0, 0);
      }
    } else {
      acts.add({
        mode: "error",
        lifetime: 3,
        message: data.error,
      });
      formError = data.error as string;
      allErrors = { ...data.errors };
      formSuccess = undefined;
    }
  });
</script>

<div class="min-h-screen bg-gray-50 py-32">
  <div class="flex h-full items-center justify-center px-4">
    <div class="w-full max-w-md">
      <div class="rounded-xl border border-gray-200 bg-white shadow-lg">
        <div class="p-8">
          <form
            on:input={(e) => {
              formError = undefined;
            }}
            method="POST"
            action="?/register"
            use:enhance
            class="flex flex-col gap-6"
          >
            <div class="text-center">
              <h1 class="text-2xl font-bold text-gray-900">
                Create an account
              </h1>
              <p class="mt-2 text-sm text-gray-600">
                Get started with your free account
              </p>
            </div>

            {#if (allErrors && Object.keys(allErrors).length) || (formError && formError.length)}
              <div class="mt-3">
                <p class="font-semibold text-red-500">{formError}</p>
              </div>
            {/if}

            {#if formSuccess && formSuccess.length}
              <div
                class="my-3 bg-green-100 p-3 rounded-r border-l-4 border-green-400"
              >
                <p class="font-semibold text-green-800 leading-tight">
                  {formSuccess}
                </p>
              </div>
            {/if}

            <div class="space-y-4">
              <div>
                <label
                  class="block text-sm font-medium text-gray-700"
                  for="name"
                >
                  Full name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  required
                  bind:value={$form.name}
                  aria-invalid={$errors?.name ? "true" : undefined}
                  disabled={$submitting}
                  name="name"
                  autocomplete="on"
                  class="{$errors?.name && $errors.name.length
                    ? 'btm-input-focus-err'
                    : 'btm-input-focus'} btm-input sm:text-sm sm:leading-6"
                />
                {#if $errors.name}
                  <span class="text-xs text-red-500 font-bold"
                    >{$errors.name}</span
                  >{/if}
              </div>

              <div>
                <label
                  class="block text-sm font-medium text-gray-700"
                  for="email"
                >
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  bind:value={$form.email}
                  aria-invalid={$errors?.email ? "true" : undefined}
                  disabled={$submitting}
                  name="email"
                  autocomplete="email"
                  class="{$errors?.email && $errors.email.length
                    ? 'btm-input-focus-err'
                    : 'btm-input-focus'} btm-input sm:text-sm sm:leading-6"
                />
                {#if $errors.email}
                  <span class="text-xs text-red-500 font-bold"
                    >{$errors.email}</span
                  >{/if}
              </div>

              <div>
                <label
                  class="block text-sm font-medium text-gray-700"
                  for="password"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  required
                  bind:value={$form.password}
                  aria-invalid={$errors?.password ? "true" : undefined}
                  disabled={$submitting}
                  name="password"
                  autocomplete="current-password"
                  class="{$form.cPassword !== $form.password ||
                  ($errors?.password && $errors.password.length)
                    ? 'btm-input-focus-err'
                    : 'btm-input-focus'} btm-input sm:text-sm sm:leading-6"
                />
                {#if $errors.password}
                  <span class="text-xs text-red-500 font-bold"
                    >{$errors.password}</span
                  >{/if}
              </div>

              <div>
                <label
                  class="block text-sm font-medium text-gray-700"
                  for="confirmPassword"
                >
                  Confirm Password
                </label>
                <input
                  id="cPassword"
                  name="cPassword"
                  type="password"
                  placeholder="Confirm your password"
                  required
                  bind:value={$form.cPassword}
                  aria-invalid={$errors?.cPassword ? "true" : undefined}
                  disabled={$submitting}
                  class="{$form.cPassword !== $form.password ||
                  ($errors?.cPassword && $errors.cPassword.length)
                    ? 'btm-input-focus-err'
                    : 'btm-input-focus'} btm-input sm:text-sm sm:leading-6"
                />
                {#if $errors.cPassword}
                  <span class="text-xs text-red-500 font-bold"
                    >{$errors.cPassword}</span
                  >{/if}
              </div>
            </div>

            <div class="space-y-3">
              <button
                disabled={$submitting || $form.cPassword !== $form.password}
                type="submit"
                class="btn-primary w-full {$submitting ? 'opacity-40' : ''}"
              >
                {$submitting ? "Please wait ..." : "Create Account"}
              </button>

              <div class="relative">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-gray-200"></div>
                </div>
                <div class="relative flex justify-center text-sm">
                  <span class="bg-white px-2 text-gray-500"
                    >Or continue with</span
                  >
                </div>
              </div>

              <div class="grid gap-3">
                <button
                  type="button"
                  on:click={(e) => {
                    window.location.href =
                      process.env.NODE_ENV === "production"
                        ? `${env.PUBLIC_LIVE_URL}/auth/google/register`
                        : `${env.PUBLIC_LOCAL_URL}/auth/google/register`;
                  }}
                  class="flex w-full items-center justify-center gap-2 rounded border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-blue-600"
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    version="1.1"
                    x="0px"
                    y="0px"
                    viewBox="0 0 48 48"
                    enable-background="new 0 0 48 48"
                    height="20"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="#FFC107"
                      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24 c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                    >
                    </path>
                    <path
                      fill="#FF3D00"
                      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657 C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                    >
                    </path>
                    <path
                      fill="#4CAF50"
                      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36 c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                    >
                    </path>
                    <path
                      fill="#1976D2"
                      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571 c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                    >
                    </path>
                  </svg>
                  Google
                </button>
              </div>
            </div>
          </form>

          <p class="mt-6 text-center text-sm text-gray-600">
            Already have an account?
            <a
              href="/login"
              class="font-medium text-blue-600 hover:text-blue-700"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
