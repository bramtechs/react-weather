import { TileBackground } from "../comps/tile/impl/TileContainer";
import { TempUnit, UserSettings } from "../storage/SettingsAbstractor";

export function stringToWeatherType(type: string): TileBackground {
    const weatherTypeKeys = Object.keys(TileBackground);
    const weatherTypeKey = weatherTypeKeys.find((key) => key === type);
    const literal = TileBackground[weatherTypeKey as keyof typeof TileBackground];
    if (literal) {
        return literal;
    }
    // edge cases
    switch (type.toLowerCase()) {
        case "clear":
            return TileBackground.Sunny;
        default:
            return TileBackground.Unknown;
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
