export type Contact = {
  phone1: string;
  phone2?: string;
  email?: string;
  receivePromotionalContents?: boolean;
};

export type Owner = {
  firstName: string;
  lastName: string;
  contact: Contact;
};

//Main ts.
export type ResidentialProperty = {
  id?: string;
  owner: Owner;
  propertyType: "Rent" | "Lease" | "Sale";
  location?: {
    landmark?: string;
  };
  images: string[];
  title: string;
  rentAmount?: number;
  advanceAmount?: number;
  leaseAmount?: number;
  leaseYears?: number;
  saleAmount?: number;
  negotiable?: boolean;
  residentialType?: "Apartment" | "House" | "Villa";
  facingDirection?: "North" | "East" | "West" | "South";
  rooms: string;
  totalFloors?: number;
  rentPropertyFloor?: number;
  furnishingType?: "Furnished" | "Semi Furnished" | "Unfurnished";
  features?: string[];
  restrictions?: restrictions;
};
export type availability = {
  broadband?: boolean;
  securities?: boolean;
};
export type transport = {
  nearbyBusStop?: boolean;
  nearbyAirport?: boolean;
  nearbyPort?: boolean;
};
export type facility = {
  maintainance?: boolean;
  waterFacility?: boolean;
  roadFacility?: boolean;
  drinage?: boolean;
  parking?: boolean;
  balcony?: boolean;
  terrace?: boolean;
};
export type accesibility = {
  ramp?: boolean;
  steps?: boolean;
  lift?: boolean;
};
export type amenities = {
  separateEBConnection?: boolean;
  nearbyMarket?: boolean;
  nearbyGym?: boolean;
  nearbyTurf?: boolean;
  nearbyArena?: boolean;
  nearbyMall?: boolean;
};
export type restrictions = {
  guestAllowed?: boolean;
  petsAllowed?: boolean;
  numberOfPeoplesAllowed?: number;
  bachelorsAllowed?: boolean;
};
export type description = {
  description?: string;
};
export type UploadedImage = {
  name: string;
  url?: string; // for preview
  file: File; // actual file for upload
};

export type ResidentialFormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone1: string;
  propertyType: string;
  title: string;
  rent: string;
  advanceAmount: string;
  leaseTenure: string;
  residentialType: string;
  address: string;
  latitude: string;
  longitude: string;
  images: UploadedImage[];
  totalArea: string;
  builtUpArea: string;
  carpetArea: string;
  facingDirection: string;
  totalFloors: string;
  propertyFloor: string;
  furnishingType: string;
  rooms: string;
  description: string;
  legalDocuments: string;
  selectedChips: string[];
};
export type PlainObject = Record<string, unknown>;
