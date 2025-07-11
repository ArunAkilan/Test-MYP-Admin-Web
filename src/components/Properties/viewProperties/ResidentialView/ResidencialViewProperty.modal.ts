export type Contact = {
  phone1: string;
  phone2?: string;
  email?: string;
  receivePromotionalContents?: boolean;
};

export type Owner = {
  firstName: string;
  lastName: string;
  contact: Contact;
};

//Main ts.
export interface ResidentialProperty {
  title: string;
  propertyType: string;
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
  location: {
    landmark: string;
    address: string;
  };
  area: {
    totalArea: string;
    buitUpArea: string;
    carpetArea: string;
  };
  availability: {
    broadband: boolean;
    securities: boolean;
  };
  facility: {
    maintenance: boolean;
    waterFacility: boolean;
    roadFacility: boolean;
    drainage: boolean;
    parking: boolean;
  };
  accessibility: {
    steps: boolean;
    lift: boolean;
    ramp: boolean;
  };
  amenities: {
    separateEBConnection: boolean;
  };
  restrictions: {
    petsAllowed: boolean;
    guestAllowed: boolean;
    bachelorsAllowed: boolean;
      };
  images: string[];
    residentialType: string;
  facingDirection: string;
  totalFloors: string;
  propertyFloor: string;
  furnishingType: string;
 status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};
export type PlainObject = Record<string, unknown>;
