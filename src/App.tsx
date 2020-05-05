import React, {useEffect, Suspense} from "react";
import {useThree, Canvas} from "react-three-fiber";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { Box }from "./simple/box/box"

const CameraController = () => {
    const {camera, gl} = useThree();
    useEffect(
        () => {
            const controls = new OrbitControls(camera, gl.domElement);
            controls.minDistance = 1
            controls.maxDistance = 10
            controls.enableKeys = false
            return () => {
                controls.dispose();
            }
        },
        [camera, gl]
    );
    return null;
}

function App() {
    return (
        <div style={{ height: window.innerHeight}}>
            <Canvas>
                <ambientLight/>
                <CameraController/>
                <Suspense fallback={null}>
                    <Box/>
                </Suspense>
            </Canvas>
        </div>
    );
}

export default App;
