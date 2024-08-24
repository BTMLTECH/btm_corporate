import { array, coerce, custom, number, object, string, z } from 'zod';

export const autocompleteFlightSearchSchema = object({
	keyword: string().min(1).max(256).trim(),
	subType: string().min(1).max(256).trim().default('AIRPORT,CITY')
});

export const flightSearchSchema = object({
	origin: string().min(1).trim(),
	destination: string().min(1).trim(),
	departure: string().date().trim(),
	return: string().date().trim().optional(),
	adult: number().default(1),
	child: number().max(7).default(0).optional(),
	infant: number().max(7).default(0).optional(),
	travelClass: string().min(1).trim().optional().default('ECONOMY')
});

export const flightOfferPriceSchema = object({});

export const flightBookingInfoSchema = object({
	email: string().min(1).max(256).trim(),
	phone_number: string().min(1).max(256).trim(),
	name: string().min(1).max(256).trim(),
});
