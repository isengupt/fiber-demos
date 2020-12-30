

import { fragment } from "../../shaders/glow/fragment";
import { vertex } from "../../shaders/glow/vertex";
import * as THREE from "three";
import t from './img/img3.jpg'
import t1 from './img/img4.jpg'

const material = {
    fragmentShader: fragment,
    vertexShader: vertex,
       extensions: {
      derivatives: "#extension GL_OES_standard_derivatives: enable",
    }, 
    uniforms: {
      time: { type: "f", value: 0 },
    
      distortion: { type: "f", value: 0.0 },
      t: { type: "t", value: new THREE.TextureLoader().load(t) },
      t1: { type: "t", value: new THREE.TextureLoader().load(t1) },
      resolution: { type: "v4", value: new THREE.Vector4() },
      progress: { type: "f", value: 0 },
      uvRate1: {
        value: new THREE.Vector2(1, 1),
      },
    },
    side: THREE.DoubleSide,
};

export default material;