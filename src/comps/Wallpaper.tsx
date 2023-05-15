import React from 'react';
import { BackgroundTheme, BackgroundThemeCSS } from '../gfx/BackgroundThemes';

export function Wallpaper(props: { theme: BackgroundTheme }) {
    return (
        <div className="">
            <div className={BackgroundThemeCSS[props.theme]}></div>
        </div>
    );
}
