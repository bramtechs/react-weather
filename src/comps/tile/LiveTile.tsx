import React, { useEffect } from 'react';
import { useState } from 'react';
import { WeatherQuery, getQueryKey, isQueryValid } from '../../api/WeatherTypes';
import { TileBackground, TileContainer } from './impl/TileContainer';
import { TileCreator } from './impl/TileCreator';
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
    const [iteration, setIteration] = useState(0);
    const [bgTheme, setBgTheme] = useState<TileBackground>(TileBackground.Unknown);

    useEffect(() => {
        if (results.data) {
            const bg = typeNameToTileBackground((results.data as CurrentResponse).weather[0].main);
            setBgTheme(bg);
        }
    }, [results]);

    function generateQueryKey() {
        return `live-info${getQueryKey(props.query)}-${iteration}`;
    }

    function handleRefresh() {
        setResults({ isLoading: true, error: undefined, data: undefined });
        setIteration(iteration + 1);
    }

    function getInnerContent() {
        if (isValidCurrentResponse(results.data)) {
            return <LiveTileInfo info={results.data as CurrentResponse} />;
        } else if (results.error) {
            return (
                <div>
                    <ErrorCircleFilled />
                    <p>{'Could not load weather info!'}</p>
                    {results.error ? <p>JSON.stringify(status.error)</p> : <></>}
                </div>
            );
        } else {
            return <ThreeDots />;
        }
    }

    const behaviour: ButtonBehaviour = {
        onRefresh: () => {
            handleRefresh();
            props.buttonBehaviour?.onRefresh?.();
        },
        onEdit: props.buttonBehaviour?.onEdit,
        onRemove: props.buttonBehaviour?.onEdit,
    };

    return (
        <TileContainer type={bgTheme}>
            {isQueryValid(props.query) ? (
                <>
                    <InfoFetcher queryKey={generateQueryKey()} fetchCall={() => searchWeather(props.query!)} onStatusChanged={setResults} />
                    <TileButtons className="scale-0 group-hover:scale-100 transition-all" behaviour={behaviour} />
                </>
            ) : (
                <></>
            )}
            {isQueryValid(props.query) ? getInnerContent() : <TileCreator onFormSubmit={props.onConfigured} />}
        </TileContainer>
    );
};
