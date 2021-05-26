import React, { Suspense } from 'react'
import { Canvas } from 'react-three-fiber'
import { Button } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import './styles.scss'

import Head from '../../components/3D/StaticDisplay/404/components/Head'
import Lights from '../../components/3D/StaticDisplay/404/components/Lights'

const NotFound = () => {
  return (
    <div className='fo0fo'>
        <div className='fo0fo-content'>
            <div className='fo0fo-section'>
                <div className='fo0fo-section-title'>
                    
                </div>
                <div className='fo0fo-section-text'>
                    <h3 className="fo0fo-section-text-1">TO CREATE SOMETHING TRULY ORIGINAL, YOU MUST ESCAPE THE BOUNDS OF ART</h3>
                    <h3 className="fo0fo-section-text-2">HOWEVER, YOU'VE FOUND THE VOID AND MUST RETURN TO REALITY</h3>
                    <Button className="fo0fo-btn" href="/home">
                        <ArrowLeftOutlined /> back to home
                    </Button>
                </div>
            </div>
        </div>
        <Canvas
          className="bust-container"
          shadowMap
          camera={{
            position: [0, 0, 36],
          }}
          style={{height: '1000px'}}
          gl={{ antialias: false }}
        >
          <Lights />
          <Suspense fallback="test">
            <Head />
          </Suspense>
        </Canvas>
        </div>
  )
};

// const Wrapper = styled.main`
//   height: 100%;
//   background: radial-gradient(50% 50% at 50% 50%, #454545 0%, #2F2E2F 100%, #2F2E2F 100%);
// `

// const Text = styled.h1`
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   color: #676668;
//   font-weight: 400;
//   font-size: 75px;
//   font-family: Roslindale, serif;
//   line-height: 90px;
//   letter-spacing: 1.225em;
//   text-align: right;
//   text-transform: uppercase;
//   transform: translate(calc(-50% + 0.75em), -50%);
// `

export default NotFound;
