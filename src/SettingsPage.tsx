import { useState } from "react";
import { DropdownChoice, FormDropdown } from "./comps/SettingsWidgets";
import { DefaultSettings, Settings, TempUnit, UserSettings } from "./storage/SettingsAbstractor";

export const SettingsPage = (props: { onFormSubmit: () => void }) => {
    const [settings, setSettings] = useState<Settings>(UserSettings);

    function getSettingsCopy(): Settings {
        const copy: Settings = DefaultSettings;
        Object.assign(copy, settings);
        return copy;
    }

    function onInputChanged(choice: DropdownChoice) {
        console.warn(choice);
        const copy = getSettingsCopy();
        const key = Object.keys(copy).find((k) => k === choice.key);
        if (key) {
            (copy as any)[key] = choice.value;
            setSettings(copy);
        } else {
            throw new Error(`Can't assign key ${choice.key}`);
        }
    }

    return (
        <div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (settings) {
                        UserSettings(settings);
                    }
                    props.onFormSubmit();
                }}
            >
                <FormDropdown target="unit" displayName="Temperature Unit" options={TempUnit} onChange={onInputChanged}></FormDropdown>
                <input type="submit"></input>
            </form>
        </div>
    );
};
