<script lang="ts">
  import { page } from "$app/stores";

  export let navLinks: Array<{ href: string; label: string }>;
  //   class="bg-teal-50 border-teal-500 text-teal-700 hover:bg-teal-50 hover:text-teal-700 group border-l-4 px-3 py-2 flex items-center text-sm font-medium"
</script>

<aside class="py-6 lg:col-span-3">
  <nav class="space-y-1">
    {#each navLinks as nav, i}
      <a
        href={nav.href}
        class={$page.url.pathname === nav.href
          ? "bg-teal-50 border-teal-500 text-teal-700 hover:bg-teal-50 hover:text-teal-700 group border-l-4 px-3 py-2 flex items-center text-sm font-medium"
          : "border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900 group border-l-4 px-3 py-2 flex items-center text-sm font-medium"}
      >
        <!-- {@html nav.svgIcon} -->
        {#if nav.href === "/"}
          <svg
            class="{$page.url.pathname === nav.href
              ? 'text-teal-500 group-hover:text-teal-500'
              : 'text-gray-400 group-hover:text-gray-500'} flex-shrink-0 -ml-1 mr-3 h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            ><path
              fill="currentColor"
              d="M4 21v-9.375L2.2 13L1 11.4L12 3l11 8.4l-1.2 1.575l-1.8-1.35V21zm4-6q-.425 0-.712-.288T7 14t.288-.712T8 13t.713.288T9 14t-.288.713T8 15m4 0q-.425 0-.712-.288T11 14t.288-.712T12 13t.713.288T13 14t-.288.713T12 15m4 0q-.425 0-.712-.288T15 14t.288-.712T16 13t.713.288T17 14t-.288.713T16 15"
            /></svg
          >
        {:else if nav.href === "/dashboard"}
          <svg
            class="{$page.url.pathname === nav.href
              ? 'text-teal-500 group-hover:text-teal-500'
              : 'text-gray-400 group-hover:text-gray-500'} flex-shrink-0 -ml-1 mr-3 h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            >
            </path>
          </svg>
        {:else if nav.href === "/dashboard/settings"}
          <svg
            class="{$page.url.pathname === nav.href
              ? 'text-teal-500 group-hover:text-teal-500'
              : 'text-gray-400 group-hover:text-gray-500'} flex-shrink-0 -ml-1 mr-3 h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
            >
            </path>
          </svg>
        {:else if nav.href === "/dashboard/notifications"}
          <svg
            class="{$page.url.pathname === nav.href
              ? 'text-teal-500 group-hover:text-teal-500'
              : 'text-gray-400 group-hover:text-gray-500'} flex-shrink-0 -ml-1 mr-3 h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
            >
            </path>
          </svg>
        {:else if nav.href === "/dashboard/packages"}
          <svg
            class="{$page.url.pathname === nav.href
              ? 'text-teal-500 group-hover:text-teal-500'
              : 'text-gray-400 group-hover:text-gray-500'} flex-shrink-0 -ml-1 mr-3 h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            ><path
              fill="currentColor"
              d="M11 21.725v-9.15L3 7.95v8.025q0 .55.263 1T4 17.7zm2 0l7-4.025q.475-.275.738-.725t.262-1V7.95l-8 4.625zm3.975-13.75l2.95-1.725L13 2.275Q12.525 2 12 2t-1 .275L9.025 3.4zM12 10.85l2.975-1.7l-7.925-4.6l-3 1.725z"
            /></svg
          >
        {:else if nav.href === "/dashboard/billing"}
          <svg
            class="{$page.url.pathname === nav.href
              ? 'text-teal-500 group-hover:text-teal-500'
              : 'text-gray-400 group-hover:text-gray-500'} flex-shrink-0 -ml-1 mr-3 h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
            >
            </path>
          </svg>
        {/if}
        <span class="truncate">{nav.label}</span>
      </a>
    {/each}
    <form
      action="/dashboard/?/logout"
      method="post"
      class="border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900 group border-l-4 px-3 py-2 text-sm font-medium"
    >
      <button class="flex items-center">
        <svg
          class="text-gray-400 group-hover:text-gray-500 flex-shrink-0 -ml-1 mr-3 h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 16 16"
          ><path
            fill="currentColor"
            fill-rule="evenodd"
            d="M11.02 3.77v1.56l1-.99V2.5l-.5-.5h-9l-.5.5v.486L2 3v10.29l.36.46l5 1.72L8 15v-1h3.52l.5-.5v-1.81l-1-1V13H8V4.71l-.33-.46L4.036 3h6.984zM7 14.28l-4-1.34V3.72l4 1.34zm6.52-5.8H8.55v-1h4.93l-1.6-1.6l.71-.7l2.47 2.46v.71l-2.49 2.48l-.7-.7z"
            clip-rule="evenodd"
          /></svg
        >
        <span class="truncate">Logout</span>
      </button>
    </form>
  </nav>
</aside>
