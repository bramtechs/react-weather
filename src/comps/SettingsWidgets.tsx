export type DropdownChoice = {
    key: string;
    value: string;
};

function getEnumKeys(en: any) {
    return Object.keys(en).filter((item) => isNaN(Number(item)));
}

export const FormDropdown = (props: { target: string; displayName?: string; options: any; onChange: (choosen: DropdownChoice) => void }) => {
    return (
        <label>
            {props.displayName || props.target}
            <select onChange={(e) => props.onChange({ key: props.target, value: e.target.value })}>
                {getEnumKeys(props.options).map((o) => (
                    <option>{o}</option>
                ))}
            </select>
        </label>
    );
};
