import { useEffect, useState } from 'react';
import { WeatherQuery } from '../../../api/WeatherTypes';
import { Popup } from '../../Popup';
import { useKeyPress } from '../../../InputHook';
import React from 'react';

export function TileConfigurator(props: { query?: WeatherQuery; onQuerySubmit: (query?: WeatherQuery) => void }) {
    const [query, setQuery] = useState<WeatherQuery>(props.query || {});
    const accept = useKeyPress('Enter');

    function handleConfirmation() {
        query && props.onQuerySubmit(query);
    }

    function handleCancellation() {
        props.onQuerySubmit();
    }

    useEffect(() => {
        if (accept) {
            handleConfirmation();
        }
    }, [accept]);

    return (
        <Popup title="Add a new location" onConfirm={handleConfirmation} onCancel={handleCancellation}>
            <div className="m-3">
                <label ref={(elem) => elem?.focus()} htmlFor="location">
                    Location
                </label>
                <input value={query.cityName || ''} onChange={(e) => setQuery({ cityName: e.target.value })} id="location"></input>
            </div>
        </Popup>
    );
}
