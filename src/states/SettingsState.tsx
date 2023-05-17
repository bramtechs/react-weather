import { useState } from 'react';
import { FormDropdown } from "../comps/widgets/FormDropdown";
import { TempUnit, TempUnits, UserSettings } from '../storage/SettingsAbstractor';
import { StyledButton } from '../comps/StyledButton';
import { FormColorpicker } from '../comps/widgets/FormColorpicker';
import React from 'react';

export const SettingsState = (props: { onFormSubmit: () => void }) => {
    const [unit, setUnit] = useState<TempUnit>(UserSettings().unit);
    const [themeColor, setThemeColor] = useState<string>("#fffff");

    function sendForm() {
        UserSettings((s) => {
            s.unit = unit;
        });
        props.onFormSubmit();
    }

    function wipeTiles() {
        UserSettings((data) => (data.tiles = []));
        console.warn('Wiped tile config');
    }

    return (
        <div className="text-center">
            <FormDropdown name="Temperature Unit" value={unit} options={TempUnits} onChange={(u) => setUnit(u as TempUnit)}/>
            <FormColorpicker name="Sidebar color" value={themeColor} onChange={setThemeColor}/>
            <div className="flex w-full flex-grow justify-evenly">
                <StyledButton onClick={wipeTiles} theme='Red'>Reset tiles</StyledButton>
                <StyledButton onClick={sendForm}>Confirm</StyledButton>
            </div>
        </div>
    );
};
