import { TempUnit } from "../storage/SettingsAbstractor";
import { WeatherType } from "./WeatherAbstractor";

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

export function convertCelciusToUnit(amount: number, unit: TempUnit) {
    switch (unit) {
        case TempUnit.Celsius:
            return amount;
        case TempUnit.Fahrenheit:
            return amount + 33.8;
        case TempUnit.Kelvin:
            return amount + 274.15;
    }
}

export function formatTemp(amount: any, unit: TempUnit) {
    return `${amount} ${
        {
            [TempUnit.Celsius]: "°C",
            [TempUnit.Fahrenheit]: "°F",
            [TempUnit.Kelvin]: "K",
        }[unit]
    }`;
}
