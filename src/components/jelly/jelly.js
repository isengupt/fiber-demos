import { fragment } from "../../shaders/jelly/fragment";
import { vertex } from "../../shaders/jelly/vertex";
import * as THREE from "three";

const material = {
  uniforms: {
    time: { type: "f", value: 0 },
    resolution: { type: "v4", value: new THREE.Vector4() },
    uvRate1: {
      value: new THREE.Vector2(1, 1),
    },
  },
  extensions: {
    derivatives: "#extension GL_OES_standard_derivatives : enable",
  },
  side: THREE.DoubleSide,

  vertexShader: vertex,
  fragmentShader: fragment,
};

export default material;
