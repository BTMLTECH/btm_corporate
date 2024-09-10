import { flutterwave } from '$lib/server/flutterwave';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { FLW_SECRET_KEY } from '$env/static/private';
import { amadeus } from '$lib/server/amadeus';
import type { FlightsOfferSearchType } from '$lib/utils/flightTypes';
import type { PrimaryPassenger } from '$lib/server/validation';

export const POST: RequestHandler = async ({ fetch, request, url }) => {
	const form = await request.formData();
	const flightData = form.get('flightData') as FlightsOfferSearchType | null;
	const travelers = form.get('travelers') as PrimaryPassenger[] | null;

	console.log(travelers);

	// send data to amadeus to finalize booking
	try {
		const { result } = await amadeus.booking.flightOrders.post(
			JSON.stringify({
				// flightOffers: flightData ? [flightData] : [],
				// travelers: travelers ? [...travelers] : []
				data: {
					type: 'flight-order',

					flightOffers: [
						{
							type: 'flight-offer',
							id: '1',
							source: 'GDS',
							instantTicketingRequired: false,
							nonHomogeneous: false,
							oneWay: false,
							isUpsellOffer: false,
							lastTicketingDate: '2024-08-28',
							lastTicketingDateTime: '2024-08-28',
							numberOfBookableSeats: 3,
							itineraries: [
								{
									duration: 'PT5H52M',
									segments: [
										{
											departure: { iataCode: 'BWI', at: '2024-08-30T18:38:00' },
											arrival: { iataCode: 'SFO', terminal: '3', at: '2024-08-30T21:30:00' },
											carrierCode: 'UA',
											number: '2421',
											aircraft: { code: '7M8' },
											operating: { carrierCode: 'UA' },
											duration: 'PT5H52M',
											id: '1',
											numberOfStops: 0,
											blacklistedInEU: false
										}
									]
								},
								{
									duration: 'PT5H19M',
									segments: [
										{
											departure: { iataCode: 'SFO', terminal: '3', at: '2024-09-27T23:10:00' },
											arrival: { iataCode: 'BWI', at: '2024-09-28T07:29:00' },
											carrierCode: 'UA',
											number: '2423',
											aircraft: { code: '7M8' },
											operating: { carrierCode: 'UA' },
											duration: 'PT5H19M',
											id: '7',
											numberOfStops: 0,
											blacklistedInEU: false
										}
									]
								}
							],
							price: {
								currency: 'USD',
								total: '1047.82',
								base: '918.62',
								fees: [
									{ amount: '0.00', type: 'SUPPLIER' },
									{ amount: '0.00', type: 'TICKETING' }
								],
								grandTotal: '1047.82'
							},
							pricingOptions: { fareType: ['PUBLISHED'], includedCheckedBagsOnly: false },
							validatingAirlineCodes: ['UA'],
							travelerPricings: [
								{
									travelerId: '1',
									fareOption: 'STANDARD',
									travelerType: 'ADULT',
									price: { currency: 'USD', total: '523.91', base: '459.31' },
									fareDetailsBySegment: [
										{
											segmentId: '1',
											cabin: 'ECONOMY',
											fareBasis: 'SFA0ADDN',
											brandedFare: 'ECONOMY',
											brandedFareLabel: 'ECONOMY',
											class: 'S',
											includedCheckedBags: { quantity: 0 },
											amenities: [
												{
													description: 'CHECKED BAG FIRST',
													isChargeable: true,
													amenityType: 'BAGGAGE',
													amenityProvider: { name: 'BrandedFare' }
												},
												{
													description: 'SECOND BAG',
													isChargeable: true,
													amenityType: 'BAGGAGE',
													amenityProvider: { name: 'BrandedFare' }
												},
												{
													description: 'PRE RESERVED SEAT ASSIGNMENT',
													isChargeable: false,
													amenityType: 'PRE_RESERVED_SEAT',
													amenityProvider: { name: 'BrandedFare' }
												},
												{
													description: 'PRIORITY BOARDING',
													isChargeable: true,
													amenityType: 'TRAVEL_SERVICES',
													amenityProvider: { name: 'BrandedFare' }
												},
												{
													description: 'ECONOMY TO ECONOMY PLUS',
													isChargeable: true,
													amenityType: 'UPGRADES',
													amenityProvider: { name: 'BrandedFare' }
												},
												{
													description: 'MILEAGE ACCRUAL',
													isChargeable: false,
													amenityType: 'BRANDED_FARES',
													amenityProvider: { name: 'BrandedFare' }
												}
											]
										},
										{
											segmentId: '7',
											cabin: 'ECONOMY',
											fareBasis: 'KFA2ADDN',
											brandedFare: 'ECONOMY',
											brandedFareLabel: 'ECONOMY',
											class: 'K',
											includedCheckedBags: { quantity: 0 },
											amenities: [
												{
													description: 'CHECKED BAG FIRST',
													isChargeable: true,
													amenityType: 'BAGGAGE',
													amenityProvider: { name: 'BrandedFare' }
												},
												{
													description: 'SECOND BAG',
													isChargeable: true,
													amenityType: 'BAGGAGE',
													amenityProvider: { name: 'BrandedFare' }
												},
												{
													description: 'PRE RESERVED SEAT ASSIGNMENT',
													isChargeable: false,
													amenityType: 'PRE_RESERVED_SEAT',
													amenityProvider: { name: 'BrandedFare' }
												},
												{
													description: 'PRIORITY BOARDING',
													isChargeable: true,
													amenityType: 'TRAVEL_SERVICES',
													amenityProvider: { name: 'BrandedFare' }
												},
												{
													description: 'ECONOMY TO ECONOMY PLUS',
													isChargeable: true,
													amenityType: 'UPGRADES',
													amenityProvider: { name: 'BrandedFare' }
												},
												{
													description: 'MILEAGE ACCRUAL',
													isChargeable: false,
													amenityType: 'BRANDED_FARES',
													amenityProvider: { name: 'BrandedFare' }
												}
											]
										}
									]
								},
								{
									travelerId: '2',
									fareOption: 'STANDARD',
									travelerType: 'CHILD',
									price: { currency: 'USD', total: '523.91', base: '459.31' },
									fareDetailsBySegment: [
										{
											segmentId: '1',
											cabin: 'ECONOMY',
											fareBasis: 'SFA0ADDN',
											brandedFare: 'ECONOMY',
											brandedFareLabel: 'ECONOMY',
											class: 'S',
											amenities: [
												{
													description: 'CHECKED BAG FIRST',
													isChargeable: true,
													amenityType: 'BAGGAGE',
													amenityProvider: { name: 'BrandedFare' }
												},
												{
													description: 'SECOND BAG',
													isChargeable: true,
													amenityType: 'BAGGAGE',
													amenityProvider: { name: 'BrandedFare' }
												},
												{
													description: 'PRE RESERVED SEAT ASSIGNMENT',
													isChargeable: false,
													amenityType: 'PRE_RESERVED_SEAT',
													amenityProvider: { name: 'BrandedFare' }
												},
												{
													description: 'PRIORITY BOARDING',
													isChargeable: true,
													amenityType: 'TRAVEL_SERVICES',
													amenityProvider: { name: 'BrandedFare' }
												},
												{
													description: 'ECONOMY TO ECONOMY PLUS',
													isChargeable: true,
													amenityType: 'UPGRADES',
													amenityProvider: { name: 'BrandedFare' }
												},
												{
													description: 'MILEAGE ACCRUAL',
													isChargeable: false,
													amenityType: 'BRANDED_FARES',
													amenityProvider: { name: 'BrandedFare' }
												}
											]
										},
										{
											segmentId: '7',
											cabin: 'ECONOMY',
											fareBasis: 'KFA2ADDN',
											brandedFare: 'ECONOMY',
											brandedFareLabel: 'ECONOMY',
											class: 'K',
											amenities: [
												{
													description: 'CHECKED BAG FIRST',
													isChargeable: true,
													amenityType: 'BAGGAGE',
													amenityProvider: { name: 'BrandedFare' }
												},
												{
													description: 'SECOND BAG',
													isChargeable: true,
													amenityType: 'BAGGAGE',
													amenityProvider: { name: 'BrandedFare' }
												},
												{
													description: 'PRE RESERVED SEAT ASSIGNMENT',
													isChargeable: false,
													amenityType: 'PRE_RESERVED_SEAT',
													amenityProvider: { name: 'BrandedFare' }
												},
												{
													description: 'PRIORITY BOARDING',
													isChargeable: true,
													amenityType: 'TRAVEL_SERVICES',
													amenityProvider: { name: 'BrandedFare' }
												},
												{
													description: 'ECONOMY TO ECONOMY PLUS',
													isChargeable: true,
													amenityType: 'UPGRADES',
													amenityProvider: { name: 'BrandedFare' }
												},
												{
													description: 'MILEAGE ACCRUAL',
													isChargeable: false,
													amenityType: 'BRANDED_FARES',
													amenityProvider: { name: 'BrandedFare' }
												}
											]
										}
									]
								}
							]
						}
					],
					travelers: [
						{
							id: '1',
							dateOfBirth: '1982-01-16',
							name: { firstName: 'JORGE', lastName: 'GONZALES' },
							gender: 'MALE',
							contact: {
								emailAddress: 'jorge.gonzales833@telefonica.es',
								phones: [{ deviceType: 'MOBILE', countryCallingCode: '34', number: '480080076' }]
							},
							documents: [
								{
									documentType: 'PASSPORT',
									issuanceDate: '2015-04-14',
									number: '00000000',
									expiryDate: '2025-04-14',
									issuanceCountry: 'ES',
									nationality: 'ES',
									holder: true
								}
							]
						},
						{
							id: '2',
							dateOfBirth: '2012-10-11',
							name: { firstName: 'NICOLAS', lastName: 'GONZALES' },
							gender: 'MALE',
							// contact: {
							// 	emailAddress: 'jorge.gonzales833@telefonica.es',
							// 	phones: [{ deviceType: 'MOBILE', countryCallingCode: '34', number: '480080076' }]
							// },
							documents: [
								{
									documentType: 'PASSPORT',
									birthPlace: 'Madrid',
									issuanceLocation: 'Madrid',
									issuanceDate: '2015-04-14',
									number: '00000001',
									expiryDate: '2025-04-14',
									issuanceCountry: 'ES',
									validityCountry: 'ES',
									nationality: 'ES',
									holder: true
								}
							]
						}
					],
					// remarks: {
					// 	general: [
					// 		{ subType: 'GENERAL_MISCELLANEOUS', text: 'ONLINE BOOKING FROM INCREIBLE VIAJES' }
					// 	]
					// },
					ticketingAgreement: { option: 'DELAY_TO_CANCEL', delay: '3D' },
					// contacts: [
					// 	{
					// 		addresseeName: { firstName: 'PABLO', lastName: 'RODRIGUEZ' },
					// 		companyName: 'INCREIBLE VIAJES',
					// 		purpose: 'STANDARD',
					// 		phones: [{ deviceType: 'MOBILE', countryCallingCode: '34', number: '480080076' }],
					// 		emailAddress: 'support@increibleviajes.es',
					// 		address: {
					// 			lines: ['Calle Prado, 16'],
					// 			postalCode: '28014',
					// 			cityName: 'Madrid',
					// 			countryCode: 'ES'
					// 		}
					// 	}
					// ]
				}
			})
		);

		return json(result);
	} catch (err: any) {
		return json(err, {status: err.response.statusCode});
	}
};
