import { useState } from 'react';
import { WeatherQuery } from '../../../api/WeatherTypes';
import { Popup } from '../../Popup';
import React from 'react';

export function TileConfigurator(props: { query?: WeatherQuery; onQuerySubmit: (query?: WeatherQuery) => void }) {
    const [query, setQuery] = useState<WeatherQuery>(props.query || {});

    function handleConfirmation() {
        query && props.onQuerySubmit(query);
    }

    function handleCancellation() {
        props.onQuerySubmit();
    }

    return (
        <Popup title="Add a new location" onConfirm={handleConfirmation} onCancel={handleCancellation}>
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
        </Popup>
    );
}
