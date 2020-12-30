import React, { useRef } from 'react'
import { useFrame } from 'react-three-fiber'
import pmaterial from './wave'


let N = 4000;

var positions = new Float32Array(N * 3);



let inc = Math.PI * (3 - Math.sqrt(5));

let off = 2 / N;
let rad = 1.7;

for (let i = 0; i < N; i++) {
  let y = i * off - 1 + off / 2;
  let r = Math.sqrt(1 - y * y);
  let phi = i * inc;

  positions[3 * i] = rad * Math.cos(phi) * r;
  positions[3 * i + 1] = rad * y;
  positions[3 * i + 2] = rad * Math.sin(phi) * r;
}




function Points(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()
  // Rotate mesh every frame, this is outside of React without overhead
   useFrame(({ clock }) => {
    mesh.current.material.uniforms.time.value = clock.elapsedTime
  }) 

  

  return (
    <points {...props} ref={mesh}>
      <bufferGeometry attach="geometry" args={[1, 1, 1]}>
        <bufferAttribute attachObject={['attributes', 'position']} args={[positions, 3]} />
 
        {/* <bufferAttribute attachObject={['attributes', 'count']} args={[count, 1]} /> */}
      </bufferGeometry>
      <shaderMaterial attach="material" args={[pmaterial]} />
    </points>
  )
}

export default Points