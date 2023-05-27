import React, { useState } from 'react';
import { FetchResult, InfoFetcher } from '../utils/InfoFetcher';
import { searchWeatherForecast } from '../../api/WeatherApi';
import { ThreeHourResponse, WeatherLocation } from '../../api/ext';
import { ThreeDots } from 'react-loading-icons';
import { weatherLocationToString } from '../../api/WeatherTypes';
import { ErrorCircleFilled } from '@fluentui/react-icons';
import { ForecastPanelInfo } from './ForecastPanelInfo';

export function ForecastPanel(props: { query: WeatherLocation }) {
    const [results, setResults] = useState<FetchResult>({});

    function getInnerContent() {
        if ((results?.data as any)?.cod == 200) {
            return <ForecastPanelInfo forecast={results.data as ThreeHourResponse} />;
        } else if (results.isLoading) {
            return <ThreeDots />;
        } else if ((results?.data as any)?.cod == 404) {
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

    return (
        <div>
            <InfoFetcher
                queryKey="forecast-info"
                fetchCall={() => searchWeatherForecast(props.query)}
                onStatusChanged={setResults}
            />
            {getInnerContent()}
        </div>
    );
}
