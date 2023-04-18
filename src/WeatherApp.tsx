import { CurrentResponse } from "openweathermap-ts/dist/types";
import { Component, useEffect, useState } from "react";
import { EmptyQuery, searchWeather, WeatherQuery, WeatherResponse } from "./api/WeatherApi";

import "./WeatherApp.css";
import { WeatherForm } from "./WeatherForm";

enum AppState {
    Main,
    Settings,
}

const WeatherApp = () => {
    const [response, setResponse] = useState<WeatherResponse>(WeatherResponse.Nothing);
    const [state, setState] = useState<AppState>(AppState.Main);

    async function onFormReceived(query?: WeatherQuery) {
        if (!query) return;

        console.debug("Searching for", query);
        const response = await searchWeather(query);
        console.warn(response);
        setResponse(response);
    }

    useEffect(() => {
        const query: WeatherQuery = {
            city: "Bruges",
        };
        searchWeather(query).then((r) => setResponse(r));
    }, []);

    switch (state) {
        case AppState.Main:
            return (
                <div className="weather">
                    <WeatherForm onFormSubmit={onFormReceived}></WeatherForm>
                    {response.match({
                        Info: (resp: CurrentResponse) => (
                            <main>
                                <header>
                                    <h2>Showing weather info for {resp.name}</h2>
                                </header>
                                <div className="today">
                                    <p>Work in progress if you couldn't tell.</p>
                                    <p>{resp.main.temp}</p>
                                </div>
                            </main>
                        ),
                        Error: (msg: string) => (
                            <div>
                                <p style={{ color: "hotpink" }}>{msg}</p>
                            </div>
                        ),
                        Nothing: () => <div></div>,
                    })}
                </div>
            );
        case AppState.Settings:
            return <div>Settings</div>;
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
