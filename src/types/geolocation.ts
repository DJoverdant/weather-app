interface Result {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1: string;
}

export interface Location {
  name: string;
  latitude: number;
  longitude: number;
}

export interface Geolocation {
  results: Result[];
}
