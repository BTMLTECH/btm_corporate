<script lang="ts">
  import { page } from "$app/stores";
  import BTMLogo from "$lib/images/logo.png";
  import type { User } from "$lib/types";

  let isCountryDialogOpen: boolean = false;
  let selectedCountry: string = "Ghana";
  let isMobileMenuOpen: boolean = false;
  let isBrandSubMenuOpen: boolean = false;
  let isHelpSubMenuOpen: boolean = false;

  function showSubMenu(menuType: "Brand" | "Help" = "Brand") {
    if (menuType === "Brand") {
      isBrandSubMenuOpen = true;
      return;
    }

    isHelpSubMenuOpen = true;
  }

  function hideSubMenu(menuType: "Brand" | "Help" = "Brand") {
    if (menuType === "Brand") {
      isBrandSubMenuOpen = false;
      return;
    }
    isHelpSubMenuOpen = false;
  }

  const navItems: Array<{ href: string; label: string }> = [
    { href: "/", label: "HOME" },
    { href: "/about", label: "ABOUT" },
    { href: "/services", label: "SERVICES" },
    { href: "/tours", label: "TOUR" },
    { href: "/contact", label: "CONTACT" },
    { href: "/login", label: "LOGIN" },
  ];

  const brandLinks: Array<{ href: string; label: string }> = [
    { href: "https://www.btmholidays.com/", label: "BTM HOLIDAYS" },
    { href: "https://my.journeyeasy.net", label: "JOURNEYEASY" },
    // { href: "#", label: "TREKBUYFLY" },
    {
      href: "https://marketplace.btmlimited.net/",
      label: "BTM MARKETPLACE",
    },
  ];

  export let isLoggedIn: boolean = false;
  export let user: User | undefined = undefined;
  let firstName = user ? user.name.split(" ")[0] : "A";
  let lastName = user ? user.name.split(" ")[1] : "";
  let nameInitials: string = firstName[0] + lastName[0];
</script>

