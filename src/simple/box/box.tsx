import React, {useRef} from "react";
import {useLoader, useThree} from "react-three-fiber";
import {ReactThreeFiber} from "react-three-fiber/three-types";
import * as THREE from "three";
import {TextureLoader, AxesHelper, Vector2} from "three";
import {RaycasterContext} from "../../canvas-body/canvas-body";
import {Scale} from "../../common/scale";
import {Point2D} from "../Point2D";
import image from "./textures/side.png"

interface Props {
    lbc: Point2D;
    rtc: Point2D;
}

export const Box = (props: Props) => {
    const texture = useLoader(TextureLoader, image);
    const three = useThree();
    const canvas = three.gl.domElement;
    const ref = useRef<ReactThreeFiber.Object3DNode<THREE.Mesh, typeof THREE.Mesh>>();
    const lengthX = props.rtc.x - props.lbc.x
    const lengthZ = props.rtc.z - props.lbc.z
    const centerX = props.lbc.x + lengthX / 2;
    const centerZ = props.lbc.z + lengthZ / 2;
    return (
        <RaycasterContext.Consumer>
            {({setVector, intersected}) => {
                const active = ref.current && intersected && ref.current.uuid === intersected.uuid;
                return (
                    <mesh
                        ref={ref}
                        position={[centerX, 0, centerZ]}
                        onClick={e => {
                            const x = (e.clientX / canvas.width) * 2.0 - 1.0;
                            const y = -(e.clientY / canvas.height) * 2.0 + 1.0;
                            setVector(new Vector2(x, y));
                        }}
                    >
                        <boxBufferGeometry
                            attach="geometry"
                            args={[Math.abs(lengthX), Scale.groundFloor.y, Math.abs(lengthZ)]}
                        />
                        <meshStandardMaterial attach="material" color={active ? 0xff0000 : 0x00ff00} opacity={0.5}/>
                    </mesh>
                );
            }}
        </RaycasterContext.Consumer>
    );
}