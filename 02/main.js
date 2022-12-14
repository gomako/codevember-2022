import * as THREE from '../libs/three.module.js';
import {OrbitControls} from '../libs/OrbitControls.js';


export default class Sketch {
  constructor(options) {
    this.container = options.dom;
    this.baseSetup();
    this.clock = new THREE.Clock();    
    this.setupMaterial();
    this.addObjects();
    this.render();
    this.controls = new OrbitControls( this.camera, this.container );
  }

  // Add the objects into the scene
  addObjects() {

    // Container for the widget
    this.widget = new THREE.Group();
    
    // Make core
    let geometry = new THREE.CylinderBufferGeometry(.1, .1, 4, 32);
    let mesh = new THREE.Mesh(geometry, this.blackMat);
    this.widget.add(mesh);
    
    let startH = 0.1;
    let heightIncrease = 1.3;
    let heights = [];
    let totalH = 0;
    for (let i = 0; i < 8; i++) {
      let h = Math.pow(heightIncrease,i)*startH;
      heights.push(h)
      totalH += h;
    }
    
    let segments = new THREE.Group();

    heights.forEach((h,i) => {
      
      let topRad, bottomRad;

      // Make it conical or not..
      if(Math.random() > 0.4999) {
        topRad = bottomRad = 0.5;
      } else {
        topRad = 0.5;
        bottomRad = 0.33;
      }

      let nodeGeom = new THREE.CylinderBufferGeometry(topRad,bottomRad,h,32,1);
      
      let nodeMesh = new THREE.Mesh(nodeGeom, this.whiteMat);
      
      nodeMesh.geometry.computeBoundingBox();
      
      nodeMesh.position.y = (i*(h/2))-0.5;
      
      // let radScale = (i/heights.length);// * THREE.Math.randFloat(0.3,1);

      let radScale =  THREE.Math.randFloat(0.3,1.5);
      nodeMesh.scale.x = radScale;
      nodeMesh.scale.z = radScale;
      
      segments.add(nodeMesh);

    });
    segments.position.y -= totalH / 4;
    this.widget.add(segments);

    // Make mast
    let mastgeometry = new THREE.CylinderBufferGeometry(1, 1, 4, 32);
    let mast = new THREE.Mesh(mastgeometry, this.whiteMat);
    mast.position.y = -3.5;

    this.widget.add(mast);



    this.scene.add(this.widget);

  }

  // Sets up a material
  setupMaterial() {
    
    this.whiteMat = new THREE.MeshStandardMaterial({
      color: 0xcfcfcf,
      roughness: 0,
      metalness: .164,
      flatShading: true
    })
    this.blackMat = new THREE.MeshStandardMaterial({
      color: 0x111111,
      roughness: 0.5,
      metalness: 0.7,
      flatShading: true
    })
  }
  
  // Render
  render() {

    this.widget.children[1].children.forEach((c,i) => {
      if(i > 0) {
        let offset = c.geometry.boundingBox.max.y;
        c.position.y += Math.sin(this.clock.getElapsedTime()+i)*(offset*0.01);
        if(i % 2 == 0) {
          c.rotation.y += 0.01;
        } else {
          c.rotation.y -= 0.01;
        }
      }
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
    light1.position.set( 0, 20, 0 );
    this.scene.add( light1 );

    const light2 = new THREE.PointLight( 0xffffff, 1, 0 );
    light2.position.set( 10, 20, 10 );
    this.scene.add( light2 );

    const light3 = new THREE.PointLight( 0xffffff, 1, 0 );
    light3.position.set( - 10, - 20, - 10 );
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
    this.camera.position.set(0, 0, 2); // position camera
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
      this.camera.aspect = this.width / this.height;
      this.camera.updateProjectionMatrix();
    });
  }

}

new Sketch({
  dom: document.getElementById("container")
});