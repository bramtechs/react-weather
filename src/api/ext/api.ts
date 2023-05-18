import { getCoordinates } from "./geo";
import { Coordinate, LiveWeather, OpenWeatherMap, WeatherLocation } from "./types";
import { getLiveWeatherFromCoords } from "./impl";

export async function getLiveWeather(settings: OpenWeatherMap, location: Coordinate | WeatherLocation | string): Promise<LiveWeather> {
    if (typeof location !== "string" && "lat" in location) {
        return getLiveWeatherFromCoords(settings, location);
    }
    const coords = await getCoordinates(settings, location);
    return getLiveWeatherFromCoords(settings, coords);
}
