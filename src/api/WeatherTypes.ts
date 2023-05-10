import { Coordinate } from '../storage/SettingsAbstractor';

export interface WeatherQuery {
    cityName?: string;
    coords?: Coordinate;

}
export interface WeatherQueries {
    [key: string]: WeatherQuery;
}

export function isQueryValid(query) {
    return query.cityName != undefined || query.coords != undefined;
}

export function getQueryKey(query) {
    if (query.cityName) {
        return `${query.cityName}`;
    } else if (query.coords) {
        return `${query.coords.lat}-${query.coords.lon}`;
    } else {
        return `nothing`;
    }
}
