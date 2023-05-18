import { Coordinate } from '../storage/SettingsAbstractor';
import { WeatherLocation } from './ext';

export interface WeatherQueries {
    [key: string]: WeatherLocation;
}

export function weatherLocationToString(query: WeatherLocation) {
    if (query.city) {
        return query.city;
    } else if (query.coords) {
        return `${query.coords.lat},${query.coords.lon}`;
    } else {
        return `nowhere`;
    }
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
