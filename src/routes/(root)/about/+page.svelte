<script lang="ts">
  import AboutHero from "$lib/images/about-hero.webp";
  import Sam from "$lib/images/team/sam.png";
  import Bola from "$lib/images/team/bola.png";
  import Bolanle from "$lib/images/team/bolanle.jpg";
  import Olufemi from "$lib/images/team/olufemi.png";
  import Ademola from "$lib/images/team/ademola.png";
  import Chioma from "$lib/images/team/chioma.png";
  import Lola from "$lib/images/team/lola.jpg";
  import CallOut from "../components/CallOut.svelte";
  import WTA2015 from "$lib/images/awards/wta_2015-150x150.png";
  import WTA2016 from "$lib/images/awards/wta_2016-150x150.png";
  import WTA2017 from "$lib/images/awards/wta_2017-150x150.png";
  import WTA2018 from "$lib/images/awards/wta_2018-150x150.png";
  import WTA2019 from "$lib/images/awards/wta_2019-150x150.png";
  import WTA2020 from "$lib/images/awards/wta_2020-150x150.png";
  import WTA2021 from "$lib/images/awards/wta_2021-150x150.png";
</script>

<section id="main-content" class="">
  <div class="pb-10 relative">
    <div
      class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      aria-hidden="true"
    >
      <div
        class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#889091] to-[#363b41] opacity-30 sm:right-[calc(50%-30rem)] sm:w-[72.1875rem]"
        style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
      ></div>
    </div>
  </div>

  <div>
    <div class="relative isolate">
      <div class="px-6 pt-8 lg:px-8">
        <div class="mx-auto max-w-2xl pt-16 text-center">
          <h2
            class="text-4xl font-bold font-display tracking-tight text-gray-800 sm:text-6xl"
          >
            We Take Care Of Your Travel Needs
          </h2>
          <p class="mt-6 text-lg font-medium leading-8 text-gray-800 uppercase">
            Who we are
          </p>
        </div>
      </div>

      <div class="mx-auto mt-10 max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
          <div
            class="grid max-w-xl grid-cols-1 gap-8 text-base leading-7 text-gray-500 lg:max-w-none lg:grid-cols-2"
          >
            <div>
              <p>
                Business Travel Management (BTM) Limited, a member of the GHI Assets Ltd group, is a leading provider of comprehensive travel management, corporate services, and logistics solutions. The company boasts an impressive portfolio of brands, including Emirates Holidays, Sky Logistics Ltd, and Rwandair. Established in 1998, BTM Limited has earned esteemed accreditations, including ISO 9001:2015 and IATA (International Air Transport Association). By July 1999, BTM Limited had already distinguished itself as a top provider of corporate travel management, B2B logistics solutions, and a pioneer in innovative travel management technology.

              </p>
            </div>
            <div>
              <p>
                With a strong foundation, BTM Limited expanded its reach to service clients across West and Central Africa. As an extension of this success, BTM Ghana offers specialized travel management services, tapping into the extensive expertise and resources of BTM Limited to deliver tailored solutions to clients in Ghana and beyond. By combining local knowledge with the strengths of the BTM Limited network, BTM Ghana is well-positioned to meet the unique needs of businesses and individuals in the region.

              </p>
            </div>
          </div>
          <dl
            class="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 sm:mt-20 sm:grid-cols-2 sm:gap-y-16 lg:mt-28 lg:grid-cols-4"
          >
            <div
              class="flex flex-col-reverse gap-y-3 border-l border-gray-500/20 pl-6"
            >
              <dt class="text-base leading-7 text-gray-600">
                Business was founded
              </dt>
              <dd class="text-3xl font-medium tracking-tight text-gray-700">
                1998
              </dd>
            </div>
            <div
              class="flex flex-col-reverse gap-y-3 border-l border-gray-500/20 pl-6"
            >
              <dt class="text-base leading-7 text-gray-600">
                People on the team
              </dt>
              <dd class="text-3xl font-medium tracking-tight text-gray-700">
                120+
              </dd>
            </div>
            <div
              class="flex flex-col-reverse gap-y-3 border-l border-gray-500/20 pl-6"
            >
              <dt class="text-base leading-7 text-gray-600">
                Users on the platform
              </dt>
              <dd class="text-3xl font-medium tracking-tight text-gray-700">
                250k
              </dd>
            </div>
            <div
              class="flex flex-col-reverse gap-y-3 border-l border-gray-500/20 pl-6"
            >
              <dt class="text-base leading-7 text-gray-600">
                World travel awards
              </dt>
              <dd class="text-3xl font-medium tracking-tight text-gray-700">
                7+
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div class="mt-16 xl:mx-auto xl:max-w-7xl xl:px-8">
        <img
          src={AboutHero}
          alt="A group of black women sitting in an office having a meeting."
          class="aspect-[9/4] w-full object-cover rounded-lg"
        />
      </div>

      <div class="mx-auto max-w-7xl px-6 py-16">
        <!-- Header Section -->
        <div class="mx-auto max-w-2xl text-center lg:max-w-4xl">
          <h2
            class="text-3xl font-semibold font-display tracking-tight text-gray-800 sm:text-5xl"
          >
            Our Values
          </h2>
          <p class="mt-4 text-lg leading-7 text-gray-600">
            The guiding principles that shape our culture and drive our actions
            define who we are, how we work, and what we stand for.
          </p>
        </div>

        <!-- Values Grid -->
        <div
          class="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-12"
        >
          <!-- Dedication -->
          <div
            class="flex flex-col items-start p-6 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow"
          >
            <div
              class="flex items-center justify-center w-12 h-12 rounded-md bg-blue-100 text-blue-600"
            >
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"
                />
              </svg>
            </div>
            <h3 class="mt-4 text-lg font-semibold text-gray-800">Dedication</h3>
            <p class="mt-2 text-gray-600 leading-relaxed">
              We go extraordinary lengths to get our travelers to their
              destinations on time and ready to do business.
            </p>
          </div>

          <!-- Consideration -->
          <div
            class="flex flex-col items-start p-6 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow"
          >
            <div
              class="flex items-center justify-center w-12 h-12 rounded-md bg-blue-100 text-blue-600"
            >
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z"
                />
              </svg>
            </div>
            <h3 class="mt-4 text-lg font-semibold text-gray-800">
              Consideration
            </h3>
            <p class="mt-2 text-gray-600 leading-relaxed">
              With an outstanding suite of products, we customize every step of
              each trip whilst keeping track of your expenses and safety too.
            </p>
          </div>

          <!-- Customer-Centricity -->
          <div
            class="flex flex-col items-start p-6 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow"
          >
            <div
              class="flex items-center justify-center w-12 h-12 rounded-md bg-blue-100 text-blue-600"
            >
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </div>
            <h3 class="mt-4 text-lg font-semibold text-gray-800">
              Customer-Centricity
            </h3>
            <p class="mt-2 text-gray-600 leading-relaxed">
              We understand what modern, successful businesses need to keep
              moving forward.
            </p>
          </div>

          <!-- Reliability -->
          <div
            class="flex flex-col items-start p-6 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow"
          >
            <div
              class="flex items-center justify-center w-12 h-12 rounded-md bg-blue-100 text-blue-600"
            >
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fill-rule="evenodd"
                  d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.75.75 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08zm3.094 8.016a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <h3 class="mt-4 text-lg font-semibold text-gray-800">
              Reliability
            </h3>
            <p class="mt-2 text-gray-600 leading-relaxed">
              Getting corporate travelers to where they want to be, safely and
              on time.
            </p>
          </div>

          <!-- Trusted -->
          <div
            class="flex flex-col items-start p-6 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow"
          >
            <div
              class="flex items-center justify-center w-12 h-12 rounded-md bg-blue-100 text-blue-600"
            >
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fill-rule="evenodd"
                  d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <h3 class="mt-4 text-lg font-semibold text-gray-800">Trusted</h3>
            <p class="mt-2 text-gray-600 leading-relaxed">
              Trust us to seamlessly fit together the pieces of your travel
              program.
            </p>
          </div>

          <!-- Adaptability -->
          <div
            class="flex flex-col items-start p-6 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow"
          >
            <div
              class="flex items-center justify-center w-12 h-12 rounded-md bg-blue-100 text-blue-600"
            >
              <svg
                class="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </div>
            <h3 class="mt-4 text-lg font-semibold text-gray-800">
              Adaptability
            </h3>
            <p class="mt-2 text-gray-600 leading-relaxed">
              Providing flexible, user-friendly technologies to streamline
              bookings and payments.
            </p>
          </div>
        </div>
      </div>

      <div class="bg-white py-20">
        <div
          class="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3"
        >
          <div class="max-w-2xl">
            <h2
              class="text-3xl font-semibold font-display tracking-tight text-gray-900 sm:text-4xl"
            >
              Our leadership
            </h2>
            <p class="mt-3 text-md leading-6 text-gray-500">
              Meet the team driving our success.
            </p>
          </div>
          <div class="xl:col-span-2">
            <ul
              role="list"
              class="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
            >
              <!-- <li>
                <div class="flex items-center gap-x-6">
                  <img
                    class="h-24 w-24 rounded-full object-cover border-2 border-gray-200"
                    width="80"
                    height="80"
                    src={Sam}
                    alt="Sam Cookey"
                  />
                  <div>
                    <h3
                      class="text-base font-medium leading-7 tracking-tight text-gray-800"
                    >
                      Mr Sam Cookey Jr
                    </h3>
                    <p class="text-sm font-medium leading-6 text-gray-500">
                      Chairman
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <div class="flex items-center gap-x-6">
                  <img
                    class="h-24 w-24 rounded-full object-cover border-2 border-gray-200"
                    width="80"
                    height="80"
                    src={Bola}
                    alt="Bola Adefobe"
                  />
                  <div>
                    <h3
                      class="text-base font-medium leading-7 tracking-tight text-gray-800"
                    >
                      Mrs Bola Adefope
                    </h3>
                    <p class="text-sm font-medium leading-6 text-gray-500">
                      Director
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <div class="flex items-center gap-x-6">
                  <img
                    class="h-24 w-24 rounded-full object-cover border-2 border-gray-200"
                    src={Olufemi}
                    width="80"
                    height="80"
                    alt="Olufemi Adefope"
                  />
                  <div>
                    <h3
                      class="text-base font-medium leading-7 tracking-tight text-gray-800"
                    >
                      Mr Olufemi Adefope
                    </h3>
                    <p class="text-sm font-medium leading-6 text-gray-500">
                      Director
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <div class="flex items-center gap-x-6">
                  <img
                    class="h-24 w-24 rounded-full object-cover border-2 border-gray-200"
                    src={Bolanle}
                    width="80"
                    height="80"
                    alt="Bolanle Oluwayemisi Adeniji"
                  />
                  <div>
                    <h3
                      class="text-base font-medium leading-7 tracking-tight text-gray-800"
                    >
                      Ms. Bolanle Oluwayemisi Adeniji
                    </h3>
                    <p class="text-sm font-medium leading-6 text-gray-500">
                      Director
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <div class="flex items-center gap-x-6">
                  <img
                    class="h-24 w-24 rounded-full object-cover border-2 border-gray-200"
                    src={Chioma}
                    width="80"
                    height="80"
                    alt="Chioma Nweke"
                  />
                  <div>
                    <h3
                      class="text-base font-medium leading-7 tracking-tight text-gray-800"
                    >
                      Mrs Chioma Nweke
                    </h3>
                    <p class="text-sm font-medium leading-6 text-gray-500">
                      Director
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <div class="flex items-center gap-x-6">
                  <img
                    class="h-24 w-24 rounded-full object-cover border-2 border-gray-200"
                    src={Ademola}
                    width="80"
                    height="80"
                    alt="Ademola Adefarasin
                                        "
                  />
                  <div>
                    <h3
                      class="text-base font-medium leading-7 tracking-tight text-gray-800"
                    >
                      Mr. Ademola Adefarasin
                    </h3>
                    <p class="text-sm font-medium leading-6 text-gray-500">
                      Director
                    </p>
                  </div>
                </div>
              </li> -->
              <li>
                <div class="flex items-center gap-x-6">
                  <img
                    class="h-24 w-24 rounded-full object-cover border-2 border-gray-200"
                    src={Lola}
                    width="80"
                    height="80"
                    alt="Lola Adefope"
                  />
                  <div>
                    <h3
                      class="text-base font-medium leading-7 tracking-tight text-gray-800"
                    >
                      Ms. Lola Adefope
                    </h3>
                    <p class="text-sm font-medium leading-6 text-gray-500">
                      Managing Director
                    </p>
                  </div>
                </div>
              </li>

              <li>
                <div class="flex items-center gap-x-6">
                  <img
                    class="h-24 w-24 rounded-full object-cover border-2 border-gray-200"
                    src={""}
                    width="80"
                    height="80"
                    alt="Nii Anyetei"
                  />
                  <div>
                    <h3
                      class="text-base font-medium leading-7 tracking-tight text-gray-800"
                    >
                      Nii Anyetei
                    </h3>
                    <p class="text-sm font-medium leading-6 text-gray-500">
                      Country Manager
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


<CallOut />
