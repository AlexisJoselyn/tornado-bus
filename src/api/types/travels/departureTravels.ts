export interface citiesDepartureTravel {
  originID: number;
  destinyID: number;
}

export interface metadataDepartureTravel {
  isMulti: boolean;
  connections: number;
  cities: citiesDepartureTravel[];
}

export interface DepartureTravel {
    id: number;
    dateInitFormat: string;
    HourInitFormat: string;
    dateEndFormat: string;
    HourEndFormat: string;
    travelTime: string;
    cityInitID: number;
    cityInit: string;
    cityEndID: number;
    cityEnd: string;
    addressEnd: string;
    addressInit: string;
    totalSeats: number;
    totalNivel: number;
    routesNames: string;
    amount: string;
    companyName: string;
    companyLogo: string;
    currencyID: number;
    currency: string;
    metadata: metadataDepartureTravel;
  }

export interface DepartureTravelsResponse {
    data: DepartureTravel[];
    message: string;
    statusCode: number;
    success: boolean;
}

export interface DepartureTravelFilters {
    date: string;
    city: [number, number];
    passengerNumber: number;
    passengerDisabilityNumber: number;
    orderTravel: number;
    orderMaxMinTravel: number;
    isPoint: boolean;
    currencyID: number;
    externalInitId: number;
    externalEndId: number;
    routeID: null;
    _rowId: null;
  }