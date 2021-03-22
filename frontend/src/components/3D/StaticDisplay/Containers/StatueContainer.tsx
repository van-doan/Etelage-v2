import React, { useRef, useMemo } from 'react';
import { MeshBasicMaterial, MeshStandardMaterial } from 'three'
import { useFrame, useLoader } from 'react-three-fiber'
import type { Mesh } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

// for three to work, we'll always need a scene, camera, and renderer

export default function StatueContainer() {
    const mesh = useRef<Mesh>();
    const gltf = useLoader(GLTFLoader, "scene.gltf")
    const material = useMemo(()=> {
        return new MeshBasicMaterial({ color: '#ffffff' })     
    },[]);

    useFrame(() => {
        if (mesh.current) mesh.current.rotation.y += 0.004
    })
    return (
        <mesh ref={mesh}
        material={material}
        scale={[1,1,1]}>
            <primitive className='statue' object={gltf.scene} position={[0, -10, 1 ]} material={material}/>
        </mesh>
    )
}
