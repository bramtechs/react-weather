import { useState } from 'react';
import { WeatherQueries, WeatherQuery, getQueryKey } from '../api/WeatherTypes';
import { LiveTile } from '../comps/tile/LiveTile';
import { DynamicLiveTile } from '../comps/tile/DynamicLiveTile';
import { UserSettings } from '../storage/SettingsAbstractor';
import { ButtonBehaviour } from '../comps/tile/impl/TileButtons';
import { TileConfigurator } from '../comps/tile/impl/TileConfigurator';
import { EmptyTile } from '../comps/tile/EmptyTile';
import React from 'react';

export function MainState() {
    const [queries, setQueries] = useState<WeatherQueries>(UserSettings().tiles);
    const [editing, setEditing] = useState<WeatherQuery | undefined>(undefined);

    function addNewTile(query?: WeatherQuery) {
        if (query) {
            const copy = {};
            Object.assign(copy, queries);
            copy[getQueryKey(query)] = query;
            setQueries(copy);
            UserSettings((data) => (data.tiles = copy));
        }
        setEditing(undefined);
    }

    function removeTile(query: WeatherQuery) {
        const copy = {};
        Object.assign(copy, queries);
        delete copy[getQueryKey(query)];
        setQueries(copy);
        UserSettings((data) => (data.tiles = copy));
        console.info(`Removed tile ${query.cityName}`);
    }

    function handleTileEdit(query: WeatherQuery) {
        removeTile(query);
        setEditing(query);
        console.info(`Editing tile ${query.cityName}`);
    }

    return (
        <div className="flex flex-wrap justify-center">
            <DynamicLiveTile />
            {Object.entries(queries).map(([keyName, query]) => {
                const behaviour: ButtonBehaviour = {
                    onRemove: () => removeTile(query),
                    onEdit: () => handleTileEdit(query),
                };
                return <LiveTile key={keyName} query={query} buttonBehaviour={behaviour} />;
            })}
            <EmptyTile onAddRequested={() => setEditing({})} />
            {editing ? <TileConfigurator onQuerySubmit={addNewTile} /> : <></>}
        </div>
    );
}
