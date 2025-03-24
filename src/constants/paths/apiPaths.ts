const BASE_URL = 'https://discovery.local.onroadts.com/v1/web';
const BASE_URL_API = 'https://api.local.onroadts.com/v1/web';

export const API_PATHS = {
  SEARCH_ORIGIN: `${BASE_URL}/select/origin`,
  SEARCH_DESTINY: (cityInitId: number) => `${BASE_URL}/select/destiny/${cityInitId}`,
  PASSENGER_TYPES: `${BASE_URL_API}/select/type`,
  DEPARTURE_TRAVELS: `${BASE_URL}/list/departure-travels`,
  AVAILABLE_SEATS: (travelId: number, cityInitId: number, cityEndId: number) => 
    `${BASE_URL_API}/list/seats/${travelId}/${cityInitId}/${cityEndId}`,
};