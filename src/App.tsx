import React, {useEffect, Suspense} from "react";
import {useThree, Canvas} from "react-three-fiber";
import {Vector3, AxesHelper} from "three";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {CanvasBody} from "./canvas-body/canvas-body";
import {Scale} from "./common/scale";
import {GroundFloor} from "./ground-floor/ground-floor";
import {Direction} from "./simple/direction";
import {Room} from "./simple/room/room"

const CameraController = () => {
    const {camera, gl} = useThree();
    useEffect(
        () => {
            const controls = new OrbitControls(camera, gl.domElement);
            controls.minDistance = 1
            controls.maxDistance = 100
            controls.enableKeys = false
            controls.enablePan = false
            controls.target.set(
                Scale.groundFloor.x / 2,
                Scale.groundFloor.y / 2,
                Scale.groundFloor.z / 2
            );
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
        },
        walls: [
            {
                direction: Direction.left
            },
            {
                direction: Direction.front
            },
            {
                direction: Direction.back
            },
            {
                direction: Direction.right
            }
        ]
    }
    const boxProps0 = {
        lbc: {
            x: 50,
            z: 0
        },
        rtc: {
            x: 30,
            z: 20
        },
        walls: [
            {
                direction: Direction.left
            },
            {
                direction: Direction.front
            },
            {
                direction: Direction.back
            },
            {
                direction: Direction.right
            }
        ]
    }
    return (
        <div style={{height: window.innerHeight * 0.97}}>
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
                            <Room {...boxProps}/>
                            <Room {...boxProps0}/>
                        </GroundFloor>
                    </CanvasBody>
                </Suspense>
            </Canvas>
        </div>
    );
}

export default App;
