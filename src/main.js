import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
let ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const gltfLoader = new GLTFLoader();
gltfLoader.load(
  "/models/Duck/glTF/Duck.gltf",
  (gltf) => {
    // ✅ ISPRAVNO: Uzimamo gltf.scene, a ne ceo gltf objekat
    const model = gltf.scene;

    model.scale.set(2, 2, 2);
    model.position.set(0, 0, 0);
    scene.add(model);

    console.log("Patkica je uspešno učitana!");
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
const terrainMaterial = new THREE.MeshStandardMaterial({ color: "#ff8000" });
const terrainMesh = new THREE.Mesh(terrain, terrainMaterial);
terrainMesh.rotation.x = -Math.PI / 2;
scene.add(terrainMesh);
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}
animate();
