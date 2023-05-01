import { CurrentResponse } from "openweathermap-ts/dist/types";
import { TempUnit, UserSettings } from "../storage/SettingsAbstractor";
import { searchWeather } from "./WeatherApi";

export type WeatherInfo = {
    temp: string;
    weather: [WeatherType, string];
};

export enum WeatherType {
    Unknown,
    Clouds,
    Sunny,
}

export function stringToWeatherType(type: string): WeatherType {
    const weatherTypeKeys = Object.keys(WeatherType);
    const weatherTypeKey = weatherTypeKeys.find((key) => key === type);
    const literal = WeatherType[weatherTypeKey as keyof typeof WeatherType];
    if (literal) {
        return literal;
    }
    // edge cases
    switch (type.toLowerCase()) {
        case "clear":
            return WeatherType.Sunny;
        default:
            return WeatherType.Unknown;
    }
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

// TODO: Move to WeatherUtils.ts
function convertCelciusToUnit(amount: number, unit: TempUnit) {
    switch (unit) {
        case "Celsius":
            return amount;
        case "Fahrenheit":
            return amount + 33.8;
        case "Kelvin":
            return amount + 274.15;
    }
}

function formatTemp(amount: any, unit: TempUnit) {
    switch (unit) {
        case "Celsius":
            return amount + " °C";
        case "Fahrenheit":
            return amount + " °F";
        case "Kelvin":
            return amount + " K";
    }
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
