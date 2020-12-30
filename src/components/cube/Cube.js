import React, { useRef } from "react";
import { useFrame } from "react-three-fiber";
import * as THREE from "three";
import "./ColorMaterial";
import clamp from 'clamp'

var colors = require('nice-color-palettes');

const tempObject = new THREE.Object3D();


let pallete = colors[96]

let  easeInOutQuint = function(pos) {
  if ((pos/=0.5) < 1) return 0.5 * Math.pow(pos,5)
  return 0.5 * (Math.pow((pos-2),5) + 2)
}

function Cube({count}) {
  // This reference will give us direct access to the mesh
  const mesh = useRef();
  // Rotate mesh every frame, this is outside of React without overhead
  useFrame((state) => {
    const time = state.clock.getElapsedTime()%4;
    let playhead = time/6
    // mesh.current.position.x = Math.sin(time)
    //mesh.current.rotation.x = Math.sin(time / 4)
    //mesh.current.rotation.y = Math.sin(time / 2)
    let i = 0;
    let number = count;
    for (let x = 0; x <= number; x++)
      for (let z = 0; z <= number; z++) {
        let offset = Math.sqrt((x / number - 0.5)**2 +(z/ number - 0.5)**2 )/Math.sqrt(0.5**2 + 0.5**2)
        const id = i++;
        let progress = easeInOutQuint( clamp((playhead - 0.4*offset)/0.6,0,1));
        tempObject.position.set(
          30 * (x / number - 0.5) + progress*1.5,
          offset * 0,
          30 * (z / number - 0.5)
        );
        //tempObject.rotation.y = Math.sin(x / 4 + time) + Math.sin(z / 4 + time);
 let sine = Math.sin(progress*Math.PI )

 tempObject.rotation.y = progress*Math.PI*2
 
        const scale = 1;
        tempObject.scale.set(scale + 0.5*sine, scale + 0.5*sine, scale + 0.5*sine);
        tempObject.updateMatrix(); 
        mesh.current.setMatrixAt(id, tempObject.matrix);
      }
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh  ref={mesh} args={[null, null, 1000]}>
      <boxBufferGeometry attach="geometry" args={[0.7, 4.3, 0.7]} />
      <colorMaterial
        color={pallete[1]}
        color1={pallete[2]}
        color2={pallete[3]}
        attach="material"
      />

  
      {/*  <meshStandardMaterial attach="material" color={'hotpink'}/> */}
    </instancedMesh>
  );
}

export default Cube;
