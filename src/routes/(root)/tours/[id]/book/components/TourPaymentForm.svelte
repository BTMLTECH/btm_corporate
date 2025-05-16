<script lang="ts">
  import { superForm } from 'sveltekit-superforms/client';
  import { fadeFlyScale } from 'sveltekit-superforms/transitions';
  import { z } from 'zod';
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  // Card types with regex patterns
  const cardTypes = [
    { name: 'visa', pattern: /^4/, logo: '💳 Visa' },
    { name: 'mastercard', pattern: /^5[1-5]/, logo: '💳 MasterCard' },
    { name: 'amex', pattern: /^3[47]/, logo: '💳 American Express' },
    { name: 'discover', pattern: /^6(?:011|5)/, logo: '💳 Discover' }
  ];

  let cardType = writable('');
  let cardNumberInput: HTMLInputElement;
  let expiryInput: HTMLInputElement;
  let cvvInput: HTMLInputElement;

  // Form schema with validation rules
  const schema = z.object({
    fullName: z.string().min(1, 'Full name is required'),
    email: z.string().email('Please enter a valid email address'),
    phone: z.string()
      .min(10, 'Phone number must be at least 10 digits')
      .max(14, 'Phone number must not exceed 14 digits')
      .regex(/^\d+$/, 'Phone number must contain only digits'),
    address: z.string().min(1, 'Billing address is required'),
    cardholderName: z.string().min(1, 'Cardholder name is required'),
    cardNumber: z.string()
      .min(13, 'Card number is too short')
      .max(19, 'Card number is too long')
      .refine(luhnCheck, 'Please enter a valid card number'),
    expiryDate: z.string()
      .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Please use MM/YY format')
      .refine(isValidExpiry, 'Expiry date must be in the future'),
    cvv: z.string()
      .regex(/^\d{3,4}$/, 'CVV must be 3 or 4 digits')
  });

  // Luhn algorithm for credit card validation
  function luhnCheck(cardNumber: string): boolean {
    const digits = cardNumber.replace(/\D/g, '');
    if (!digits) return false;
    
    let sum = 0;
    let shouldDouble = false;
    
    for (let i = digits.length - 1; i >= 0; i--) {
      let digit = parseInt(digits.charAt(i));
      
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    
    return sum % 10 === 0;
  }

  // Validate expiry date
  function isValidExpiry(value: string): boolean {
    const [monthStr, yearStr] = value.split('/');
    if (!monthStr || !yearStr) return false;

    const month = parseInt(monthStr, 10);
    const year = parseInt(`20${yearStr}`, 10);
    
    const now = new Date();
    const currentMonth = now.getMonth() + 1; // getMonth() is 0-indexed
    const currentYear = now.getFullYear();
    
    if (year < currentYear) return false;
    if (year === currentYear && month < currentMonth) return false;
    
    return true;
  }

  // Format card number with spaces
  function formatCardNumber(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, '');
    const formatted = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    input.value = formatted;
    
    // Detect card type
    cardType.set('');
    for (const type of cardTypes) {
      if (type.pattern.test(value)) {
        cardType.set(type.name);
        break;
      }
    }
  }

  // Format expiry date as MM/YY
  function formatExpiryDate(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, '');
    
    if (value.length > 2) {
      input.value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
    } else {
      input.value = value;
    }
  }

  const { form, errors, enhance, submitting } = superForm(schema, {
    transitions: fadeFlyScale,
    onSubmit: () => {
      // This would normally send the data to your backend
      alert('Payment form submitted successfully!');
      return { status: 200 };
    }
  });

  // Handle form submission
  function handleSubmit() {
    // The superForm enhance directive handles form submission
    console.log('Form submitted!');
  }
</script>

