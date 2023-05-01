import { DefaultSettings, Settings, UserSettings } from "../../src/storage/SettingsAbstractor";

describe("Test UserSettings abstraction", () => {
    test("Get default usersettings when no data", () => {
        expect(UserSettings()).toStrictEqual(DefaultSettings);
    });
    test("Save settings into localstorage", () => {
        const settings: Settings = {
            unit: "Celsius",
        };
        UserSettings(settings);
        expect(UserSettings()).toStrictEqual(settings);
    });
    test("Update settings", () => {
        const settings: Settings = {
            unit: "Celsius",
        };
        UserSettings(settings);
        UserSettings((s) => {
            s.unit = "Fahrenheit";
            return s;
        });

        const expected: Settings = {
            unit: "Fahrenheit",
        };
        expect(UserSettings()).toStrictEqual(expected);
    });
});