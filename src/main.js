import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

class Renderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.renderer = new THREE.WebGLRenderer({ canvas });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  render(scene, camera) {
    this.renderer.render(scene, camera);
  }

  getDomElement() {
    return this.renderer.domElement;
  }
}

class Camera {
  constructor() {
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    this.camera.position.setZ(3);
  }

  getCamera() {
    return this.camera;
  }
}

class Lighting {
  constructor(scene) {
    this.scene = scene;
    this.addLights();
  }

  addLights() {
    const pointLight = new THREE.PointLight("white", 100);
    pointLight.position.set(1, 1, 1);
    this.scene.add(pointLight);

    const ambientLight = new THREE.AmbientLight("white", 100);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight("white", 100);
    directionalLight.position.set(0, 1, 0);
    this.scene.add(directionalLight);
  }
}

class Particles {
  constructor(textureUrl, particleCount = 11500) {
    this.textureUrl = textureUrl;
    this.particleCount = particleCount;
    this.geometry = new THREE.BufferGeometry();
    this.material = null;
    this.points = null;
    this.setup();
  }

  setup() {
    this.createGeometry();
    this.createMaterial();
    this.points = new THREE.Points(this.geometry, this.material);
  }

  createGeometry() {
    const positions = new Float32Array(this.particleCount * 3);
    for (let i = 0; i < this.particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
    }

    const colors = new Float32Array(this.particleCount * 3);
    for (let i = 0; i < this.particleCount * 3; i += 3) {
      colors[i] = Math.random();
      colors[i + 1] = Math.random();
      colors[i + 2] = Math.random();
    }

    this.geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3),
    );
    this.geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  }

  createMaterial() {
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(this.textureUrl);

    this.material = new THREE.PointsMaterial({
      size: 0.1,
      sizeAttenuation: true,
      alphaMap: texture,
      alphaTest: 0.001,
      transparent: true,
      vertexColors: true,
    });
  }

  getMesh() {
    return this.points;
  }

  update() {
    // Rotate particles
    this.points.rotation.x += 0.0001;
    this.points.rotation.y += 0.0002;

    // Animate vertex positions slightly for wave effect
    const positions = this.geometry.attributes.position.array;
    const time = Date.now() * 0.0001;

    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];
      const z = positions[i + 2];

      positions[i] = x + Math.sin(time + x) * 0.002;
      positions[i + 1] = y + Math.cos(time + y) * 0.002;
      positions[i + 2] = z + Math.sin(time + z) * 0.002;
    }
    this.geometry.attributes.position.needsUpdate = true;
  }
}

class App {
  constructor() {
    this.canvas = document.querySelector("#bg");
    this.scene = new THREE.Scene();
    this.camera = new Camera();
    this.renderer = new Renderer(this.canvas);
    this.lighting = new Lighting(this.scene);
    this.particles = new Particles("/textures/particles/11.png");
    this.controls = new OrbitControls(
      this.camera.getCamera(),
      this.renderer.getDomElement(),
    );

    this.init();
  }

  init() {
    this.scene.add(this.particles.getMesh());
    this.controls.update();
    this.animate();
  }

  animate = () => {
    requestAnimationFrame(this.animate);
    this.particles.update();
    this.controls.update();
    this.renderer.render(this.scene, this.camera.getCamera());
  };
}

new App();
