// components/common/Horizondaltab/Dashboardtab.model.ts

export const TabStatus = {
  Pending: 0,
  Rejected: 1,
  Approved: 2,
  Deleted: 3,
} as const;

export type TabStatusKey = keyof typeof TabStatus; // "Pending" | "Rejected" | ...
export type TabStatusValue = typeof TabStatus[TabStatusKey]; // 0 | 1 | 2 | 3
export type PropertyStatus = "Pending" | "Approved" | "Rejected" | "Deleted";
export type PropertyType = "Rent" | "Lease" | "Sale";
export type PropertyCategory = 'residential' | 'commercial' | 'plot';

// Base property interface matching your API response
export interface BaseProperty {
  _id: string;
  title: string;
  propertyType: "Rent" | "Lease" | "Sale";
  status: "Pending" | "Approved" | "Rejected" | "Deleted";
  views: number;
  images: string[];
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  description: string;
  
  propertyOwner: {
    firstName: string;
    lastName: string;
    contact: {
      phone1: string;
      email: string;
      getUpdates: boolean;
    };
    _id: string;
  };
  
  postOwner: {
    id: string;
    role: string;
    userName: string;
  };
  
  location: {
    map: {
      latitude: number;
      longitude: number;
    };
    landmark: string;
    address: string;
  };
  
  area: {
    totalArea: string;
    builtUpArea?: string;
    carpetArea?: string;
    length?: string;
    width?: string;
    acre?: number;
  };
  
  rent: {
    rentAmount: number;
    negotiable: boolean;
    advanceAmount: number;
    agreementTiming: string;
  };
  
  lease: {
    leaseAmount: number;
    negotiable: boolean;
    leaseTenure: string;
  };
  
  sale: {
    saleAmount: number;
    negotiable: boolean;
  };
  
  facingDirection: string;
  totalFloors: number;
  propertyFloor: number;
}

// Property types with specific features
export interface ResidentialProperty extends BaseProperty {
  residentialType: string;
  rooms: string;
  furnishingType: string;
  facility: Record<string, unknown>;
  accessibility: Record<string, unknown>;
  amenities: Record<string, unknown>;
  restrictions: Record<string, unknown>;
  availability: Record<string, unknown>;
}

export interface CommercialProperty extends BaseProperty {
  commercialType: string;
  washroom: string;
  readyToOccupy: boolean;
  facility: Record<string, unknown>;
  accessibility: Record<string, unknown>;
}

export interface PlotProperty extends BaseProperty {
  plotType: string;
  facility: Record<string, unknown>;
}

// Union type for all properties
export type Property = ResidentialProperty | CommercialProperty | PlotProperty;

// Extended property with index signature for flexibility
export interface ExtendedProperty extends BaseProperty {
  residentialType?: string;
  commercialType?: string;
  plotType?: string;
  rooms?: string;
  furnishingType?: string;
  washroom?: string;
  readyToOccupy?: boolean;
  facility?: Record<string, unknown>;
  accessibility?: Record<string, unknown>;
  amenities?: Record<string, unknown>;
  restrictions?: Record<string, unknown>;
  availability?: Record<string, unknown>;
  
  // Add index signature to make it compatible with EditableProperty
  [key: string]: unknown;
}

// Editable property interface with index signature
export interface EditableProperty {
  _id: string;
  title: string;
  propertyType: string;
  location: {
    landmark: string;
    address: string;
  };
  area: {
    totalArea: string;
  };
  images: string[];
  rent: {
    rentAmount: number;
    negotiable: boolean;
    advanceAmount: number;
    agreementTiming: string;
  };
  lease: {
    leaseAmount: number;
    negotiable: boolean;
    leaseTenure: string;
  };
  sale: {
    saleAmount: number;
    negotiable: boolean;
  };
  views: number;
  createdAt: string;
  updatedAt: string;
  status: string;
  isDeleted: boolean;
  facingDirection: string;
  totalFloors: number;
  propertyFloor: number;
  propertyOwner: {
    firstName: string;
    lastName: string;
    contact: {
      phone1: string;
      email: string;
      getUpdates: boolean;
    };
    _id: string;
  };
  postOwner: {
    id: string;
    role: string;
    userName: string;
  };
  
  // Type-specific properties
  residentialType?: string;
  commercialType?: string;
  plotType?: string;
  rooms?: string;
  furnishingType?: string;
  washroom?: string;
  readyToOccupy?: boolean;
  
  // Add index signature for compatibility
  [key: string]: unknown;
}

export type PropertyItem = {
  _id: string;
  propertyType: string;
  propertyCategory?: string;
  location?: {
    landmark?: string;
    address?: string;
  };
  rent?: {
    rentAmount?: string;
  };
  images?: string[];
  title?: string;
  createdAt?: string;
  postOwner?: {
    userName?: string;
  };
  area?: {
    totalArea?: string;
  };
  commercialType?: string;
  residentialType?: string;
  plotType?: string;
  rooms?: string;
  furnishingType?: string;
  facingDirection?: string;
  totalFloors?: number;
  propertyFloor?: number;
  washroom?: string;
  readyToOccupy?: boolean;
  status?: string;
  views?: number;
  updatedAt?: string;
  isDeleted?: boolean;
};

export interface PropertyViewWithSource extends PropertyItem {
  _source: "residential" | "commercial" | "plot" | "all";
  owner?: string;
}
