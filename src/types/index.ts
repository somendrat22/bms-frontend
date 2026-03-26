export enum UserType {
  CUSTOMER = 'CUSTOMER',
  THEATER_OWNER = 'THEATER_OWNER'
}

export enum SeatType {
  REGULAR = 'REGULAR',
  PREMIUM = 'PREMIUM',
  VIP = 'VIP',
  RECLINER = 'RECLINER'
}

export enum Currency {
  INR = 'INR',
  DOLLAR = 'DOLLAR',
  EURO = 'EURO'
}

export interface Location {
  sysId?: string;
  id?: string;
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  country: string;
  state: string;
  city: string;
  zipCode: number;
  lat?: number;
  log?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  sysId: string;
  id: string;
  fullName: string;
  contactNumber: string;
  location: Location;
  preferredLanguage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Customer extends User {
  loyaltyPoints?: number;
  membershipType?: string;
}

export interface TheatreOwner extends User {
  panCard: string;
  businessRegistrationId: string;
  gstNumber: string;
}

export interface Theatre {
  sysId: string;
  id: string;
  theaterName: string;
  location: Location;
  owner?: TheatreOwner;
  createdAt: string;
  updatedAt: string;
}

export interface HallRowMapping {
  sysId?: string;
  id?: string;
  seatType: SeatType;
  rowRange: string;
  seatCount: string;
  basePrice: number;
  basePriceCurrency: Currency;
}

export interface Hall {
  sysId: string;
  id: string;
  hallName: string;
  seatCount: number;
  theater?: Theatre;
  rowMappingList?: HallRowMapping[];
  createdAt: string;
  updatedAt: string;
}

export interface Show {
  sysId: string;
  id: string;
  showName: string;
  shortDescription: string;
  artists: string;
  showStartTime: string;
  showEndTime: string;
  showStartTimeInSeconds?: number;
  showEndTimeInSeconds?: number;
  hall?: Hall;
  createdAt: string;
  updatedAt: string;
}

export interface BookedSeat {
  sysId: string;
  id: string;
  seatId: string;
  show: Show;
  createdAt: string;
  updatedAt: string;
}

export interface RegisterUserRequest {
  fullName: string;
  password: string;
  contactNumber: string;
  location: Omit<Location, 'sysId' | 'id' | 'createdAt' | 'updatedAt'>;
  userType: UserType;
  panCard?: string;
  businessRegistrationId?: string;
  gstNumber?: string;
  preferredLanguage?: string;
}

export interface CreateTheatreRequest {
  theaterName: string;
  location: Omit<Location, 'sysId' | 'id' | 'createdAt' | 'updatedAt'>;
}

export interface RegisterHallRequest {
  hallName: string;
  seatCount: number;
  rowMappingList: Omit<HallRowMapping, 'sysId' | 'id'>[];
}

export interface CreateShowRequest {
  showName: string;
  shortDescription: string;
  artists: string;
  showStartTime: string;
  showEndTime: string;
}
