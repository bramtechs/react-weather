import { useState } from 'react';
import { WeatherQueries, WeatherQuery, getQueryKey } from '../api/WeatherTypes';
import { LiveTile } from '../comps/tile/LiveTile';
import { DynamicLiveTile } from '../comps/tile/DynamicLiveTile';
import { UserSettings } from '../storage/SettingsAbstractor';
import React from 'react';

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

    return (
        <div className="flex flex-wrap justify-center">
            <DynamicLiveTile />
            {Object.entries(queries).map(([keyName, query]) => (
                <LiveTile key={keyName} query={query} requestRemove={handleTileRemoved} onConfigured={handleTileConfigured}/>
            ))}
            <LiveTile query={{}} onConfigured={handleTileConfigured} />
        </div>
    );
};
