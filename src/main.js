import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const canvas = document.querySelector("#bg");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

const textureLoader = new THREE.TextureLoader();
textureLoader.load("/textures/particles/10.png", (texture) => {
  const particleGeometry = new THREE.SphereGeometry(1, 32, 32);
  const particleMaterial = new THREE.PointsMaterial({
    size: 0.02,
    sizeAttenuation: true,
    map: texture,
    transparent: true,
  });
  const particleMesh = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(particleMesh);
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(3);

const pointLight = new THREE.PointLight("white", 100);
pointLight.position.set(1, 1, 1);
scene.add(pointLight);
const ambientLight = new THREE.AmbientLight("white", 100);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight("white", 100);
directionalLight.position.set(0, 1, 0);
scene.add(directionalLight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();
