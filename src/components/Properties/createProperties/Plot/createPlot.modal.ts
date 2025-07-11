// plotTypes.ts

export type PropertyType = "Rent" | "Lease" | "Sale";

export type PlotType =
  | "Agriculture"
  | "Business Use"
  | "Commercial Use"
  | "Industrial Use"
  | "Personal Use"
  | "Parking"
  | "Shed/Storage"
  | "Poultry or Livestock"
  | "Events or Functions"
  | "Investment Purpose"
  | "Renewable Energy Projects"
  | "Timber/Tree Plantation"
  | "Nursery/Gardening Business"
  | "Telecom Towers";

export type FacingDirection =
  | "North"
  | "East"
  | "West"
  | "South"
  | "North East"
  | "North West"
  | "South East"
  | "South West";

export interface OwnerContact {
  phone1: string;
  email?: string;
  getUpdates?: boolean;
}

export interface OwnerDetails {
  firstName: string;
  lastName: string;
  contact: OwnerContact;
}

export interface Location {
  landmark: string; // Required
  address: string;  // Required
  map: {            // Required
    latitude: number; 
    longitude: number;
  };
  area: {           // Required
    totalArea: string;
    length: string;
    width: string;
    acre: number;
  };
}

export interface RentDetails {
  rentAmount: number; // default to 0
  negotiable: boolean; // default to false
  advanceAmount: number; // default to 0
  agreementTiming: string; // default to ""
}

export interface LeaseDetails {
  leaseAmount: number;
  negotiable: boolean;
  leaseTenure: string;
}

export interface SaleDetails {
  saleAmount: number;
  negotiable: boolean;
}

export interface UploadedImage {
  file: File;
  name: string;
  url: string;
  imageSize: number; 
}

export type PlotStatus = "Pending" | "Approved" | "Rejected" | "Deleted" | "Sold";

export interface PlotFormState {
  ownerDetails: OwnerDetails;
  location: Location;
  propertyType: PropertyType;
  rent: RentDetails;
  lease: LeaseDetails;
  sale: SaleDetails;
  title: string;
  images: File[];
  plotType: PlotType;
  facingDirection: FacingDirection;
  hasWell: boolean;
  hasMotor: boolean;
  hasEBConnection: boolean;
  hasBorewell: boolean;
  description: string;
  uploadedImages: UploadedImage[];
  totalFloors: number;
  propertyFloor: number;
  selectedChips: string[];
  status: string;
  isDeleted: boolean;

}

