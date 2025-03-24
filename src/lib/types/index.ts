
interface TimeStamp {
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface User extends TimeStamp {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  packages: Package[];
  roles: string[];
  permissions: string[];
  provider?: "email" | "google";
  email_verified: boolean;
  last_login_at: Date;
  is_admin: boolean
  is_active: boolean
}

export interface Region extends TimeStamp {
  id: number;
  touristSites: TouristSite[];
  accommodations: Accommodation[];
  activities: Activity[];
}

export interface TouristSite extends TimeStamp {
  id: number;
  name: string;
  description: string;
  regionId: number;
  region: Region;
  price: number;
}

export interface Accommodation extends TimeStamp {
  id: number;
  name: string;
  regionId: number;
  region: Region;
  pricePerNight: number;
}

export interface Transportation extends TimeStamp {
  id: number;
  pricePerPerson: number;
}

export interface Activity extends TimeStamp {
  id: number;
  description: string;
  // regionId: number;
  // region: Region;
  name: string
  price: number | string;
}

export interface Package extends TimeStamp {
  id: number;
  userId: number;
  user: User;
  regionId: number;
  region: Region;
  accommodationId: number;
  accommodation: Accommodation;
  numberOfPeople: number;
  numberOfNights: number;
  startDate: Date;
  endDate: Date;
  totalCost: number;
  touristSites: PackageTouristSite[];
  transportations: PackageTransportation[];
  activities: PackageActivity[];
}

export interface PackageTouristSite extends TimeStamp {
  id: number;
  packageId: number;
  package: Package;
  touristSiteId: number;
  touristSite: TouristSite;
}

export interface PackageTransportation extends TimeStamp {
  id: number;
  packageId: number;
  package: Package;
  transportationId: number;
  transportation: Transportation;
}

export interface PackageActivity extends TimeStamp {
  id: number;
  packageId: number;
  package: Package;
  activityId: number;
  activity: Activity;
}

export interface Review extends TimeStamp {
  id: number;
  userId: number;
  user: User;
  packageId: number;
  package: Package;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface Payment extends TimeStamp {
  id: number;
  packageId: number;
  package: Package;
  amount: number;
  paymentDate: Date;
  paymentMethod: string;
  status: string;
}

export interface Tour {
  id: string
  title: string
  image: string
  price: string
  description: string
}