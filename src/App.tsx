import React, {useEffect, Suspense, useRef} from "react";
import {useThree, Canvas} from "react-three-fiber";
import {Vector3, AxesHelper, Raycaster} from "three";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {CanvasBody} from "./canvas-body/canvas-body";
import {GroundFloor} from "./ground-floor/ground-floor";
import {Box} from "./simple/box/box"

const CameraController = () => {
    const {camera, gl} = useThree();
    useEffect(
        () => {
            const controls = new OrbitControls(camera, gl.domElement);
            controls.minDistance = 1
            controls.maxDistance = 100
            controls.enableKeys = false
            controls.enablePan = false
            controls.target.set(50, 0, 50);
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

    const boxProps = {
        lbc: {
            x: 30,
            z: 0
        },
        rtc: {
            x: 0,
            z: 20
        }
    }
    const boxProps0 = {
        lbc: {
            x: 50,
            z: 0
        },
        rtc: {
            x: 35,
            z: 20
        }
    }
    return (
        <div style={{height: window.innerHeight*0.97}}>
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
                        <CanvasBody>
                            <GroundFloor>
                                <Box {...boxProps}/>
                                <Box {...boxProps0}/>
                            </GroundFloor>
                        </CanvasBody>
                    </Suspense>
                </Canvas>
        </div>
    );
}

export default App;
