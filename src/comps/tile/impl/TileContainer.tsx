import React from 'react';
import { ReactElement, useEffect, useState } from 'react';

export enum TileBackground {
    Unknown,
    Clouds,
    Sunny,
    Rain,
}

const Gradients = {
    [TileBackground.Sunny]: `absolute left-0 top-0 w-full h-full -z-10 rounded-2xl bg-slate-600 blur-sm bg-[url('/tilesbg/sunshine.jpg')]`,
    [TileBackground.Clouds]: `absolute left-0 top-0 w-full h-full -z-10 rounded-2xl bg-slate-600 blur-sm bg-[url('/tilesbg/clouds.jpg')]`,
    [TileBackground.Rain]: `absolute left-0 top-0 w-full h-full -z-10 rounded-2xl bg-slate-600 blur-sm bg-[url('/tilesbg/rain.jpg')]`,
    [TileBackground.Unknown]: `absolute left-0 top-0 w-full h-full -z-10 rounded-2xl bg-slate-600 blur-sm from-gray-700 to-gray-400`,
};

// Background graphic to put weather info in
export const TileContainer = (props: { children: ReactElement | ReactElement[]; type: TileBackground }) => {
    const [started, setStarted] = useState<boolean>(false);

    useEffect(() => {
        setStarted(true);
    }, []);

    const startedCss =
        'relative flex justify-center border-slate-500/80 border-4 border-solid items-center flex-grow m-2 min-w-[40%] h-[20rem] text-center rounded-2xl bg-gradient-to-t text-white dark:text-black font-bold transition-all scale-1';
    const stoppedCss =
        'relative flex justify-center border-slate-500/0 border-4 border-solid items-center flex-grow m-2 min-w-[40%] h-[20rem] text-center rounded-2xl bg-gradient-to-t text-white dark:text-black font-bold transition-all scale-0';

    return (
        <div className={started ? startedCss : stoppedCss}>
            <div className={Gradients[props.type]}></div>
            {props.children}
        </div>
    );
};
