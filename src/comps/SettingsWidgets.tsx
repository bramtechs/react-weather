import { useState } from "react";

export const FormDropdown = (props: { name: string; value: string; options: string[]; onChange: (choosen: string) => void }) => {
    return (
        <label>
            {props.name}
            <select
                onChange={(e) => {
                    props.onChange(e.target.value);
                }}
            >
                {props.options.map((o) => (
                    <option key={o} selected={props.value === o}>
                        {o}
                    </option>
                ))}
            </select>
        </label>
    );
};
