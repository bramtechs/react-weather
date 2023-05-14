import { useEffect, useState } from 'react';
import { WeatherQuery } from '../../../api/WeatherTypes';
import { AddFilled } from '@fluentui/react-icons';
import React from 'react';
import { WeatherEntryPopup } from './TileConfigurator';

export function TileCreator(props: { onFormSubmit: (query: WeatherQuery) => void }) {
    const [prompting, setPrompting] = useState<boolean>(false);

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
            {prompting ? <WeatherEntryPopup onQuerySubmit={handleQueryUpdate} /> : <></>}
        </>
    );
}