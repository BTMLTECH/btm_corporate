// src/routes/payment/+page.server.ts
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';

// Form schema with validation rules
const schema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(14, 'Phone number must not exceed 14 digits')
    .regex(/^\d+$/, 'Phone number must contain only digits'),
  billingAddress: z.string().min(1, 'Billing address is required'),
  cardholderName: z.string().min(1, 'Cardholder name is required'),
  cardNumber: z.string()
    .min(13, 'Card number is too short')
    .max(19, 'Card number is too long'),
  expiryDate: z.string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Please use MM/YY format'),
  cvv: z.string()
    .regex(/^\d{3,4}$/, 'CVV must be 3 or 4 digits')
});

export const load: PageServerLoad = async () => {
  // Server-side validation setup
  const form = await superValidate(zod(schema));
  
  return {
    form
  };
};

export const actions: Actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, zod(schema));
    
    if (!form.valid) {
      return fail(400, { form });
    }

    // Here you would process the payment with a payment gateway
    // For this example, we'll just return success
    
    return {
      form
    };
  }
};