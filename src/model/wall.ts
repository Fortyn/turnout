import {Direction} from "../simple/direction";
import {Door} from "./door";

export interface Wall {
    direction: Direction;
    doors: Door[];
}