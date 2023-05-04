import OpenWeatherMap from "openweathermap-ts";
import { CurrentResponse } from "openweathermap-ts/dist/types";
import { WeatherQuery } from "./WeatherTypes";

const _OpenWeather = new OpenWeatherMap({
    // FIXME: Don't include directly in here!
    apiKey: "db6b3fff5256fe57907e84c800f2d027",
    units: "metric",
});

export function searchWeather(query: WeatherQuery): Promise<CurrentResponse> {
    if (query.cityName) {
        return _OpenWeather.getCurrentWeatherByCityName({
            cityName: query.cityName,
        });
    } else if (query.coords) {
        return _OpenWeather.getCurrentWeatherByGeoCoordinates(query.coords.lat, query.coords.lon);
    } else {
        throw new Error("No valid search query given");
    }
}
