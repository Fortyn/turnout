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
import {Point} from "./model/point";
import {Room} from "./model/room";
import httpClientService from "./security/http-client.service";
import localStorageHelperService from "./security/local-storage-helper-service";
import {Room as RoomComponent} from "./simple/room/room"
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
    const [rooms, setRooms] = useState<Room[]>([]);
    useEffect(() => {
        httpClientService
            .get("/protected/rooms")
            .then(response => setRooms(response.data as Room[]));
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
                            {
                                rooms.map(room => {
                                    const toPoint2D = (point: Point) => {
                                        return {
                                            x: point.abscissa,
                                            z: point.ordinate
                                        };
                                    }
                                    return {
                                        id: room.id,
                                        lbc: toPoint2D(room.lowerLeftCorner),
                                        rtc: toPoint2D(room.upperRightCorner),
                                        identifier: room.identifier,
                                        walls: room.walls.map(wall => {
                                            return {
                                                direction: wall.direction,
                                                doors: wall.doors.map(door => {
                                                    return {
                                                        center: toPoint2D(door.position)
                                                    }
                                                })
                                            }
                                        })
                                    };
                                }).map(room =>
                                    <RoomComponent
                                        key={room.id.toString()}
                                        {...room}
                                    />
                                )
                            }
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
