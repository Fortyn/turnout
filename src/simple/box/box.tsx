import React from "react";
import {useLoader} from "react-three-fiber";
import {TextureLoader, AxesHelper} from "three";
import image from "./textures/side.png"
interface Props {

}
export const Box = () => {
    const texture = useLoader(TextureLoader, image);
    console.log("render");
    return (
        <mesh position={[50, 0, 50]} rotation={[0,Math.PI/2,0]}>
            <boxBufferGeometry attach="geometry" args={[100, 1, 100]}/>
            <meshStandardMaterial attach="material" color={0x00ff00}/>
            <primitive object={new AxesHelper(100)}/>
        </mesh>
    );
}