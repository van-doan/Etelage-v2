import * as THREE from 'three'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader'
import React, { useState, useEffect, useMemo } from 'react'
import { useLoader, useThree } from 'react-three-fiber'
import { useTransition, useSpring, a } from '@react-spring/three'
import AppStore from "../../../../../stores/App/AppStore";


// for three to work, we'll always need a scene, camera, and renderer
interface Shape {
    shape: any;
    rotation: any;
    position: any;
    color: any;
    opacity: any;
    index: any;
}

export function Shape({shape, rotation, position, color, opacity, index}:Shape){
    if (!position) return null
    return (
        <a.mesh rotation={rotation} position={position.to((x:any, y:any, z:any)=> [x,y,z + index * 50])}>
            <a.meshPhongMaterial attach="material" color={color} opacity={opacity} side={THREE.DoubleSide} depthWrite={false} transparent />
            <shapeBufferGeometry attach="geometry" args={[shape]} />
        </a.mesh>
    )
}

export default function Scene() {
    function getArtwork(){
        let exhibitIdArray = AppStore.user?.exhibits
        let exhibitUrls = exhibitIdArray?.map(exhibit => exhibit.id === 41 ? exhibit.artwork_ids : 'no url').filter(url => url !== 'no url').toString();
        let splitStringUrls = exhibitUrls?.split(', ');
        // let cleanStringUrl = 
            console.log('This is the stringified urls', splitStringUrls);
            console.log('this is the url array', exhibitUrls)
            return splitStringUrls;
    }
    
    getArtwork();

    const colors = ['#21242d', '#ea5158', '#0d4663', '#ffbcb7', '#2d4a3e', '#8bd8d2']
    const urls = ['night', 'city', 'morning', 'tubes', 'woods', 'beach'].map(
    (name) => `https://raw.githubusercontent.com/drcmda/react-three-fiber/master/examples/src/resources/images/svg/${name}.svg`
    )

    const { viewport } = useThree()
    const [page, setPage] = useState(0)
    useEffect(() => void setInterval(() => setPage((i) => (i + 1) % urls.length), 3500), [])

    const data = useLoader(SVGLoader, urls[page])
    const shapes = useMemo(() => data.paths.flatMap((g, index) => g.toShapes(true).map((shape) => ({ shape, color: g.color, index }))), [
    data
    ])
    const [{ color }] = useSpring({ color: colors[page] }, [page])
    const [transition] = useTransition(
    shapes,
    {
      keys: (item:any) => item.shape.uuid,
      from: { rotation: [0.0, -Math.PI / 4, 0], position: [0, 50, 200], opacity: 0 },
      enter: { rotation: [0, 0, 0], position: [0, 0, 0], opacity: 1 },
      leave: { rotation: [0, 0.25, 0], position: [0, -50, 10], opacity: 0 },
      trail: 5
    },
    [page]
  )

  return (
    <>
      <mesh scale={[viewport.width, viewport.height, 1]}>
        <planeGeometry attach="geometry" args={[1, 1]} />
        <a.meshPhongMaterial attach="material" color={color} depthTest={false} />
      </mesh>
      <group position={[viewport.width / 2, viewport.height / 4, page]} rotation={[0, 0, Math.PI]}>
        {transition((props:any, item:any, t:any, i:any) => (
          <Shape {...item} {...props} />
        ))}
      </group>
    </>
  )
}
