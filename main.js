import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js";

class BasicWorld {
  constructor() {
    this._Initialize();
  }

  _Initialize() {
    this.threejs = new THREE.WebGLRenderer();
    this.threejs.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(this.threejs.domElement);

    window.addEventListener(
      "resize",
      () => {
        this._OnWindowResize();
      },
      false
    );

    // setup the camera
    const fov = 60;
    const aspect = 1920 / 1080;
    const near = 1.0;
    const far = 1000.0;
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this.camera.position.set(75, 20, 0);

    // setup light
    let light = new THREE.DirectionalLight(0xffffff, 1.0);
    light.position.set(20, 100, 10);

    // setup controls
    const controls = new OrbitControls(this.camera, this.threejs.domElement);
    controls.target.set(0, 20, 0);
    controls.update();

    // load backgourd assets
    const loader = new THREE.CubeTextureLoader();
    const texture = loader.load([
      "./resources/px.jpg",
      "./resources/nx.jpg",
      "./resources/py.jpg",
      "./resources/ny.jpg",
      "./resources/pz.jpg",
      "./resources/nz.jpg",
    ]);

    // Create The Floor: Plane
    const planeGeometry = new THREE.PlaneGeometry(100, 100, 1, 1);
    const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xbdbdbd });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;

    // add a BOX Mesh
    const boxGeometry = new THREE.BoxGeometry(5, 5, 5);
    const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x808080 });
    const box = new THREE.Mesh(boxGeometry, boxMaterial);
    box.position.set(0, 2.5, 0);

    // add a Sphere Mesh
    const sphereGeometry = new THREE.SphereGeometry(2.5, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(10, 2.5, 0);

    // create the scene
    this.scene = new THREE.Scene();
    this.scene.background = texture;
    this.scene.add(light);
    this.scene.add(plane);
    this.scene.add(box);
    this.scene.add(sphere);

    this._RAF();
  }

  // Make the screen responsive
  _OnWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.threejs.setSize(window.innerWidth, window.innerHeight);
  }

  // render the scene every frame
  _RAF() {
    requestAnimationFrame(() => {
      this.threejs.render(this.scene, this.camera);
      this._RAF();
    });
  }
}

let _APP = null;

window.addEventListener("DOMContentLoaded", () => {
  _APP = new BasicWorld();
});
