import * as THREE from '../vendor/three.module.js';
import {OrbitControls} from '../vendor/OrbitControls.js';


export default class Sketch {
  constructor(options) {
    this.container = options.dom;
    this.baseSetup();
    this.setupMaterial();
    this.addObjects();
    this.render();
    
    this.controls = new OrbitControls( this.camera, this.container );
  }

  // Add the objects into the scene
  addObjects() {
  
    this.widget = new THREE.Group();

    // Make core
    let geometry = new THREE.CylinderBufferGeometry(.1, .1, 1.618,16);
    let mesh = new THREE.Mesh(geometry, this.material);
    this.widget.add(mesh);

    // Add Ribs
    let spacing = 0.001;
    let num = 12;
    let height = (1/num) - spacing;

    for (let i = 0; i < num; i++) {
      let d = Math.abs(Math.sin(THREE.Math.mapLinear(i,0,num-1,0, Math.PI)) * 0.618) + 0.618/2;
      let geometry = new THREE.CylinderBufferGeometry(d, d, height,16);
      let mesh = new THREE.Mesh(geometry, this.material);
      mesh.position.y = THREE.Math.mapLinear(i,1,num-1,-.5,.5) + height+spacing ;
      this.widget.add(mesh);
    }

    this.scene.add(this.widget);
  }

  // Sets up a material
  setupMaterial() {
    
    this.material = new THREE.MeshNormalMaterial();
  }
  
  // Render
  render() {

    this.widget.rotation.x += 0.01;
    this.widget.rotation.z += 0.01;


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