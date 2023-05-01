import { useState } from "react";

// TODO: Put in a popup and switch to tile '+' button
export const WeatherForm = (props: { onFormSubmit: (cityName: string | undefined) => void }) => {
    const [cityName, setCityName] = useState<string>();

    function requestGPS() {}

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                props.onFormSubmit(cityName);
                console.log("Querying", cityName);
            }}
        >
            <label htmlFor="location">Weather location</label>
            <input onChange={(e) => setCityName(e.target.value)} id="location"></input>
            <button disabled onClick={() => requestGPS()}>
                Use device location
            </button>
            <input type="submit" value="Submit"></input>
        </form>
    );
};
