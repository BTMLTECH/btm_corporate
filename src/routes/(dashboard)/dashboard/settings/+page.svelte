<div class="py-6 px-4 sm:p-6 lg:pb-8">
  <div>
    <h2 class="text-lg font-medium leading-6 text-gray-900">Settings</h2>
    <p class="mt-1 text-sm text-gray-500">Manage your account</p>
  </div>

  <form
    method="POST"
    action="/dashboard/?updatePassword"
    class="flex flex-col gap-7 mt-10"
  >
    <label for="" class="mb-4 gid max-w-fit">
      Change password
      <div class="flex gap-4 mt-2">
        <button class="btn-primary">Update password</button>
      </div>
    </label>
  </form>

  <form method="POST" action="/dashboard/?" class="flex flex-col gap-7 mt-10">
    <label for="" class="mb-4 grid max-w-fit">
      I want to leave
      <div class="flex gap-4 mt-2">
        <button class="btn-danger">Delete account</button>
        <button class="btn-neutral">De-activate my account</button>
      </div>
    </label>
  </form>
</div>
