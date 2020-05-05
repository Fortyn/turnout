import React, {useEffect, Suspense} from "react";
import {useThree, Canvas} from "react-three-fiber";
import {Vector3, AxesHelper} from "three";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {Box} from "./simple/box/box"

const CameraController = () => {
    const {camera, gl} = useThree();
    console.log(camera);
    useEffect(
        () => {
            const controls = new OrbitControls(camera, gl.domElement);
            controls.minDistance = 1
            controls.maxDistance = 100
            controls.enableKeys = false
            controls.enablePan = false
            controls.target.set(50,0,50);
            controls.update();
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
        <div style={{height: window.innerHeight}}>
            <Canvas
                camera={{
                    fov: 100,
                    position: new Vector3(-50, 50, 50),
                }}
            >
                <ambientLight/>
                <CameraController/>
                <primitive object={new AxesHelper(110)}/>
                <Suspense fallback={null}>
                    <Box/>
                </Suspense>
            </Canvas>
        </div>
    );
}

export default App;
