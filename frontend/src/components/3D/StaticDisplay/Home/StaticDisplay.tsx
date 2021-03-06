import React, {Suspense} from 'react';
import { Canvas } from 'react-three-fiber'

import StaticContainer from './StaticContainer'
import StatueContainer from './StatueContainer';

// for three to work, we'll always need a scene, camera, and renderer

export default function StaticDisplay(props:any) {

    return (
        <Canvas 
            className="statue-container"
            camera={{ position: [0, 1, 12], fov: 140 }}
            style={{height: '1200px', display: 'flex !important'}}>
            <ambientLight/>
            <pointLight position={[10, 10, 10]} />
            <Suspense fallback={<StaticContainer position={[-1.2, 0, 0]}/> &&
            <StaticContainer position={[1.2, 0, 0]} />}>
                {<StatueContainer/>}
            </Suspense>
        </Canvas>
    )
}