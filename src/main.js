import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
let ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
let m;

const gltfLoader = new GLTFLoader();
gltfLoader.load(
  "/models/FlightHelmet/glTF/FlightHelmet.gltf",
  (gltf) => {
    // ✅
    m = gltf.scene;
    m.scale.set(20, 20, 20);
    m.position.set(0, 0, 0);
    scene.add(m);
  },
  undefined,
  (error) => {
    console.error("An error occurred while loading the model:", error);
  },
);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.set(0, 5, 10);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector(".webgl"),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

const terrain = new THREE.PlaneGeometry(50, 50, 100, 100);
const terrainMaterial = new THREE.MeshStandardMaterial({ color: "#0ea01d" });
const terrainMesh = new THREE.Mesh(terrain, terrainMaterial);
terrainMesh.rotation.x = -Math.PI / 2;
scene.add(terrainMesh);
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
  requestAnimationFrame(animate);
  if (m) {
    m.rotation.y += 0.01;
  }
  renderer.render(scene, camera);
}
animate();
