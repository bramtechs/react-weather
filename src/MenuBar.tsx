import { AppState, AppStates } from "./App";
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

const MenuIcon = (props: { tooltip: string; icon: ReactElement<FluentIcon> }) => {
    return (
        <li className="group menu-icon">
            <div className="mb-1 invert">{props.icon}</div>
            <span className="group-hover:scale-100 menu-tooltip">{props.tooltip}</span>
        </li>
    );
};

export const MenuBar = (props: { curState: AppState }) => {
    return (
        <ul className="menu-bar">
            {AppStates.map((state) => (
                <MenuIcon tooltip={state} key={state} icon={_icons[state]} />
            ))}
        </ul>
    );
};
