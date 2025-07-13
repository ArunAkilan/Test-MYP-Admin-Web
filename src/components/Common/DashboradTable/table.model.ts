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
  id?: number | string;  // <-- updated here
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
  id: number | string;  
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

// Property categories
export type PropertyCategory = 'residential' | 'commercial' | 'plots';

// Extend PropertyView to include `_source` property for routing and identification
export interface PropertyViewWithSource extends PropertyView {
  _source: PropertyCategory;
}

// Reduced property table data used for table rows
export interface PropertyTableData {
  id: number | string;  // <-- updated here
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
  id: number | string;  // <-- updated here
  onView: (id: number | string) => void;  // updated param types
  onEdit: (id: number | string) => void;
  onDelete: (id: number | string) => void;
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

// navigate function type explicitly
type NavigateFunction = (path: string, options?: { state?: unknown }) => void;

// Example handler functions with proper typing
export const handleEdit = (item: PropertyViewWithSource, navigate: NavigateFunction) => {
  const propertyType = item._source || 'residential';
  navigate(`/${propertyType}/create`, { state: { data: item, mode: 'edit' } });
};

export const handleView = (
  id: number | string,
  formatedData: PropertyViewWithSource[],
  navigate: NavigateFunction
) => {
  const selectedItem = formatedData.find((item) => item.id === id);
  if (!selectedItem) {
    alert('Property not found');
    return;
  }
  const routeBase = selectedItem._source;
  if (!routeBase) {
    alert('Unknown property type');
    console.log('Missing _source in selectedItem', selectedItem);
    return;
  }
  navigate(`/${routeBase}/view/${id}`, {
    state: { data: selectedItem, mode: 'view' },
  });
};

export const handleOpenModal = (
  action: 'view' | 'edit' | 'delete',
  item: ResidentialProperty,
  setSelectedAction: (action: 'view' | 'edit' | 'delete' | null) => void,
  setSelectedItem: (item: ResidentialProperty | null) => void,
  setOpen: (open: boolean) => void
) => {
  console.log('Opening modal with action:', action, 'on item:', item.id);
  setSelectedAction(action);
  setSelectedItem(item);
  setOpen(true);
};

export const handleCloseModal = (
  setOpen: (open: boolean) => void,
  setSelectedAction: (action: 'view' | 'edit' | 'delete' | null) => void,
  setSelectedItem: (item: ResidentialProperty | null) => void
) => {
  setOpen(false);
  setSelectedAction(null);
  setSelectedItem(null);
};
