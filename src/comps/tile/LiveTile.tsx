import React from 'react';
import { useState } from 'react';
import { WeatherQuery, getQueryKey, isQueryValid } from '../../api/WeatherTypes';
import { TileBackground, TileContainer } from './impl/TileContainer';
import { WeatherEntryCreator } from './impl/TileCreator';
import { LiveTileInfo } from './impl/LiveTileInfo';
import { ThreeDots } from 'react-loading-icons';
import { ErrorCircleFilled } from '@fluentui/react-icons';
import { searchWeather } from '../../api/WeatherApi';
import { CurrentResponse } from 'openweathermap-ts/dist/types';
import { typeNameToTileBackground } from '../../api/WeatherUtils';
import { FetchResult, InfoFetcher } from '../utils/InfoFetcher';
import { TileButtons, ButtonBehaviour } from './impl/TileButtons';

export function isValidCurrentResponse(data: CurrentResponse | any): boolean {
    if (data) {
        const cur = data as CurrentResponse;
        return cur && cur.cod === 200;
    }
    return false;
}

export interface LiveTileProps {
    query: WeatherQuery;
    onConfigured: (query: WeatherQuery) => void;
    buttonBehaviour?: ButtonBehaviour;
}

export const LiveTile = (props: LiveTileProps) => {
    const [results, setResults] = useState<FetchResult>({});

    function getInnerContent() {
        if (isValidCurrentResponse(results.data)) {
            return <LiveTileInfo info={results.data as CurrentResponse} />;
        } else if (results.isLoading) {
            return <ThreeDots />;
        } else {
            return (
                <div>
                    <ErrorCircleFilled />
                    <p>{'Could not load weather info!'}</p>
                    {results.error ? <p>JSON.stringify(status.error)</p> : <></>}
                </div>
            );
        }
    }

    return (
        <TileContainer
            type={
                isValidCurrentResponse(results.data)
                    ? typeNameToTileBackground((results.data as CurrentResponse).weather[0].main)
                    : TileBackground.Unknown
            }
        >
            <TileButtons className="scale-0 group-hover:scale-100 transition-all" behaviour={props.buttonBehaviour} />
            {isQueryValid(props.query) ? (
                <InfoFetcher
                    queryKey={'live-info' + getQueryKey(props.query)}
                    fetchCall={() => searchWeather(props.query!)}
                    onStatusChanged={setResults}
                />
            ) : (
                <></>
            )}
            {isQueryValid(props.query) ? getInnerContent() : <WeatherEntryCreator onFormSubmit={props.onConfigured} />}
        </TileContainer>
    );
};
