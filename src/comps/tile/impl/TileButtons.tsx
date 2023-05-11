import { Delete32Regular, Edit32Regular } from '@fluentui/react-icons';
import React from 'react';

export interface TileButtonsProps {
    className?: string;
    onEdit?: () => void;
    onRemove?: () => void;
}

export function TileButtons(props: TileButtonsProps) {
    return (
        <div className="absolute top-5 right-5 scale-0 group-hover:scale-100">
            <div className={props.className}>
                <Edit32Regular onClick={props.onEdit} className={'mr-2'} />
                <Delete32Regular onClick={props.onRemove} style={{ color: 'tomato' }} />
            </div>
        </div>
    );
}
