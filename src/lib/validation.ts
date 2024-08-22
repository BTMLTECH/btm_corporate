import { array, coerce, custom, number, object, string, z } from 'zod';
// @ts-ignore
import Amadeus from 'amadeus'


export const autocompleteFlightSearchSchema = object({
  keyword: string().min(1).max(256).trim(),
  subType: string().min(1).max(256).trim().default(Amadeus.location.airport as string),
});

export const flightSearchSchema = object({
  origin: string().min(1).trim(),
  destination: string().min(1).trim(),
  departure: string().date().trim(),
  return: string().date().trim().optional(),
  adult: number().default(1),
  child: number().max(7).default(0).optional(),
  infant: number().max(7).default(0).optional(),
  travelClass: string().min(1).trim().optional().default("ECONOMY")
})

export const flightOfferPriceSchema = object({
  
})