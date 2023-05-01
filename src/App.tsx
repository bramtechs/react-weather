import { useState } from "react";

import "./App.css";
import { WeatherForm } from "./WeatherForm";
import { LiveInfo } from "./LiveInfo";
import { WeatherQuery } from "./api/WeatherAbstractor";
import { toggleDarkMode } from "./gfx/GlobalStyler";
import {SettingsPage} from "./SettingsPage";

enum AppState {
    Main,
    Settings,
}

const App = () => {
    const [state, setState] = useState<AppState>(AppState.Main);
    const [query, setSearchQuery] = useState<WeatherQuery>();

    switch (state) {
        case AppState.Main:
            return (
                <div className="weather">
                    <button onClick={() => setState(AppState.Settings)}>Settings</button>
                    <button onClick={toggleDarkMode}>Toggle dark mode</button>
                    <WeatherForm onFormSubmit={(q) => setSearchQuery(q)}></WeatherForm>
                    {query ? <LiveInfo query={query}></LiveInfo> : <p>Enter in a city name</p>}
                </div>
            );
        case AppState.Settings:
            return (
                <SettingsPage
                    onFormSubmit={() => {
                        setState(AppState.Main);
                    }}
                ></SettingsPage>
            );
        default:
            throw new Error("Unknown AppState!");
    }
};

export default App;
