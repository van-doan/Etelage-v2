import React, {Suspense} from 'react';
import { Canvas } from 'react-three-fiber'

import StaticContainer from './StaticContainer'
import StatueContainer from './StatueContainer';

// for three to work, we'll always need a scene, camera, and renderer

export default function Option1Display(props:any) {

    return (
        <Canvas camera={{ fov: 50, position: [0, 0, 30] }}>
        <Suspense fallback={null}>
            {/* <Background />
            <Diamonds /> */}
        </Suspense>
        </Canvas>
    )
}