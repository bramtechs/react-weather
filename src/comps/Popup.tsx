import { ReactElement, useEffect, useState } from "react";

type PopupProps = {
    title: string;
    content: ReactElement;
    confirmText?: string;
};

export const Popup = (props: PopupProps) => {
    const [initialized, setInit] = useState<boolean>(false);
    useEffect(() => {
        setInit(true);
    }, [initialized]);

    return (
        <div className="cover">
            <div className={initialized ? "scale-100 popup" : "scale-0 popup"}>{props.content}</div>
        </div>
    );
};
