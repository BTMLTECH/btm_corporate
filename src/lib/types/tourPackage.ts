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
  price_per_person_usd: number;
  destinations: Destination[];
  accommodation_details: string | undefined;
  meals_included: string | undefined;
  transport_info: string | undefined;
  itineraries: Itineraries[] | undefined;
  inclusions: Inclusion[] | undefined;
  exclusions: Exclusion[] | undefined;
  terms_conditions: TermsAndConditions[] | undefined;
  package_type: string;
  thumbnail_url: str
}
