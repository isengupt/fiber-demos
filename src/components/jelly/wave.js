import { fragmentparticle } from "../../shaders/jelly/fragmentparticle";
import { vertexparticle } from "../../shaders/jelly/vertexparticles";
import * as THREE from "three";

const material = {
  uniforms: {
    time: { type: "f", value: 0 },
    resolution: { type: "v4", value: new THREE.Vector4() },
    uvRate1: {
      value: new THREE.Vector2(1, 1),
    },
  },
  wireframe: true,
  extensions: {
    derivatives: "#extension GL_OES_standard_derivatives : enable",
  },
  side: THREE.DoubleSide,

  vertexShader: vertexparticle,
  fragmentShader: fragmentparticle,
};

export default material;
