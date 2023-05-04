import { useState } from "react";

import "./App.css";
import { WeatherEntryCreator } from "./WeatherEntryCreator";
import { LiveInfo } from "./LiveInfo";
import { WeatherQuery } from "./api/WeatherAbstractor";
import { SettingsState } from "./SettingsState";
import { MenuBar } from "./MenuBar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export type AppState = "Main" | "Settings";
export const AppStates: AppState[] = ["Main", "Settings"];

const queryClient = new QueryClient();

const App = () => {
    const [state, setState] = useState<AppState>("Main");
    const [query, setSearchQuery] = useState<WeatherQuery>();

    return (
        <QueryClientProvider client={queryClient}>
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
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
};

export default App;
