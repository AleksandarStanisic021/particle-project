import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import CANNON from "cannon";

const world = new CANNON.World();
world.gravity.set(0, -9.82, 0);

const defaultMaterial = new CANNON.Material("defaultMaterial");
/*
const contactMaterial = new CANNON.ContactMaterial(
  defaultMaterial,
  defaultMaterial,
  { friction: 0.1, restitution: 0.7 },
);
world.addContactMaterial(contactMaterial);
*/
/*
const sphereShape = new CANNON.Sphere(1);
const sphereBody = new CANNON.Body({
  mass: 1,
  shape: sphereShape,
  material: defaultMaterial,
});
sphereBody.position.set(0, 5, 0);
sphereBody.applyLocalForce(new CANNON.Vec3(15, 0, 0), sphereBody.position);
world.addBody(sphereBody);
*/
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

const pointLight = new THREE.PointLight(0xffffff, 10);
pointLight.position.set(2, 3, 4);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight("#fdc705", 0.5);
scene.add(ambientLight);

const planeGeometry = new THREE.PlaneGeometry(100, 100);
const planeMaterial1 = new THREE.MeshStandardMaterial({
  roughness: 0.5,
  metalness: 0.5,
  color: "#ad0000",

  side: THREE.DoubleSide,
});

const plane = new THREE.Mesh(planeGeometry, planeMaterial1);
plane.rotation.x = -Math.PI / 2;
plane.position.y = -1;
scene.add(plane);
plane.receiveShadow = true;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
pointLight.castShadow = true;

const objectsToUpdate = [];

const createSphere = (radius, position) => {
  const sphereGeometry = new THREE.SphereGeometry(radius, 32, 32);
  const sphereMaterial = new THREE.MeshStandardMaterial({
    roughness: 0.5,
    metalness: 0.5,
    color: Math.random() * 0xffffff,
  });
  const mesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
  mesh.castShadow = true;
  mesh.position.copy(position);
  scene.add(mesh);

  const shape = new CANNON.Sphere(radius);
  const body = new CANNON.Body({
    mass: 1,
    shape,
    position: new CANNON.Vec3(0, 3, 0),
    material: defaultMaterial,
  });
  body.position = new CANNON.Vec3(0, 3, 0);
  body.position.copy(position);
  world.addBody(body);
  objectsToUpdate.push({ mesh: mesh, body: body });
};
createSphere(1, { x: 1, y: 3, z: 1 });
createSphere(0.5, { x: 2, y: 3, z: 2 });
createSphere(0.75, { x: 3, y: 3, z: 3 });

const createBox = (width, height, depth, position) => {
  const boxGeometry = new THREE.BoxGeometry(width, height, depth);
  const boxMaterial = new THREE.MeshStandardMaterial({
    roughness: 0.5,
    metalness: 0.5,
    color: Math.random() * 0xffffff,
  });
  const mesh = new THREE.Mesh(boxGeometry, boxMaterial);
  mesh.castShadow = true;
  mesh.position.copy(position);
  scene.add(mesh);

  const shape = new CANNON.Box(
    new CANNON.Vec3(width / 2, height / 2, depth / 2),
  );
  const body = new CANNON.Body({
    mass: 1,
    shape,
    position: new CANNON.Vec3(0, 3, 0),
    material: defaultMaterial,
  });
  body.position.copy(position);
  world.addBody(body);
  objectsToUpdate.push({ mesh: mesh, body: body });
};
createBox(1, 1, 1, { x: -1, y: 3, z: -1 });
createBox(1, 2, 2, { x: -2, y: 3, z: -2 });

let oldElapsedTime = 0;
const clock = new THREE.Clock();

function animate() {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - oldElapsedTime;
  oldElapsedTime = elapsedTime;

  controls.update();

  world.step(1 / 60, deltaTime, 3);
  for (const object of objectsToUpdate) {
    object.mesh.position.copy(object.body.position);

    object.mesh.quaternion.copy(object.body.quaternion);
  }

  plane.position.copy(planeBody.position);
  plane.quaternion.copy(planeBody.quaternion);
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();
