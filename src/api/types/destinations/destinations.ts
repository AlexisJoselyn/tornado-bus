export interface Destination {
    id: number;
    name: string;
    nameExternal: string | null;
    key: string;
    isExternalCityEnd: number;
    baseEndId: number | null;
    nameEnd: string | null;
    isMultiroute: number;
    abrev: string;
  }
  
export interface DestinationsResponse {
    data: Destination[];
    message: string;
    statusCode: number;
    success: boolean;
  }