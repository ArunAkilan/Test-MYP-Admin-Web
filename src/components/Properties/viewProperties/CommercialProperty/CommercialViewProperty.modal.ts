export interface CommercialPropertyOwner {
  _id: string;
  firstName: string;
  lastName: string;
  contact: {
    phone1: string;
    email: string;
    getUpdates: boolean;
  };
}

export interface CommercialRent {
  rentAmount: number;
  negotiable: boolean;
  advanceAmount: number;
  agreementTiming: string;
}

export interface CommercialLease {
  leaseAmount: number;
  negotiable: boolean;
  leaseTenure: string;
}

export interface CommercialSale {
  saleAmount: number;
  negotiable: boolean;
}

export interface CommercialLocation {
  landmark: string;
  map: {
    latitude: number;
    longitude: number;
  };
  address: string;
}

export interface CommercialArea {
  totalArea: string;
  carpetArea?: string;
}

export interface CommercialFacility {
  tilesOnFloor: boolean;
  roadFacility: string;
  parking: boolean;
  waterFacility: boolean;
}

export interface CommercialAccessibility {
  steps: boolean;
  lift: boolean;
  ramp?: boolean;
}

export interface CommercialAvailability {
  transport?: {
    nearbyBusStop: string | boolean;
    nearbyAirport: string | boolean;
    nearbyPort: string | boolean;
  };
  broadband?: boolean;
  securities?: boolean;
}

export interface CommercialPostOwner {
  id: string;
  role: string;
  userName: string;
}

export interface CommercialProperty {
  _id: string;
  title: string;
  propertyType: "Rent" | "Lease" | "Sale";
  commercialType: string;
  description: string;
  readyToOccupy: boolean;
  washroom: "None" | "Public" | "Common" | "Private";
  facingDirection: string;
  totalFloors: number;
  propertyFloor: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  status: string;
  images: string[];
  views: number;
  __v: number;
  rent: CommercialRent;
  lease: CommercialLease;
  sale: CommercialSale;
  location: CommercialLocation;
  area: CommercialArea;
  facility: CommercialFacility;
  accessibility: CommercialAccessibility;
  availability?: CommercialAvailability;
  propertyOwner: CommercialPropertyOwner;
  postOwner: CommercialPostOwner;
}

export interface CommercialPropertyResponse {
  success: boolean;
  property: CommercialProperty;
}

export interface AmountInfoInterface {
  amount: number;
  label: string;
  showDeposit: boolean;
  deposit: number;
  agreement?: string;
  tenure?: string;
}

export interface StatusInfoInterface {
  label: string;
  class: string;
}

export interface CoordinatesInterface {
  latitude?: number;
  longitude?: number;
}

export interface TransportDataInterface {
  busStop: string;
  airport: string;
  metro: string;
  railway: string;
}

export interface NegotiableInfoInterface {
  isNegotiable: boolean;
  label: string;
}

export interface TimeDisplayInterface {
  value: string;
  formatted: string;
}

export interface StatusActionInterface {
  status: "0" | "1" | "2" | "3" | "4" | "5";
  label: string;
  route: string;
}
