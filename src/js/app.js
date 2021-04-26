// add styles
import "../scss/app.scss";

// import Three.js
import * as THREE from "three";

// textuers
import sunTextureImage from "../textuers/sun.jpg";
import earthTextureImage from "../textuers/earth.jpg";
import moonTextureImage from "../textuers/moon.jpg";
import { SrcColorFactor } from "three";

let renderer, camera, scene;
let textureLoader = new THREE.TextureLoader();
let sunMesh, earthMesh;
// objects of array
const objects = [];

init();
animate();

function init() {
  // textures loaders
  const sunTexture = textureLoader.load(sunTextureImage);
  const eartTexture = textureLoader.load(earthTextureImage);
  const moonTexture = textureLoader.load(moonTextureImage);

  // initiate scene
  scene = new THREE.Scene();

  // initiate camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    5000
  );
  // camera.position.z = 50;
  camera.position.set(0, 50, 0);
  camera.up.set(0, 0, 1);
  camera.lookAt(0, 0, 0);

  // basic geomatery
  const radius = 1;
  const widthSegments = 32;
  const heightSegments = 32;
  const sphareGeomatery = new THREE.SphereGeometry(
    radius,
    widthSegments,
    heightSegments
  );

  // creating parent node for the solar system
  const solarSystem = new THREE.Object3D();
  scene.add(solarSystem);
  objects.push(solarSystem);

  // createing sun
  const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture });
  sunMesh = new THREE.Mesh(sphareGeomatery, sunMaterial);
  sunMesh.scale.set(5, 5, 5);
  solarSystem.add(sunMesh);
  objects.push(sunMesh);

  // earth orbit 3D null object to hold earth and its moon orbit
  const earthOrbit = new THREE.Object3D();
  earthOrbit.position.x = 25;
  solarSystem.add(earthOrbit);
  objects.push(earthOrbit);

  // creating earth
  const earthMaterial = new THREE.MeshBasicMaterial({ map: eartTexture });
  earthMesh = new THREE.Mesh(sphareGeomatery, earthMaterial);
  earthMesh.scale.set(2.5, 2.5, 2.5);
  earthOrbit.add(earthMesh);
  objects.push(earthMesh);

  // creating mood orbit with 3D null object
  const moonOrbit = new THREE.Object3D();
  moonOrbit.position.x = 8;
  earthOrbit.add(moonOrbit);

  // creating moon mesh
  const moonMaterial = new THREE.MeshBasicMaterial({ map: moonTexture });
  const moonMesh = new THREE.Mesh(sphareGeomatery, moonMaterial);
  moonMesh.scale.set(1, 1, 1);
  moonOrbit.add(moonMesh);
  objects.push(moonMesh);

  // setup webgl renderer with smooth edges
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);

  // adjuest the pixel ration
  renderer.setPixelRatio(window.devicePixelRatio);

  // apend renderer to the body
  document.body.appendChild(renderer.domElement);

  window.addEventListener("resize", onWindowResize);
}

// render the scene
renderer.render(scene, camera);

// responsive canvas
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate(time) {
  time *= 0.001;
  requestAnimationFrame(animate);
  objects.forEach((obj) => {
    obj.rotation.y = time;
  });
  renderer.render(scene, camera);
}
