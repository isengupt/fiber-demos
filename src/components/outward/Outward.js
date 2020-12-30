import React, { useRef } from "react";
import { useFrame } from "react-three-fiber";
import shaderMaterial from "./shaderMaterial";

let num = 2000;
let positions = new Float32Array(num * 3);
let angle = new Float32Array(num * 3);
let offset = new Float32Array(num * 3);
let life = new Float32Array(num * 3);
for (let i = 0; i < num; i++) {
  positions.set(
    [Math.random() * 0.3, Math.random() * 0.3, Math.random() * 0.3],
    3 * i
  );

  angle.set([Math.random() * Math.PI * 2], i);

  life.set([4 + Math.random() * 10], i);

  offset.set([1000 * Math.random()], i);
}

function Outward(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef();
  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(({ clock }) => {
    mesh.current.material.uniforms.time.value = clock.elapsedTime;
  });

  return (
    <points {...props} ref={mesh}>
      <bufferGeometry attach="geometry" args={[1, 1, 1]}>
        <bufferAttribute
          attachObject={["attributes", "position"]}
          args={[positions, 3]}
        />
        <bufferAttribute
          attachObject={["attributes", "angle"]}
          args={[angle, 1]}
        />
        <bufferAttribute
          attachObject={["attributes", "life"]}
          args={[life, 1]}
        />
        <bufferAttribute
          attachObject={["attributes", "offset"]}
          args={[offset, 1]}
        />

        {/* <bufferAttribute attachObject={['attributes', 'count']} args={[count, 1]} /> */}
      </bufferGeometry>
      <shaderMaterial attach="material" args={[shaderMaterial]} />
    </points>
  );
}

export default Outward;
