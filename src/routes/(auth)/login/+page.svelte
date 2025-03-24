<script lang="ts">
  import { LoginSchema } from "$lib/validations/user.js";
  import { superForm } from "sveltekit-superforms";
  import { zod } from "sveltekit-superforms/adapters";
  import { onMount } from "svelte";
  import { acts } from "@tadashi/svelte-notification";
  import { env } from "$env/dynamic/public";

  export let data;

  let allErrors: { [x: string]: any };
  let formError: string;
  let url: URLSearchParams;
  let redirectTo: string = "/dashboard";

  const { form, errors, enhance, submitting } = superForm(data.form, {
    validators: zod(LoginSchema),
    dataType: "json",
    customValidity: true,
    resetForm: false,
    onResult(event) {
      if (event.result.type === "failure") {
        formError = event.result.data?.error;

        if (formError) {
          acts.add({
            mode: "error",
            lifetime: 3,
            message: formError,
          });
        }

        allErrors = { ...event.result.data?.errors };
        $errors = {
          ...$errors,
          email: [event.result.data?.errors?.email],
          password: [event.result.data?.errors?.password],
        };
      }
    },
  });

  onMount(() => {
    url = new URLSearchParams(window.location.search);
    redirectTo = url.get("redirectTo") as string;

    if (!data.success) {
      acts.add({
        mode: "error",
        lifetime: 3,
        message: data.error,
      });
      formError = data.error as string;
      allErrors = { ...data.errors };
    }
  });

  $: $errors = {
    ...$errors,
    email: allErrors && allErrors.email ? [allErrors.email] : undefined,
    password:
      allErrors && allErrors.password ? [allErrors.password] : undefined,
  };
</script>

<div class="min-h-screen bg-gray-50 py-32">
  <div class="flex h-full items-center justify-center px-4">
    <div class="w-full max-w-md">
      <div class="rounded-xl border border-gray-200 bg-white shadow-lg">
        <div class="p-8">
          <form
            class="flex flex-col gap-6"
            action="?/login"
            use:enhance
            method="POST"
          >
            <input type="hidden" name="redirectTo" value={redirectTo} />
            <div class="text-center">
              <h1 class="text-2xl font-bold text-gray-900">Welcome back</h1>
              <p class="mt-2 text-sm text-gray-600">
                Please enter your details
              </p>
            </div>
            {#if (allErrors && Object.keys(allErrors).length) || formError}
              <div class="mt-3">
                <p class="font-semibold text-red-500">
                  {formError}
                </p>
              </div>
            {/if}
            <div class="space-y-4">
              <div>
                <label
                  class="block text-sm font-medium text-gray-700"
                  for="email"
                >
                  Email address
                </label>
                <input
                  class="{($errors?.email && $errors.email.length) ||
                  (formError && formError.length > 0)
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

              <div>
                <label
                  class="block text-sm font-medium text-gray-700"
                  for="password"
                >
                  Password
                </label>
                <input
                  bind:value={$form.password}
                  id="password"
                  type="password"
                  placeholder="********"
                  required
                  aria-invalid={$errors?.password ? "true" : undefined}
                  disabled={$submitting}
                  name="password"
                  autocomplete="current-password"
                  class="{($errors?.password && $errors.password.length) ||
                  (formError && formError.length > 0)
                    ? 'btm-input-focus-err'
                    : 'btm-input-focus'} btm-input sm:text-sm sm:leading-6"
                />
                {#if $errors && $errors.password?.length}
                  <p class="text-red-500 font-semibold">
                    {$errors.password}
                  </p>
                {/if}
                <a
                  href="/forgot-password"
                  class="mt-2 block text-sm text-blue-600 hover:text-blue-700"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <div class="space-y-3">
              <button
                type="submit"
                disabled={$submitting}
                class="w-full btn-primary {$submitting ? 'opacity-40' : ''}"
                >{$submitting ? "Please wait ..." : "Sign in"}
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
                        ? `${env.PUBLIC_LIVE_URL}/auth/google/login`
                        : `${env.PUBLIC_LOCAL_URL}/auth/google/login`;
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
            Don't have an account?
            <a
              href="/register"
              class="font-medium text-blue-600 hover:text-blue-700"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
