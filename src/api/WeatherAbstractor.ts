import { CurrentResponse } from "openweathermap-ts/dist/types";
import { UserSettings } from "../storage/SettingsAbstractor";
import { convertCelciusToUnit, formatTemp, stringToWeatherType } from "./WeatherUtils";
import { searchWeather } from "./WeatherApi";

export type WeatherInfo = {
    temp: string;
    weather: [WeatherType, string];
    city: string;
};

export type WeatherQuery = {
    cityName?: string;
    coords?: {
        lat: number;
        lon: number;
    };
};

export enum WeatherType {
    Unknown,
    Clouds,
    Sunny,
}

let _CachedResponse: CurrentResponse | undefined;
// TODO: make it possible to search by coordinates as fallback
async function fetchIfNeeded(query: WeatherQuery): Promise<CurrentResponse | undefined> {
    if (!_CachedResponse || _CachedResponse.name !== query.cityName) {
        let fetchResponse = await searchWeather(query);
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

export async function getLiveWeather(query: WeatherQuery): Promise<WeatherInfo> {
    let live: WeatherInfo = {
        temp: await getCurrentTemperature(query),
        weather: await getCurrentWeatherType(query),
        city: await getCurrentCityName(query),
    };
    return live;
}

async function getCurrentTemperature(query: WeatherQuery): Promise<string> {
    let resp = await fetchIfNeeded(query);
    if (resp) {
        const temp = convertCelciusToUnit(resp.main.temp, UserSettings().unit);
        return formatTemp(Math.floor(temp), UserSettings().unit);
    }
    return formatTemp("??", UserSettings().unit);
}

async function getCurrentWeatherType(query: WeatherQuery): Promise<[WeatherType, string]> {
    let resp = await fetchIfNeeded(query);
    if (resp) {
        const type = resp.weather[0].main;
        return [stringToWeatherType(type), type];
    }
    return [WeatherType.Unknown, "Unknown"];
}

async function getCurrentCityName(query: WeatherQuery): Promise<string> {
    let resp = await fetchIfNeeded(query);
    if (resp) {
        return resp.name;
    }
    return query.cityName || "???";
}
