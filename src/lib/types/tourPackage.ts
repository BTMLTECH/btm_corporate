export interface Destination {
  id: string;
  name: string;
}

export interface Inclusion {
  id: string;
  description: string;
}

export interface Exclusion {
  id: string;
  description: string;
}

export interface Itineraries {
  id: string;
  day_number: number;
  title: string | undefined;
  description: string;
}

export interface TermsAndConditions {
  id: string;
  title: string | undefined;
  description: string;
}

export interface TourPackage {
  id: string;
  title: string;
  slug: string;
  description: string | undefined;
  duration_days: number;
  duration_nights: number;
  price_per_person_usd?: number;
  price_per_family_usd?: number;

  number_of_travelers: number;

  traveler_adults: number;

  traveler_children?: number;

  is_group_pricing?: boolean;

  price_type?: | "PER_PERSON" | "PER_FAMILY";

  destinations: Destination[];
  accommodation_details: string | undefined;
  meals_included: string | undefined;
  transport_info: string | undefined;
  itineraries: Itineraries[] | undefined;
  inclusions: Inclusion[] | undefined;
  exclusions: Exclusion[] | undefined;
  terms_conditions: TermsAndConditions[] | undefined;
  
  package_type: string;
  thumbnail_url: string;
}
