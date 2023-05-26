import React from 'react';
import { TileContainer } from './impl/TileContainer';
import { BackgroundTheme } from '../../gfx/BackgroundThemes';
import { LocationPrompter } from './gps/LocationPrompter';
import { LiveWeather, WeatherLocation } from '../../api/ext';
import { AllowedGPSLiveTile } from './gps/AllowedGPSLiveTile';
import { LiveTile } from './LiveTile';

export interface GPSContextInterface {
    allowLocation: () => void;
    provideQuery: (query: WeatherLocation) => void;
}
export const GPSContext = React.createContext<GPSContextInterface | undefined>(undefined);

export function GPSLiveTile() {
    const [allowed, setAllowed] = React.useState<boolean>(false);
    const [query, setQuery] = React.useState<WeatherLocation | undefined>(undefined);

    const [gps, setGPS] = React.useState<GPSContextInterface>({
        allowLocation: () => {
            setAllowed(true);
        },
        provideQuery(query) {
            setQuery(query);
        },
    });

    function getContainerContent() {
        if (allowed) {
            return query ? <LiveTile query={query} /> : <AllowedGPSLiveTile />;
        } else {
            return <LocationPrompter />;
        }
    }

    return (
        <GPSContext.Provider value={gps}>
            <TileContainer type={BackgroundTheme.Unknown}>{getContainerContent()}</TileContainer>
        </GPSContext.Provider>
    );
}
