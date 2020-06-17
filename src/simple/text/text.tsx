import React from "react";
import {useLoader} from "react-three-fiber";
import {FontLoader} from "three";

const url = '/default.blob';
interface Props {
    text: string,
    size: number,
}
export const Text: React.FunctionComponent<Props> = props => {
    const { text, size } = props;
    const font = useLoader(FontLoader, url);
    const positionX = - (text.length - 1) * 0.5 * size ;
    const positionZ = - 0.5 * size;
    return (
        <mesh
            position={[positionX, positionZ,0]}
        >
            {font? <textGeometry attach="geometry" args={[text, {
                font: font,
                size: size,
                height: 0.2,
                curveSegments: 12,
                bevelEnabled: false,
            }]}/> : null
            }
            <meshStandardMaterial attach="material" color={"black"}/>
        </mesh>
    );
}