<script lang="ts">
  import "$lib/css/app.css";
  import type { PageData } from "./dashboard/$types";
  import Sidenav from "./dashboard/components/Sidenav.svelte";
  import Header from "$lib/components/shared/Header.svelte";
  import Footer from "$lib/components/shared/Footer.svelte";
  export let data: PageData;

  let navLinks: Array<{ href: string; label: string }> = [
    // {
    //   href: "/",
    //   label: "Home",
    // },
    {
      href: "/dashboard",
      label: "Profile",
    },
    {
      href: "/dashboard/settings",
      label: "Settings",
    },
    {
      href: "/dashboard/notifications",
      label: "Notifications",
    },
    {
      href: "/dashboard/packages",
      label: "Packages",
    },
    {
      href: "/dashboard/billing",
      label: "Billing",
    },
  ];
</script>

<Header isLoggedIn={data.user ? true : false} user={data.user} />
<div class="relative py-32 bg-gray-100 min-h-screen mt-8">
  <div class="mx-auto max-w-screen-xl px-4 pb-6 sm:px-6 lg:px-8">
    <div class="bg-white p-6">
      <p class="text-lg">
        Hello, <span class="font-semibold">{data.user?.name} 👋🏽</span>
      </p>
    </div>
  </div>

  <main class="relative">
    <div class="mx-auto max-w-screen-xl px-4 pb-6 sm:px-6 lg:px-8 lg:pb-16">
      <div class="overflow-hidden rounded-lg bg-white shadow">
        <div
          class="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x h-full"
        >
          <Sidenav {navLinks} />
         <div class="divide-y divide-gray-200 lg:col-span-9">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </main>
</div>
<Footer />
