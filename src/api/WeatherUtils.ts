import { TempUnit, UserSettings } from '../storage/SettingsAbstractor';

export function convertKelvinToUnit(kelvin: number, unit: TempUnit) {
    switch (unit) {
        case 'Celsius':
            return kelvin - 274.15;
        case 'Fahrenheit':
            return (kelvin - 274.15) * (9 / 5) + 32;
        case 'Kelvin':
            return kelvin;
    }
}

export function formatTemp(kelvin: number, unit?: TempUnit) {
    const unit2Use = unit || UserSettings().unit;
    return `${convertKelvinToUnit(kelvin, unit2Use).toFixed(0)} ${
        {
            Celsius: '°C',
            Fahrenheit: '°F',
            Kelvin: 'K',
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
