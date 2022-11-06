import * as THREE from '../libs/three.module.js';
import Materials from './Materials.js';
import { VertexNormalsHelper } from '../libs/VertexNormalsHelper.js';

export default class ExShape {

  constructor(height) {

    this.group = new THREE.Group();
    this.materials = new Materials();
    this.height = height;

    const points = [[-0.2,5.9],[-2.8,5.8],[-3,3.6],[-5.9,3.1],[-6.2,-2.3],[-2.5,-2.5],[-2.1,-4.2],[-0.2,-4.2],];
    let shape = [];
    points.forEach(p => {
      shape.push(new THREE.Vector2(p[0], p[1]));
    });
    const geom = new THREE.LatheGeometry(shape, 32)
    const mat = this.materials.lightMat;
    mat.side = THREE.DoubleSide;
    const mesh = new THREE.Mesh(geom, mat);

    this.group.add(mesh);
          
  }

}