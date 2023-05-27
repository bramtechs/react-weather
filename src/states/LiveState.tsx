import { useState } from 'react';
import { WeatherQueries, getLocationKey } from '../api/WeatherTypes';
import { LiveTile } from '../comps/tile/LiveTile';
import { UserSettings } from '../storage/SettingsAbstractor';
import { ButtonBehaviour } from '../comps/tile/impl/TileButtons';
import { TileConfigurator } from '../comps/tile/impl/TileConfigurator';
import { EmptyTile } from '../comps/tile/EmptyTile';
import { WeatherLocation } from '../api/ext';
import { GPSLiveTile } from '../comps/tile/GPSLiveTile';
import React from 'react';

export function LiveState() {
    const [queries, setQueries] = useState<WeatherQueries>(UserSettings().tiles);
    const [editing, setEditing] = useState<WeatherLocation | undefined>(undefined);

    function addNewTile(query?: WeatherLocation) {
        if (query) {
            const copy = {};
            Object.assign(copy, UserSettings().tiles);
            copy[getLocationKey(query)] = query;
            setQueries(copy);
            UserSettings((data) => (data.tiles = copy));
            console.log(`Added new tile ${query?.city}`);
        }
    }

    function removeTile(query: WeatherLocation) {
        const copy = {};
        Object.assign(copy, UserSettings().tiles);
        delete copy[getLocationKey(query)];
        UserSettings((data) => (data.tiles = copy));
        setQueries(copy);
        console.info(`Removed tile ${query.city}`);
    }

    function handleTileEdit(query: WeatherLocation) {
        setEditing(query);
        console.info(`Editing tile ${query.city}`);
    }

    function processTileConfig(query?: WeatherLocation) {
        if (query) {
            if (editing?.city || editing?.coords) {
                removeTile(editing);
            }
            addNewTile(query);
        } else {
            console.log('Cancelled edit');
        }
        setEditing(undefined);
    }

    return (
        <div className="flex flex-wrap justify-center">
            <GPSLiveTile />
            {Object.entries(queries).map(([keyName, query]) => {
                const behaviour: ButtonBehaviour = {
                    onRemove: () => removeTile(query),
                    onEdit: () => handleTileEdit(query),
                };
                return <LiveTile key={keyName} query={query} buttonBehaviour={behaviour} />;
            })}
            <EmptyTile onAddRequested={() => setEditing({})} />
            {editing ? <TileConfigurator query={editing} onQuerySubmit={processTileConfig} /> : <></>}
        </div>
    );
}
