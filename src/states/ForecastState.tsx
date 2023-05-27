import React from 'react';
import { ForecastPanel } from '../comps/forecast/ForecastPanel';

export function ForecastState() {
    return <div>{<ForecastPanel query={{ city: 'Bruges' }} />}</div>;
}
