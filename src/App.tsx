import { useState } from "react";

import "./App.css";
import { WeatherQuery } from "./api/WeatherTypes";
import { SettingsState } from "./states/SettingsState";
import { MenuBar } from "./comps/MenuBar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { MainState } from "./states/MainState";

export type AppState = "Main" | "Settings";
export const AppStates: AppState[] = ["Main", "Settings"];

const queryClient = new QueryClient();

const App = () => {
    const [state, setState] = useState<AppState>("Main");

    return (
        <QueryClientProvider client={queryClient}>
            <main className="main-style">
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
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
};

export default App;
