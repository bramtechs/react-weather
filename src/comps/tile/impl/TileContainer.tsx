import {ReactElement, useEffect, useState} from "react";

export enum TileBackground {
    Unknown,
    Clouds,
    Sunny,
    Rain,
}

const Gradients = {
    [TileBackground.Sunny]: [
        `tile-container scale-0 bg-[url('/tilesbg/sunshine.jpg')]`,
        `tile-container scale-1 bg-[url('/tilesbg/sunshine.jpg')]`,
    ],
    [TileBackground.Clouds]: [
        `tile-container scale-0 bg-[url('/tilesbg/clouds.jpg')]`,
        `tile-container scale-1 bg-[url('/tilesbg/clouds.jpg')]`
    ],
    [TileBackground.Rain]: [
        `tile-container scale-0 bg-[url('/tilesbg/rain.jpg')]`,
        `tile-container scale-1 bg-[url('/tilesbg/rain.jpg')]`
    ],
    [TileBackground.Unknown]: [
        `tile-container scale-0 from-gray-700 to-gray-400`,
        `tile-container scale-1 from-gray-700 to-gray-400`
    ],
};

// Background graphic to put weather info in
export const TileContainer = (props: { children: ReactElement | ReactElement[], type: TileBackground}) => {
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
