import React from 'react';
import { ForecastPanel } from '../comps/forecast/ForecastPanel';
import { ForecastDropdown } from '../comps/forecast/ForecastDropdown';

export function ForecastState() {
    return <div>
        <ForecastDropdown />
        <ForecastPanel query={{ city: 'Bruges' }} />
    </div>;
}
