import React, { useRef } from "react";
import { useFrame } from "react-three-fiber";
import * as THREE from "three";
import shaderMaterial from "./shader";
import { fragment } from "../../shaders/title/fragment";
import { vertex } from "../../shaders/title/vertex";
let nums = 20;
let mat1s = [];
let mat0s = [];

for (var i = 0; i <= nums; i++) {
  let level = i / nums;
  console.log(level);
  let m0 = Object.assign({}, shaderMaterial);
  let m1 = Object.assign({}, shaderMaterial);
  m0.uniforms.black.value = 1;
  m1.uniforms.black.value = 0;
  m0.uniforms.level.value = level;
  m1.uniforms.level.value = level;

  mat1s.push(m1);
  mat0s.push(m0);
}

function Title(props) {
  // This reference will give us direct access to the mesh
  let mesh0Ref = useRef({});
  let mesh1Ref = useRef({});
  let planeRef = useRef();

  // Rotate mesh every frame, this is outside of React without overhead
  const radiansX = Math.PI / 2;
  const radiansY = (0 * Math.PI) / 180;
  const radiansZ = (0 * Math.PI) / 180;

  useFrame(({ clock }) => {
    //mesh0Ref.current.material.uniforms.time.value = clock.elapsedTime;

    Array.from(new Array(20)).map((_, i) => {
      mesh0Ref.current[i].material.uniforms.time.value = clock.elapsedTime;
      mesh1Ref.current[i].material.uniforms.time.value = clock.elapsedTime;
    });
  });

  return (
    <>
      <group {...props} >
        {Array.from(new Array(20)).map((_, i) => (
          <mesh
            transparent={true}
            ref={(ref) => (mesh0Ref.current[i] = ref)}
            rotation={[radiansX, radiansY, radiansZ]}
            key={i}
            position={[1, i / nums, 1]}
          >
            <planeBufferGeometry attach="geometry" args={[1, 1]}>
              {/* <bufferAttribute attachObject={['attributes', 'count']} args={[count, 1]} /> */}
            </planeBufferGeometry>
            <shaderMaterial
              attach="material"
              transparent={true}
              wireframe={false}
              args={[
                {
                  uniforms: {
                    time: { type: "f", value: 0 },
                    resolution: { type: "v4", value: new THREE.Vector4() },
                    uvRate1: {
                      value: new THREE.Vector2(1, 1),
                    },
                    level: {
                      type: "f",
                      value: i / nums,
                    },
                    playhead: {
                      type: "f",
                      value: 0,
                    },
                    black: {
                      type: "f",
                      value: 1,
                    },
                  },
                  side: THREE.DoubleSide,
                  transparent: true,
                  vertexShader: vertex,
                  fragmentShader: fragment,
                },
              ]}
            />
          </mesh>
        ))}

        {Array.from(new Array(20)).map((_, i) => (
          <mesh
            transparent={true}
            ref={(ref) => (mesh1Ref.current[i] = ref)}
            rotation={[radiansX, radiansY, radiansZ]}
            key={i}
            position={[1, i / nums - 0.005, 1]}
          >
            <planeBufferGeometry attach="geometry" args={[1, 1]}>
              {/* <bufferAttribute attachObject={['attributes', 'count']} args={[count, 1]} /> */}
            </planeBufferGeometry>
            <shaderMaterial
              attach="material"
              transparent={true}
              wireframe={false}
              args={[
                {
                  uniforms: {
                    time: { type: "f", value: 0 },
                    resolution: { type: "v4", value: new THREE.Vector4() },
                    uvRate1: {
                      value: new THREE.Vector2(1, 1),
                    },
                    level: {
                      type: "f",
                      value: i / nums,
                    },
                    playhead: {
                      type: "f",
                      value: 0,
                    },
                    black: {
                      type: "f",
                      value: 0,
                    },
                  },
                  side: THREE.DoubleSide,
                  transparent: true,
                  vertexShader: vertex,
                  fragmentShader: fragment,
                },
              ]}
            />
          </mesh>
        ))}

        <mesh ref={planeRef}
        position={[1,0.4,1]}
                  rotation={[radiansX, radiansY, radiansZ]}
        
         >
          <planeBufferGeometry attach="geometry" args={[6, 6]}>
            {/* <bufferAttribute attachObject={['attributes', 'count']} args={[count, 1]} /> */}
          </planeBufferGeometry>
          <shaderMaterial attach="material" args={[shaderMaterial]} />
        </mesh>
      </group>
    </>
  );
}

export default Title;
