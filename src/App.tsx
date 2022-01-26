import React from 'react';
import * as THREE from 'three';
import {IImage,IAppPageProps,IFramesProps,IFrameProps} from './lib/interface';
import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame,useLoader } from '@react-three/fiber'
import { useCursor, MeshReflectorMaterial, Image, Text, Environment } from '@react-three/drei'
import getUuid from 'uuid-by-string';
import { useRoute, useLocation } from 'wouter'
import  './lib/dropletWater';
const GOLDENRATIO = 1.2

const App:React.FC<IAppPageProps> = ({images}:IAppPageProps) => {
  return (
      <Canvas gl={{ alpha: false }} dpr={[1, 1.5]} camera={{ fov: 70, position: [0, 2, 15] }}>
        <color attach="background" args={['#191920']} />
        <fog attach="fog" args={['#191920', 0, 15]} />
        <Environment preset="city" />
        <group position={[0, -0.5, 0]}>
          <Frames images={images} />
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
            <planeGeometry args={[50, 50]} />
            <MeshReflectorMaterial
                blur={[300, 100]}
                resolution={2048}
                mixBlur={1}
                mixStrength={60}
                roughness={1}
                depthScale={1.2}
                minDepthThreshold={0.4}
                maxDepthThreshold={1.4}
                color="#151515"
                mirror={1}
                metalness={0.5}
            />
          </mesh>
        </group>
      </Canvas>
  );
}
const Frames:React.FC<IFramesProps> = ({ images, q = new THREE.Quaternion(), p = new THREE.Vector3() }:IFramesProps) => {
  const ref = useRef<any>()
  const clicked = useRef<any>()
  const [, params] = useRoute('/item/:id')
  const [, setLocation] = useLocation()
  useEffect(() => {
    clicked.current = ref.current.getObjectByName(params?.id)
    if (clicked.current) {
      clicked.current.parent.updateWorldMatrix(true, true)
      clicked.current.parent.localToWorld(p.set(0, GOLDENRATIO / 2, 1.25))
      clicked.current.parent.getWorldQuaternion(q)
    } else {
      p.set(0, 0, 5.5)
      q.identity()
    }
  })
  useFrame((state, dt) => {
    state.camera.position.lerp(p, THREE.MathUtils.damp(0, 1, 3, dt))
    state.camera.quaternion.slerp(q, THREE.MathUtils.damp(0, 1, 3, dt))
  })
  return (
      <group
          ref={ref}
          onClick={(e) => (e.stopPropagation(), setLocation(clicked.current === e.object ? '/' : '/item/' + e.object.name))}
          onPointerMissed={() => setLocation('/')}>
          {images.map((props:IImage,key:number) => <Frame key={key} index={key} {...props} />)}
      </group>
  )
}
const Frame: React.FC<IFrameProps> = ({ url, dropletUrl, index, c = new THREE.Color(),position,rotation}:IFrameProps) => {
  const [hovered, hover] = useState<boolean>(false)
  const [rnd] = useState<number>(() => Math.random())
  const image = useRef<any>();
  const frame = useRef<any>()
  const droplet = useRef<any>()
  const name = getUuid(index + "");
  useCursor(hovered)
  useFrame((state) => {
    image.current.material.zoom = 1;//2 + Math.sin(rnd * 10000 + state.clock.elapsedTime / 3) / 2
    image.current.scale.x = 0.85; //THREE.MathUtils.lerp(image.current.scale.x, 0.85 * (hovered ? 0.85 : 1), 0.1)
    image.current.scale.y = 0.9; //THREE.MathUtils.lerp(image.current.scale.y, 0.9 * (hovered ? 0.905 : 1), 0.1)
    droplet.current.scale.x = 0.85 * 0.95;
    droplet.current.scale.y = 0.9 * 0.95;
    if(!hovered) {
      droplet.current.position.z = THREE.MathUtils.lerp(droplet.current.position.z, 0.8 , 0.2);
    }
    else{
      droplet.current.position.z = THREE.MathUtils.lerp(droplet.current.position.z, 1.5 , 0.2);
    }
    frame.current.material.color.lerp(c.set(hovered ? 'orange' : 'white').convertSRGBToLinear(), 0.1)
  });
  const texture:THREE.Texture = useLoader(THREE.TextureLoader, dropletUrl);
  const rotate = new THREE.Euler(rotation.x,rotation.y,rotation.z);

  return (
      <group position={position} rotation={rotate}>
        <mesh
            name={name}
            onPointerOver={(e) => (e.stopPropagation(), hover(true))}
            onPointerOut={() => hover(false)}
            scale={[1, GOLDENRATIO, 0.05]}
            position={[0, GOLDENRATIO / 2, 0]}>
          <boxGeometry />
          <meshStandardMaterial color="#151515" metalness={0.5} roughness={0.5} envMapIntensity={2} />
          <mesh ref={frame} raycast={() => null} scale={[0.9, 0.93, 0.9]} position={[0, 0, 0.2]}>
            <boxGeometry/>
            <meshBasicMaterial toneMapped={false} fog={false} />
          </mesh>
          <Image raycast={() => null} ref={image} position={[0, 0, 0.7]} url={url} />
          <mesh  ref={droplet} raycast={() => null} position={[0, 0, 0.8]}>
            <planeBufferGeometry attach="geometry" args={[1, 1]} />
            {/*<meshPhongMaterial attach="material" map={texture} transparent={true}></meshPhongMaterial>*/}
            <meshBasicMaterial attach="material" transparent={true} map={texture} opacity={0.8} toneMapped={false} />
          </mesh>
        </mesh>


      </group>
  )
}

export default App;
