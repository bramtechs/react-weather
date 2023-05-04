import { ReactElement, useEffect, useState } from "react";
import { DismissRegular } from "@fluentui/react-icons";

type PopupProps = {
    title: string;
    content: ReactElement;
    confirmText?: string;
    cancellable?: boolean;
    onConfirm: () => void;
    onCancel?: () => void;
};

export const Popup = (props: PopupProps) => {
    const [initialized, setInit] = useState<boolean>(false);
    useEffect(() => {
        setInit(true);
    }, [initialized]);

    return (
        <div className="cover text-black">
            <div className={initialized ? "scale-100 popup" : "scale-0 popup"}>
                <h3>{props.title}</h3>
                {props.content}
                <button onClick={props.onConfirm} className="popup-button styled-button">
                    {props.confirmText || "Confirm"}
                </button>
                {props.onCancel && <DismissRegular onClick={props.onCancel} className="popup-cancel" />}
            </div>
        </div>
    );
};
