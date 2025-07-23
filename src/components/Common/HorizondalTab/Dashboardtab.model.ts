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
