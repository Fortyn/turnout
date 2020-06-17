import {Point} from "./point";
import {Wall} from "./wall";

export interface Room {
    id: number;
    lowerLeftCorner: Point;
    upperRightCorner: Point;
    walls: Wall[];
    identifier: string;
}