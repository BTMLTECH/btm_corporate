import { z } from 'zod';

// Schema for Step 1: Personal Details
export const personalInfoSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters').max(50, 'Full name cannot exceed 50 characters'),
  email: z.string().email('Invalid email address'),
  // Basic E.164 format check (starts with +, followed by digits) - more robust validation might be needed
  phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format (E.164 expected)'),
  address: z.string().min(10, 'Address must be at least 10 characters').max(200, 'Address cannot exceed 200 characters'),
  // Basic ISO 3166-1 alpha-2 check (2 uppercase letters) - could use a library for full validation
  countryCode: z.string().regex(/^[A-Z]{2}$/, 'Invalid country code (ISO 3166-1 alpha-2 expected)'),
});

// Schema for Step 2: Destination Selection (assuming selection provides an ID)
// More complex validation might be needed depending on how destinations are fetched/selected
export const destinationSchema = z.object({
  id: z.string().min(1, 'Destination selection is required'), // Ensure an ID is present
  name: z.string(), // Name might be display-only, fetched based on ID
  // Other fields from the Destination interface are likely display-only or fetched server-side
});

// Schema for Step 3: Accommodation
export const accommodationSchema = z.object({
  type: z.enum(['luxury', 'boutique', 'standard', 'budget', 'hostel']),
  checkIn: z.date({ required_error: 'Check-in date is required' }),
  checkOut: z.date({ required_error: 'Check-out date is required' }),
  roomType: z.string().min(1, 'Room type selection is required'),
  guests: z.number().int().min(1, 'At least one guest is required'),
  amenities: z.array(z.string()).optional(), // Assuming amenities are optional selections
  // pricePerNight might be calculated/fetched, not directly submitted
}).refine(data => data.checkOut > data.checkIn, {
  message: 'Check-out date must be after check-in date',
  path: ['checkOut'], // Attach error to checkOut field
});

// Schema for Step 4: Activities (assuming selection provides IDs)
export const activitySchema = z.object({
  id: z.string().min(1),
  // Other fields are likely display-only or fetched server-side based on ID
  // Validation for time slot selection might be needed here if applicable
});

export const activitiesSchema = z.array(activitySchema).min(0); // Allow zero or more activities

// Schema for Step 5: Payment
export const paymentSchema = z.object({
  cardNumber: z.string()
    .regex(/^\d{13,19}$/, 'Invalid card number format')
    // TODO: Add Luhn algorithm validation
    .refine(value => {
       // Basic Luhn check implementation (can be improved)
       let sum = 0;
       let shouldDouble = false;
       for (let i = value.length - 1; i >= 0; i--) {
         let digit = parseInt(value.charAt(i));
         if (shouldDouble) {
           digit *= 2;
           if (digit > 9) digit -= 9;
         }
         sum += digit;
         shouldDouble = !shouldDouble;
       }
       return sum % 10 === 0;
    }, 'Invalid card number (Luhn check failed)'),
  cardholderName: z.string().min(2, 'Cardholder name is required'),
  // Basic MM/YY format check
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, 'Invalid expiry date format (MM/YY)'),
  // Basic 3 or 4 digit CVV check
  cvv: z.string().regex(/^\d{3,4}$/, 'Invalid CVV'),
  // cardType can be derived, so not strictly required in the schema
});

// Combined schema for the entire multi-step form
// We use partial() because data is collected step-by-step
export const tourBookingSchema = z.object({
  personalInfo: personalInfoSchema.optional(),
  destination: destinationSchema.optional(),
  accommodation: accommodationSchema.optional(),
  activities: activitiesSchema.optional(),
  payment: paymentSchema.optional(),
});

// You might create schemas for individual steps if validating per step
export const step1Schema = personalInfoSchema;
export const step2Schema = destinationSchema;
export const step3Schema = accommodationSchema;
export const step4Schema = activitiesSchema;
export const step5Schema = paymentSchema;
