import React, { useEffect, useState } from 'react';
import { getLocationKey, weatherLocationToString } from '../../api/WeatherTypes';
import { TileContainer } from './impl/TileContainer';
import { LiveTileInfo } from './impl/LiveTileInfo';
import { ThreeDots } from 'react-loading-icons';
import { ErrorCircleFilled } from '@fluentui/react-icons';
import { searchWeather } from '../../api/WeatherApi';
import { FetchResult, InfoFetcher } from '../utils/InfoFetcher';
import { TileButtons, ButtonBehaviour } from './impl/TileButtons';
import { BackgroundTheme, typeNameToTileBackground } from '../../gfx/BackgroundThemes';
import { LiveWeather, WeatherLocation } from '../../api/ext';
import { TileWarnings } from './impl/TileWarnings';

export interface LiveTileProps {
    query: WeatherLocation;
    buttonBehaviour?: ButtonBehaviour;
}

export const LiveTile = (props: LiveTileProps) => {
    const [results, setResults] = useState<FetchResult>({});
    const [iteration, setIteration] = useState(0);
    const [bgTheme, setBgTheme] = useState<BackgroundTheme>(BackgroundTheme.Unknown);

    function parseWeatherType(data: any) {
        const cur = data as LiveWeather;
        return cur.weather?.[0].main !== undefined ? cur.weather[0].main : 'Unknown';
    }

    useEffect(() => {
        if (results.data) {
            const bg = typeNameToTileBackground(parseWeatherType(results.data));
            setBgTheme(bg);
        }
    }, [results]);

    function generateQueryKey() {
        return `live-info-${getLocationKey(props.query)}-${iteration}`;
    }

    function handleRefresh() {
        setResults({ isLoading: true, error: undefined, data: undefined });
        setIteration(iteration + 1);
    }

    function getInnerContent() {
        if ((results?.data as any)?.cod == 200) {
            return <LiveTileInfo info={results.data as LiveWeather} />;
        } else if (results.isLoading) {
            return <ThreeDots />;
        } else if ((results?.data as any)?.cod === 404) {
            return <p>Could not find {weatherLocationToString(props.query)}</p>;
        } else {
            return (
                <div>
                    <ErrorCircleFilled />
                    <p>{'Could not load weather info!'}</p>
                    <p>{results.error ? JSON.stringify(results.error) : (results.data as string)}</p>
                </div>
            );
        }
    }

    const behaviour: ButtonBehaviour = {
        onRefresh: () => {
            handleRefresh();
            props.buttonBehaviour?.onRefresh?.();
        },
        onEdit: props.buttonBehaviour?.onEdit,
        onRemove: props.buttonBehaviour?.onRemove,
    };

    return (
        <TileContainer type={bgTheme}>
            <InfoFetcher
                queryKey={generateQueryKey()}
                fetchCall={() => searchWeather(props.query!)}
                onStatusChanged={setResults}
            />
            <TileButtons className="scale-0 group-hover:scale-100 transition-all" behaviour={behaviour} />
            {results.data ? <TileWarnings info={results.data as LiveWeather} /> : <></>}
            {getInnerContent()}
        </TileContainer>
    );
};
