import React from 'react';
import {useEffect} from "react";
import {useThree} from "react-three-fiber";
import {Vector3} from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {Scale} from "../common/geometry";
interface Props {
    target: Vector3
}
export const CameraController: React.FunctionComponent<Props> = props => {
    const {camera, gl} = useThree();
    useEffect(
        () => {
            const controls = new OrbitControls(camera, gl.domElement);
            controls.minDistance = 1
            controls.maxDistance = Scale.groundFloor.z
            controls.minPolarAngle = 0
            controls.maxPolarAngle = Math.PI/2
            controls.minAzimuthAngle = -Math.PI
            controls.maxAzimuthAngle = 0
            controls.enableKeys = false
            controls.enablePan = false
            controls.target = props.target;
            controls.update();
            return () => {
                controls.dispose();
            }
        },
        [camera, gl, props]
    );
    return null;
}