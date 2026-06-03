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
camera.position.set(0, 5, 10);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector(".webgl"),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);
