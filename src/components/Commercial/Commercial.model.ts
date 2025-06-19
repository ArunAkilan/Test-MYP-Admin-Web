

// export type Contact = {
//   phone1: string;
//   phone2?: string;
//   email?: string;
//   getUpdates?: boolean;
// };

// export type Owner = {
//   firstName: string;
//   lastName: string;
//   contact: Contact;
// };

// export type RentDetails = {
//   rentAmount?: number;
//   negotiable?: boolean;
//   advanceAmount?: number;
//   agreementTiming?: string;
// };

// export type LeaseDetails = {
//   leaseAmount?: number;
//   negotiable?: boolean;
//   leaseTenure?: string;
// };

// export type SaleDetails = {
//   saleAmount?: number;
//   negotiable?: boolean;
// };

// export type MapLocation = {
//   latitude?: number;
//   longitude?: number;
// };

// export type Location = {
//   landmark?: string;
//   map?: MapLocation;
//   address?: string;
// };

// export type Area = {
//   totalArea?: string;
//   length?: string;
//   width?: string;
// };

// export type Facility = {
//   tilesOnFloor?: boolean;
//   roadFacility?: "None" | "15 Feet" | "20 Feet" | "30 Feet";
//   parking?: boolean;
//   waterFacility?: boolean;
// };

// export type Accessibility = {
//   steps?: boolean;
//   lift?: boolean;
// };

// export type WashroomType = "None" | "Private" | "Common";

// export type CommercialType =
//   | "Office Space"
//   | "Co-Working"
//   | "Shop"
//   | "Showroom"
//   | "Godown/Warehouse"
//   | "Industrial Building"
//   | "Industrial Shed"
//   | "Other Business";

// export type FacingDirection =
//   | "North"
//   | "East"
//   | "West"
//   | "South"
//   | "North East"
//   | "North West"
//   | "South East"
//   | "South West";

// export type PropertyType = "Rent" | "Lease" | "Sale";

// export interface CommercialProperty {
//   _id?: string;
//   owner: Owner;
//   propertyType: PropertyType;
//   rent?: RentDetails;
//   lease?: LeaseDetails;
//   sale?: SaleDetails;
//   location?: Location;
//   area?: Area;
//   images: string[];
//   title: string;
//   commercialType: CommercialType;
//   facingDirection: FacingDirection;
//   totalFloors?: number;
//   propertyFloor?: number;
//   washroom?: WashroomType;
//   readyToOccupy?: boolean;
//   facility?: Facility;
//   accessibility?: Accessibility;
//   description?: string;
//   createdAt?: string;
//   updatedAt?: string;
// }

