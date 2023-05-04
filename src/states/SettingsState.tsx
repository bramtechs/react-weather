import { useState } from "react";
import { FormDropdown } from "../comps/FormWidgets";
import { TempUnit, TempUnits, UserSettings } from "../storage/SettingsAbstractor";

export const SettingsState = (props: { onFormSubmit: () => void }) => {
    const [unit, setUnit] = useState<TempUnit>(UserSettings().unit);

    function sendForm(){
        UserSettings((s) => {
            s.unit = unit;
        });
        props.onFormSubmit();
    }

    function wipeTiles(){
        UserSettings((data) => data.tiles = []);
        console.warn("Wiped tile config");
    }

    return (
        <div>
            <FormDropdown name="Temperature Unit" value={unit} options={TempUnits} onChange={(u) => setUnit(u as TempUnit)}></FormDropdown>
            <button onClick={wipeTiles} className="styled-button bg-red-500 hover:bg-red-300">Reset tiles</button>
            <button onClick={sendForm} className="styled-button">Confirm</button>
        </div>
    );
};
