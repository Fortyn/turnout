import React, {useState} from "react";
import {useLoader, useThree} from "react-three-fiber";
import {TextureLoader, DoubleSide, RepeatWrapping} from "three";
import {Scale} from "../../common/scale";
import {Direction} from "../direction";
import {Point2D} from "../point-2d";
import {Wall} from "../wall/wall";
import image from "./textures/side.png"

interface RoomProps {
    lbc: Point2D;
    rtc: Point2D;
    walls: {
        direction: Direction
    }[];
}

export const Room: React.FunctionComponent<RoomProps> = (props) => {
    const {raycaster, scene} = useThree();
    const [active, setActive] = useState(false);
    const lengthX = props.rtc.x - props.lbc.x
    const lengthZ = props.rtc.z - props.lbc.z
    const centerX = props.lbc.x + lengthX / 2;
    const centerZ = props.lbc.z + lengthZ / 2;
    const sizeX = Math.abs(lengthX);
    const sizeZ = Math.abs(lengthZ);
    const texture = useLoader(TextureLoader, image);
    return (
        <mesh
            position={[centerX, 0, centerZ]}
            onClick={e => {
                e.stopPropagation();
                const intersections = raycaster.intersectObjects(scene.children, true);
                const intersected = intersections[0].object;
                if (e.eventObject.uuid === intersected.uuid) {
                    setActive(!active);
                    return;
                }
            }}
        >
            <boxBufferGeometry
                attach="geometry"
                args={[sizeX+0.1, Scale.groundFloor.y+0.1, sizeZ+0.1]}
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
                props.walls.map(wall =>
                    <Wall
                        key={`${wall.direction}`}
                        direction={wall.direction}
                        roomSizeX={sizeX}
                        roomSizeZ={sizeZ}
                    />
                )

            }
        </mesh>
    );
}