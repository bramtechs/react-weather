import { useEffect, useState } from "react";
import { WeatherQuery } from "../../../api/WeatherTypes";
import { AddFilled } from "@fluentui/react-icons";
import { Popup } from "../../Popup";

// TODO: Put in a popup and switch to tile '+' button
export const WeatherEntryCreator = (props: { onFormSubmit: (query: WeatherQuery) => void }) => {
    const [prompting, setPrompting] = useState<boolean>(false);

    function handleQueryUpdate(query?: WeatherQuery) {
        if (query) {
            props.onFormSubmit(query);
        }
        setPrompting(false);
    }

    return prompting ? <WeatherEntryPopup onQuerySubmit={handleQueryUpdate} /> : <AddFilled onClick={() => setPrompting(true)} />;
};

const WeatherEntryPopup = (props: { onQuerySubmit: (query?: WeatherQuery) => void }) => {
    const [query, setQuery] = useState<WeatherQuery>();

    function handleConfirmation() {
        query && props.onQuerySubmit(query);
    }

    function handleCancellation() {
        props.onQuerySubmit(undefined);
    }

    return <Popup title="Add a new location" content={<WeatherEntryForm onQueryUpdate={setQuery} />} onConfirm={handleConfirmation} onCancel={handleCancellation} />;
};

const WeatherEntryForm = (props: { onQueryUpdate: (query: WeatherQuery) => void }) => {
    const [query, setQuery] = useState<WeatherQuery>();

    useEffect(() => {
        query && props.onQueryUpdate(query);
    }, [query]);

    function requestGPS() {}

    return (
        <form>
            <label htmlFor="location">Weather location</label>
            <input onChange={(e) => setQuery({ cityName: e.target.value })} id="location"></input>
            <button disabled onClick={() => requestGPS()}>
                Use device location
            </button>
        </form>
    );
};
