import {MeshStandardMaterial} from "three";

export const Materials = {
    walls: {
        size: new MeshStandardMaterial({color: 'gray'}),
        ignored: new MeshStandardMaterial({transparent: true, opacity: 0}),
    }
}