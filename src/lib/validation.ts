import { array, boolean, coerce, custom, number, object, string, z } from 'zod';

export const autocompleteFlightSearchSchema = object({
	keyword: string().min(1).max(256).trim(),
	subType: string().min(1).max(256).trim().default('AIRPORT,CITY')
});

export const flightSearchSchema = object({
	origin: string().min(1).trim(),
	destination: string().min(1).trim(),
	departure: string().date().trim(),
	return: string().date().trim().optional(),
	adult: number().min(1).max(200).default(1),
	child: number().min(1).max(7).default(0),
	infant: number().min(1).max(7).default(0),
	travelClass: string().min(1).trim().optional().default('ECONOMY')
});

export const flightOfferPriceSchema = object({});

const BookingDocumentSchema = object({
	number: string().max(256).trim(),
	issuanceDate: string().max(256).trim(),
	expiryDate: string().max(256).trim(),
	issuanceCountry: string().max(256).trim(),
	// issuanceLocation: string().min(1, 'Issuance location is required').trim(),
	nationality: string().max(256).trim(),
	// birthPlace: string().min(1, 'Birth place is required').trim(),
	documentType: string().max(256).trim().default('PASSPORT'),
	holder: boolean().default(true)
});

const TravelContactPhonesSchema = object({
	deviceType: string().max(256).trim().default('MOBILE'),
	countryCallingCode: string().max(256).trim(),
	number: string().max(256).trim()
});

const TravelerContactSchema = object({
	// purpose: string().min(1).trim(),
	phones: TravelContactPhonesSchema,
	emailAddress: string().max(256).trim()
});

const TravelersContactSchema = object({
	// purpose: string().min(1).trim(),
	phones: TravelContactPhonesSchema,
	emailAddress: string().max(256).trim()
});

const userBookingInfoSchema = object({
	id: z.string().min(1).trim(),
	name: object({
		firstName: z.string().max(256).trim(),
		lastName: z.string().max(256).trim()
	}),
	documents: BookingDocumentSchema,
	dateOfBirth: z.string().max(256).trim(),
	gender: z.string().max(256).trim()
});

export const flightBookingInfoSchema = object({
	travelers: array(userBookingInfoSchema)
});

export const primaryPassengerBooking = object({
	id: z.string().min(1).trim().optional(),
	name: object({
		firstName: z.string().max(256).trim(),
		lastName: z.string().max(256).trim()
	}),
	documents: BookingDocumentSchema,
	dateOfBirth: z.string().max(256).trim(),
	gender: z.string().max(256).trim(),
	contact: TravelerContactSchema
});

export const BookingPayment = object({
	name: string().min(0, 'Card holder name is required').max(256),
	month: string().min(0, 'Month is required').max(2).trim(),
	year: string().min(0, 'Year is required').max(4).trim(),
	cvv: string().min(0, 'Cvv is required').max(3).trim(),
	cardNumber: string().min(0, 'Card number is required').max(24).trim(),
	country: string().min(0, 'Country is required').max(256).default("").optional(),
	city: string().min(0, 'City is required').max(256).default("").optional(),
	state: string().min(0, 'State is required').max(256).default("").optional(),
	address: string().min(0, 'Address is required').max(256).default("").optional(),
	zipCode: string().min(0, 'Zipcode is required').max(256).default("").optional(),
	totalAmount: string().trim().optional(),
});

export const PaymentPin = object({
	pin: string().min(0, "Pin is required").max(4).trim().optional()
})

export type PrimaryPassenger = z.infer<typeof primaryPassengerBooking>;
export type SecondaryPassenger = z.infer<typeof flightBookingInfoSchema>;
export type BookingInfo = typeof userBookingInfoSchema;
export type BookingPaymentType = typeof BookingPayment;
export type BookingPaymentPin = typeof PaymentPin