<header class="bg-white fixed inset-x-0 top-0 shadow-md z-[206]">
  {#if isLoggedIn && user}
    <div class="relative bg-gray-50">
      <div class="mr-6 px-2 py-2">
        <div class="flex justify-end items-center space-x-4">
          <p class="text-sm">
            Welcome back, <span class="font-semibold text-gray-600"
              >{firstName ?? "Anonymous"}</span
            >
          </p>
          <a href="/dashboard">
            <div
              class="w-10 h-10 shadow drop-shadow rounded-full bg-blue-100 flex justify-center items-center text-xs font-bold"
            >
              {nameInitials}
            </div>
          </a>
        </div>
      </div>
    </div>
  {/if}

  <nav
    class="flex items-center justify-between p-3 lg:px-8"
    aria-label="Global"
  >
    <div class="flex lg:flex-1">
      <a href="/" class="-m-1.5 p-1.5">
        <span class="sr-only">BTM</span>
        <img
          class="h-8 w-auto"
          src={BTMLogo}
          width="32"
          height="32"
          alt="BTM logo"
        />
      </a>
    </div>
    <div class="flex md:hidden">
      <button
        on:click={() => (isMobileMenuOpen = true)}
        type="button"
        class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-800"
      >
        <span class="sr-only">Open main menu</span>
        <svg
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#000"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
    </div>
    <div class="hidden md:flex md:gap-x-3 lg:gap-x-12 uppercase">
      {#each navItems.slice(0, 3) as { href, label }, idx}
        <a
          {href}
          class="text-sm font-semibold leading-6 hover:text-gray-500 {$page.url
            .pathname === href
            ? 'text-blue-500'
            : 'text-gray-700'}">{label}</a
        >
      {/each}

      <div class="relative group w-max">
        <a
          on:mouseover={() => showSubMenu("Brand")}
          on:mouseleave={() => hideSubMenu("Brand")}
          href="#"
          class="text-sm font-semibold leading-6 text-gray-700 hover:text-gray-500 flex items-center"
        >
          Our brands
          <svg
            class="ml-2 h-4 w-4 fill-current group-hover:rotate-180 duration-300 transition-all"
            viewBox="0 0 20 20"
          >
            <path
              d="M5.23 7.79a.75.75 0 011.06 0L10 11.47l3.71-3.68a.75.75 0 111.06 1.06l-4.24 4.2a.75.75 0 01-1.06 0L5.23 8.85a.75.75 0 010-1.06z"
            />
          </svg>
        </a>
        <div
          on:mouseenter={() => showSubMenu("Brand")}
          on:mouseleave={() => hideSubMenu("Brand")}
          class="{isBrandSubMenuOpen
            ? 'absolute block'
            : 'hidden'} w-48 bg-white shadow-lg rounded-sm py-2 z-[9999999999999]"
        >
          {#each brandLinks as { href, label }, idx}
            <a
              {href}
              target="_blank"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >{label}</a
            >
          {/each}
        </div>
      </div>

      {#each navItems.slice(3) as { href, label }, idx}
        {#if label.toLowerCase() === "login"}
          {#if isLoggedIn}
            <form action="/?/logout" method="post" class="">
              <button
                type="submit"
                class="text-sm font-semibold leading-6 hover:text-gray-500 {$page
                  .url.pathname === href
                  ? 'text-blue-500'
                  : 'text-gray-700'}">LOGOUT</button
              >
            </form>
          {:else}
            <a
              {href}
              class="text-sm font-semibold leading-6 hover:text-gray-500 {$page
                .url.pathname === href
                ? 'text-blue-500'
                : 'text-gray-700'}">{label}</a
            >
          {/if}
        {:else}
          <a
            {href}
            class="text-sm font-semibold leading-6 hover:text-gray-500 {$page
              .url.pathname === href
              ? 'text-blue-500'
              : 'text-gray-700'}">{label}</a
          >
        {/if}
      {/each}
    </div>
  </nav>

  <!-- Mobile menu, show/hide based on menu open state. -->
  {#if isMobileMenuOpen}
    <div class="lg:hidden font-semibold w-full" role="dialog" aria-modal="true">
      <div class="fixed inset-0 z-50"></div>
      <div
        class="fixed inset-y-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-full sm:ring-1 sm:ring-white/10"
      >
        <div class="flex items-center justify-between">
          <a href="/" class="-m-1.5 p-1.5">
            <span class="sr-only">BTM logo</span>
            <img
              class="h-8 w-auto"
              src={BTMLogo}
              width="32"
              height="32"
              alt="BTM logo"
            />
          </a>
          <button
            on:click={() => (isMobileMenuOpen = false)}
            type="button"
            class="-m-2.5 rounded-md p-2.5 text-gray-400"
          >
            <span class="sr-only">Close menu</span>
            <svg
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#000"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div class="mt-4 uppercase font-semibold">
          {#each navItems.slice(0, 3) as { href, label }, idx}
            <a
              on:click={(e) => (isMobileMenuOpen = false)}
              {href}
              class="block px-4 py-2 text-sm font-semibold leading-6 hover:text-gray-500 {$page
                .url.pathname === href
                ? 'text-blue-500'
                : 'text-gray-700'}">{label}</a
            >
          {/each}

          <div>
            <a
              on:click={() => (isBrandSubMenuOpen = !isBrandSubMenuOpen)}
              href="#"
              class="px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 flex items-center justify-between"
            >
              Our brands
              <svg class="ml-2 h-4 w-4 fill-current" viewBox="0 0 20 20">
                <path
                  d="M5.23 7.79a.75.75 0 011.06 0L10 11.47l3.71-3.68a.75.75 0 111.06 1.06l-4.24 4.2a.75.75 0 01-1.06 0L5.23 8.85a.75.75 0 010-1.06z"
                />
              </svg>
            </a>
            {#if isBrandSubMenuOpen}
              <div class="pl-4 py-2">
                {#each brandLinks as { href, label }, idx}
                  <a
                    on:click={(e) => (isMobileMenuOpen = false)}
                    {href}
                    target="_blank"
                    class="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                    >{label}</a
                  >
                {/each}
              </div>
            {/if}
          </div>

          {#each navItems.slice(3) as { href, label }, idx}
            {#if label.toLowerCase() === "login"}
              {#if isLoggedIn}
                <a
                  on:click={(e) => (isMobileMenuOpen = false)}
                  href="/dashboard"
                  class="block px-4 py-2 text-sm font-semibold leading-6 hover:text-gray-500 {$page
                    .url.pathname === href
                    ? 'text-blue-500'
                    : 'text-gray-700'}">DASHBOARD</a
                >
              {:else}
                <a
                  on:click={(e) => (isMobileMenuOpen = false)}
                  {href}
                  class="block px-4 py-2 text-sm font-semibold leading-6 hover:text-gray-500 {$page
                    .url.pathname === href
                    ? 'text-blue-500'
                    : 'text-gray-700'}">{label}</a
                >
              {/if}
            {:else}
              <a
                on:click={(e) => (isMobileMenuOpen = false)}
                {href}
                class="block px-4 py-2 text-sm font-semibold leading-6 hover:text-gray-500 {$page
                  .url.pathname === href
                  ? 'text-blue-500'
                  : 'text-gray-700'}">{label}</a
              >
            {/if}
          {/each}
          <div>
            <a
              on:click={() => (isHelpSubMenuOpen = !isHelpSubMenuOpen)}
              href="#"
              class="px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 flex items-center justify-between"
            >
              More
              <svg class="ml-2 h-4 w-4 fill-current" viewBox="0 0 20 20">
                <path
                  d="M5.23 7.79a.75.75 0 011.06 0L10 11.47l3.71-3.68a.75.75 0 111.06 1.06l-4.24 4.2a.75.75 0 01-1.06 0L5.23 8.85a.75.75 0 010-1.06z"
                />
              </svg>
            </a>
            {#if isHelpSubMenuOpen}
              <div class="pl-4 py-2">
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                  >Help</a
                >

                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                  >FAQS</a
                >
              </div>
            {/if}
          </div>
        </div>

        <div class="mx-4 my-2 border-t border-gray-200"></div>
      </div>
    </div>
  {/if}
</header>
