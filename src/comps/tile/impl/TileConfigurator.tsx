import { useEffect, useState } from 'react';
import { Popup } from '../../Popup';
import { useKeyPress } from '../../../InputHook';
import { WeatherLocation } from '../../../api/ext';
import React from 'react';

export function TileConfigurator(props: { query?: WeatherLocation; onQuerySubmit: (query?: WeatherLocation) => void }) {
    const [query, setQuery] = useState<WeatherLocation>(props.query || {});
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
                <input value={query.city || ''} onChange={(e) => setQuery({ city: e.target.value })} id="location"></input>
            </div>
        </Popup>
    );
}
