<script lang="ts">
  import { applyAction, enhance } from "$app/forms";

  export let data;

  let isVerificationLinkLoading: boolean = false;
  let verificationSuccess: string = "";
  let verificationError: string = "";
</script>

<!-- Profile section -->
<div class="py-6 px-4 sm:p-6 lg:pb-8">
  <div>
    <h2 class="text-lg font-medium leading-6 text-gray-900">Profile</h2>
    <p class="mt-1 text-sm text-gray-500">
      This information will be displayed publicly so be careful what you share.
    </p>
  </div>

  <div class="mt-6 grid grid-cols-12 gap-6">
    <div class="col-span-12 sm:col-span-6">
      <p class="block text-sm font-medium text-gray-700">First Name</p>
      <p class="mt-1 block w-full sm:text-sm">
        {data.user?.name.split(" ")[0]}
      </p>
    </div>

    <div class="col-span-12 sm:col-span-6">
      <p class="block text-sm font-medium text-gray-700">Last Name</p>
      <p class="mt-1 block w-full sm:text-sm">
        {data.user?.name.split(" ")[1]}
      </p>
    </div>

    <div class="col-span-12 sm:col-span-6">
      <p class="block text-sm font-medium text-gray-700">Email</p>
      <p class="mt-1 block w-full sm:text-sm">
        {data.user?.email}
      </p>
    </div>

    <div class="col-span-12 sm:col-span-6">
      <p class="block text-sm font-medium text-gray-700">Email Provider</p>
      <p class="mt-1 block w-full sm:text-sm">
        {data.user?.provider}
      </p>
    </div>

    <div class="col-span-12 sm:col-span-6">
      <p class="block text-sm font-medium text-gray-700">Phone</p>
      <p class="mt-1 block w-full sm:text-sm">
        {data.user?.phone && data.user.phone.length ? data.user.phone : "-"}
      </p>
    </div>

    <div class="col-span-12 sm:col-span-6">
      <p class="block text-sm font-medium text-gray-700">Account Status</p>
      <p class="mt-1 block w-full sm:text-sm">
        {data.user?.email_verified ? "✅ Verified" : "⛔ Not verified"}
        {#if !data.user?.email_verified}
          <form
            action="?/reverify"
            method="post"
            use:enhance={({ action, formData }) => {
              isVerificationLinkLoading = true;
              return async ({ result }) => {
                if (result?.status !== 200) {
                  verificationError = result?.data?.message;
                  verificationSuccess = "";
                } else {
                  verificationSuccess = result?.data?.message;
                  verificationError = "";
                }
                await applyAction(result);
                isVerificationLinkLoading = false;
              };
            }}
            class="mt-2"
          >
            <input
              type="hidden"
              name="user"
              value={JSON.stringify(data.user)}
              id="user"
            />
            <button
              disabled={isVerificationLinkLoading}
              type="submit"
              class="rounded btn-primary !px-2 !text-xs {isVerificationLinkLoading
                ? 'opacity-40'
                : ''}">Resend verification</button
            >
          </form>
        {/if}
      </p>
      {#if verificationError}
        <p class="text-red-500 text-sm fomt-semibold mt-2">
          {verificationError}
        </p>
      {:else}
        <p class="text-green-500 text-sm fomt-semibold mt-2">
          {verificationSuccess}
        </p>
      {/if}
    </div>
  </div>
</div>
