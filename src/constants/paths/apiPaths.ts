const BASE_URL = 'https://discovery.local.onroadts.com/v1/web';

export const API_PATHS = {
  SEARCH_ORIGIN: `${BASE_URL}/select/origin`,
  SEARCH_DESTINY: (cityInitId: number) => `${BASE_URL}/select/destiny/${cityInitId}`,
};