import { useState } from "react";

import { SettingsState } from "./states/SettingsState";
import { MenuBar } from "./comps/MenuBar";
import { MainState } from "./states/MainState";

export type AppState = "Main" | "Settings";
export const AppStates: AppState[] = ["Main", "Settings"];

const App = () => {
    const [state, setState] = useState<AppState>("Main");

    return (
            <main className="main-content">
                <MenuBar curState={state} onStateChange={setState}/>
                {state === "Main" && (
                    <MainState/>
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
