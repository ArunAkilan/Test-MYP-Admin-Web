export interface CommercialProperty {
  availability?:any;
  title: string;
  propertyType: string;
  commercialType: string;
  description: string;
  readyToOccupy: boolean;
  washroom: string;
  facingDirection: string;
  totalFloors: number;
  propertyFloor: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  status: string;
  images: string[];

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
    };
  };

  area: {
    totalArea: string;
    carpetArea: string;
  };

  facility: {
    roadFacility: string;
    parking: boolean;
    tilesOnFloor?: boolean;
    waterFacility: boolean;
    washRoom: boolean;
    readyToOccupy: boolean;
  };

  accessibility: {
    steps: boolean;
    lift: boolean;
    ramp: boolean;
  };

  owner: {
    _id: string;
    firstName: string;
    lastName: string;
    contact: {
      phone1?: string;
      email?: string;
      getUpdates?: boolean;
    };
  };
}

export interface CommercialProperty {
    title: string;
    propertyType: string;
    commercialType: string;
    description: string;
    readyToOccupy: boolean;
    washroom: string;
    facingDirection: string;
    totalFloors: number;
    propertyFloor: number;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    status: string;
    images: string[];
   
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
      };
    };
   
    area: {
      totalArea: string;
      carpetArea: string;
    };
   
    facility: {
      roadFacility: string;
      parking: boolean;
      tilesOnFloor?: boolean;
      waterFacility: boolean;
      washRoom: boolean;
      readyToOccupy: boolean;
    };
   
    accessibility: {
      steps: boolean;
      lift: boolean;
      ramp: boolean;
    };
   
    owner: {
      _id: string;
      firstName: string;
      lastName: string;
      contact: {
        phone1?: string;
        email?: string;
        getUpdates?: boolean;
      };
    };
  }