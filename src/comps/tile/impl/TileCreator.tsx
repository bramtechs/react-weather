import { useEffect, useState } from 'react';
import { WeatherQuery } from '../../../api/WeatherTypes';
import { AddFilled } from '@fluentui/react-icons';
import { Popup } from '../../Popup';
import React from 'react';

export function TileCreator(props: { onFormSubmit: (query: WeatherQuery) => void }) {
    const [prompting, setPrompting] = useState<boolean>(false);

    function handleQueryUpdate(query?: WeatherQuery) {
        if (query) {
            props.onFormSubmit(query);
        }
        setPrompting(false);
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center w-full h-full" onClick={() => setPrompting(true)}>
                <AddFilled />
            </div>
            {prompting ? <WeatherEntryPopup onQuerySubmit={handleQueryUpdate} /> : <></>}
        </>
    );
}

function WeatherEntryPopup(props: { onQuerySubmit: (query?: WeatherQuery) => void }) {
    const [query, setQuery] = useState<WeatherQuery>();

    function handleConfirmation() {
        query && props.onQuerySubmit(query);
    }

    function handleCancellation() {
        props.onQuerySubmit();
    }

    return (
        <Popup title="Add a new location" onConfirm={handleConfirmation} onCancel={handleCancellation}>
            <WeatherEntryForm onQueryUpdate={setQuery} />
        </Popup>
    );
}

const WeatherEntryForm = (props: { onQueryUpdate: (query: WeatherQuery) => void }) => {
    const [query, setQuery] = useState<WeatherQuery>();

    useEffect(() => {
        query && props.onQueryUpdate(query);
    }, [query]);

    return (
        <table className="m-3">
            <thead>
                <tr>
                    <th>
                        <label htmlFor="location">Location</label>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <input onChange={(e) => setQuery({ cityName: e.target.value })} id="location"></input>
                    </td>
                </tr>
            </tbody>
        </table>
    );
};
