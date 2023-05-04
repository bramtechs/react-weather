import { AppState, AppStates } from "../App";
import { ReactElement } from "react";
import { HomeFilled, SettingsFilled } from "@fluentui/react-icons";
import { FluentIcon } from "@fluentui/react-icons/lib/utils/createFluentIcon";

type StateIcons = {
    [key in AppState]: ReactElement<FluentIcon>;
};

const _icons: StateIcons = {
    Main: <HomeFilled />,
    Settings: <SettingsFilled />,
};

type MenuIconProps = { isOpen?: boolean; tooltip: string; onClick: () => void; icon: ReactElement<FluentIcon> };

const MenuIcon = (props: MenuIconProps) => {
    return (
        <li onClick={props.onClick} className={props.isOpen ? "group menu-icon bg-blue-300" : "group menu-icon"}>
            <div className="mb-1 invert">{props.icon}</div>
            <span className="group-hover:scale-100 menu-tooltip">{props.tooltip}</span>
        </li>
    );
};

export const MenuBar = (props: { curState: AppState; onStateChange?: (state: AppState) => void }) => {
    return (
        <ul className="menu-bar">
            {AppStates.map((state) => (
                <MenuIcon
                    key={state}
                    isOpen={state === props.curState}
                    tooltip={state}
                    onClick={() => {
                        props.onStateChange && props.onStateChange(state);
                    }}
                    icon={_icons[state]}
                />
            ))}
        </ul>
    );
};
