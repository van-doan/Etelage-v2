import React, { Suspense } from 'react'
import { Canvas } from 'react-three-fiber'

import Head from "./components/Head"
import Lights from './components/Lights'

const LoginDisplay = () => {

  return (
        <Canvas
          shadowMap
          camera={{
            position: [0, 0, 36],
          }}
          style={{height: '1200px'}}
          gl={{ antialias: false }}
        >
          <Lights />
          <Suspense fallback="test">
            <Head />
          </Suspense>
        </Canvas>
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

export default LoginDisplay;
