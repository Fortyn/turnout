import React from "react";
import {Vector2, Texture} from "three";
import {Scale} from "../../common/geometry";
import {DoorDefinition} from "../door/door";
import {Point2D} from "../point-2d";
import {Section} from "./section/section";

export interface DirectWallProps {
    roomSize: Point2D;
    texture: Texture;
    doors: DoorDefinition[];
}

export const DirectWall = (props: DirectWallProps) => {
    const {doors, roomSize} = props;
    const wallBegin = -roomSize.z / 2;
    const wallEnd = roomSize.z / 2;
    const sections = sectionCenters(doors.map(door => door.center.z), wallBegin, wallEnd);
    return (
        <mesh>
            {
                sections.map((section, index) =>
                    <Section
                        key={`${index}`}
                        index={index}
                        last={sections.length-1 === index}
                        sectionVector={section}
                        {...props}
                    />
                )
            }
        </mesh>
    );
}

const sectionCenters = (doorsCenterCoordValues: number[], wallBegin: number, wallEnd: number): Vector2[] => {
    const sectionBorders: number[] = [];
    doorsCenterCoordValues.forEach(position => {
        sectionBorders.push(position - Scale.doors.width / 2);
        sectionBorders.push(position + Scale.doors.width / 2);
    })
    sectionBorders.push(wallEnd);
    const sections: Vector2[] = [];
    let prev = wallBegin;
    sectionBorders.forEach(value => {
        const size = Math.abs(value - prev)
        const position = prev + size / 2;
        sections.push(new Vector2(position, size))
        prev = value;
    });
    return sections;
}