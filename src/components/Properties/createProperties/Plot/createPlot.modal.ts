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
  landmark?: string;
  address?: string;
  map?: {
    latitude?: number;
    longitude?: number;
  };
  area?: {
    totalArea?: string;
    length?: string;
    width?: string;
    acre?: number;
  };
}

export interface RentDetails {
  rentAmount: number;
  negotiable: boolean;
  advanceAmount: number;
  agreementTiming: string;
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
  preview?: string;
}
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
}
export interface ExtendedPlotFormState extends PlotFormState {
  uploadedImages: UploadedImage[];
  selectedChips: string[];
  status: string;
  isDeleted: boolean;
}