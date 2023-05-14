import { useState } from 'react';
import { WeatherQueries, WeatherQuery, getQueryKey } from '../api/WeatherTypes';
import { LiveTile } from '../comps/tile/LiveTile';
import { DynamicLiveTile } from '../comps/tile/DynamicLiveTile';
import { UserSettings } from '../storage/SettingsAbstractor';
import React from 'react';
import { ButtonBehaviour } from '../comps/tile/impl/TileButtons';
import { TileCreator } from '../comps/tile/impl/TileCreator';
import { TileConfigurator } from '../comps/tile/impl/TileConfigurator';

export function MainState() {
    const [queries, setQueries] = useState<WeatherQueries>(UserSettings().tiles);
    const [editing, setEditing] = useState<WeatherQuery | undefined>(undefined);

    function addNewTile(query: WeatherQuery) {
        const copy = {};
        Object.assign(copy, queries);
        copy[getQueryKey(query)] = query;
        setQueries(copy);
        setEditing(undefined);
        UserSettings((data) => (data.tiles = copy));
    }

    function removeTile(query: WeatherQuery) {
        const copy = {};
        Object.assign(copy, queries);
        delete copy[getQueryKey(query)];
        setQueries(copy);
        setEditing(undefined);
        UserSettings((data) => (data.tiles = copy));
    }

    function handleTileEdit(query: WeatherQuery) {
        removeTile(query);
        setEditing(query);
    }

    return (
        <div className="flex flex-wrap justify-center">
            <DynamicLiveTile />
            {Object.entries(queries).map(([keyName, query]) => {
                const behaviour: ButtonBehaviour = {
                    onRemove: () => removeTile(query),
                    onEdit: () => handleTileEdit(query),
                };
                return <LiveTile key={keyName} query={query} buttonBehaviour={behaviour} onConfigured={() => addNewTile(query)} />;
            })}
            <LiveTile query={{}} onConfigured={addNewTile} />
            {editing ? <TileConfigurator onQuerySubmit={(query) => query && addNewTile(query)} /> : <></>}
        </div>
    );
}
