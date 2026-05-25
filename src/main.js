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
const m = textureLoader.load("/textures/particles/10.png");

const geometry = new THREE.BufferGeometry();
const count = 500;
const positions = new Float32Array(count * 3);
for (let i = 0; i < count * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 10;
}
geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

const material = new THREE.PointsMaterial({
  size: 0.1,
  sizeAttenuation: true,
  map: m,
  transparent: true,
  color: "red",
});
const points = new THREE.Points(geometry, material);
scene.add(points);

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
