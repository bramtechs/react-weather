import {useState} from "react";

enum TempUnit {
    Celsius,
    Fahrenheit,
    Kelvin
}

type WeatherSettings = {
    unit: TempUnit,
}

const DefaultSettings: WeatherSettings = {
    unit: TempUnit.Celsius,
}

export const WeatherSettings = (props: {
        onFormSubmit: (settings?: WeatherSettings) => void
    }) => {

    const [settings] = useState<WeatherSettings>(DefaultSettings);

    function onFormSubmit(){
        settings.unit = TempUnit.Celsius;
    }

    return (
        <div>
            <form onSubmit={onFormSubmit}>
                <select>
                    <option>Celsius</option>
                    <option>Fahrenheit</option>
                    <option>Kelvin</option>
                </select>
                <input type="submit"></input>
            </form>
        </div>
    );
};
