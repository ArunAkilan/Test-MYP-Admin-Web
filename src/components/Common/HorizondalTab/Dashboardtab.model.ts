// components/common/Horizondaltab/Dashbordtab.model.ts

export const TabStatus = {
  Pending: 0,
  Rejected: 1,
  Approved: 2,
  Deleted: 3,
} as const;

export type TabStatusKey = keyof typeof TabStatus; // "Pending" | "Rejected" | ...
export type TabStatusValue = typeof TabStatus[TabStatusKey]; // 1 | 2 | 3 | 4

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
};
export interface PropertyViewWithSource {
  _source: "residential" | "commercial" | "plot"  | "all";

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
   totalArea?: number;
  washroom?: number;
  plotType?: string;
  propertyType?: string;
  images?: string[];
  title?: string;
  rooms?: number;
  owner?: string;

}

