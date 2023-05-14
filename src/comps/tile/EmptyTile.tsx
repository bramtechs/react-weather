import { AddFilled } from '@fluentui/react-icons';
import React from 'react';
import { TileContainer } from './impl/TileContainer';
import { TileBackground } from './impl/TileContainer';

export function EmptyTile(props: { onAddRequested: () => void }) {
    return (
        <TileContainer type={TileBackground.Unknown}>
            <div className="flex flex-col items-center justify-center w-full h-full" onClick={() => props.onAddRequested()}>
                <AddFilled />
            </div>
        </TileContainer>
    );
}
