import { TempUnit, UserSettings } from "../storage/SettingsAbstractor";

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

export function formatTemp(celcius: number, unit?: TempUnit) {
    const unit2Use = unit || UserSettings().unit;
    return `${convertCelciusToUnit(celcius, unit2Use).toFixed(0)} ${
        {
            Celsius: "°C",
            Fahrenheit: "°F",
            Kelvin: "K",
        }[unit2Use]
    }`;
}

export function capitalizeFirst(text: string) {
    if (text.length > 0) {
        const first = text.charAt(0).toUpperCase();
        return first + text.slice(1);
    }
    return text;
}
