import * as THREE from '../libs/three.module.js';
const randFloat = THREE.Math.randFloat;

export default class Node {

  constructor(yPos, boundHeight, material) {
    this.material = material;
    this.boundHeight = boundHeight;
    this.a = Math.random() * Math.PI;
    this.aInc = randFloat(0.025, 0.075);
    this.yPos = yPos;
    this.addMeshes();
  }
  addMeshes() {
    
    this.height = randFloat(0.1, this.boundHeight/2);
    let topRad = randFloat(0.3, 0.5);
    let bottomRad = randFloat(0.1, 0.4); 

    if(Math.random() < 0.4999) {
      bottomRad = topRad;
    }

    let nodeGeom = new THREE.CylinderBufferGeometry(topRad,bottomRad,this.height,32,1);
    this.mesh = new THREE.Mesh(nodeGeom, this.material);

    this.mesh.position.y = this.yPos;

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

  update() {
    this.mesh.rotation.y += 0.025;
    this.mesh.position.y = this.yPos + Math.sin(this.a) * ((this.boundHeight/2) - this.height/2);
    this.a += this.aInc;
  }

}