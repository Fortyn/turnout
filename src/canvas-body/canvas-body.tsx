import React, {useState} from "react";

interface CanvasStore {}

export const CanvasContext = React.createContext<CanvasStore>({});

export const CanvasBody: React.FunctionComponent<{}> = (props) => {
    const [bool, setBool] = useState(false);

    return (
        <CanvasContext.Provider value={bool}>
            {props.children}
        </CanvasContext.Provider>
    );
}