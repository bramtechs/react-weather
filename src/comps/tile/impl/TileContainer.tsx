import { ReactElement, useEffect, useState } from 'react';

export enum TileBackground {
    Unknown,
    Clouds,
    Sunny,
    Rain,
}

const Gradients = {
    [TileBackground.Sunny]: `tile-background bg-[url('/tilesbg/sunshine.jpg')]`,
    [TileBackground.Clouds]: `tile-background bg-[url('/tilesbg/clouds.jpg')]`,
    [TileBackground.Rain]: `tile-background bg-[url('/tilesbg/rain.jpg')]`,
    [TileBackground.Unknown]: `tile-background from-gray-700 to-gray-400`,
};

// Background graphic to put weather info in
export const TileContainer = (props: { children: ReactElement | ReactElement[]; type: TileBackground }) => {
    const [started, setStarted] = useState<boolean>(false);

    useEffect(() => {
        setStarted(true);
    }, []);

    return (
        <div className={started ? 'relative tile-container scale-1' : 'relative tile-container scale-0'}>
            <div className={Gradients[props.type]}></div>
            {props.children}
        </div>
    );
};
