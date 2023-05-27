import React, { ReactElement, useState } from 'react';
import { SettingsState } from './states/SettingsState';
import { MenuBar } from './comps/MenuBar';
import { LiveState } from './states/LiveState';
import {
    ChartMultiple24Filled,
    HandWave24Filled,
    HomeFilled,
    Map24Filled,
    SettingsFilled,
} from '@fluentui/react-icons';
import { Wallpaper } from './comps/Wallpaper';
import { BackgroundTheme } from './gfx/BackgroundThemes';
import { ForecastState } from './states/ForecastState';
import { WelcomeState } from './states/WelcomeState';

export interface AppStateProperties {
    displayName?: string;
    icon: ReactElement;
    body: ReactElement;
}

export const AppStates: Record<string, AppStateProperties> = {
    Welcome: { icon: <HandWave24Filled />, body: <WelcomeState /> },
    Home: { icon: <HomeFilled />, body: <LiveState /> },
    Forecast: { icon: <ChartMultiple24Filled />, body: <ForecastState /> },
    Map: { icon: <Map24Filled />, body: <div>display an openstreetmap with all your pinned locations</div> },
    Settings: { icon: <SettingsFilled />, body: <SettingsState /> },
};

function App() {
    const [state, setState] = useState<string>('Welcome');

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
