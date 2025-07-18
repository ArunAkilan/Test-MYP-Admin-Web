
// export interface Property  {
//   _id: string;
  
//   location?: {
//     landmark?: string;
//     address?: string;
//   };
//   area?: {
//     totalArea?: string | number;
//   };
//   status?: string;
//   totalFloors?: number;
//   facingDirection?: string;
//   furnishingType?: string;
//   washroom?: number;
//   plotType?: string;
// // Tabs shown in the UI
// export type TabName = 'Overview' | 'Users' | 'Settings' | 'Reports';

// // Interface for managing tab state
// export interface TabState {
//   activeTab: TabName;
//   setActiveTab: (tab: TabName) => void;
// }

// // Interface for controlling tab modal visibility and data
// export interface TabModalState {
//   open: boolean;
//   action: 'view' | 'edit' | 'delete' | null;
//   selectedProperty?: PropertyView;
// }

// // Generic property model (from your base interface)
// export default interface Property {
//   id?: number | string;
//   name: string;
//   address: string;
//   size: string;
//   floor: string;
//   facing: string;
//   furnishing: string;
//   type: string;
//   washroom: string;
// }

// // Residential property model
// export interface ResidentialProperty extends Property {
//   bedrooms: string;
//   bathrooms: string;
//   balcony: string;
//   kitchen: string;
//   parking: string;
//   price: number;
//   description: string;
//   images: string[];
// }

// // Commercial property model
// export interface CommercialProperty extends Property {
//   propertyType: string;
//   price: number;
//   description: string;
//   images: string[];
// }

// // Plot property model
// export interface PlotProperty extends Property {
//   plotSize: string;
//   price: number;
//   description: string;
//   images: string[];
// }

// // Unified view type used in table display or modals
// export interface PropertyView {
//   id: number | string;
//   name: string;
//   address: string;
//   size: string;
//   floor: string;
//   facing: string;
//   furnishing: string;
//   type: string;
//   washroom: string;
//   bedrooms?: string;
//   bathrooms?: string;
//   balcony?: string;
//   kitchen?: string;
//   parking?: string;
//   propertyType?: string;
//   plotSize?: string;
//   price: number;
//   description: string;
//   images: string[];
// }

// // Extend PropertyView to include `_source` property for routing and identification
// export interface PropertyViewWithSource extends PropertyView {
//   _source: 'residential' | 'commercial' | 'plots';
// }

// // Reduced property table data used for table rows
// export interface PropertyTableData {
//   id: number | string;
//   name: string;
//   address: string;
//   size: string;
//   floor: string;
//   facing: string;
//   furnishing: string;
//   type: string;
//   washroom: string;
//   bedrooms?: string;
//   bathrooms?: string;
//   balcony?: string;
//   kitchen?: string;
//   parking?: string;
//   propertyType?: string;
//   images?: string[];
//   title?: string;
//   rooms?: number;
//   owner?: string;
// }


// export interface PropertyWithSource extends Property  {
//   _source: "residential" | "commercial" | "plot";
// }
//   plotSize?: string;
//   price: number;
// }

// // Action callbacks passed to table row actions
// export interface PropertyTableActionsProps {
//   id: number | string;
//   onView: (id: number | string) => void;
//   onEdit: (id: number | string) => void;
//   onDelete: (id: number | string) => void;
// }

// // API or component data source response structure
// export interface PropertyDataResponse {
//   residentials?: PropertyView[];
//   commercials?: PropertyView[];
//   plots?: PropertyView[];
//   residential?: PropertyView[];
//   commercial?: PropertyView[];
//   plot?: PropertyView[];
//   data?: PropertyView[];
// }

// // navigate function type explicitly
// type NavigateFunction = (path: string, options?: { state?: Record<string, unknown> }) => void;

// // Edit handler with type-safe inputs
// export const handleEdit = (
//   item: PropertyViewWithSource,
//   navigate: NavigateFunction
// ): void => {
//   const propertyType = item._source || 'residential';
//   navigate(`/${propertyType}/create`, {
//     state: { data: item, mode: 'edit' },
//   });
// };

// // View handler with formatted list of items and router
// export const handleView = (
//   id: number | string,
//   formatedData: PropertyViewWithSource[],
//   navigate: NavigateFunction
// ): void => {
//   const selectedItem = formatedData.find((item) => item.id === id);
//   if (!selectedItem) {
//     alert('Property not found');
//     return;
//   }

//   const routeBase = selectedItem._source;
//   if (!routeBase) {
//     alert('Unknown property type');
//     console.warn('Missing _source in selectedItem', selectedItem);
//     return;
//   }

//   navigate(`/${routeBase}/view/${id}`, {
//     state: { data: selectedItem, mode: 'view' },
//   });
// };

// // Modal open handler for residential items
// export const handleOpenModal = (
//   action: 'view' | 'edit' | 'delete',
//   item: ResidentialProperty,
//   setSelectedAction: (action: 'view' | 'edit' | 'delete' | null) => void,
//   setSelectedItem: (item: ResidentialProperty | null) => void,
//   setOpen: (open: boolean) => void
// ): void => {
//   console.log('Opening modal with action:', action, 'on item:', item.id);
//   setSelectedAction(action);
//   setSelectedItem(item);
//   setOpen(true);
// };

// // Modal close handler
// export const handleCloseModal = (
//   setOpen: (open: boolean) => void,
//   setSelectedAction: (action: 'view' | 'edit' | 'delete' | null) => void,
//   setSelectedItem: (item: ResidentialProperty | null) => void
// ): void => {
//   setOpen(false);
//   setSelectedAction(null);
//   setSelectedItem(null);
// };
// ───── Base Interface ─────
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

// ───── Residential Property ─────
export interface ResidentialProperty extends Property {
  bedrooms?: number;
  bathrooms?: number;
  balcony?: number;
  kitchen?: number;
  parking?: string;
  price: number;
  description: string;
}

// ───── Commercial Property ─────
export interface CommercialProperty extends Property {
  propertyType: string;
  price: number;
  description: string;
}

// ───── Plot Property ─────
export interface PlotProperty extends Property {
  plotSize: string;
  price: number;
  description: string;
}

// ───── Unified View Type ─────
export interface PropertyView extends Property {
  price: number;
  description: string;
  bedrooms?: number;
  bathrooms?: number;
  balcony?: number;
  kitchen?: number;
  parking?: string;
  propertyType?: string;
  plotSize?: string;
}

// ───── View Type With Source ─────
export interface PropertyViewWithSource extends PropertyView {
  _source: "residential" | "commercial" | "plot";
}

// ───── Backend Response ─────
export interface PropertyDataResponse {
  residentials?: PropertyView[];
  commercials?: PropertyView[];
  plots?: PropertyView[];
  residential?: PropertyView[];
  commercial?: PropertyView[];
  plot?: PropertyView[];
  data?: PropertyView[];
}