<div class="max-w-4xl mx-auto px-4 py-8 bg-white rounded-lg shadow">
  <h1 class="text-3xl font-bold text-center mb-8 text-teal-700">Tour Package Booking</h1>
  
  <form class="space-y-8" method="POST" use:enhance on:submit|preventDefault={handleSubmit}>
    <!-- User Information Section -->
    <div class="bg-gray-50 p-6 rounded-lg border border-gray-200">
      <h2 class="text-xl font-semibold mb-6 text-teal-700">Personal Information</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Full Name -->
        <div class="col-span-1">
          <label for="fullName" class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input 
            type="text" 
            id="fullName" 
            bind:value={$form.fullName} 
            class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder="John Doe"
          />
          {#if $errors.fullName}
            <p class="mt-1 text-sm text-red-600">{$errors.fullName}</p>
          {/if}
        </div>
        
        <!-- Email Address -->
        <div class="col-span-1">
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input 
            type="email" 
            id="email" 
            bind:value={$form.email} 
            class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder="john.doe@example.com"
          />
          {#if $errors.email}
            <p class="mt-1 text-sm text-red-600">{$errors.email}</p>
          {/if}
        </div>
        
        <!-- Phone Number -->
        <div class="col-span-1">
          <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input 
            type="tel" 
            id="phone" 
            bind:value={$form.phone} 
            class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder="1234567890"
          />
          {#if $errors.phone}
            <p class="mt-1 text-sm text-red-600">{$errors.phone}</p>
          {/if}
        </div>
      </div>
      
      <!-- Billing Address -->
      <div class="mt-6">
        <label for="address" class="block text-sm font-medium text-gray-700 mb-1">Billing Address</label>
        <textarea 
          id="address" 
          bind:value={$form.address} 
          rows="3" 
          class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          placeholder="Enter your billing address"
        ></textarea>
        {#if $errors.address}
          <p class="mt-1 text-sm text-red-600">{$errors.address}</p>
        {/if}
      </div>
    </div>
    
    <!-- Card Payment Section -->
    <div class="bg-gray-50 p-6 rounded-lg border border-gray-200">
      <h2 class="text-xl font-semibold mb-6 text-teal-700">Payment Details</h2>
      
      <!-- Cardholder Name -->
      <div class="mb-6">
        <label for="cardholderName" class="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
        <input 
          type="text" 
          id="cardholderName" 
          bind:value={$form.cardholderName} 
          class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          placeholder="Name as it appears on card"
        />
        {#if $errors.cardholderName}
          <p class="mt-1 text-sm text-red-600">{$errors.cardholderName}</p>
        {/if}
      </div>
      
      <!-- Card Number -->
      <div class="mb-6">
        <label for="cardNumber" class="block text-sm font-medium text-gray-700 mb-1">
          Card Number
          {#if $cardType}
            <span class="ml-2 text-teal-600 font-medium">
              {cardTypes.find(t => t.name === $cardType)?.logo || ''}
            </span>
          {/if}
        </label>
        <input 
          type="text" 
          id="cardNumber" 
          bind:value={$form.cardNumber}
          bind:this={cardNumberInput}
          on:input={formatCardNumber}
          class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          placeholder="1234 5678 9012 3456"
          maxlength="19"
        />
        {#if $errors.cardNumber}
          <p class="mt-1 text-sm text-red-600">{$errors.cardNumber}</p>
        {/if}
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Expiry Date -->
        <div>
          <label for="expiryDate" class="block text-sm font-medium text-gray-700 mb-1">Expiry Date (MM/YY)</label>
          <input 
            type="text" 
            id="expiryDate" 
            bind:value={$form.expiryDate}
            bind:this={expiryInput}
            on:input={formatExpiryDate}
            class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder="MM/YY"
            maxlength="5"
          />
          {#if $errors.expiryDate}
            <p class="mt-1 text-sm text-red-600">{$errors.expiryDate}</p>
          {/if}
        </div>
        
        <!-- CVV -->
        <div>
          <label for="cvv" class="block text-sm font-medium text-gray-700 mb-1">CVV</label>
          <input 
            type="password" 
            id="cvv" 
            bind:value={$form.cvv}
            bind:this={cvvInput}
            class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder="123"
            maxlength="4"
          />
          {#if $errors.cvv}
            <p class="mt-1 text-sm text-red-600">{$errors.cvv}</p>
          {/if}
        </div>
      </div>
    </div>
    
    <!-- Submit Button -->
    <div class="flex justify-center">
      <button 
        type="submit" 
        class="px-8 py-3 bg-teal-600 text-white font-medium rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors duration-300 disabled:opacity-50"
        disabled={$submitting}
      >
        {$submitting ? 'Processing...' : 'Complete Booking'}
      </button>
    </div>
  </form>
</div>

<style lang="postcss">
  .form-section {
  @apply bg-gray-50 p-6 rounded-lg border border-gray-200;
}

.form-heading {
  @apply text-xl font-semibold mb-6 text-teal-700;
}

.input-field {
  @apply w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent;
}

.input-label {
  @apply block text-sm font-medium text-gray-700 mb-1;
}

.error-message {
  @apply mt-1 text-sm text-red-600;
}

.submit-button {
  @apply px-8 py-3 bg-teal-600 text-white font-medium rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors duration-300 disabled:opacity-50;
}
</style>