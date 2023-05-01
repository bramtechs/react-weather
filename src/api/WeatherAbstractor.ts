import { CurrentResponse } from "openweathermap-ts/dist/types";
import { UserSettings } from "../storage/SettingsAbstractor";
import { convertCelciusToUnit, formatTemp, stringToWeatherType } from "./WeatherUtils";
import { searchWeather } from "./WeatherApi";

export type WeatherInfo = {
    temp: string;
    weather: [WeatherType, string];
};

export type WeatherQuery = {
    city: String;
    coordinates: String;
};

export enum WeatherType {
    Unknown,
    Clouds,
    Sunny,
}

let _CachedResponse: CurrentResponse | undefined;
// TODO: make it possible to search by coordinates as fallback
async function fetchIfNeeded(cityName: string): Promise<CurrentResponse | undefined> {
    if (!_CachedResponse || _CachedResponse.name !== cityName) {
        let fetchResponse = await searchWeather(cityName);
        return fetchResponse.match({
            Nothing: () => undefined,
            Error: () => undefined,
            Info: (resp: CurrentResponse) => {
                _CachedResponse = resp;
                console.log("Fetched ", _CachedResponse);
                return resp;
            },
        });
    }
    return _CachedResponse;
}

export async function getLiveWeather(cityName: string): Promise<WeatherInfo> {
    let live: WeatherInfo = {
        temp: await getCurrentTemperature(cityName),
        weather: await getCurrentWeatherType(cityName),
    };
    return live;
}

async function getCurrentTemperature(cityName: string): Promise<string> {
    let resp = await fetchIfNeeded(cityName);
    if (resp) {
        const temp = convertCelciusToUnit(resp.main.temp, UserSettings().unit);
        return formatTemp(Math.floor(temp), UserSettings().unit);
    }
    return formatTemp("??", UserSettings().unit);
}

async function getCurrentWeatherType(cityName: string): Promise<[WeatherType, string]> {
    let resp = await fetchIfNeeded(cityName);
    if (resp) {
        const type = resp.weather[0].main;
        return [stringToWeatherType(type), type];
    }
    return [WeatherType.Unknown, "Unknown"];
}
