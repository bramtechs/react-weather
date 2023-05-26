import { Location28Filled, LocationArrow32Filled } from '@fluentui/react-icons';
import React from 'react';
import { StyledButton } from '../../StyledButton';
import { GPSContext, GPSContextInterface } from '../GPSLiveTile';

export function LocationPrompter() {
    const gps = React.useContext<GPSContextInterface | undefined>(GPSContext);

    function handleLocationAcceptance() {
        if (gps) {
            gps.allowLocation();
            console.log('Allowed location sharing');
        }
    }

    return (
        <div>
            <Location28Filled />
            <p className="pb-5">
                Location access is required for
                <br />
                local weather info
            </p>
            <StyledButton onClick={handleLocationAcceptance}>Accept</StyledButton>
        </div>
    );
}
