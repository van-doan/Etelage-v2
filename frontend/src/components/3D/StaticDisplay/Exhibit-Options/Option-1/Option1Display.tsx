import React, {Suspense} from 'react';
import { Canvas } from 'react-three-fiber'

import Scene from './StaticContainer'

// for three to work, we'll always need a scene, camera, and renderer

export default function Option1Display(props:any) {

    return (
        <Canvas
            style={{height: 1500}}
            camera={{
                fov: 80,
                position: [0, 0, 2000],
                near: 0.1,
                far: 20000
            }}>
      <ambientLight intensity={0.5} />
      <spotLight intensity={0.5} position={[300, 300, 4000]} />
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
    )
}