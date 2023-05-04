import { useState } from "react";
import { FormDropdown } from "../comps/FormWidgets";
import { TempUnit, TempUnits, UserSettings } from "../storage/SettingsAbstractor";

export const SettingsState = (props: { onFormSubmit: () => void }) => {
    const [unit, setUnit] = useState<TempUnit>(UserSettings().unit);

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                UserSettings((s) => {
                    s.unit = unit;
                });
                props.onFormSubmit();
            }}
        >
            <FormDropdown name="Temperature Unit" value={unit} options={TempUnits} onChange={(u) => setUnit(u as TempUnit)}></FormDropdown>
            <input className="styled-button" type="submit"></input>
        </form>
    );
};
