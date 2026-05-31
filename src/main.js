import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import CANNON from "cannon";

const world = new CANNON.World();
world.gravity.set(0, -9.82, 0);

const defaultMaterial = new CANNON.Material("defaultMaterial");

const contactMaterial = new CANNON.ContactMaterial(
  defaultMaterial,
  defaultMaterial,
  { friction: 0.1, restitution: 0.7 },
);
world.addContactMaterial(contactMaterial);

const sphereShape = new CANNON.Sphere(1);
const sphereBody = new CANNON.Body({
  mass: 1,
  shape: sphereShape,
  material: defaultMaterial,
});
sphereBody.position.set(0, 15, 0);
world.addBody(sphereBody);

const planeShape = new CANNON.Plane();
const planeBody = new CANNON.Body({
  mass: 0,
  shape: planeShape,
  material: defaultMaterial,
});
planeBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
world.addBody(planeBody);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100,
);
camera.position.z = 14;
camera.position.y = 5;
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector(".webgl"),
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
camera.position.z = 3;

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.MeshStandardMaterial({ color: "red" });
const sphere = new THREE.Mesh(sphereGeometry, material);
scene.add(sphere);
const pointLight = new THREE.PointLight(0xffffff, 10);
pointLight.position.set(2, 3, 4);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const planeGeometry = new THREE.PlaneGeometry(100, 100);
const planeMaterial1 = new THREE.MeshStandardMaterial({
  color: "green",
  side: THREE.DoubleSide,
});

const plane = new THREE.Mesh(planeGeometry, planeMaterial1);
plane.rotation.x = -Math.PI / 2;
plane.position.y = -1;
scene.add(plane);
plane.receiveShadow = true;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
pointLight.castShadow = true;
sphere.castShadow = true;
sphere.receiveShadow = true;

let oldElapsedTime = 0;
const clock = new THREE.Clock();
function animate() {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - oldElapsedTime;
  oldElapsedTime = elapsedTime;

  controls.update();

  world.step(1 / 60, deltaTime, 3);
  sphere.position.copy(sphereBody.position);
  plane.position.copy(planeBody.position);

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();
