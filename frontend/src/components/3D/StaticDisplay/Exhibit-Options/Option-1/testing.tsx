import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import React, { useState, useEffect, useMemo } from 'react'
import { useLoader, useThree } from 'react-three-fiber'
import { useTransition, useSpring, a } from '@react-spring/three'
import AppStore from "../../../../../stores/App/AppStore";

// // for three to work, we'll always need a scene, camera, and renderer
// interface Shape {
//     shape: any;
//     rotation: any;
//     position: any;
//     color: any;
//     opacity: any;
//     index: any;
// }

// interface Scene {
//     urls: string[] | undefined;
//     shape: any;
//     color: string;
//     g: any;
//     index: any;

// }

// export function Shape({shape, rotation, position, color, opacity, index}:Shape){
//     if (!position) return null
//     return (
//         <a.mesh rotation={rotation} position={position.to((x:any, y:any, z:any)=> [x,y,z + index * 50])}>
//             <a.meshPhongMaterial attach="material" color={color} opacity={opacity} side={THREE.DoubleSide} depthWrite={false} transparent />
//             <shapeBufferGeometry attach="geometry" args={[shape]} />
//         </a.mesh>
//     )
// }


// const colors = ['#21242d', '#ea5158', '#0d4663', '#ffbcb7', '#2d4a3e', '#8bd8d2']

// export default function Scene() {
//     const [url, setUrl] = useState<string[] | undefined>()
//     const urls = url?.map(url => url);
//     function getArtworkUrls(){
//         let exhibitIdArray = AppStore.user?.exhibits
//         let exhibitUrls = exhibitIdArray?.map(exhibit => exhibit.id === 41 ? exhibit.artwork_ids : 'no url').filter(url => url !== 'no url').toString();
//         let splitStringUrls = exhibitUrls?.split(', ');
//         setUrl(splitStringUrls);
//     }
//     getArtworkUrls();  
//     const { viewport } = useThree()
//     const [page, setPage] = useState(0)
//     useEffect(() => 
//         void setInterval(() => setPage(
//             (i) => (i + 1) % 2), 3500),
//     []);

//     const data = () => (
//         urls ? urls[page] : undefined
//         )
        
//     const shapes = useMemo(() => (shape:any, color:any, g:any, index:any) => ({shape, color, g.color, index}), [data]) 
//     const [{ color }] = useSpring({ color: colors[page] }, [page])
//     const [transition] = useTransition(
//         shapes,
//         {
//             keys: (item:any) => item.uuid,
//       from: { rotation: [0.0, -Math.PI / 4, 0], position: [0, 50, 200], opacity: 0 },
//       enter: { rotation: [0, 0, 0], position: [0, 0, 0], opacity: 1 },
//       leave: { rotation: [0, 0.25, 0], position: [0, -50, 10], opacity: 0 },
//       trail: 5
//     },
//     [page]
//     )

//   return (
//     <>
//       <mesh scale={[viewport.width, viewport.height, 1]}>
//         <planeGeometry attach="geometry" args={[1, 1]} />
//         <a.meshPhongMaterial attach="material" color={color} depthTest={false} />
//       </mesh>
//       <group position={[viewport.width / 2, viewport.height / 4, page]} rotation={[0, 0, Math.PI]}>
//         {transition((props:any, item:any, t:any, i:any) => (
//           <Shape {...item} {...props} />
//         ))}
//       </group>
//     </>
//   )
// }
