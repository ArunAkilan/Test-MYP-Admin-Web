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
export interface CommercialProperty extends Property {
  propertyType: string;
  price: number;
  description: string;
  images: string[];
}
export interface PlotProperty extends Property {
  plotSize: string;
  price: number;
  description: string;
  images: string[];
}
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


export interface PropertyTableActionsProps {
  id: number;
  onView: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}
export interface PropertyDataResponse {
  residentials?: PropertyView[];
  commercials?: PropertyView[];
  plots?: PropertyView[];
  residential?: PropertyView[];
  commercial?: PropertyView[];
  plot?: PropertyView[];
  data?: PropertyView[];
}
export interface PropertyDataResponse {
  residentials?: PropertyView[];
  commercials?: PropertyView[];
  plots?: PropertyView[];
  residential?: PropertyView[];
  commercial?: PropertyView[];
  plot?: PropertyView[];
  data?: PropertyView[];
}
