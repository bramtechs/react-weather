import {ReactElement} from "react";

export enum TileBackground {
    Unknown,
    Clouds,
    Sunny,
}

const Gradients = {
    [TileBackground.Sunny]: `tile-container from-sky-400 to-sky-300`,
    [TileBackground.Clouds]: `tile-container from-gray-400 to-gray-300`,
    [TileBackground.Unknown]: `tile-container from-gray-300 to-gray-200`,
};

// Background graphic to put weather info in
export const TileContainer = (props: { children: ReactElement[], type: TileBackground}) => {
    return (
        <div className={Gradients[props.type]}>
            {props.children}
        </div>
    );
};
