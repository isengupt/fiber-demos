import React, { useRef } from "react";
import * as THREE from "three";

import Cube from "./components/cube/Cube";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";
import { ChromaticAberration, EffectComposer} from 'react-postprocessing'
import { Canvas, extend, useFrame, useThree } from "react-three-fiber";
import "./styles.css";
var colors = require("nice-color-palettes");
/* import JellyItem from "./components/jelly/JellyItem";
import Points from "./components/jelly/Points";
import Outward from "./components/outward/Outward";
import GlowItem from "./components/glow/Glow";
import Ico, {Outline, Effect} from "./components/ico/Ico";
import Title from "./components/title/Title";
import Paste from "./components/paste/Paste"; */

extend({ OrbitControls });
let pallete = colors[96];
const CameraControls = () => {
  const {
    camera,
    gl: { domElement },
  } = useThree();

  const controls = useRef();
  useFrame((state) => controls.current.update());
  return <orbitControls ref={controls} args={[camera, domElement]} />;
};

function ClearPlane(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef();
  // Rotate mesh every frame, this is outside of React without overhead

  return (
    <mesh {...props} ref={mesh}>
      <planeGeometry attach="geometry" args={[7, 7]}></planeGeometry>

      <meshBasicMaterial
        attach="material"
        color={0x0000ff}
        transparent={true}
        opacity={0.01}
      />
    </mesh>
  );
}

function App() {
  const mesh = useRef();
  const bloomPass = useRef({
    strength: 0,
  });
  //let distortion = 0;
  //let progress = 0;

  function shiftImages() {
    gsap.to(mesh.current.material.uniforms.distortion, {
      duration: 2,
      value: 2,
      ease: "power2.inOut",
    });

    gsap.to(mesh.current.material.uniforms.progress, {
      duration: 0.5,
      value: 1,
      delay: 1.5,
    });

    gsap.to(bloomPass.current, {
      duration: 2,
      strength: 20,
      ease: "power2.in",
    });

    gsap.to(mesh.current.material.uniforms.distortion, {
      duration: 2,
      value: 0,
      delay: 2,
      ease: "power2.inOut",
    });

    gsap.to(bloomPass.current, {
      duration: 2,
      strength: 0,
      delay: 2,
      ease: "power2.out",
    });
  }

  return (
    <div style={{ height: "100vh" }}>
      <Canvas
        camera={{
          //fov: 70,

          //near: 0.001,
          // far: 1000,
          position: [0, 6, 0],
          //position: [2, 2, 2],
        }}
        gl={
          {
            //antialias: true,
            // alpha:false,
            preserveDrawingBuffer: true
          }
        }
        onCreated={({ gl, camera }) => {
          //  gl.physicallyCorrectLights = true;
          //  gl.outputEncoding = THREE.sRGBEncoding;
          gl.setClearColor(pallete[4]);
        }}
        // pixelRatio={getDevicePixelRatio()}
        //onClick={shiftImages}
      >
        {/*    <JellyItem position={[0, 0, 0]} />
        <Points position={[0, 0, 0]} /> 
        <GlowItem mesh={mesh} bloomPass={bloomPass} />
      
        */}
        <CameraControls />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <EffectComposer>
        <ChromaticAberration offset={[-0.001,0.008]}/>
      </EffectComposer>
        <Cube count= {20} position={[0, 0, 0]} />
      </Canvas>
    </div>
  );
}

const getDevicePixelRatio = (maxDpr = 2) =>
  typeof window !== "undefined"
    ? Math.min(
        Math.max(Math.round(window.devicePixelRatio), 1),
        maxDpr
      ).toFixed(1)
    : "1.0";

export default App;
