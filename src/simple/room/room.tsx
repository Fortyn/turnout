import React, {useState, useContext} from "react";
import {useLoader, useThree} from "react-three-fiber";
import {TextureLoader, DoubleSide} from "three";
import {CanvasContext} from "../../canvas-body/canvas-body";
import {Scale} from "../../common/geometry";
import {Point2D} from "../point-2d";
import {Text} from "../text/text"
import {Wall, WallDefinition} from "../wall/wall";
import image from "./textures/gold.jpg"

export interface RoomProps {
    id: number;
    lbc: Point2D;
    rtc: Point2D;
    walls: WallDefinition[];
    identifier: string;
}

export type RoomDefinition = RoomProps;
export const Room: React.FunctionComponent<RoomProps> = (props) => {
    const {raycaster, scene} = useThree();
    const { selectedRoomId, selectRoom } = useContext(CanvasContext);
    const active = selectedRoomId === props.id;
    const lengthX = props.rtc.x - props.lbc.x
    const lengthZ = props.rtc.z - props.lbc.z
    const centerX = props.lbc.x + lengthX / 2;
    const centerZ = props.lbc.z + lengthZ / 2;
    const sizeX = Math.abs(lengthX);
    const sizeZ = Math.abs(lengthZ);
    const texture = useLoader(TextureLoader, image);
    const walls: WallDefinition[] = props.walls.map(
        wall => {
            return {
                doors: wall.doors.map(door => {
                    return {
                        center: {
                            x: door.center.x - centerX,
                            z: door.center.z - centerZ,
                        }
                    };
                }),
                direction: wall.direction
            };
        }
    );
    return (
        <mesh
            position={[centerX, 0, centerZ]}
            onPointerUp={e => {
                e.stopPropagation();
                const intersections = raycaster.intersectObjects(scene.children, true);
                const intersected = intersections[0].object;
                if (e.eventObject.uuid === intersected.uuid) {
                    if (active) {
                        selectRoom(0);
                    } else {
                        selectRoom(props.id);
                    }
                    return;
                }
            }}
        >
            <boxBufferGeometry
                attach="geometry"
                args={[sizeX + 0.1, Scale.groundFloor.y + 0.1, sizeZ + 0.1]}
            />
            <meshStandardMaterial
                attach="material"
                map={texture}
                opacity={active ? 0.5 : 0.0}
                transparent={true}
                side={DoubleSide}
                alphaTest={0.5}
            />
            {
                walls.map(wall =>
                    <Wall
                        key={`${wall.direction}`}
                        roomSize={{
                            x: sizeX,
                            z: sizeZ
                        }}
                        {...wall}
                    />
                )
            }
            <mesh
                position={[0, Scale.groundFloor.y / 2, 0]}
                rotation={[Math.PI * 3 / 2, 0, Math.PI * 3/2]}
            >
                <Text text={props.identifier} size={10}/>
            </mesh>
        </mesh>
    );
}