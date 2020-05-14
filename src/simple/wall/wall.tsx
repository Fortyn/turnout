import React from "react";
import {useLoader} from "react-three-fiber";
import {TextureLoader, RepeatWrapping, MeshStandardMaterial, Material, Texture} from "three";
import {Scale} from "../../common/scale";
import {Direction} from "../direction";
import {Point2D} from "../point-2d";
import image from "./textures/wall.jpg";

interface WallProps {
    roomSizeX: number,
    roomSizeZ: number,
    direction: Direction
}
interface SizeState {
    depthX: number,
    depthZ: number
}
interface MaterialState {
    materials: Material[]
}

type InnerState = SizeState & Point2D & MaterialState;
export const Wall = (props: WallProps) => {
    const texture = useLoader(TextureLoader, image);
    const {x, z, depthX, depthZ, materials} = innerState(props, texture);

    return (
        <mesh
            position={[x, 0, z]}
            material={materials}
        >
            <boxBufferGeometry
                attach="geometry"
                args={[depthX, Scale.groundFloor.y, depthZ]}
            />
        </mesh>
    );
}

const innerState = (props: WallProps, texture: Texture): InnerState => {
    const {roomSizeX, roomSizeZ} = props;
    const sideTexture = texture.clone();
    sideTexture.needsUpdate = true;
    sideTexture.wrapS = sideTexture.wrapT = RepeatWrapping;
    sideTexture.offset.set(0, 0);

    const base = new MeshStandardMaterial({color: 'gray'});
    const ignored = new MeshStandardMaterial({transparent: true, opacity: 0});
    let state: InnerState;
    let material;
    switch (props.direction) {
        case Direction.front:
            sideTexture.repeat.set(roomSizeZ / 10, Scale.groundFloor.y / 10);
            material = new MeshStandardMaterial({map: sideTexture});
            state = {
                x: roomSizeX / 2 - Scale.walls.depth / 2,
                z: 0,
                depthX: Scale.walls.depth,
                depthZ: roomSizeZ,
                materials: [
                    material,
                    material,
                    base,
                    base,
                    ignored,
                    ignored,
                ]
            };
            break;
        case Direction.back:
            sideTexture.repeat.set(roomSizeZ / 10, Scale.groundFloor.y / 10);
            material = new MeshStandardMaterial({map: sideTexture});
            state = {
                x: -roomSizeX / 2 + Scale.walls.depth / 2,
                z: 0,
                depthX: Scale.walls.depth,
                depthZ: roomSizeZ,
                materials: [
                    material,
                    material,
                    base,
                    base,
                    ignored,
                    ignored,
                ]
            };
            break;
        case Direction.right:
            sideTexture.repeat.set(roomSizeX / 10, Scale.groundFloor.y / 10);
            material = new MeshStandardMaterial({map: sideTexture});
            state = {
                x: 0,
                z: roomSizeZ / 2 - Scale.walls.depth / 2,
                depthX: roomSizeX,
                depthZ: Scale.walls.depth,
                materials: [
                    ignored,
                    ignored,
                    base,
                    base,
                    material,
                    material,
                ]
            };
            break;
        case Direction.left:
            sideTexture.repeat.set(roomSizeX / 10, Scale.groundFloor.y / 10);
            material = new MeshStandardMaterial({map: sideTexture});
            state = {
                x: 0,
                z: -roomSizeZ / 2 + Scale.walls.depth / 2,
                depthX: roomSizeX,
                depthZ: Scale.walls.depth,
                materials: [
                    ignored,
                    ignored,
                    base,
                    base,
                    material,
                    material,
                ]
            };
    }
    return state;
    throw new Error("Unsupported direction");
}