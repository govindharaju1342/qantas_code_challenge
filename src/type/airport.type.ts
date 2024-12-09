export interface AirportData {
  airportCode: string;
  internationalAirport: boolean;
  domesticAirport: boolean;
  regionalAirport: boolean;
  onlineIndicator: boolean;
  eticketableAirport: boolean;
  location: Location;
  airportName: string;
  city: City;
  state?: State;
  country: Country;
  region: Region;
  processed: boolean;
}

export interface Location {
  aboveSeaLevel: number;
  latitude: number;
  latitudeRadius: number;
  longitude: number;
  longitudeRadius: number;
  latitudeDirection: string;
  longitudeDirection: string;
}

export interface City {
  cityCode: string;
  cityName: string;
  timeZoneName: string;
}

export interface State {
  stateCode: string;
  stateName: string;
}

export interface Country {
  countryCode: string;
  countryName: string;
}

export interface Region {
  regionCode: string;
  regionName: string;
}