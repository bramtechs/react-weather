import { isValidLocation } from './impl';
import { DEFAULT_HOST, formUrl, multiFetch, proxify } from './net';
import { Coordinate, OpenWeatherMap, WeatherLocation } from './types';

export function locationCSV(location: WeatherLocation | string) {
    if (typeof location === 'string') {
        return location;
    }

    let result = '';
    if (location.city) {
        result += `${location.city},`;
    }
    if (location.state) {
        result += `${location.state},`;
    }
    if (location.country) {
        result += `${location.country},`;
    }
    return result.slice(0, Math.max(0, result.length - 1));
}

export async function getCoordinates(settings: OpenWeatherMap, location: WeatherLocation | string): Promise<Coordinate> {
    if (typeof location !== 'string') {
        if (location.coords) {
            return location.coords;
        }
        if (!isValidLocation(location)) {
            throw new Error(`Invalid location: ${JSON.stringify(location)}`);
        }
    } else if ((location as string).length === 0) {
        throw new Error(`Empty location string`);
    }

    const locURL = proxify(formUrl(DEFAULT_HOST, ['geo', '1.0', 'direct'], { q: locationCSV(location), appid: settings.apiKey }), settings.proxy);
    const res = await multiFetch(locURL);
    const json = await res.json();
    if (json.cod) {
        throw new Error(`Code ${json.cod} when retrieving coordinates`);
    }
    if ('error' in json) {
        throw new Error(json.error);
    }
    return { lat: json[0].lat, lon: json[0].lon };
}
