import { WeatherQueries } from '../api/WeatherTypes';

export type TempUnit = 'Celsius' | 'Fahrenheit' | 'Kelvin';
export const TempUnits: TempUnit[] = ['Celsius', 'Fahrenheit', 'Kelvin'];

export interface Coordinate {
    lat: number;
    lon: number;
}

export type Settings = {
    unit: TempUnit;
    tiles: WeatherQueries;
    lastLocation?: Coordinate;
};

export const DefaultSettings: Settings = {
    unit: 'Celsius',
    tiles: {},
};

function validateUserSettings(object: any): boolean {
    return Object.keys(DefaultSettings).find((k) => !(k in object)) === undefined;
}

function loadSettings(): Settings {
    if (!localStorage) {
        throw new Error('LocalStorage not supported!');
    }

    const json = localStorage.getItem('userSettings');
    if (!json) {
        return DefaultSettings;
    }
    const parsed = JSON.parse(json);
    if (!validateUserSettings(parsed)) {
        return DefaultSettings;
    }
    return parsed as Settings;
}

function saveSettings(s: Settings) {
    if (!localStorage) {
        throw new Error('LocalStorage not supported!');
    }

    let json = JSON.stringify(s);
    localStorage.setItem('userSettings', json);
    console.debug('Updated user setttings');
}

function isSettings(s: any) {
    return (s as Settings).unit !== undefined;
}

type SettingsMutator = (settings: Settings) => void;
export const UserSettings = (mutator: SettingsMutator | Settings | undefined = undefined): Settings => {
    let settings = loadSettings();
    if (mutator) {
        // write mode
        if (isSettings(mutator)) {
            saveSettings(mutator as Settings);
        } else {
            (mutator as SettingsMutator)(settings);
            saveSettings(settings);
        }
    }
    return settings;
};
