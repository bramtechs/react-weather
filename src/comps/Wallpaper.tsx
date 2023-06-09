import React from 'react';
import { BackgroundTheme, BackgroundThemeCSS } from '../gfx/BackgroundThemes';

export function Wallpaper(props: { theme: BackgroundTheme }) {
    // TODO: this is scuffed
    return (
        <div className="fixed -left-[5%] -top-[5%] w-[105%] h-[105%] overflow-hidden -z-20">
            <div className={BackgroundThemeCSS[props.theme]}></div>
        </div>
    );
}
