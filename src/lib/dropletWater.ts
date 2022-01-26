import { extend,ReactThreeFiber } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import glsl from 'babel-plugin-glsl/macro'
import * as THREE from 'three';
declare global {
    namespace JSX {
        interface IntrinsicElements {
            waterDroplet: any
        }
    }
}
const WaterDroplet = shaderMaterial(
    {
        map: null,
        color: new THREE.Color(1,1,1)
    },
`varying vec2 vUv;
      void main(){
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,
`varying vec2 vUv;
          uniform sampler2D map;
          void main(){
            vec2 uv = vUv;
            gl_FragColor.rgba = vec4(1,1,1,1.0);
            //vec4 _texture = texture2D(map, uv);
            //vec3 color = mix(_texture.rgb, vec3(1), 1.0 - _texture.a);
            //gl_FragColor = vec4(color, 1);
          }`,
    (material)=>{
        console.log(material)
    }
)
extend({ WaterDroplet })
