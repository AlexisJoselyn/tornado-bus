export interface City {
    id: number;
    name: string;
    nameExternal: string | null;
    nameInit: string | null;
    key: string;
    isExternalCityInit: number;
    cityAbrev: string;
    baseInitId: number | null;
    baseEndId: number | null;
    abrev: string;
  }
  
export interface CitiesResponse {
    data: City[];
    message: string;
    statusCode: number;
    success: boolean;
  }