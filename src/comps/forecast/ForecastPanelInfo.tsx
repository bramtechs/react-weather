import { ThreeHourResponse } from '../../api/ext';
import React from 'react';

export function ForecastPanelInfo(props: { forecast: ThreeHourResponse }) {
    return <pre>{JSON.stringify(props.forecast, undefined, 2)}</pre>;
}
