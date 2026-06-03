import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
let ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

const sphere1 = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 32, 32),
  new THREE.MeshStandardMaterial({ color: "#ff0000" }),
);
sphere1.position.set(-2, 0, 0);
scene.add(sphere1);

const sphere2 = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 32, 32),
  new THREE.MeshStandardMaterial({ color: "#ff0000" }),
);
sphere2.position.set(2, 0, 0);
scene.add(sphere2);

const sphere3 = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 32, 32),
  new THREE.MeshStandardMaterial({ color: "#ff0000" }),
);
sphere3.position.set(0, 0, 0);
scene.add(sphere3);

camera.position.set(0, 5, 10);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector(".webgl"),
  antialias: true,
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const raycaster = new THREE.Raycaster();
const rayOrigin = new THREE.Vector3(-3, 0, 0);
const rayDirection = new THREE.Vector3(10, 0, 0);
rayDirection.normalize();
raycaster.set(rayOrigin, rayDirection);
const intersect = raycaster.intersectObject(sphere3);

const intersects = raycaster.intersectObjects([sphere1, sphere2, sphere3]);
if (intersects.length > 0) {
  console.log("Intersection detected with:", intersects[0].object);
}

let clock = new THREE.Clock();
const animate = function () {
  let delta = clock.getElapsedTime();
  sphere1.position.y = Math.sin(delta * 0.5) * 2;
  sphere2.position.y = Math.sin(delta * 0.5) * 2;
  sphere3.position.y = Math.sin(delta * 0.5) * 2;

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};

animate();
