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
  _id: string; 
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
    map: {
      latitude: number;
      longitude: number;
    }
  };
  area: {
    totalArea: string;
    buitUpArea: string;
    carpetArea: string;
  };
  // availability: {
  //   broadband: boolean;
  //   securities: boolean;
  // };
  facility: {
    maintenance: boolean;
    waterFacility: boolean;
    roadFacility: boolean;
    drainage: boolean;
    parking: boolean;
    terrace: boolean;
    balcony: boolean;
  };
  accessibility: {
    steps: boolean;
    lift: boolean;
    ramp: boolean;
  };
  amenities: {
    separateEBConnection: boolean;
    nearbyArena: boolean;
    nearbyGym: boolean;
    nearbyMall: boolean;
    nearbyMarket: boolean;
    nearbyTurf: boolean;
  };
  restrictions: {
    petsAllowed: boolean;
    guestAllowed: boolean;
    bachelorsAllowed: boolean;
      };
  propertyOwner: {
    contact: {
      getUpdates: boolean;
      phone1: string;
      email: string;
    }
    _id: string;
    firstName:  string;
    lastName: string;
  }
  availability : {
    transport: {
      nearbyBusStop: boolean;
      nearbyAirport: boolean;
      nearbyPort: boolean;
      broadband: boolean;
    }
    broadband: boolean;
    securities: boolean;
  }
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
  rooms : string;
};
export type PlainObject = Record<string, unknown>;
