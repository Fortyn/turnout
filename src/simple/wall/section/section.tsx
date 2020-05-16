import React from "react";
import {Vector2, MeshStandardMaterial} from "three";
import {Scale} from "../../../common/geometry";
import {Materials} from "../../../common/material";
import {DirectWallProps} from "../direct-wall";

export interface SectionProps extends DirectWallProps {
    last?: boolean,
    index: number,
    sectionVector: Vector2,
}

export const Section = (props: SectionProps) => {
    const {roomSize, sectionVector, index, last} = props;
    const texture = props.texture.clone();
    texture.needsUpdate = true;
    const positionX = roomSize.x / 2 - Scale.walls.depth / 2;
    const positionZ = sectionVector.x;
    const depthZ = sectionVector.y;
    let main;
    switch (index % 2) {
        case 0:
            texture.repeat.set(depthZ / 10, Scale.groundFloor.y / 10);
            main = new MeshStandardMaterial({map: texture});
            return (
                <mesh
                    position={[positionX, 0, positionZ]}
                    material={[
                        main,
                        main,
                        Materials.walls.size,
                        Materials.walls.size,
                        last ? Materials.walls.ignored : Materials.walls.size,
                        index === 0 ? Materials.walls.ignored : Materials.walls.size,
                    ]}
                >
                    <boxBufferGeometry
                        attach="geometry"
                        args={[Scale.walls.depth, Scale.groundFloor.y, depthZ]}
                    />
                </mesh>
            );
        case 1:
            const depthY = Scale.groundFloor.y - Scale.doors.height;
            const positionY = Scale.doors.height / 2;
            texture.repeat.set(depthZ / 10, depthY / 10);
            main = new MeshStandardMaterial({map: texture});
            return (
                <mesh
                    position={[positionX, positionY, positionZ]}
                    material={[
                        main,
                        main,
                        Materials.walls.size,
                        Materials.walls.size,
                        last ? Materials.walls.ignored : Materials.walls.size,
                        index === 0 ? Materials.walls.ignored : Materials.walls.size,
                    ]}
                >
                    <boxBufferGeometry
                        attach="geometry"
                        args={[Scale.walls.depth, depthY, depthZ]}
                    />
                </mesh>
            );
    }
    return null
}