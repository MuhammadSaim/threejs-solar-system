// add styles
import "../scss/app.scss";

// import Three.js
import * as THREE from "three";

// setup webgl renderer with smooth edges
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);

// textuers
import sunTextureImage from "../textuers/sun.jpg";

// textures loaders
const sunTexture = new THREE.TextureLoader().load(sunTextureImage);

// initiate scene
const scene = new THREE.Scene();

// initiate camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  1,
  5000
);
camera.position.z = 100;

// objects of array
const objects = [];

// basic geomatery
const radius = 1;
const widthSegments = 6;
const heightSegments = 6;
const sphareGeomatery = new THREE.SphereGeometry(
  radius,
  widthSegments,
  heightSegments
);

// createing sun
const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture });
const sunMesh = new THREE.Mesh(sphareGeomatery, sunMaterial);
sunMesh.scale.set(15, 15, 15);
scene.add(sunMesh);

// adjuest the pixel ration
renderer.setPixelRatio(window.devicePixelRatio);

// apend renderer to the body
document.body.appendChild(renderer.domElement);

// render the scene
renderer.render(scene, camera);

// responsive canvas
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
