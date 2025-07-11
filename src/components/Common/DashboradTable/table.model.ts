// Tabs shown in the UI
export type TabName = 'Overview' | 'Users' | 'Settings' | 'Reports';

// Interface for managing tab state
export interface TabState {
  activeTab: TabName;
  setActiveTab: (tab: TabName) => void;
}

// Interface for controlling tab modal visibility and data
export interface TabModalState {
  open: boolean;
  action: 'view' | 'edit' | 'delete' | null;
  selectedProperty?: PropertyView;
}

// Generic property model (from your base interface)
export default interface Property {
  id?: number;
  name: string;
  address: string;
  size: string;
  floor: string;
  facing: string;
  furnishing: string;
  type: string;
  washroom: string;
}

// Residential property model
export interface ResidentialProperty extends Property {
  bedrooms: string;
  bathrooms: string;
  balcony: string;
  kitchen: string;
  parking: string;
  price: number;
  description: string;
  images: string[];
}

// Commercial property model
export interface CommercialProperty extends Property {
  propertyType: string;
  price: number;
  description: string;
  images: string[];
}

// Plot property model
export interface PlotProperty extends Property {
  plotSize: string;
  price: number;
  description: string;
  images: string[];
}

// Unified view type used in table display or modals
export interface PropertyView {
  id: number;
  name: string;
  address: string;
  size: string;
  floor: string;
  facing: string;
  furnishing: string;
  type: string;
  washroom: string;
  bedrooms?: string;
  bathrooms?: string;
  balcony?: string;
  kitchen?: string;
  parking?: string;
  propertyType?: string;
  plotSize?: string;
  price: number;
  description: string;
  images: string[];
}

// Reduced property table data used for table rows
export interface PropertyTableData {
  id: number;
  name: string;
  address: string;
  size: string;
  floor: string;
  facing: string;
  furnishing: string;
  type: string;
  washroom: string;
  bedrooms?: string;
  bathrooms?: string;
  balcony?: string;
  kitchen?: string;
  parking?: string;
  propertyType?: string;
  plotSize?: string;
  price: number;
}

// Action callbacks passed to table row actions
export interface PropertyTableActionsProps {
  id: number;
  onView: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

// API or component data source response structure
export interface PropertyDataResponse {
  residentials?: PropertyView[];
  commercials?: PropertyView[];
  plots?: PropertyView[];
  residential?: PropertyView[];
  commercial?: PropertyView[];
  plot?: PropertyView[];
  data?: PropertyView[];
}
