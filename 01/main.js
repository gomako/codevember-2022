import * as THREE from '../vendor/three.module.js'

export default class Sketch {
  constructor(options) {
    this.container = options.dom;
    this.baseSetup();
    this.setupMaterial();
    this.addObjects();
    this.render();
    
  }

  // Add the objects into the scene
  addObjects() {
  
    this.widget = new THREE.Group();

    let geometry = new THREE.CylinderBufferGeometry(0.618, 0.618, 1);
    let mesh = new THREE.Mesh(geometry, this.material);

    this.widget.add(mesh);

    let mesh2 = mesh.clone();

    mesh2.scale.x = .381924;
    mesh2.scale.z = .381924;
    mesh2.scale.y = 1.6718;

    this.widget.add(mesh2);

    this.scene.add(this.widget);
  }

  // Sets up a material
  setupMaterial() {
    
    this.material = new THREE.MeshNormalMaterial();
  }
  
  // Render
  render() {

    this.widget.rotation.x+=0.02;
    this.widget.rotation.y+=0.01;

    requestAnimationFrame(this.render.bind(this));
    this.renderer.render(this.scene, this.camera);
  }
  
  // Basic scene setup
  baseSetup() {
    this.scene = new THREE.Scene();

    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
    this.renderer.setClearColor(0xffffff, 1); 
    this.renderer.outputEncoding = THREE.sRGBEncoding;

    this.container.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(
      70,
      this.width / this.height,
      0.001,
      1000
    );

    this.camera.position.set(0, 0, 2);

    // Set up resize event
    this.resize();
    
  }

  // Resize event listener
  resize() {

    window.addEventListener("resize", () => {
      this.width = this.container.offsetWidth;
      this.height = this.container.offsetHeight;
      this.renderer.setSize(this.width, this.height);
      this.camera.aspect = this.width / this.height;
      this.camera.updateProjectionMatrix();
    });
  }

}

new Sketch({
  dom: document.getElementById("container")
});