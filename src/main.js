import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

console.log(THREE);
const canvas = document.querySelector("#bg");
console.log(canvas);
console.log("Hello Vite!");

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

const mesh = new THREE.Mesh(
  new THREE.PlaneGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
);
scene.add(mesh);

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(3);

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();
