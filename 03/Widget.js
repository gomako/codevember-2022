import * as THREE from '../libs/three.module.js';
import Node from './Node.js';

const randFloat = THREE.Math.randFloat;

export default class Widget {

  constructor(index) {
    this.setupMaterial();
    this.addMeshes();
  }

  addMeshes() {
    
    // Container for the widget
    this.widget = new THREE.Group();
    
    // Make core
    let coreHeight = randFloat(1,5);
    let geometry = new THREE.CylinderBufferGeometry(.1, .1, coreHeight, 32);
    let core = new THREE.Mesh(geometry, this.materials.dark);
    this.widget.add(core);

    let capGeometry = new THREE.CylinderBufferGeometry(.2, .2, .1, 32);
    let topCap = new THREE.Mesh(capGeometry, this.materials.dark);
    let botCap = topCap.clone();
    topCap.position.y = (coreHeight/2) + .1;
    botCap.position.y = -((coreHeight/2)+ .1);
    this.widget.add(topCap);
    this.widget.add(botCap);

    // Create a load of nooooodes
    let numNodes = Math.floor(randFloat(2,6));
    this.nodes = [];
    this.nodeMeshes = new THREE.Group();
    let spacing = coreHeight/numNodes;
    let offset =  (coreHeight / 2) - (spacing/2);

    for (let i = 0; i < numNodes; i++) {
      let yPos = (spacing * i) - offset;
      let node = new Node(yPos, spacing, this.materials.light);
      this.nodes.push(node);
      this.nodeMeshes.add(node.mesh)
    }

    // Add the nodes to the widget segments
    this.widget.add(this.nodeMeshes);

    // Init a random position and rotation
    this.widget.position.x = randFloat(-3,3);
    this.widget.position.y = randFloat(-3,3);
    this.widget.position.z = randFloat(-10,-100);
    this.widget.rotation.x = randFloat(-Math.PI,Math.PI);
    this.widget.rotation.z = randFloat(-Math.PI,Math.PI);
  }

  update() {
    this.widget.rotation.x+= 0.01;
    this.widget.rotation.z+= 0.01;
    this.nodes.forEach(n => {
      n.update();
    });
  }

  // Sets up a material
  setupMaterial() {
    
    this.lightMat = new THREE.MeshStandardMaterial({
      color: 0xcfcfcf,
      roughness: 0,
      metalness: .164,
      flatShading: true
    })
    this.darkMat = new THREE.MeshStandardMaterial({
      color: 0x111111,
      roughness: 0.5,
      metalness: 0.7,
      flatShading: true
    })

    // Hold them in an object to pass to widgets
    this.materials = {
      light: this.lightMat,
      dark: this.darkMat
    }
  }


}