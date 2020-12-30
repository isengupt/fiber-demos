import { fragment } from "../../shaders/outward/fragment";
import { vertex } from "../../shaders/outward/vertex";
import * as THREE from "three";

const shaderMaterial = {
    extensions: {
        derivatives: "#extension GL_OES_standard_derivatives : enable",
      },
      side: THREE.DoubleSide,
      uniforms: {
        time: { type: "f", value: 0 },
        uMouse: { type: "v2", value: new THREE.Vector2(0, 0) },
        resolution: { type: "v4", value: new THREE.Vector4()  },
        uvRate1: {
          value: new THREE.Vector2(1, 1),
        },
      },
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: true,
      depthTest: false,
      depthWrite: false,
};

export default shaderMaterial;
