<div class="bg-gray-50">
    <main class="mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:max-w-none">
            <h1 class="sr-only">Checkout</h1>

            <form class="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
                <div>
                    <div>
                        <h2 class="text-lg font-semibold text-gray-900">Contact information</h2>

                        <div class="mt-4">
                            <label for="email-address" class="block text-sm font-medium text-gray-700">Email
                                address</label>
                            <div class="mt-1">
                                <input type="email" id="email-address" name="email-address" autocomplete="email"
                                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                            </div>
                        </div>
                    </div>

                    <div class="mt-10 border-t border-gray-200 pt-10">
                        <h2 class="text-lg font-semibold text-gray-900">Personal information</h2>

                        <div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                            <div>
                                <label for="first-name" class="block text-sm font-medium text-gray-700">First
                                    name</label>
                                <div class="mt-1">
                                    <input type="text" id="first-name" name="first-name" autocomplete="given-name"
                                        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                </div>
                            </div>

                            <div>
                                <label for="last-name" class="block text-sm font-medium text-gray-700">Last
                                    name</label>
                                <div class="mt-1">
                                    <input type="text" id="last-name" name="last-name" autocomplete="family-name"
                                        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                </div>
                            </div>

                            <div class="sm:col-span-2">
                                <label for="company" class="block text-sm font-medium text-gray-700">Company</label>
                                <div class="mt-1">
                                    <input type="text" name="company" id="company"
                                        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                </div>
                            </div>

                            <div class="sm:col-span-2">
                                <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
                                <div class="mt-1">
                                    <input type="text" name="address" id="address" autocomplete="street-address"
                                        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                </div>
                            </div>

                            <div>
                                <label for="city" class="block text-sm font-medium text-gray-700">City</label>
                                <div class="mt-1">
                                    <input type="text" name="city" id="city" autocomplete="address-level2"
                                        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                </div>
                            </div>

                            <div>
                                <label for="country" class="block text-sm font-medium text-gray-700">Country</label>
                                <div class="mt-1">
                                    <select id="country" name="country" autocomplete="country-name"
                                        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                        <option>United States</option>
                                        <option>Canada</option>
                                        <option>Mexico</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label for="region" class="block text-sm font-medium text-gray-700">State /
                                    Province</label>
                                <div class="mt-1">
                                    <input type="text" name="region" id="region" autocomplete="address-level1"
                                        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                </div>
                            </div>

                            <div>
                                <label for="postal-code" class="block text-sm font-medium text-gray-700">Postal
                                    code</label>
                                <div class="mt-1">
                                    <input type="text" name="postal-code" id="postal-code" autocomplete="postal-code"
                                        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                </div>
                            </div>

                            <div class="sm:col-span-2">
                                <label for="phone" class="block text-sm font-medium text-gray-700">Phone</label>
                                <div class="mt-1">
                                    <input type="text" name="phone" id="phone" autocomplete="tel"
                                        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mt-10 lg:mt-0">
                    <h2 class="text-lg font-semibold text-gray-900">Flight details</h2>
                    <fieldset aria-label="Delivery method" class="mt-4">
                        <div class="max-w-2xl w-full mx-auto p-6 bg-white shadow-sm rounded-lg border border-gray-200">
                            <div class="flex justify-between items-center">
                                <div class="flex items-center">
                                    <img src="https://img.logo.dev/britishairways.com?token=pk_TXwjwi_ORgm7pQQZkrTBRw"
                                        alt="Garuda Indonesia logo" class="w-12 h-12 mr-3">
                                    <div>
                                        <h2 class="text-md font-bold text-[#00008B]">Garuda Indonesia</h2>
                                        <div class="flex items-center">
                                            <span class="text-sm text-gray-600 mr-2">GI 2023</span>
                                            <span
                                                class="bg-green-500 text-white text-xs font-medium px-1 py-1 rounded">Business</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="text-right">
                                    <div class="text-md font-bold text-[#00008B]">06:00</div>
                                    <div class="text-sm text-gray-600">JKTC</div>
                                </div>
                            </div>

                            <div class="flex justify-between items-center">
                                <div class="flex-1 border-t-2 border-gray-300"></div>
                                <div class="px-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </div>
                                <div class="flex-1 border-t-2 border-gray-300"></div>
                            </div>

                            <div class="flex justify-between items-center mb-2">
                                <div class="text-sm text-gray-600">1h 40m • Direct</div>
                                <div class="text-right">
                                    <div class="text-md font-bold text-[#00008B]">07:40</div>
                                    <div class="text-sm text-gray-600">SUB</div>
                                </div>
                            </div>

                            <div class="border-t border-gray-200 pt-4">
                                <h3 class="text-lg font-medium mb-2">Facilities:</h3>
                                <div class="flex flex-wrap gap-4">
                                    <div class="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-gray-600"
                                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span class="text-sm">Baggage 20 kg, Cabin Baggage 7kg</span>
                                    </div>
                                    <div class="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-gray-600"
                                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        <span class="text-sm">In-flight entertainment</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </fieldset>

                    <h2 class="text-lg font-semibold text-gray-900 mt-10 border-t border-gray-200 pt-10">Price
                        summary
                    </h2>

                    <div class="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
                        <ul role="list" class="divide-y divide-gray-200">
                            <li class="flex px-4 py-6 sm:px-6">
                                <div class="flex-shrink-0">
                                    <div class="rounded-full  flex items-center justify-center">
                                        <svg class="w-6 h-6 text-gray-500" fill="currentColor"
                                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <path
                                                d="M12 12c2.28 0 4-1.72 4-4s-1.72-4-4-4-4 1.72-4 4 1.72 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                        </svg>
                                    </div>
                                </div>

                                <div class="ml-4 flex flex-1 flex-col">
                                    <div class="flex">
                                        <div class="min-w-0 flex-1">
                                            <h4 class="text-sm">
                                                <a href="#" class="font-medium text-gray-700 hover:text-gray-800">Cabin
                                                    Size</a>
                                            </h4>
                                            <p class="mt-1 text-sm text-gray-500">Black</p>
                                            <p class="mt-1 text-sm text-gray-500">Large</p>
                                        </div>

                                        <div class="ml-4 flow-root flex-shrink-0">
                                            <button type="button"
                                                class="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500">
                                                <span class="sr-only">Remove</span>
                                                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"
                                                    aria-hidden="true">
                                                    <path fill-rule="evenodd"
                                                        d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                                                        clip-rule="evenodd" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>

                                    <div class="flex flex-1 items-end justify-between pt-2">
                                        <p class="mt-1 text-sm font-medium text-gray-900">$32.00</p>
                                    </div>
                                </div>
                            </li>

                            <!-- More products... -->
                        </ul>
                        <dl class="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
                            <div class="flex items-center justify-between">
                                <dt class="text-sm">Subtotal</dt>
                                <dd class="text-sm font-medium text-gray-900">$64.00</dd>
                            </div>
                            <div class="flex items-center justify-between">
                                <dt class="text-sm">Shipping</dt>
                                <dd class="text-sm font-medium text-gray-900">$5.00</dd>
                            </div>
                            <div class="flex items-center justify-between">
                                <dt class="text-sm">Taxes</dt>
                                <dd class="text-sm font-medium text-gray-900">$5.52</dd>
                            </div>
                            <div class="flex items-center justify-between border-t border-gray-200 pt-6">
                                <dt class="text-base font-medium">Total</dt>
                                <dd class="text-base font-medium text-gray-900">$75.52</dd>
                            </div>
                        </dl>

                        <div class="border-t border-gray-200 px-4 py-6 sm:px-6">
                            <button type="submit"
                                class="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium
                                     text-white shadow-sm hover:bg-indigo-700
                                    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50">Make
                                payment</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </main>
</div>