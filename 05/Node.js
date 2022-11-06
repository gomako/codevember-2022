import * as THREE from '../libs/three.module.js';
const randFloat = THREE.Math.randFloat;
import LatheShape from './LatheShape.js';
import Materials from './Materials.js';

export default class Node {

  constructor(yPos, boundHeight, material) {
    
    // Create group to hold everything
    this.group = new THREE.Group();

    this.boundHeight = boundHeight;
    this.a = Math.random() * Math.PI;
    this.aInc = randFloat(0.025, 0.075);
    this.yPos = yPos;

    this.materials = new Materials();

    this.addMeshes();
  }
  addMeshes() {
    this.height = randFloat(1, this.boundHeight/2);
    this.shapey = new LatheShape(this.height);
    
    this.group.rotation.y = randFloat(0, Math.PI*2)
    this.group.scale.set(0.5,-0.5,0.5);

    this.group.add(this.shapey.group)
  }

  update() {
    this.group.rotation.y += 0.025;
    this.group.position.y = this.yPos + Math.sin(this.a) * ((this.boundHeight/2) - this.height/2);
    this.a += this.aInc;
  }

}