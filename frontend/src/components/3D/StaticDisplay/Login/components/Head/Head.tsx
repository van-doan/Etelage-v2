import React, { createRef, FC, useCallback, useEffect, useRef, useState } from 'react';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader, useThree } from 'react-three-fiber';
import { Mesh, MeshStandardMaterial, Group } from 'three'
import { gsap } from 'gsap'

import './CustomMaterial'

// type GLTFResult = GLTF & {
//   nodes: {
//     Head: {
//       children: Array<Mesh>
//     }
//   }
//   materials: {
//     base: MeshStandardMaterial
//     inner: MeshStandardMaterial
//   }
// }

const Head: FC = () => {
  const modelEl = useRef<Mesh>(null);
  const { nodes } = useLoader(GLTFLoader, './models/david_head-fragments.gltf')
  const { mouse } = useThree()
  const headRef = useRef<Group>(null)
  const particles = nodes.Head.children.map(() => createRef<Mesh>())
  // const customMaterialRef = useRef<any>(null)
  const [isAnimated, setIsAnimated] = useState<boolean>(false)
  const initialPositions = useRef<any>(nodes.Head.children.map((el:any) => el.position))

  const mousemoveHandler = useCallback(() => {
    const rotateY = mouse.x * 1000;
    const rotateX = -mouse.y * 1000;

    if (modelEl.current) {
      gsap.to(modelEl.current.rotation, {
        x: 0.0003 * rotateX,
        y: 0.0003 * rotateY,
        duration: 0.5
      })
    }
  }, [mouse.x, mouse.y])

  useEffect(() => {
    window.addEventListener('mousemove', mousemoveHandler);

    return () => {
      window.removeEventListener('mousemove', mousemoveHandler);
    };
  }, [mousemoveHandler])

  useEffect(() => {
    // eslint-disable-next-line array-callback-return
    particles.map((el:any, index:any) => {
      if (el.current) gsap.to(el.current.position, {
        x: isAnimated ? el.current.position.x * 4 : initialPositions.current[index].x,
        y: isAnimated ? el.current.position.y * 4 : initialPositions.current[index].y,
        z: isAnimated ? el.current.position.z * 4 : initialPositions.current[index].z,
        duration: 1.5, ease: 'power2.inOut'
      })
    })

    if (headRef.current) {
      if(headRef.current) gsap.to(headRef.current.rotation, { x: isAnimated ? 1.2 : 0, duration: 1.5, ease: 'power2.inOut' })
    }
  }, [isAnimated, particles])

  return (
    <group ref={modelEl}
      onClick={(e) => {
        e.stopPropagation()
        setIsAnimated(!isAnimated)
      }}
    >
      <group position={[0, 0, 0]} rotation={[0, -1.6, 0]} ref={headRef}>
        {nodes.Head.children.map((el:any, index:any) => (
          <mesh
            key={index}
            receiveShadow
            castShadow
            position={el.position}
            ref={particles[index]}
            material={el.material}
          >
            <bufferGeometry attach="geometry" {...el.geometry} />
            {/* <customMaterial attach="material" ref={customMaterialRef} /> */}
            {/* <meshStandardMaterial attach="material" /> */}
          </mesh>
        ))}
      </group>
    </group>
  );
};

export default Head;
