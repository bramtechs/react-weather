import { useState } from "react";
import { changeSettings, DefaultSettings, TempUnit, WeatherSettings } from "./api/WeatherAbstractor";

export const Settings = (props: { onFormSubmit: () => void }) => {
    const [settings] = useState<WeatherSettings>(DefaultSettings);

    return (
        <div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (settings) {
                        changeSettings(settings);
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
