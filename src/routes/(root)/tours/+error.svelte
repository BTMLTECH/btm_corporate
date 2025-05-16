<script lang="ts">
  import { page } from "$app/stores";
</script>

<svelte:head>
  <title>{$page.status} - {$page.error?.message}</title>
</svelte:head>

<div
  class="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4 relative"
>
  <h1 class="text-6xl font-bold text-red-600">{$page.status}</h1>
  <h2 class="text-2xl font-semibold mt-4 text-gray-800">
    {$page.status === 404 ? "Page Not Found" : "Something Went Wrong"}
  </h2>
  <p class="mt-2 text-gray-600 text-lg font-bold">
    {$page.error?.message}
  </p>

  <a
    href="/"
    class="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
  >
    Back to Home
  </a>
</div>
