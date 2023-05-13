import { useState } from 'react';
import { WeatherQueries, WeatherQuery, getQueryKey } from '../api/WeatherTypes';
import { LiveTile } from '../comps/tile/LiveTile';
import { DynamicLiveTile } from '../comps/tile/DynamicLiveTile';
import { UserSettings } from '../storage/SettingsAbstractor';
import React from 'react';
import { ButtonBehaviour } from '../comps/tile/impl/TileButtons';

export const MainState = () => {
    const [queries, setQueries] = useState<WeatherQueries>(UserSettings().tiles);

    function handleTileConfigured(query: WeatherQuery) {
        const copy = {};
        Object.assign(copy, queries);
        copy[getQueryKey(query)] = query;
        setQueries(copy);

        UserSettings((data) => (data.tiles = copy));
    }

    function handleTileRemoved(query: WeatherQuery) {
        const copy = {};
        Object.assign(copy, queries);
        delete copy[getQueryKey(query)];
        setQueries(copy);

        UserSettings((data) => (data.tiles = copy));
    }

    function handleTileEdit(query: WeatherQuery) {
        handleTileRemoved(query);
    }

    return (
        <div className="flex flex-wrap justify-center">
            <DynamicLiveTile />
            {Object.entries(queries).map(([keyName, query]) => {
                const behaviour: ButtonBehaviour = {
                    onRemove: () => handleTileRemoved(query),
                    onEdit: () => handleTileEdit(query),
                };
                return <LiveTile key={keyName} query={query} buttonBehaviour={behaviour} onConfigured={() => handleTileConfigured(query)} />;
            })}
            <LiveTile query={{}} onConfigured={handleTileConfigured} />
        </div>
    );
};
