export type FlightsOfferSearchType = {
	id: string;
	source: string;
	numberOfBookableSeats: number;
	itineraries: [
		{
			segments: [
				{
					aircraft: string;
					departure: { iataCode: string; at: string };
					arrival: { iataCode: string; at: string };
					duration: string;
					operating: {
						carrierCode: string;
					};
					numberOfStops: number;
					number: string;
					id: string;
				}
			];
			duration: string;
		}
	];
	price: {
		currency: string;
		total: string;
		base: string;
		grandTotal: string;
		fees: [
			{
				amount: string;
				type: string;
			}
		];
	};
	pricingOptions: { fareType: any[]; includedCheckedBagsOnly: boolean };
	validatingAirlineCodes: string[];
	travelerPricings: Array<{
		fareOption: string;
		travelerId: string;
		travelerType: string;
		fareDetailsBySegment: [
			{
				amenities: [
					{
						amenityProvider: {
							name: string;
						};
						amenityType: string;
						description: string;
						isChargeable: boolean;
					}
				];
				segmentId: string;
				fareBasis: string;
				class: string;
				cabin: string;
				brandedFare: string;
				brandedFareLabel: string;
				includedCheckedBags: {
					quantity: number;
				};
			}
		];
		price: {
			base: string
			currency: string
			total: string
		}
	}>;
};
