import React, { ReactElement, useEffect, useState } from 'react';
import { BackgroundTheme, BackgroundThemeCSS } from '../../../gfx/BackgroundThemes';

// Background graphic to put weather info in
export const TileContainer = (props: { children: ReactElement | ReactElement[]; type: BackgroundTheme }) => {
    const [started, setStarted] = useState<boolean>(false);

    useEffect(() => {
        setStarted(true);
    }, []);

    const startedCss =
        'group relative select-none flex justify-center border-slate-500/80 border-4 border-solid items-center m-2 min-w-[40rem] h-[20rem] text-center rounded-2xl bg-gradient-to-t text-white dark:text-black font-bold transition-all scale-1';
    const stoppedCss =
        'group relative select-none flex justify-center border-slate-500/0  border-4 border-solid items-center m-2 min-w-[40rem] h-[20rem] text-center rounded-2xl bg-gradient-to-t text-white dark:text-black font-bold transition-all scale-0';

    return (
        <div className={started ? startedCss : stoppedCss}>
            <div className={BackgroundThemeCSS[props.type]}></div>
            {props.children}
        </div>
    );
};
