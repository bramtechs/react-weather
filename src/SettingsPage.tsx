import { useState } from "react";
import { FormDropdown } from "./comps/SettingsWidgets";
import { _defaultButtonStyle, _defaultTextStyle } from "./gfx/GlobalStyler";
import { TempUnit, TempUnits, UserSettings } from "./storage/SettingsAbstractor";

export const SettingsPage = (props: { onFormSubmit: () => void }) => {
    const [unit, setUnit] = useState<TempUnit>(UserSettings().unit);

    return (
        <form
            className={_defaultTextStyle}
            onSubmit={(e) => {
                e.preventDefault();
                UserSettings((s) => {
                    s.unit = unit;
                });
                props.onFormSubmit();
            }}
        >
            <FormDropdown name="Temperature Unit" value={unit} options={TempUnits} onChange={(u) => setUnit(u as TempUnit)}></FormDropdown>
            <input className={_defaultButtonStyle} type="submit"></input>
        </form>
    );
};
