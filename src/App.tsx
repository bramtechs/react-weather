import { useState } from "react";

import "./App.css";
import { WeatherForm } from "./WeatherForm";
import { LiveInfo } from "./LiveInfo";
import { WeatherQuery } from "./api/WeatherAbstractor";
import { toggleDarkMode } from "./gfx/GlobalStyler";
import { SettingsPage } from "./SettingsPage";
import { MenuBar } from "./MenuBar";

export type AppState = "Main" | "Settings";
export const AppStates: AppState[] = ["Main", "Settings"];

const App = () => {
    const [state, setState] = useState<AppState>("Main");
    const [query, setSearchQuery] = useState<WeatherQuery>();

    return (
        <main className="main-style">
            <MenuBar curState={state}></MenuBar>
            {state === "Main" && (
                <div>
                    <button onClick={() => setState("Settings")}>Settings</button>
                    <button onClick={toggleDarkMode}>Toggle dark mode</button>
                    <WeatherForm onFormSubmit={(q) => setSearchQuery(q)}></WeatherForm>
                    {query ? <LiveInfo query={query}></LiveInfo> : <p>Enter in a city name</p>}
                </div>
            )}
            {state === "Settings" && (
                <SettingsPage
                    onFormSubmit={() => {
                        setState("Main");
                    }}
                ></SettingsPage>
            )}
        </main>
    );
};

export default App;
