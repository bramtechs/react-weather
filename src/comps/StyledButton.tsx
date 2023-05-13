import React from "react";

export type ButtonColor = 'Red' | 'Blue';

function getStyle(col: ButtonColor) {
    switch (col) {
        case 'Red':
            return 'bg-red-700 hover:bg-red-500 text-white font-bold py-2 px-4 rounded';
        case 'Blue':
            return 'bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded';
    }
}

export const StyledButton = (props: { children?: string; theme?: ButtonColor; onClick?: () => void }) => {
    return (
        <button onClick={props.onClick} className={getStyle(props.theme || 'Blue')}>
            {props.children}
        </button>
    );
};
