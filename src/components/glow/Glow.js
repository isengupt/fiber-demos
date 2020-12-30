import React, { useEffect, useRef, useMemo } from "react";
import { extend, useFrame, useThree } from "react-three-fiber";
import material from "./material";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";

extend({ EffectComposer, RenderPass, UnrealBloomPass });

function Effect(props) {
  const composer = useRef();
  const { scene, gl, size, camera } = useThree();
  const aspect = useMemo(() => new THREE.Vector2(size.width, size.height), []);
  useEffect(() => void composer.current.setSize(size.width, size.height), [
    size,
  ]);

 
  useFrame(() => composer.current.render(), 1);
  return (
    <effectComposer ref={composer} args={[gl]}>
      <renderPass attachArray="passes" scene={scene} camera={camera} />
      <unrealBloomPass
        attachArray="passes"
        args={[aspect, 1.5, 0.4, 0.85]}
        ref={props.bloomPass}
        strength={props.bloomPass.current.strength}
      />
    </effectComposer>
  );
}

function Glow(props) {
  // This reference will give us direct access to the mesh
  //const mesh = useRef();
  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(({ clock }) => {
    props.mesh.current.material.uniforms.time.value = clock.elapsedTime;
    // props.mesh.current.material.uniforms.distortion.value = props.distortion;
    // props.mesh.current.material.uniforms.progress.value = props.progress;
  });

  return (
    <points {...props} ref={props.mesh}>
      <planeBufferGeometry
        attach="geometry"
        args={[96 * 10, 64 * 10, 96 * 10, 64 * 10]}
      ></planeBufferGeometry>
      <shaderMaterial attach="material" args={[material]} />
    </points>
  );
}

export default function GlowItem(props) {
  
  return (
    <>
      <Effect bloomPass={props.bloomPass} />
      <Glow position={[0, 0, 0]} mesh={props.mesh} />
    </>
  );
}


