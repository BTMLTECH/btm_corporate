export type FlightsOfferSearchType = {
  id: string;
  source: string;
  numberOfBookableSeats: number;
  itineraries: Array<{
    segments: Array<{
      aircraft: {
        code: string;
      };
      departure: { iataCode: string; at: string; terminal: string };
      arrival: { iataCode: string; at: string; terminal: string };
      duration: string;
      operating: {
        carrierCode: string;
      };
      carrierCode: string;
      numberOfStops: number;
      number: string;
      id: string;
    }>;
    duration: string;
  }>;
  oneWay: boolean;
  price: {
    currency: string;
    total: string;
    base: string;
    grandTotal: string;
    fees: [
      {
        amount: string;
        type: string;
      },
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
          },
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
      },
    ];
    price: {
      base: string;
      currency: string;
      total: string;
    };
  }>;
  dictionaries?: {
    [x: string]: {
      [x: string]: string;
    };
  };
};
