import { DEFAULT_HOST, formUrl, multiFetch, proxify } from './net';
import { Coordinate, LiveWeather, OpenWeatherMap, WeatherLocation } from './types';

const dataVersion = ['data', '2.5'];

export async function getLiveWeatherFromCoords(settings: OpenWeatherMap, coords: Coordinate): Promise<LiveWeather> {
    const url = proxify(formUrl(DEFAULT_HOST, [...dataVersion, 'weather'], { lat: coords.lat, lon: coords.lon, appid: settings.apiKey }), settings.proxy);
    const res = await multiFetch(url);
    const json = await res.json();
    if (json.cod !== 200) {
        throw new Error(`Get live weather from coordinates returned code ${json.cod}`);
    }
    return json as LiveWeather;
}

export function isValidLocation(location: WeatherLocation): boolean {
    // returns true if at least one field is given
    return location.city !== undefined || location.state !== undefined || location.country !== undefined;
}
