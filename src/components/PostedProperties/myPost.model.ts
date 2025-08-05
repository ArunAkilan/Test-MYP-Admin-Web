  export interface postedProperties  {
    owner?: string;
  propertyType?: string;
  rent?: string | number;
  lease?: string | number;
  sale?: string | number;
  location?: Location;
  builtUpArea?: string;
  carpetArea?: string;
  totalArea?: string;
  area?:string | number;
  images?: string[];
  title?: string;
  facingDirection?: string;
  rooms?: string;
  totalFloors?: number;
  propertyFloor?: number;
  furnishingType?: string;
  availability?: boolean;
  facility?: boolean;
  accessibility?: boolean;
  amenities?: boolean;
  restrictions?: boolean;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  _id?: string;
  status?: "Pending" | "Approved" | "Rejected" | "Deleted";
  commercialType?: string;
  plotType?: string;
  type?: string;
  // Additional commercial/plot/residential-specific fields
  bhk?: string;

  parking?: "None" | "With Parking";
  tenantPreference?: "Bachelor" | "Family Only";
  residentialType?: "House" | "Apartment" | "Villa";
  washroom?: "None" | "Private" | "Common";
  rto?: boolean;
  purpose?: string;
}
