import {useState} from "react";
import {EmptyQuery, WeatherQuery} from "./api/WeatherApi";

export const WeatherForm = (props: { onFormSubmit: (query?: WeatherQuery) => void }) => {
    const [query] = useState<WeatherQuery>(EmptyQuery);

    function requestGPS() {}

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                props.onFormSubmit(query);
            }}
        >
            <label htmlFor="location">Weather location</label>
            <input onChange={(e) => (query.city = e.target.value)} id="location"></input>
            <button disabled onClick={() => requestGPS()}>
                Use device location
            </button>
            <input type="submit" value="Submit"></input>
        </form>
    );
};
