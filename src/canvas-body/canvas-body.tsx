import React, {useState} from "react";
import {useThree} from "react-three-fiber";
import {Vector2, Object3D} from "three";

interface RaycasterStore {
    intersected?: Object3D
    setVector: (vector: Vector2) => void;
}

export const RaycasterContext = React.createContext<RaycasterStore>({
    setVector: (vector: Vector2) => {
    }
});

export const CanvasBody: React.FunctionComponent<{}> = (props) => {
    const {raycaster, camera, scene} = useThree();
    let [mouse, setMouse] = useState<Vector2>(new Vector2(50, 50));
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    const intersected = intersects.length > 0 && intersects[0]? intersects[0].object : undefined;
    console.log(intersected);
    return (
        <RaycasterContext.Provider value={{setVector: setMouse, intersected}}>
            {props.children}
        </RaycasterContext.Provider>
    );
}