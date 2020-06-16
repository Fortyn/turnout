import React, {useEffect, Suspense, useRef} from "react";
import {Redirect} from "react-router";
import {useThree, Canvas} from "react-three-fiber";
import {Vector3, AxesHelper} from "three";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {CanvasBody} from "./canvas-body/canvas-body";
import {Scale} from "./common/geometry";
import {LocationProvider} from "./geolocation/location-provider";
import {GroundFloor} from "./ground-floor/ground-floor";
import httpClientService from "./security/http-client.service";
import localStorageHelperService from "./security/local-storage-helper-service";
import {Direction} from "./simple/direction";
import {Room, RoomDefinition} from "./simple/room/room"

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

const App: React.FunctionComponent<{}> = props => {

    const boxProps: RoomDefinition = {
        lbc: {
            x: 0,
            z: 0
        },
        rtc: {
            x: 30,
            z: 20
        },
        walls: [
            {
                direction: Direction.front,
                doors: []
            },
            {
                direction: Direction.left,
                doors: []
            },
            {
                direction: Direction.back,
                doors: []
            },
            {
                direction: Direction.right,
                doors: [
                    {
                        center: {
                            x: 7,
                            z: 20
                        }
                    },
                    {
                        center: {
                            x: 20,
                            z: 20
                        }
                    }
                ]
            }
        ]
    };
    useEffect(() => {
        httpClientService
            .get("/protected/rooms")
            .then(response => console.log(response.data));
    },[])
    if(localStorageHelperService.getUserInfo() === null) {
        return <Redirect to={"/login"}/>;
    }
    return (
        <div style={{height: window.innerHeight * 0.97}}>
            <LocationProvider/>
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
                        </GroundFloor>
                    </CanvasBody>
                </Suspense>
            </Canvas>
        </div>
    );
}

export default App;
