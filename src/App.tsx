import React from 'react';
import { useState } from 'react';
import { SettingsState } from './states/SettingsState';
import { MenuBar } from './comps/MenuBar';
import { MainState } from './states/MainState';

export type AppState = 'Main' | 'Settings';
export const AppStates: AppState[] = ['Main', 'Settings'];

function App() {
    const [state, setState] = useState<AppState>('Main');

    return (
        <main className="pl-16 text-2xl m-3">
            <MenuBar curState={state} onStateChange={setState} />
            {state === 'Main' && <MainState />}
            {state === 'Settings' && (
                <SettingsState
                    onFormSubmit={() => {
                        setState('Main');
                    } }
                ></SettingsState>
            )}
        </main>
    );
}

export default App;
