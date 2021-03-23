import React, { useRef, useState } from 'react';
import { useFrame, useLoader } from 'react-three-fiber'
import type { Mesh } from 'three';

// for three to work, we'll always need a scene, camera, and renderer


export default function StaticContainer(props:any) {
    const mesh = useRef<Mesh>();
    const [hovered, setHover] = useState(false);
    const [active, setActive] = useState(false);

    useFrame(() => {
        if (mesh.current) mesh.current.rotation.y += 0.01
    })

    return (
        <mesh
            {...props}
            ref={mesh}
            scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
            onClick={(event) => setActive(!active)}
            onPointerOver={(event) => setHover(true)}
            onPointerOut={(event) => setHover(false)}>
            <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
            <meshStandardMaterial color= '#ffffff' roughness= {1} metalness= {0.9} />
        </mesh>
    )
}