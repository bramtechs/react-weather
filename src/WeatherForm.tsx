import { useState } from "react";
import { WeatherQuery } from "./api/WeatherAbstractor";

// TODO: Put in a popup and switch to tile '+' button
export const WeatherForm = (props: { onFormSubmit: (query: WeatherQuery | undefined) => void }) => {
    const [query, setQuery] = useState<WeatherQuery>();

    function requestGPS() {}

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                props.onFormSubmit(query);
                console.log("Querying", query);
            }}
        >
            <label htmlFor="location">Weather location</label>
            <input onChange={(e) => setQuery({ cityName: e.target.value })} id="location"></input>
            <button disabled onClick={() => requestGPS()}>
                Use device location
            </button>
            <input type="submit" value="Submit"></input>
        </form>
    );
};
