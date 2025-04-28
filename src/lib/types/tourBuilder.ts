export interface PersonalInfo {
  fullName: string; // required, 2-50 chars
  email: string; // required, valid email format
  phoneNumber: string; // required, E.164 format
  address: string; // required, 10-200 chars
  countryCode: string; // required, ISO format
}

export interface Destination {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  popularAttractions: string[];
  bestTimeToVisit: string;
  averageCost: number;
}

export interface Accommodation {
  type: 'luxury' | 'boutique' | 'standard' | 'budget' | 'hostel';
  checkIn: Date;
  checkOut: Date;
  roomType: string;
  guests: number;
  amenities: string[];
  pricePerNight: number;
}

export interface Activity {
  id: string;
  siteId: string; // To group activities by tourist site
  name: string;
  description: string;
  duration: number; // Duration in minutes or hours
  difficulty: 'easy' | 'moderate' | 'challenging';
  price: number;
  availableTimeSlots: string[]; // Could be specific dates/times or recurring patterns
  maxParticipants: number;
}

export interface Payment {
  cardNumber: string;
  cardholderName: string;
  expiryDate: string; // MM/YY format
  cvv: string;
  cardType?: 'visa' | 'mastercard' | 'amex'; // Optional, can be derived
}

export interface TourBookingData {
  personalInfo: PersonalInfo;
  destination: Destination;
  accommodation: Accommodation;
  activities: Activity[]; // User might select multiple activities
  payment: Payment;
}

// Interface for the overall form state, potentially including metadata
export interface TourFormState extends Partial<TourBookingData> {
  currentStep: number;
  // Add any other relevant state properties, e.g., validation status
}
