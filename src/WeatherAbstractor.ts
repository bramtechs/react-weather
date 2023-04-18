import { CurrentResponse } from "openweathermap-ts/dist/types";
import { searchWeather } from "./api/WeatherApi";

export type TempUnit = "Celsius" | "Fahrenheit" | "Kelvin";

export type WeatherSettings = {
    unit: TempUnit;
};

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

function formatTemp(amount: number, unit: TempUnit) {
    switch (unit) {
        case "Celsius":
            return amount + " °C";
        case "Fahrenheit":
            return amount + " °F";
        case "Kelvin":
            return amount + " K";
    }
}

export async function getCurrentTemperature(cityName: string) {
    let resp = await fetchIfNeeded(cityName);
    if (resp) {
        const temp = convertCelciusToUnit(resp.main.temp, _WeatherSettings.unit);
        return formatTemp(Math.floor(temp), _WeatherSettings.unit);
    }
    return -1;
}
