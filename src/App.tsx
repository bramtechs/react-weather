import { useState } from "react";

import "./App.css";
import { WeatherEntryCreator } from "./WeatherEntryCreator";
import { LiveInfo } from "./LiveInfo";
import { WeatherQuery } from "./api/WeatherAbstractor";
import { toggleDarkMode } from "./gfx/GlobalStyler";
import { SettingsState } from "./SettingsState";
import { MenuBar } from "./MenuBar";

export type AppState = "Main" | "Settings";
export const AppStates: AppState[] = ["Main", "Settings"];

const App = () => {
    const [state, setState] = useState<AppState>("Main");
    const [query, setSearchQuery] = useState<WeatherQuery>();

    return (
        <main className="main-style">
            <MenuBar curState={state} onStateChange={setState}></MenuBar>
            {state === "Main" && (
                <div>
                    <button onClick={() => setState("Settings")}>Settings</button>
                    <button onClick={toggleDarkMode}>Toggle dark mode</button>
                    <WeatherEntryCreator onFormSubmit={(q) => setSearchQuery(q)}></WeatherEntryCreator>
                    {query ? <LiveInfo query={query}></LiveInfo> : <p>Enter in a city name</p>}
                </div>
            )}
            {state === "Settings" && (
                <SettingsState
                    onFormSubmit={() => {
                        setState("Main");
                    }}
                ></SettingsState>
            )}
        </main>
    );
};

export default App;
