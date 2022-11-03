import * as THREE from '../libs/three.module.js';
import {OrbitControls} from '../libs/OrbitControls.js';


import Widget from './Widget.js';
import Node from './Node.js';

export default class Sketch {
  constructor(options) {
    this.container = options.dom;
    this.baseSetup();
    this.clock = new THREE.Clock();    
    this.addObjects();
    this.render();
    this.controls = new OrbitControls( this.camera, this.container );

    const size = 10;
    const divisions = 10;

    // const gridHelper = new THREE.GridHelper( size, divisions );
    // gridHelper.rotateX(Math.PI/2)
    // this.scene.add( gridHelper );

  }

  // Add the objects into the scene
  addObjects() {

    let numWidgets = 10;
    this.widgets = [];

    // INIT THE WIDGETS!
    for (let i = 0; i < numWidgets; i++) {
      
      // Create new widget
      let widget = new Widget(i);
      
      // Add to scene, probably need to think of a better naming convention
      this.scene.add(widget.widget);

      // Add it to the widget array
      this.widgets.push(widget);
    }

  }

  
  // Render
  render() {

    this.widgets.forEach(w => {
      w.update();
    });
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
    this.renderer.setClearColor(0x444444, 1); 
    this.renderer.outputEncoding = THREE.sRGBEncoding;

    this.container.appendChild(this.renderer.domElement);

    this.renderer.gammaFactor = 2.2;
    this.renderer.outputEncoding = THREE.sRGBEncoding;

    // Add lights
    this.lights();

    // Add Camera
    this.addCamera();

    // Set up resize event
    this.resize();
    
  }

  lights() {
    const ambientLight = new THREE.AmbientLight( 0x000000 );
    this.scene.add( ambientLight );

    const light1 = new THREE.PointLight( 0xffffff, 1, 0 );
    light1.position.set( 0, 200, 0 );
    this.scene.add( light1 );

    const light2 = new THREE.PointLight( 0xffffff, 1, 0 );
    light2.position.set( 100, 200, 100 );
    this.scene.add( light2 );

    const light3 = new THREE.PointLight( 0xffffff, 1, 0 );
    light3.position.set( - 100, - 200, - 100 );
    this.scene.add( light3 );
    
  }

  addCamera() {
    this.camera = new THREE.OrthographicCamera(
      this.width/-100, 
      this.width/100,
      this.height/100, 
      this.height/-100
      // -3.2,3.2,2.4,-2.4
    );
    this.camera.position.set(0, 0, 10); // position camera
    this.camera.lookAt(0, 0, 0);       // have camera look at 0,0,0
    this.camera.zoom = 1.75;
    this.camera.updateProjectionMatrix();
    // this.scene.add(new THREE.GridHelper(10,10));
  }

  // Resize event listener
  resize() {

    window.addEventListener("resize", () => {
      this.width = this.container.offsetWidth;
      this.height = this.container.offsetHeight;
      this.renderer.setSize(this.width, this.height);
      this.camera.left = this.width/-100;
      this.camera.right = this.width/100;
      this.camera.top = this.height/100; 
      this.camera.bottom = this.height/-100;
      this.camera.updateProjectionMatrix();
    });
  }

}

new Sketch({
  dom: document.getElementById("container")
});