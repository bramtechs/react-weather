import { useEffect, useState } from 'react';
import { WeatherQuery } from '../../../api/WeatherTypes';
import { AddFilled } from '@fluentui/react-icons';
import { TileConfigurator } from './TileConfigurator';
import React from 'react';

export function TileCreator(props: { query?: WeatherQuery; onFormSubmit: (query: WeatherQuery) => void; }) {
    const [prompting, setPrompting] = useState<boolean>(props.query !== undefined);

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
            {prompting ? <TileConfigurator query={props.query} onQuerySubmit={handleQueryUpdate} /> : <></>}
        </>
    );
}