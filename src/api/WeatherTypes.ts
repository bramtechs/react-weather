import { Coordinate } from '../storage/SettingsAbstractor';
import { WeatherLocation } from './ext';

export interface WeatherQueries {
    [key: string]: WeatherLocation;
}

export function weatherLocationToString(query: WeatherLocation) {
    let result = '';
    if (query.city) {
        result += `${query.city},`;
    }
    if (query.state) {
        result += `${query.state},`;
    }
    if (query.country) {
        result += `${query.country},`;
    }
    return result.slice(0, Math.max(0, result.length - 1));
}

export function coordinateToString(coords: Coordinate) {
    return `${coords.lat},${coords.lon}`;
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
