// residential.types.ts

export interface OwnerContact {
    phone1: string;
    phone2?: string;
    email?: string;
    getUpdates?: boolean;
  }
  
  export interface Owner {
    firstName: string;
    lastName: string;
    contact: OwnerContact;
  }
  
  export type PropertyType = 'Rent' | 'Lease' | 'Sale';
  
  export interface RentDetails {
    rentAmount?: number;
    negotiable?: boolean;
    advanceAmount?: number;
    depositAmount?: number;
  }
  
  export interface LeaseDetails {
    leaseAmount?: number;
    negotiable?: boolean;
    leaseTenure?: string;
  }
  
  export interface SaleDetails {
    saleAmount?: number;
    negotiable?: boolean;
  }
  
  export interface MapLocation {
    latitude?: number;
    longitude?: number;
  }
  
  export interface Location {
    landmark?: string;
    map?: MapLocation;
    address?: string;
  }
  
  export interface Area {
    totalArea?: string;
    length?: string;
    width?: string;
  }
  
  export type ResidentialType = 'Apartment' | 'House' | 'Villa';
  
  export type FacingDirection =
    | 'North'
    | 'East'
    | 'West'
    | 'South'
    | 'North East'
    | 'North West'
    | 'South East'
    | 'South West';
  
  export type FurnishingType = 'Fully Furnished' | 'Semi Furnished' | 'Unfurnished';
  
  export interface TransportAvailability {
    nearbyBusStop?: boolean;
    nearbyAirport?: boolean;
    nearbyPort?: boolean;
  }
  
  export interface Availability {
    transport?: TransportAvailability;
    broadband?: boolean;
    securities?: boolean;
  }
  
  export interface Facility {
    maintenance?: boolean;
    waterFacility?: boolean;
    roadFacility?: boolean;
    drainage?: boolean;
    parking?: boolean;
    balcony?: boolean;
    terrace?: boolean;
  }
  
  export interface Accessibility {
    ramp?: boolean;
    steps?: boolean;
    lift?: boolean;
  }
  
  export interface Amenities {
    separateEBConnection?: boolean;
    nearbyMarket?: boolean;
    nearbyGym?: boolean;
    nearbyTurf?: boolean;
    nearbyArena?: boolean;
    nearbyMall?: boolean;
  }
  
  export interface Restrictions {
    guestAllowed?: boolean;
    petsAllowed?: boolean;
    numberOfPeopleAllowed?: number;
    bachelorsAllowed?: boolean;
  }
  
  export interface ResidentialProperty {
    owner: Owner;
    propertyType?: PropertyType;
    rent?: RentDetails;
    lease?: LeaseDetails;
    sale?: SaleDetails;
    location?: Location;
    builtUpArea?: string;
    carpetArea?: string;
    totalArea?: string;
    area?: Area;
    images: string[];
    title: string;
    residentialType?: ResidentialType;
    facingDirection?: FacingDirection;
    rooms: string;
    totalFloors?: number;
    propertyFloor?: number;
    furnishingType?: FurnishingType;
    availability?: Availability;
    facility?: Facility;
    accessibility?: Accessibility;
    amenities?: Amenities;
    restrictions?: Restrictions;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
    _id?: string;
     washroom?: number | string;
  }
  