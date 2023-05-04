import { TempUnit, UserSettings } from "../storage/SettingsAbstractor";
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
        case "Celsius":
            return amount;
        case "Fahrenheit":
            return amount + 33.8;
        case "Kelvin":
            return amount + 274.15;
    }
}

export function formatTemp(amount: number, unit?: TempUnit) {
    return `${amount.toFixed(0)} ${
        {
            Celsius: "°C",
            Fahrenheit: "°F",
            Kelvin: "K",
        }[unit || UserSettings().unit]
    }`;
}

export function capitalizeFirst(text: string) {
    if (text.length > 0) {
        const first = text.charAt(0).toUpperCase();
        return first + text.slice(1);
    }
    return text;
}
