

<div class="payment mx-auto w-full mt-10">
    <h2 class="text-xl font-semibold mt-5">Payment Details</h2>
    <fieldset class="border border-gray-300 p-4 rounded-lg mt-5">
      <legend class="text-lg font-medium"
        >Enter your credit card information</legend
      >

      <div class="space-y-2">
        <div class="md:flex justify-between gap-x-6 w-full">
          <label
            for="cardNumber"
            class="w-full block text-sm font-medium leading-6 text-gray-900"
          >
            Card number
            <input
              name="cardNumber"
              bind:value={$form.paymentData.cardNumber}
              type="text"
              placeholder="1234 5678 9012 3456"
              class="btm-input {$errors.paymentData?.cardNumber &&
              $errors.paymentData.cardNumber.length
                ? 'btm-input-focus-err'
                : 'btm-input-focus'} sm:text-sm sm:leading-6"
            />
            {#if $errors.paymentData?.cardNumber}<span
                class="text-xs text-red-500 font-bold"
                >{$errors.paymentData.cardNumber}</span
              >{/if}
          </label>

          <label
            for="cvv"
            class="w-full block text-sm font-medium leading-6 text-gray-900"
          >
            CVV
            <input
              name="cvv"
              bind:value={$form.paymentData.cvv}
              type="text"
              placeholder="123"
              class="btm-input {$errors.paymentData?.cvv &&
              $errors.paymentData.cvv.length
                ? 'btm-input-focus-err'
                : 'btm-input-focus'} sm:text-sm sm:leading-6"
            />
            {#if $errors.paymentData?.cvv}<span
                class="text-xs text-red-500 font-bold"
                >{$errors.paymentData.cvv}</span
              >{/if}
          </label>
        </div>
        <div class="md:flex justify-between gap-x-6 w-full">
          <label
            for="expiryMonth"
            class="w-full block text-sm font-medium leading-6 text-gray-900"
          >
            Expiry Month
            <input
              name="expiryMonth"
              bind:value={$form.paymentData.expiryMonth}
              type="text"
              placeholder="09"
              class="btm-input {$errors.paymentData?.expiryMonth &&
              $errors.paymentData.expiryMonth.length
                ? 'btm-input-focus-err'
                : 'btm-input-focus'} sm:text-sm sm:leading-6"
            />
            {#if $errors.paymentData?.expiryMonth}<span
                class="text-xs text-red-500 font-bold"
                >{$errors.paymentData.expiryMonth}</span
              >{/if}
          </label>
          <label
            for="expiryYear"
            class="w-full block text-sm font-medium leading-6 text-gray-900"
          >
            Expiry Year
            <input
              name="expiryYear"
              bind:value={$form.paymentData.expiryYear}
              type="text"
              placeholder="32"
              class="btm-input {$errors.paymentData?.expiryYear &&
              $errors.paymentData.expiryYear.length
                ? 'btm-input-focus-err'
                : 'btm-input-focus'} sm:text-sm sm:leading-6"
            />
            {#if $errors.paymentData?.expiryYear}<span
                class="text-xs text-red-500 font-bold"
                >{$errors.paymentData.expiryYear}</span
              >{/if}
          </label>
        </div>
        {#if showAVS}
          <input
            type="hidden"
            name="mode"
            bind:value={$form.paymentData.mode}
          />
          <div class="md:flex justify-between gap-x-6 w-full">
            <label
              for="country"
              class="w-full block text-sm font-medium leading-6 text-gray-900"
            >
              Country
              <Countries
                className="btm-input {$errors.paymentData &&
                $errors.paymentData.country &&
                $errors.paymentData.country.length
                  ? 'btm-input-focus-err'
                  : 'btm-input-focus'} sm:text-sm sm:leading-6"
                bind:value={$form.paymentData.country}
              />
              {#if $errors.paymentData?.country}<span
                  class="text-xs text-red-500 font-bold"
                  >{$errors.paymentData.country}</span
                >{/if}
            </label>

            <label
              for="state"
              class="w-full block text-sm font-medium leading-6 text-gray-900"
            >
              State
              <input
                name="state"
                bind:value={$form.paymentData.state}
                on:input={(e) => {
                  $form.paymentData.mode = "avs_noauth";
                }}
                type="text"
                placeholder="Enter state"
                class="btm-input {$errors.paymentData?.state &&
                $errors.paymentData.state.length
                  ? 'btm-input-focus-err'
                  : 'btm-input-focus'} sm:text-sm sm:leading-6"
              />
              {#if $errors.paymentData?.state}<span
                  class="text-xs text-red-500 font-bold"
                  >{$errors.paymentData.state}</span
                >{/if}
            </label>
          </div>

          <div class="md:flex justify-between gap-x-6 w-full">
            <label
              for="city"
              class="w-full block text-sm font-medium leading-6 text-gray-900"
            >
              City
              <input
                name="city"
                bind:value={$form.paymentData.city}
                type="text"
                placeholder="Enter city"
                class="btm-input {$errors.paymentData?.city &&
                $errors.paymentData.city.length
                  ? 'btm-input-focus-err'
                  : 'btm-input-focus'} sm:text-sm sm:leading-6"
              />
              {#if $errors.paymentData?.city}<span
                  class="text-xs text-red-500 font-bold"
                  >{$errors.paymentData.city}</span
                >{/if}
            </label>
            <label
              for="address"
              class="w-full block text-sm font-medium leading-6 text-gray-900"
            >
              Address
              <input
                name="address"
                bind:value={$form.paymentData.address}
                type="text"
                placeholder="Enter address"
                class="btm-input {$errors.paymentData?.address &&
                $errors.paymentData.address.length
                  ? 'btm-input-focus-err'
                  : 'btm-input-focus'} sm:text-sm sm:leading-6"
              />
              {#if $errors.paymentData?.address}<span
                  class="text-xs text-red-500 font-bold"
                  >{$errors.paymentData.address}</span
                >{/if}
            </label>

            <label
              for="zipcode"
              class="w-full block text-sm font-medium leading-6 text-gray-900"
            >
              Zipcode
              <input
                name="zipcode"
                bind:value={$form.paymentData.zipcode}
                type="text"
                placeholder="Enter zip code"
                class="btm-input {$errors.paymentData?.zipcode &&
                $errors.paymentData.zipcode.length
                  ? 'btm-input-focus-err'
                  : 'btm-input-focus'} sm:text-sm sm:leading-6"
              />
              {#if $errors.paymentData?.zipcode}<span
                  class="text-xs text-red-500 font-bold"
                  >{$errors.paymentData.zipcode}</span
                >{/if}
            </label>
          </div>
        {/if}
      </div>
    </fieldset>
  </div>