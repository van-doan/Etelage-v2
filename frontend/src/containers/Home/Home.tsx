import React, {Suspense} from 'react';
import { Canvas } from 'react-three-fiber'

import StaticContainer from '../../components/3D/StaticDisplay/Containers/StaticContainer'
import StatueContainer from '../../components/3D/StaticDisplay/Containers/StatueContainer';

import './styles.scss';

export default () => {
    return (
        <div className='home'>
            <div className='home-content'>
                <div className='home-section'>
                    <div className='home-section-title'>
                        ETELAGE
                    </div>
                    <div className='home-section-text'>
                        <h3 className="home-section-text-1">THE PRINCIPLES OF TRUE ART IS NOT TO PORTRAY, BUT TO EVOKE.</h3>
                        <h3 className="home-section-text-2">WHAT DOES YOUR AESTHETIC SAY ABOUT YOU?</h3>
                    </div>

                </div>
            </div>
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
        </div>
    )
}
