import { useState } from "react";

import "./App.css";
import { WeatherForm } from "./WeatherForm";
import { SettingsForm } from "./Settings";
import { LiveInfo } from "./LiveInfo";

enum AppState {
    Main,
    Settings,
}

const WeatherApp = () => {
    const [state, setState] = useState<AppState>(AppState.Main);
    const [cityName, setCityName] = useState<string>();

    switch (state) {
        case AppState.Main:
            return (
                <div className="weather">
                    <button onClick={() => setState(AppState.Settings)}>Settings</button>
                    <WeatherForm onFormSubmit={(q) => setCityName(q)}></WeatherForm>
                    {cityName ? <LiveInfo city={cityName}></LiveInfo> : <p>Enter in a city name</p>}
                </div>
            );
        case AppState.Settings:
            return (
                <SettingsForm
                    onFormSubmit={() => {
                        setState(AppState.Main);
                    }}
                ></SettingsForm>
            );
        default:
            throw new Error("Unknown AppState!");
    }
};

const App = () => {
    return (
        <div className="App">
            <WeatherApp />
        </div>
    );
};

export default App;
