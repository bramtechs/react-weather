import { useState } from "react";
import { DisplayedFields, SettingsForm } from "./comps/SettingsForm";
import { DefaultSettings, Settings, TempUnit, UserSettings } from "./storage/SettingsAbstractor";

export const SettingsPage = (props: { onFormSubmit: () => void }) => {
    const [settings] = useState<Settings>(UserSettings);

    const fieldsToDisplay: DisplayedFields = {
        unit: "Temperature unit",
        favColor: "Favourite color (test value)",
        favFood: "Favourite food (test value)",
    };

    return (
        <div>
            <SettingsForm target={UserSettings()} fields={fieldsToDisplay}></SettingsForm>
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
