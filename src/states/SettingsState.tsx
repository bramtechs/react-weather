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
        <div className="text-center">
            <FormDropdown name="Temperature Unit" value={unit} options={TempUnits} onChange={(u) => setUnit(u as TempUnit)}></FormDropdown>
            <div className="flex w-full flex-grow justify-evenly">
                <button onClick={wipeTiles} className="styled-button bg-red-500 hover:bg-red-300">Reset tiles</button>
                <button onClick={sendForm} className="styled-button">Confirm</button>
            </div>
        </div>
    );
};
