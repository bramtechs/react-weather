import { useState } from "react";

import "./App.css";
import { WeatherEntryCreator } from "./WeatherEntryCreator";
import { LiveInfo } from "./LiveInfo";
import { WeatherQuery } from "./api/WeatherAbstractor";
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
                    <WeatherEntryCreator onFormSubmit={(q) => setSearchQuery(q)} />
                    {query && <LiveInfo query={query}></LiveInfo>}
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
