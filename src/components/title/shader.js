import * as THREE from "three";

var shaderMaterial = {
    uniforms: {
      time: { type: 'f', value: 0 },
      resolution: {type: 'v4', value: new THREE.Vector4()},
      uvRate1: {
        value: new THREE.Vector2(1,1)
      },
      level: {
        type: 'f', value: 0
      },
      playhead: {
        type: 'f', value: 0
      },
      black: {
        type: 'f', value: 0
      }
    },
    side: THREE.DoubleSide,
  transparent: true,
    vertexShader: `
      uniform float time;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
      }
    `,
    fragmentShader: `


    precision highp float;
    uniform float time;
    uniform float progress;
    uniform float level;
    uniform float playhead;
 
    varying vec2 vUv;


      void main() {
        float w = 0.4;
        float smoothness = 0.003;
        float border = smoothstep(w,w + smoothness,vUv.x);
        float border1 = smoothstep(w,w + smoothness,vUv.y);
        float border2 = smoothstep(w,w + smoothness,1. - vUv.y);
        float border3   = smoothstep(w,w + smoothness,1. - vUv.x);
        border *= border1 * border2 * border3;
       
        if (border==1.) discard;
        gl_FragColor = vec4(vec3(0.267, 0.970,0.970), border);


      }
    `
  }
  
  export default shaderMaterial
  