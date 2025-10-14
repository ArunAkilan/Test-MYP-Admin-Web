export interface CommercialPropertyResponse {
  success: boolean;
  //@ts-ignore
  property: CommercialProperty;
}

export interface AmountInfoInterface {
  amount: number;
  label: string;
  showDeposit: boolean;
  deposit: number;
  agreement?: string;
  tenure?: string;
}

export interface StatusInfoInterface {
  label: string;
  class: string;
}

export interface CoordinatesInterface {
  latitude?: number;
  longitude?: number;
}

export interface TransportDataInterface {
  busStop: string;
  airport: string;
  metro: string;
  railway: string;
}

export interface NegotiableInfoInterface {
  isNegotiable: boolean;
  label: string;
}

export interface TimeDisplayInterface {
  value: string;
  formatted: string;
}

export interface StatusActionInterface {
  status: "0" | "1" | "2" | "3" | "4" | "5";
  label: string;
  route: string;
}
