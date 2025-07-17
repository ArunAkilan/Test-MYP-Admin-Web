
export interface BaseProperty {
  _id: string;
  
  location?: {
    landmark?: string;
    address?: string;
  };
  area?: {
    totalArea?: string | number;
  };
  status?: string;
  totalFloors?: number;
  facingDirection?: string;
  furnishingType?: string;
  washroom?: number;
  plotType?: string;
  propertyType?: string;
  images?: string[];
  title?: string;
  rooms?: number;
  owner?: string;
}

export interface Property {
  _id: string;
  location?: {
    landmark?: string;
    address?: string;
  };
  area?: {
    totalArea?: string | number;
  };
  status?: string;
  totalFloors?: number;
  facingDirection?: string;
  furnishingType?: string;
  washroom?: number;
  plotType?: string;
  propertyType?: string;
  images?: string[];
  title?: string;
  rooms?: number;
  owner?: string;
}


export interface PropertyWithSource extends BaseProperty {
  _source: "residential" | "commercial" | "plot";
}
