import "./style.css";
import * as THREE from "three";

const parameters = {
  materialColor: "#ffeded",
};

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Test cube
 */
const mesh1 = new THREE.Mesh(
  new THREE.TorusGeometry(0.5, 0.3, 16, 100),
  new THREE.MeshBasicMaterial({ color: "red" }),
);
mesh1.position.y = -2.7;
scene.add(mesh1);
const mesh2 = new THREE.Mesh(
  new THREE.TorusGeometry(0.5, 0.3, 16, 100),
  new THREE.MeshBasicMaterial({ color: "green" }),
);
scene.add(mesh2);
const mesh3 = new THREE.Mesh(
  new THREE.TorusGeometry(0.5, 0.3, 16, 100),
  new THREE.MeshBasicMaterial({ color: "blue" }),
);
mesh3.position.y = -5.4;
scene.add(mesh3);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  35,
  sizes.width / sizes.height,
  0.1,
  100,
);
camera.position.z = 6;
scene.add(camera);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

let scrollY = window.scrollY;
window.addEventListener("scroll", () => {
  scrollY = window.scrollY;
});

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  camera.position.y = -scrollY * sizes.height * 0.25 * 0.0001;

  // Render
  renderer.render(scene, camera);
  mesh1.rotation.x = 0.1 * elapsedTime;
  mesh1.rotation.y = 0.1 * elapsedTime;
  mesh2.rotation.x = 0.2 * elapsedTime;
  mesh2.rotation.y = 0.2 * elapsedTime;
  mesh3.rotation.x = 0.3 * elapsedTime;
  mesh3.rotation.y = 0.3 * elapsedTime;

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
