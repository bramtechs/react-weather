import { getCoordinates } from './geo';
import { Coordinate, LiveWeather, OpenWeatherMap, WeatherLocation } from './types';
import { getLiveWeatherFromCoords, getWeatherForecastFromCoords } from './impl';

export async function getLiveWeather(settings: OpenWeatherMap, location: Coordinate | WeatherLocation | string): Promise<LiveWeather> {
    if (typeof location === 'string') {
        throw new Error('Not implemented');
    }
    if ('lat' in location && 'lon' in location) {
        location = { coords: { lat: location.lat, lon: location.lon } };
    }
    const coords = await getCoordinates(settings, location);
    return getLiveWeatherFromCoords(settings, coords);
}

export async function getWeatherForecast(settings: OpenWeatherMap, location: Coordinate | WeatherLocation | string){
    if (typeof location === 'string') {
        throw new Error('Not implemented');
    }
    if ('lat' in location && 'lon' in location) {
        location = { coords: { lat: location.lat, lon: location.lon } };
    }
    const coords = await getCoordinates(settings, location);
    return getWeatherForecastFromCoords(settings, coords);
}