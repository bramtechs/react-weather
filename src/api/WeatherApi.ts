import OpenWeatherMap from "openweathermap-ts";
import { CurrentResponse } from "openweathermap-ts/dist/types";
import { WeatherQuery } from "./WeatherTypes";

const _OpenWeather = new OpenWeatherMap({
    apiKey: process.env.REACT_APP_OPENWEATHER_KEY!,
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
