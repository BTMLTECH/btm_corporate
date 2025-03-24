<script lang="ts">
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  export let data;

  onMount(() => {
    if (!data.success) {
      //    goto("/login");
    }
  });
</script>

{#if data.success}
  <div
    class="h-full flex flex-col justify-center items-center max-w-sm mx-auto my-32"
  >
    <div class="mt-28 flex flex-col h-full">
      <svg
        class="text-green-600 w-24 h-24 mx-auto"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        ><path
          fill="currentColor"
          d="m10.562 15.908l6.396-6.396l-.708-.708l-5.688 5.688l-2.85-2.85l-.708.708zM12.003 21q-1.866 0-3.51-.708q-1.643-.709-2.859-1.924t-1.925-2.856T3 12.003t.709-3.51Q4.417 6.85 5.63 5.634t2.857-1.925T11.997 3t3.51.709q1.643.708 2.859 1.922t1.925 2.857t.709 3.509t-.708 3.51t-1.924 2.859t-2.856 1.925t-3.509.709"
        /></svg
      >
      <p class="text-4xl/9 text-center">Success</p>
      {#if !data.user}
        <p class="leading-tight text-center mt-3 text-lg/6">
          Your email has been verified! You can now
          <a href="/login" class="text-blue-500 font-semibold underline"
            >log in</a
          > to continue.
        </p>
      {:else}
        <p class="leading-tight text-center mt-3 text-lg/6">
          Your email has been verified! You can now <a
            href="/dashboard"
            class="text-blue-500 font-semibold underline">continue</a
          > to your account.
        </p>
      {/if}
    </div>
  </div>
{:else}
  <div
    class="h-full flex flex-col justify-center items-center max-w-sm mx-auto my-32"
  >
    <div class="mt-28 flex flex-col items-center h-full">
      <svg
        class="text-red-600 w-24 h-24 mx-auto"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        ><path
          fill="currentColor"
          fill-rule="evenodd"
          d="M7.843 3.802C9.872 2.601 10.886 2 12 2s2.128.6 4.157 1.802l.686.406c2.029 1.202 3.043 1.803 3.6 2.792c.557.99.557 2.19.557 4.594v.812c0 2.403 0 3.605-.557 4.594s-1.571 1.59-3.6 2.791l-.686.407C14.128 21.399 13.114 22 12 22s-2.128-.6-4.157-1.802l-.686-.407c-2.029-1.2-3.043-1.802-3.6-2.791C3 16.01 3 14.81 3 12.406v-.812C3 9.19 3 7.989 3.557 7s1.571-1.59 3.6-2.792zM13 16a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-1-9.75a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-1.5 0V7a.75.75 0 0 1 .75-.75"
          clip-rule="evenodd"
        /></svg
      >
      <p class="text-4xl/9 text-center">Verification failed</p>
      <p class="text-lg/5 text-center text-gray-800 mt-2">
        This verification link is invalid or has expired. Please try again.
      </p>
      {#if !data.user}
        <a
          href="/login"
          class="font-semibold text-blue-500 underline underline-offset-1 mt-2"
          >Login</a
        >
      {:else}
        <a
          href="/dashboard"
          class="font-semibold text-blue-500 underline underline-offset-1 mt-2"
          >Continue to dashboard</a
        >
      {/if}
    </div>
  </div>
{/if}
