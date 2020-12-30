import React, { useRef } from "react";
import { useFrame } from "react-three-fiber";
import * as THREE from "three";
import shaderMaterial from "./shader";

let count = 500;

let position = new Float32Array(count * count * 3);

for (let i = 0; i < count; i++) {
  for (let j = 0; j < count; j++) {
   /*   let u = Math.random() * 2 * Math.PI;
    let v = Math.random() * Math.PI;
    let x = 6 * (0.9 + 0.2 * v) * Math.cos(u) * Math.sin(v);
    let y = 6 * 1.5 * Math.cos(v);
    let z = 6 * (0.9 + 0.2 * v) * Math.sin(u) * Math.sin(v);
    
    position.set([x, y, z], 3 * (count * i + j));
    */
     position.set([
      (i/count - 0.5)*10,
      (j/count - 0.5)*10,
      0
    ],3*(count*i+j)) 
    
  }
}

function Paste(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef();
  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(({ clock }) => {
    mesh.current.material.uniforms.time.value = clock.elapsedTime;
  });

  return (
    <points {...props} ref={mesh}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attachObject={["attributes", "position"]}
          args={[position, 3]}
        />
      </bufferGeometry>
      <shaderMaterial attach="material" 
       
      args={[shaderMaterial]} />
    </points>
  );
}

export default Paste;
