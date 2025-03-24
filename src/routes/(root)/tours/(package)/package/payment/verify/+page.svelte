<script lang="ts">
  import NotVerified from "./components/NotVerified.svelte";
  import Verified from "./components/Verified.svelte";

  export let data;

  let {user} = data

  $: console.log("user", user)
</script>

<div class="relative w-4/5 lg:w-3/4 mx-auto">
  <div class="mx-auto pt-10 md:pt-8 w-full sm:w-5/6 md:w-4/5 lg:w-3/4">
    {#if data.status === "successful" || data.status === "success"}
      <div class="payment-status-container">
        <div
          class="relative text-green-500 grid justify-center items-center text-center max-w-32 mx-auto mt-10"
        >
          <Verified
            style="color: #22c55e"
            class="text-green-500 w-14 h-14 md:w-32 md:h-32"
          />
        </div>
        <p class="text-lg md:text-3xl font-semibold text-center mt-2">
          Payment Successful
        </p>
        <small class="text-center grid mx-auto"
          >An email has been sent to {data.userData?.email}</small
        >
      </div>

      <div class="payment-receipt w-full">
        <div
          class="border rounded p-3 max-w-lg mx-auto mt-8 drop-shadow-2xl shadow"
        >
          <p class="tex-xl font-semibold border-b pb-1">
            Tour Package Payment Reciept
          </p>

          <div class="mt-6 ml-5">
            <div class="flex flex-col gap-8">
              <div class="grid text-sm">
                <p>
                  Transaction Reference: <span class="text-gray-600"
                    >{data.txRef}</span
                  >
                </p>
                <p>
                  Payment Date: <span class="text-gray-600"
                    >{data.createdAt}</span
                  >
                </p>
                <p>
                  Currency: <span class="text-gray-600">{data.currency}</span>
                </p>
                <p>Amount: <span class="text-gray-600">{data.amount}</span></p>
                <p>
                  Paid By: <span class="text-gray-600">{data.userData?.name}</span>
                </p>
                <p>
                  Email: <span class="text-gray-600">{data.userData?.email}</span>
                </p>
              </div>

              <div class="flex justify-center">
                <a href="/" class="text-blue-400 hover:text-blue-500">Home</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    {:else}
      <div class="payment-status-container">
        <div
          class="relative text-red-500 grid justify-center items-center text-center max-w-32 mx-auto mt-10"
        >
          <NotVerified
            style="color: #ef4444"
            class="text-red-600 w-14 h-14 md:w-32 md:h-32"
          />
        </div>
        <p class="text-lg md:text-3xl font-semibold text-center mt-2">
          Payment Failed
        </p>
        {#if !user}
        <small class="text-center block mx-auto"
          >Please  <a href="/login" class="text-blue-500">login</a> to try again</small
        >
        {:else}
        <small class="text-center block mx-auto"
          >Please check your <a href="/dashboard" class="text-blue-500">dashboard</a> and try again</small
        >
        {/if}
      </div>
    {/if}
  </div>
</div>
