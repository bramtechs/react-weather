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

    const [gps, _] = React.useState<GPSContextInterface>({
        allowLocation: () => {
            setAllowed(true);
        },
        provideQuery(query) {
            setQuery(query);
        },
    });

    return (
        <GPSContext.Provider value={gps}>
            {query ? (
                <LiveTile query={query} />
            ) : (
                <TileContainer type={BackgroundTheme.Unknown}>
                    {allowed ? <AllowedGPSLiveTile /> : <LocationPrompter />}
                </TileContainer>
            )}
        </GPSContext.Provider>
    );
}
