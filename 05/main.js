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
  }

  // Add the objects into the scene
  addObjects() {

    this.widgetGroup = new THREE.Group();

    let numWidgets = 16;
    let widgetInc = (Math.PI*2)/numWidgets
    this.widgets = [];

    // INIT THE WIDGETS!
    for (let i = 0; i < numWidgets; i++) {
      
      // Create new widget
      let widget = new Widget(i);

      widget.widget.position.y = 40;

      let g = new THREE.Group();
      g.add(widget.widget);

      g.rotation.z = widgetInc * i;
      
      
      // Add to scene, probably need to think of a better naming convention
      this.widgetGroup.add(g);

      
      

      // Add it to the widget array
      this.widgets.push(widget);
    }

    this.scene.add(this.widgetGroup);

  }

  
  // Render
  render() {

    this.widgets.forEach(w => {
      w.update();
    });
    // this.widgetGroup.rotation.y += 0.005;
    this.widgetGroup.rotation.z -= 0.003;
    requestAnimationFrame(this.render.bind(this));
    this.renderer.render(this.scene, this.camera);
  }
  
  
  // Basic scene setup
  baseSetup() {
    this.scene = new THREE.Scene();

    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;

    this.renderer = new THREE.WebGLRenderer({ antialias: true});
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
      this.width/-2, 
      this.width/2,
      this.height/2, 
      this.height/-2
    );
    this.camera.position.set(0, 0, 100); // position camera
    this.camera.lookAt(0, 0, 0);       // have camera look at 0,0,0
    this.camera.zoom = 5;
    this.camera.updateProjectionMatrix();
    // this.scene.add(new THREE.GridHelper(100,10));
  }

  // Resize event listener
  resize() {

    window.addEventListener("resize", () => {
      this.width = this.container.offsetWidth;
      this.height = this.container.offsetHeight;
      this.renderer.setSize(this.width, this.height);
      this.camera.left = this.width/-2;
      this.camera.right = this.width/2;
      this.camera.top = this.height/2; 
      this.camera.bottom = this.height/-2;
      this.camera.updateProjectionMatrix();
    });
  }

}

new Sketch({
  dom: document.getElementById("container")
});