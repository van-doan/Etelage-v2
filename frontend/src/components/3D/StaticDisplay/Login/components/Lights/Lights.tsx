import React, { useCallback, useEffect, useRef } from 'react';
import { useThree } from 'react-three-fiber';
import { AmbientLight } from 'three';

const Lights = () => {
  const firstLightRef = useRef<AmbientLight>(null)
  const secondLightRef = useRef<AmbientLight>(null)
  const { viewport, mouse } = useThree()

  const mousemoveHandler = useCallback(() => {
    const delta = mouse.x * 40 / 100
    const rotateX = ((mouse.x * viewport.width) / 2) + delta

    firstLightRef.current?.position.set(
      rotateX,
      (mouse.y * viewport.height) / 2,
      17
    )

    secondLightRef.current?.position.set(
      -rotateX,
      - (mouse.y * viewport.height) / 2,
      17
    )
  }, [mouse.x, mouse.y, viewport.height, viewport.width])

  useEffect(() => {
    window.addEventListener("mousemove", mousemoveHandler);

    return () => {
      window.removeEventListener("mousemove", mousemoveHandler);
    };
  }, [mousemoveHandler])

  return (
    <>
      <ambientLight color="#636363" />
      <pointLight position={[40, 10, 17]} intensity={0.2} />
      <pointLight
        position={[40, 10, 17]}
        color="#FF00FF"
        ref={firstLightRef} />
      <pointLight
        position={[-40, -10, 17]}
        color="#3446E3"
        ref={secondLightRef} />
    </>
  )
}

export default Lights
