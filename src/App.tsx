import React, { ReactElement, useState } from 'react';
import { SettingsState } from './states/SettingsState';
import { MenuBar } from './comps/MenuBar';
import { LiveState } from './states/LiveState';
import { HomeFilled, SettingsFilled } from '@fluentui/react-icons';
import { Wallpaper } from './comps/Wallpaper';
import { BackgroundTheme } from './gfx/BackgroundThemes';

export interface AppStateProperties {
    displayName?: string;
    icon: ReactElement;
    body: ReactElement;
}

export type AppState = 'Main' | 'Settings';
export const AppStates: Record<AppState, AppStateProperties> = {
    Main: { icon: <HomeFilled />, body: <LiveState /> },
    Settings: { icon: <SettingsFilled />, body: <SettingsState /> },
};

function App() {
    const [state, setState] = useState<AppState>('Main');

    return (
        <>
            <Wallpaper theme={BackgroundTheme.Clouds} />
            <main className="pl-16 text-2xl m-3">
                <MenuBar curState={state} onStateChange={setState} />
                {AppStates[state].body}
            </main>
        </>
    );
}

export default App;
