import { useState } from "react";
import { Settings, TempUnit, UserSettings } from "./storage/SettingsAbstractor";

export const SettingsForm = (props: { onFormSubmit: () => void }) => {
    const [settings] = useState<Settings>(UserSettings);

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
                <label htmlFor="temperature">Temperature unit</label>
                <select id="temperature" onChange={(e) => (settings.unit = e.target.value as TempUnit)}>
                    <option>Celsius</option>
                    <option>Fahrenheit</option>
                    <option>Kelvin</option>
                </select>
                <input type="submit"></input>
            </form>
        </div>
    );
};
