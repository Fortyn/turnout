import withStyles from "@material-ui/core/styles/withStyles";
import React, {Suspense, useState, useEffect} from "react";
import {withRouter, RouteComponentProps} from "react-router";
import {Canvas} from "react-three-fiber";
import {Vector3} from "three";
import {CameraController} from "./camera-controller/camera-controller";
import {CanvasBody} from "./canvas-body/canvas-body";
import {Scale} from "./common/geometry";
import {LocationProvider} from "./geolocation/location-provider";
import {GroundFloor} from "./ground-floor/ground-floor";
import httpClientService from "./security/http-client.service";
import localStorageHelperService from "./security/local-storage-helper-service";
import {Direction} from "./simple/direction";
import {Room, RoomDefinition} from "./simple/room/room"
import {styles, Style} from "./styles";

const defaultTarget = new Vector3(
    Scale.groundFloor.x / 2,
    Scale.groundFloor.y / 2,
    Scale.groundFloor.z / 2,
)
type Props = RouteComponentProps & Style;
const App: React.FunctionComponent<Props> = props => {
    const {classes} = props;
    const [selectedRoomId, selectRoom] = useState<number>(0);
    const boxProps: RoomDefinition = {
        id: 1,
        identifier: "321",
        lbc: {
            x: 0,
            z: 0
        },
        rtc: {
            x: 70,
            z: 50
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
                            x: 30,
                            z: 20
                        }
                    }
                ]
            }
        ]
    };
    const boxProps2: RoomDefinition = {
        id: 2,
        identifier: "322",
        lbc: {
            x: 150,
            z: 50
        },
        rtc: {
            x: 70,
            z: 0
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
                            x: 100,
                            z: 50
                        }
                    }
                ]
            }
        ]
    };
    const boxProps3: RoomDefinition = {
        id: 3,
        identifier: "323",
        lbc: {
            x: 250,
            z: 50
        },
        rtc: {
            x: 300,
            z: 150
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
                doors: [
                    {
                        center: {
                            x: 250,
                            z: 100
                        }
                    }
                ]
            },
            {
                direction: Direction.right,
                doors: []
            }
        ]
    };
    const boxProps4: RoomDefinition = {
        id: 4,
        identifier: "323A",
        lbc: {
            x: 150,
            z: 50
        },
        rtc: {
            x: 300,
            z: 0
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
                            x: 250,
                            z: 50
                        }
                    }
                ]
            }
        ]
    };
    const boxProps5: RoomDefinition = {
        id: 5,
        identifier: "324",
        lbc: {
            x: 150,
            z: 300
        },
        rtc: {
            x: 300,
            z: 250
        },
        walls: [
            {
                direction: Direction.front,
                doors: []
            },
            {
                direction: Direction.left,
                doors: [
                    {
                        center: {
                            x: 250,
                            z: 250
                        }
                    }
                ]
            },
            {
                direction: Direction.back,
                doors: []
            },
            {
                direction: Direction.right,
                doors: []
            }
        ]
    };
    const boxProps6: RoomDefinition = {
        id: 6,
        identifier: "323B",
        lbc: {
            x: 250,
            z: 150
        },
        rtc: {
            x: 300,
            z: 250
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
                doors: [
                    {
                        center: {
                            x: 250,
                            z: 200
                        }
                    }
                ]
            },
            {
                direction: Direction.right,
                doors: []
            }
        ]
    };
    const boxProps8: RoomDefinition = {
        id: 8,
        identifier: "326",
        lbc: {
            x: 0,
            z: 250
        },
        rtc: {
            x: 70,
            z: 300
        },
        walls: [
            {
                direction: Direction.front,
                doors: []
            },
            {
                direction: Direction.left,
                doors: [
                    {
                        center: {
                            x: 50,
                            z: 250
                        }
                    }
                ]
            },
            {
                direction: Direction.back,
                doors: []
            },
            {
                direction: Direction.right,
                doors: []
            }
        ]
    };
    const boxProps7: RoomDefinition = {
        id: 7,
        identifier: "325",
        lbc: {
            x: 70,
            z: 250
        },
        rtc: {
            x: 150,
            z: 300
        },
        walls: [
            {
                direction: Direction.front,
                doors: []
            },
            {
                direction: Direction.left,
                doors: [
                    {
                        center: {
                            x: 100,
                            z: 250
                        }
                    }
                ]
            },
            {
                direction: Direction.back,
                doors: []
            },
            {
                direction: Direction.right,
                doors: []
            }
        ]
    };
    useEffect(() => {
        httpClientService
            .get("/protected/rooms")
            .then(response => console.log(response.data));
    }, [])
    if (localStorageHelperService.getUserInfo() === null) {
        props.history.push("/login");
        window.location.reload();
    }
    return (
        <div className={classes.container}>
            <Canvas
                camera={{
                    fov: 100,
                    position: new Vector3(
                        -Scale.groundFloor.x / 2,
                        Scale.groundFloor.y * 10,
                        Scale.groundFloor.z / 2,
                    ),
                }}
            >
                <ambientLight/>
                <CameraController target={defaultTarget}/>
                <Suspense fallback={null}>
                    <CanvasBody {...{
                        selectRoom,
                        selectedRoomId
                    }}>
                        <GroundFloor>
                            <Room {...boxProps}/>
                            <Room { ...boxProps2}/>
                            <Room { ...boxProps3}/>
                            <Room { ...boxProps4}/>
                            <Room { ...boxProps5}/>
                            <Room { ...boxProps6}/>
                            <Room { ...boxProps7}/>
                            <Room { ...boxProps8}/>
                        </GroundFloor>
                    </CanvasBody>
                </Suspense>
            </Canvas>
            <LocationProvider
                roomId={selectedRoomId}
                resetRoom={() => selectRoom(0)}
            />
        </div>
    );
}

export default withRouter(withStyles(styles)(App));
