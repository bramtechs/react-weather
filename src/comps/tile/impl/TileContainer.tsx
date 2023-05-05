import {ReactElement, useEffect, useState} from "react";

export enum TileBackground {
    Unknown,
    Clouds,
    Sunny,
}

const Gradients = {
    [TileBackground.Sunny]: [
        `tile-container scale-0 from-sky-400 to-sky-300`,
        `tile-container scale-1 from-sky-400 to-sky-300`,
    ],
    [TileBackground.Clouds]: [
        `tile-container scale-0 from-gray-400 to-gray-300`,
        `tile-container scale-1 from-gray-400 to-gray-300`
    ],
    [TileBackground.Unknown]: [
        `tile-container scale-0 from-gray-300 to-gray-200`,
        `tile-container scale-1 from-gray-300 to-gray-200`
    ],
};

// Background graphic to put weather info in
export const TileContainer = (props: { children: ReactElement[], type: TileBackground}) => {
    const [started, setStarted] = useState<boolean>(false);

    useEffect(() => {
        setStarted(true);
    },[])

    return (
        <div className={Gradients[props.type][started?1:0]}>
            {props.children}
        </div>
    );
};
