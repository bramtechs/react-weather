import { ArrowSync24Filled, Delete32Regular, Edit32Regular } from '@fluentui/react-icons';
import React from 'react';

export interface ButtonBehaviour {
    onEdit?: () => void;
    onRemove?: () => void;
    onRefresh?: () => void;
}

export function TileButtons(props: { className: string; behaviour?: ButtonBehaviour }) {
    return (
        <div className="absolute top-5 right-5 scale-0 group-hover:scale-100">
            <div className={props.className}>
                {props.behaviour?.onEdit ? <Edit32Regular onClick={props.behaviour.onEdit} className={'mr-2'} /> : <></>}
                {props.behaviour?.onRemove ? <Delete32Regular onClick={props.behaviour.onRemove} style={{ color: 'tomato' }} /> : <></>}
                {props.behaviour?.onRefresh ? <ArrowSync24Filled onClick={props.behaviour.onRefresh} className={'ml-2'} /> : <></>}
            </div>
        </div>
    );
}
