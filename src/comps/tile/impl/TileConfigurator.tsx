import { useState } from 'react';
import { Popup } from '../../Popup';
import { WeatherLocation } from '../../../api/ext';
import React from 'react';

export function TileConfigurator(props: { query?: WeatherLocation; onQuerySubmit: (query?: WeatherLocation) => void }) {
    const [query, setQuery] = useState<WeatherLocation>(props.query || {});

    function handleConfirmation() {
        query && props.onQuerySubmit(query);
    }

    function handleCancellation() {
        props.onQuerySubmit();
    }

    return (
        <Popup title="Add a new location" onConfirm={handleConfirmation} onCancel={handleCancellation}>
            <table className="m-3">
                <thead></thead>
                <tbody>
                    <tr>
                        <td>
                            <label htmlFor="location">Location</label>
                        </td>
                        <td>
                            <input value={query.city || ''} onChange={(e) => setQuery({ city: e.target.value })} id="location"></input>
                        </td>
                    </tr>
                </tbody>
            </table>
        </Popup>
    );
}
