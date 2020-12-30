export var fragment = `
//precision highp float;
uniform float time;
uniform float progress;
uniform sampler2D landscape;
uniform vec4 resolution;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 eyeVector;
varying vec3 vBary;
float PI = 3.141592653589793238;

vec2 hash22(vec2 p) {
  p = fract(p * vec2(5.3983, 5.4427));
  p += dot(p.yx, p.xy + vec2(21.5351, 14.3137));

  return fract(vec2(p.x * p.y * 95.4337, p.x * p.y * 97.597));
}
  void main() {

    vec3 X = dFdx(vNormal);
    vec3 Y = dFdy(vNormal);
    vec3 normal = normalize(cross(X,Y));
    float diffuse = dot(normal, vec3(1.));
    vec2 rand = hash22(vec2(floor(diffuse*10.)));
vec2 uuv = vec2(
  sign(rand.x-0.5)*1. + (rand.x -0.5)*0.3,
  sign(rand.y -0.5)*1. + (rand.y-0.5)*0.3
  
  );
float fresnel = abs(1. + dot(eyeVector, normal));
vec2 uv =  uuv *gl_FragCoord.xy / vec2(1000.);


    vec3 refracted = refract(eyeVector,normal, 1./3.);
    uv += 0.2 * refracted.xy;




    vec4 t = texture2D(landscape, uv);

    
    //gl_FragColor = vec4(vUv.x, vUv.y, 0, 1.0);


  gl_FragColor = t*(1. - fresnel);
  //gl_FragColor = vec4(vBary,1.);

  //gl_FragColor = vec4(vec3(fresnel),1.);
  }
`;