import React, { Suspense, useRef, useLayoutEffect } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "react-three-fiber";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib.js";
import { OrbitControls, Torus, Loader } from "@react-three/drei";
import { Reflector, useTexture, Environment } from "@react-three/drei";
import { Footer } from "@pmndrs/branding";
RectAreaLightUniformsLib.init();

function Floor() {
  const textures = useTexture([
    "/Ice_OCC.jpg",
    "/Ice_NORM.jpg",
    "/Ice_DISP.png",
    "/floor_rough.jpeg"
  ]);
  const [ao, normal, height, roughness] = textures;
  useLayoutEffect(() => {
    textures.forEach(
      (texture) => (
        (texture.wrapT = texture.wraps = THREE.RepeatWrapping),
        texture.repeat.set(2, 2)
      )
    );
  }, [textures]);
  return (
    <Reflector
      resolution={1024}
      receiveShadow
      mirror={0.25}
      blur={[250, 250]}
      mixBlur={14}
      mixStrength={1}
      minDepthThreshold={0.9}
      maxDepthThreshold={1.1}
      depthScale={2}
      depthToBlurRatioBias={0.2}
      rotation={[-Math.PI / 2, 0, 0]}
      args={[70, 70]}
    >
      {(Material, props) => (
        <Material
          color="turquoise"
          metalness={0}
          roughness={1}
          roughnessMap={roughness}
          aoMap={ao}
          normalMap={normal}
          normalScale={[0.2, 0.2]}
          envMapIntensity={0.3}
          bumpMap={height}
          {...props}
        />
      )}
    </Reflector>
  );
}

function Rings() {
  const ref1 = useRef();
  const ref2 = useRef();
  const textures = useTexture([
    "/ao.jpg",
    "normal.jpg",
    "/height.png",
    "/roughness.jpg"
  ]);

  const [ao, normal, height, roughness] = textures;
  useLayoutEffect(() => {
    textures.forEach(
      (texture) => (
        (texture.wrapT = texture.wraps = THREE.RepeatWrapping),
        texture.repeat.set(4, 4)
      )
    );
  }, [textures]);

  useFrame(() => {
    ref1.current.rotation.y += 0.05;
    ref2.current.rotation.y += 0.05;
  });

  return (
    <group position-y={0.66}>
      <group ref={ref1}>
        <Torus castShadow args={[1, 0.2, 64, 64]} rotation-x={Math.PI / 2.8}>
          <meshPhysicalMaterial
            color="#a19266"
            metalness={1}
            roughness={1}
            aoMap={a}
            normalMap={normal}
            normalScale={[4, 4]}
            displacementMap={height}
            displacementScale={0.01}
            roughnessMap={roughness}
          />
        </Torus>
      </group>
      <group ref={ref2} position-y={1.27}>
        <Torus castShadow args={[1, 0.2, 64, 64]} rotation-x={-Math.PI / 2.8}>
          <meshPhysicalMaterial
            color="#a19266"
            metalness={1}
            roughness={1}
            aoMap={ao}
            normalMap={normal}
            normalScale={[4, 4]}
            displacementMap={height}
            displacementScale={0.01}
            roughnessMap={roughness}
          />
        </Torus>
      </group>
    </group>
  );
}
