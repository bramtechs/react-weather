import { AddFilled } from '@fluentui/react-icons';
import React from 'react';
import { TileContainer } from './impl/TileContainer';
import { BackgroundTheme } from '../../gfx/BackgroundThemes';

export function EmptyTile(props: { onAddRequested: () => void }) {
    return (
        <TileContainer type={BackgroundTheme.Unknown}>
            <div className="flex flex-col items-center justify-center w-full h-full" onClick={() => props.onAddRequested()}>
                <AddFilled />
            </div>
        </TileContainer>
    );
}
