import React from "react";

interface CanvasStore {
    selectRoom: (id: number) => void;
    selectedRoomId: number;
}

export const CanvasContext = React.createContext<CanvasStore>({
    selectRoom: () => {},
    selectedRoomId: 0
});

export const CanvasBody: React.FunctionComponent<CanvasStore> = (props) => {
    return (
        <CanvasContext.Provider value={props}>
            {props.children}
        </CanvasContext.Provider>
    );
}