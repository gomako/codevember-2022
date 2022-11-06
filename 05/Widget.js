import * as THREE from '../libs/three.module.js';
import Node from './Node.js';
import Materials from './Materials.js';


const randFloat = THREE.Math.randFloat;

export default class Widget {

  constructor(index) {
    this.materials = new Materials;
    this.addMeshes();
  }

  addMeshes() {
    
    // Container for the widget
    this.widget = new THREE.Group();
    
    // Make core
    let coreHeight = 50;
    let geometry = new THREE.CylinderBufferGeometry(1, 1, coreHeight, 32);
    let core = new THREE.Mesh(geometry, this.materials.darkMat);
    this.widget.add(core);

    // Add caps
    let capGeometry = new THREE.SphereBufferGeometry(2);
    let topCap = new THREE.Mesh(capGeometry, this.materials.darkMat);
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
      let node = new Node(yPos, spacing);
      this.nodes.push(node);
      this.nodeMeshes.add(node.group)
    }



    // Add the nodes to the widget segments
    this.widget.add(this.nodeMeshes);

    // this.initRandom();

    // this.widget.position.y = coreHeight/2;

  }

  update() {
    // this.widget.rotation.x+= 0.01;
    // this.widget.rotation.z+= 0.01;
    this.nodes.forEach(n => {
      n.update();
    });
  }

  initRandom() {
    // Init a random position and rotation
    this.widget.position.x = randFloat(-50,50);
    this.widget.position.y = randFloat(-50,50);
    this.widget.position.z = randFloat(-50,50);
    this.widget.rotation.x = randFloat(-Math.PI,Math.PI);
    this.widget.rotation.z = randFloat(-Math.PI,Math.PI);
  }

}