import { CurrentResponse } from "openweathermap-ts/dist/types";
import { Component, useEffect, useState } from "react";
import { EmptyQuery, searchWeather, WeatherQuery, WeatherResponse } from "./api/WeatherApi";

import "./App.css";

// TODO: Implement settings menu

const WeatherForm = (props: { onFormSubmit: (query?: WeatherQuery) => void }) => {
    function getQuery(): WeatherQuery {
        if (!query) {
            query = EmptyQuery;
        }
        return query;
    }

    function requestGPS() {}

    let [query] = useState<WeatherQuery>();
    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                props.onFormSubmit(query);
            }}
        >
            <label htmlFor="location">Weather location</label>
            <input onChange={(e) => (getQuery().city = e.target.value)} id="location"></input>
            <button disabled onClick={() => requestGPS()}>
                Use device location
            </button>
            <input type="submit" value="Submit"></input>
        </form>
    );
};

const WeatherApp = () => {
    const [response, setResponse] = useState<WeatherResponse>(WeatherResponse.Nothing);

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
};

const LiveWeatherInfo = (props: { resp: CurrentResponse }) => {
    return (
        <div className="wlive">
            <h2>Live weather info</h2>
            <p>{props.resp.main.temp}</p>
        </div>
    );
};

const WeatherTile = () => {
    return (
        <div className="wtile">
            <p>Put weather info here</p>
        </div>
    );
};

const App = () => {
    return (
        <div className="App">
            <WeatherApp />
        </div>
    );
};

export default App;
