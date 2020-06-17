import React from "react";
import {useLoader} from "react-three-fiber";
import {TextureLoader, RepeatWrapping, Vector2} from "three";
import {Direction} from "../direction";
import {DoorDefinition} from "../door/door";
import {Point2D} from "../point-2d";
import {DirectWall} from "./direct-wall";
import image from "./textures/papper01.jpg";

export interface WallDefinition {
    direction: Direction,
    doors: DoorDefinition[];
}

interface WallProps extends WallDefinition {
    roomSize: Point2D
}

export const Wall = (props: WallProps) => {
    const wallTexture = useLoader(TextureLoader, image);
    const texture = wallTexture.clone();
    const angle = Math.PI * props.direction / 2;
    texture.needsUpdate = true;
    texture.wrapS = texture.wrapT = RepeatWrapping;
    texture.offset.set(0, 0);
    const rotatedRoomSize = rotate(props.roomSize, angle);
    rotatedRoomSize.x = Math.abs(rotatedRoomSize.x);
    rotatedRoomSize.z = Math.abs(rotatedRoomSize.z);
    return (
        <mesh rotation={[0, angle, 0]}>
            <DirectWall
                texture={texture}
                roomSize={rotatedRoomSize}
                doors={props.doors.map(
                    door => {
                        door.center = rotate(door.center, angle);
                        return door;
                    }
                )}/>
        </mesh>
    );
}

const rotate = (point: Point2D, angle: number) => {
    const vector = new Vector2(point.x, point.z).rotateAround(new Vector2(0, 0), angle);
    return {
        x: vector.x,
        z: vector.y
    };
}