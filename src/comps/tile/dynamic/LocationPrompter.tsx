import { Location28Filled, LocationArrow32Filled } from '@fluentui/react-icons';
import React from 'react';
import { StyledButton } from '../../StyledButton';

export function LocationPrompter(props: { onAccept: () => void }) {
    return (
        <div>
            <Location28Filled />
            <p className="pb-5">
                Location access is required for
                <br />
                local weather info
            </p>
            <StyledButton onClick={props.onAccept}>Accept</StyledButton>
        </div>
    );
}
