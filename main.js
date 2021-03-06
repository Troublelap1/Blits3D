import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 30;
camera.position.x = -3;

renderer.render( scene, camera );

// Torus

//const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
//const material = new THREE.MeshStandardMaterial( { color: 0xeab676 } );
//const torus = new THREE.Mesh( geometry, material );

//scene.add( torus );

// Lights

const pointLight = new THREE.PointLight( 0xFFFFFF )
pointLight.position.x = 5,5,5;

const ambientLight = new THREE.AmbientLight( 0xffffff );
scene.add( pointLight, ambientLight );

// Helpers

// const lightHelper = new THREE.PointLightHelper( pointLight)
 //const gridHelper = new THREE.GridHelper( 200, 50);
 //scene.add(gridHelper);

// const controls = new OrbitControls(camera, renderer.domElement);

// Stars

function addStar() {
  const geometry = new THREE.SphereGeometry( 0.25, 24, 24 );
  const material = new THREE.MeshStandardMaterial( { color: 0xffffff } );
  const star = new THREE.Mesh( geometry, material );

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 200 ));
  star.position.set(x, y, z);
  scene.add( star );
}

Array(200).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load('space.jpeg');
scene.background = spaceTexture;



// Avatar

const blitsTexture = new THREE.TextureLoader().load('blits.png');
const blits = new THREE.Mesh(
  new THREE.BoxGeometry(1, .5, 1),
  new THREE.MeshStandardMaterial({ map: blitsTexture })
);

scene.add(blits);

// Moon

const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.png');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: moonTexture,
  })
);

scene.add(moon);

moon.position.z = 15;
moon.position.setX(-10);

blits.position.z = -5;
blits.position.x = 2;

// Camera

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.005;
  moon.rotation.y += 0.0075;
  moon.rotation.z += 0.005;

  blits.rotation.y += 0.01;
  blits.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame( animate);
  
  //torus.rotation.x += 0.01;
  //torus.rotation.y += 0.005;
  //torus.rotation.z += 0.01;

  moon.rotation.x += 0.05;

  // controls.update();

  renderer.render( scene, camera );
}

animate();