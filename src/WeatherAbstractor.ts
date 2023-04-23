import { CurrentResponse } from "openweathermap-ts/dist/types";
import { searchWeather } from "./api/WeatherApi";
import {TileInfo} from "./WeatherTile";

export type TempUnit = "Celsius" | "Fahrenheit" | "Kelvin";

export type WeatherSettings = {
    unit: TempUnit;
};

export type WeatherType = String;

export const DefaultSettings: WeatherSettings = {
    unit: "Celsius",
};

let _CachedResponse: CurrentResponse | undefined;
let _WeatherSettings: WeatherSettings = DefaultSettings;

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

export function changeSettings(settings: WeatherSettings) {
    _WeatherSettings = settings;
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

export async function getLiveWeather(cityName: string): Promise<TileInfo> {
    let live: TileInfo = {
        temp: await getCurrentTemperature(cityName),
        weather: await getCurrentWeatherType(cityName),
    };
    return live;
}

async function getCurrentTemperature(cityName: string): Promise<string> {
    let resp = await fetchIfNeeded(cityName);
    if (resp) {
        const temp = convertCelciusToUnit(resp.main.temp, _WeatherSettings.unit);
        return formatTemp(Math.floor(temp), _WeatherSettings.unit);
    }
    return formatTemp("??", _WeatherSettings.unit);
}

async function getCurrentWeatherType(cityName: string): Promise<WeatherType> {
    let resp = await fetchIfNeeded(cityName);
    if (resp) {
        return resp.weather[0].main;
    }
    return "Unknown";
}
