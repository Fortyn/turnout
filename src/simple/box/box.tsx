import React from "react";
import {useLoader} from "react-three-fiber";
import {TextureLoader} from "three";
import image from "./textures/side.png"
interface Props {

}
export const Box = () => {
    const texture = useLoader(TextureLoader, image);
    console.log("render");
    return (
        <mesh position={[0, 0, 0]}>
            <boxBufferGeometry attach="geometry" args={[1, 1, 1]}/>
            <meshStandardMaterial attach="material" map={texture}/>
        </mesh>
    );
}