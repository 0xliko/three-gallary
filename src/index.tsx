import * as THREE from 'three';
import React,{Suspense} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {IImage} from './lib/interface';

import jenImg from './assets/images/photos/jen.jpg';
import jonnyImg from './assets/images/photos/jonny.jpg';
import mattImg from './assets/images/photos/matt.jpg';

import jenDropletsImg from './assets/images/droplets/jen-droplets.png';
import jonnyDropletsImg from './assets/images/droplets/jonny-droplets.png';
import mattDropletsImg from './assets/images/droplets/matt-droplets.png';



const images:IImage[] = [
    // Front
    { position: new THREE.Vector3(0, 0, 1.5), rotation: new THREE.Vector3(0, 0, 0), url: jenImg,dropletUrl: jenDropletsImg },
    // Back
    { position: new THREE.Vector3(-0.8, 0, -0.6), rotation: new THREE.Vector3(0,0,0,), url: jonnyImg,dropletUrl:jonnyDropletsImg },
    { position: new THREE.Vector3(0.8, 0, -0.6), rotation: new THREE.Vector3(0, 0, 0), url: mattImg, dropletUrl:mattDropletsImg },
    // Left
    { position: new THREE.Vector3(-1.75, 0, 0.25), rotation: new THREE.Vector3(0, Math.PI / 2.5, 0), url: jenImg,dropletUrl: jenDropletsImg },
    { position: new THREE.Vector3(-2.15, 0, 1.5), rotation: new THREE.Vector3(0, Math.PI / 2.5, 0), url: jonnyImg,dropletUrl:jonnyDropletsImg },
    { position: new THREE.Vector3(-2, 0, 2.75), rotation: new THREE.Vector3(0, Math.PI / 2.5, 0), url: mattImg,dropletUrl:mattDropletsImg },
    // Right
    { position: new THREE.Vector3(1.75, 0, 0.25), rotation: new THREE.Vector3(0, -Math.PI / 2.5, 0), url: jenImg,dropletUrl: jenDropletsImg },
    { position: new THREE.Vector3(2.15, 0, 1.5), rotation: new THREE.Vector3(0, -Math.PI / 2.5, 0), url: jonnyImg,dropletUrl:jonnyDropletsImg },
    { position: new THREE.Vector3(2, 0, 2.75), rotation: new THREE.Vector3(0, -Math.PI / 2.5, 0), url: mattImg,dropletUrl:mattDropletsImg }
]

ReactDOM.render(
  <Suspense fallback={null}>
            <App images={images}/>
  </Suspense>,
  document.getElementById('root')
);
reportWebVitals();
