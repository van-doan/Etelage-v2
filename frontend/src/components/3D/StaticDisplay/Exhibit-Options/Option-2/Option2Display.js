// This option is the Spooky TV 3D component
// The idea is that the user will be able to see their artwork within the tv
import React, { Suspense, useState } from "react";
import { Canvas, extend } from "react-three-fiber";
import "./styles.css";
import { useGLTF, OrbitControls, Effects } from "@react-three/drei";
import * as THREE from "three";
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass";
import { WaterEffect } from "./WaterEffect";
import url from "./ghosttown.mp4";

const TV = () => {
    const { nodes } = useGLTF("tv.gltf");
  
    const [video] = useState(() => {
      const vid = document.createElement("video");
      vid.src = url;
      vid.crossOrigin = "Anonymous";
      vid.loop = true;
      vid.muted = true;
      vid.play();
      return vid;
    });
  
    return (
      <group rotation={[Math.PI / 8, Math.PI * 1.2, 0]}>
        <mesh geometry={nodes.TV.geometry}>
          <meshStandardMaterial color="white" />
        </mesh>
        <mesh rotation={[0, 0, 0]} position={[0, 0, 1.1]}>
          <planeGeometry args={[3.2, 1.9]} />
          <meshStandardMaterial emissive={"white"} side={THREE.DoubleSide}>
            <videoTexture attach="map" args={[video]} />
            <videoTexture attach="emissiveMap" args={[video]} />
          </meshStandardMaterial>
        </mesh>
      </group>
    );
  };

  const TV2 = () => {
    const { nodes } = useGLTF("tv.gltf");
  
    const [video] = useState(() => {
      const vid = document.createElement("video");
      vid.src = url;
      vid.crossOrigin = "Anonymous";
      vid.loop = true;
      vid.muted = true;
      vid.play();
      return vid;
    });
  
    return (
      <group rotation={[Math.PI / 8, Math.PI * 1.2, 0]}>
        <mesh geometry={nodes.TV.geometry}>
          <meshStandardMaterial color="white" />
        </mesh>
        <mesh rotation={[0, 0, 0]} position={[5, 1, 1.1]}>
          <planeGeometry args={[3.2, 1.9]} />
          <meshStandardMaterial emissive={"white"} side={THREE.DoubleSide}>
            <videoTexture attach="map" args={[video]} />
            <videoTexture attach="emissiveMap" args={[video]} />
          </meshStandardMaterial>
        </mesh>
      </group>
    );
  };
  
  const TV3 = () => {
    const { nodes } = useGLTF("tv.gltf");
  
    const [video] = useState(() => {
      const vid = document.createElement("video");
      vid.src = url;
      vid.crossOrigin = "Anonymous";
      vid.loop = true;
      vid.muted = true;
      vid.play();
      return vid;
    });
  
    return (
      <group rotation={[Math.PI / 8, Math.PI * 1.2, 0]}>
        <mesh geometry={nodes.TV.geometry}>
          <meshStandardMaterial color="white" />
        </mesh>
        <mesh rotation={[0, 0, 0]} position={[-5, 1, 1.1]}>
          <planeGeometry args={[3.2, 1.9]} />
          <meshStandardMaterial emissive={"white"} side={THREE.DoubleSide}>
            <videoTexture attach="map" args={[video]} />
            <videoTexture attach="emissiveMap" args={[video]} />
          </meshStandardMaterial>
        </mesh>
      </group>
    );
  };
  
  const Floor = () => {
    return (
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-2, -2, 0]}>
        <planeBufferGeometry args={[100, 100, 1]} />
        <meshStandardMaterial color="white" />
      </mesh>
    );
  };


export default function Option2Display() {
    return (
      <Canvas>
        <Effects>
          <WaterEffect attachArray="passes" factor={1} />
          <GlitchPass attachArray="passes" />
        </Effects>
        <OrbitControls maxPolarAngle={Math.PI / 2} minPolarAngle={0} />
        <fog attach="fog" args={["black", 1, 7]} />
        <directionalLight intensity={0.05} />
        <pointLight intensity={0.2} color="blue" />
  
        <Suspense fallback={null}>
          <TV />
          <TV2 />
          <TV3 />
          <Floor />
        </Suspense>
      </Canvas>
    );
  }