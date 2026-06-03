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
/*
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
*/
/*
const mouse = new THREE.Vector2();
window.addEventListener("mousemove", (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});
*/

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

let clock = new THREE.Clock();
const animate = function () {
  /*
  const rayOrigin = new THREE.Vector3(-3, 0, 0);
  const rayDirection = new THREE.Vector3(1, 0, 0).normalize();
  raycaster.set(rayOrigin, rayDirection);

  const ojectsToTest = [sphere1, sphere2, sphere3];
  /*


  const intersects = raycaster.intersectObjects(ojectsToTest);

  for (let object of ojectsToTest) {
    object.material.color.set("#ff0000");
  }
  for (const intersect of intersects) {
    intersect.object.material.color.set("#0000ff");
  }*/
  /* raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(ojectsToTest);
  if (intersects.length > 0) {
    intersects[0].object.material.color.set("#ff00e1");
  } else {
    for (let object of ojectsToTest) {
      object.material.color.set("#ff0000");
    }
  }
*/
  let delta = clock.getElapsedTime();

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};

animate();
