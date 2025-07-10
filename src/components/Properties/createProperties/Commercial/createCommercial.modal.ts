// commercialTypes.ts

export type PropertyType = "Rent" | "Lease" | "Sale";

export type CommercialType =
  | "Office Space"
  | "Co-Working"
  | "Shop"
  | "Showroom"
  | "Godown/Warehouse"
  | "Industrial Building"
  | "Industrial Shed"
  | "Other Business";

export type FacingDirection =
  | "North"
  | "East"
  | "West"
  | "South"
  | "North East"
  | "North West"
  | "South East"
  | "South West";

export type WashroomType = "None" | "Private" | "Common";

export type RoadFacility = "None" | "15 Feet" | "20 Feet" | "30 Feet";

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
}

export interface Area {
  totalArea?: string;
  builtUpArea?: string;
  carpetArea?: string;
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

export interface Facility {
  tilesOnFloor: boolean;
  roadFacility: RoadFacility;
  parking: boolean;
  waterFacility: boolean;
}

export interface Accessibility {
  steps: boolean;
  lift: boolean;
  ramp: boolean;
}
export type UploadedImage = {
  file: File;
  url: string;
  name: string;
};
export type AccessibilityChip =
  | "Bachelors Allowed"
  | "Guest Allowed"
  | "Pets Allowed";

  export type PlainObject = { [key: string]: unknown };

export interface CommercialPropertyForm {
  owner: OwnerDetails;
  propertyType: PropertyType;
  rent: RentDetails;
  lease: LeaseDetails;
  sale: SaleDetails;
  location: Location;
  area: Area;
  images: string[]; // assuming URLs or base64 strings on frontend
  title: string;
  commercialType: CommercialType;
  facingDirection: FacingDirection;
  totalFloors?: number;
  propertyFloor?: number;
  washroom: WashroomType;
  readyToOccupy: boolean;
  facility: Facility;
  accessibility: Accessibility;
  status: "Pending" | "Approved" | "Rejected" | "Deleted" | "Sold";
  isDeleted: boolean;
  description?: string;

}
// ===== FRONTEND FORM STATE TYPE =====
export interface CommercialFormState extends CommercialPropertyForm {
  uploadedImages: UploadedImage[]; // used only in frontend UI for previews
  selectedChips: string[];
}