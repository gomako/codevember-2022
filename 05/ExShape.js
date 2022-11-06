import * as THREE from '../libs/three.module.js';
import { SVGLoader } from '../libs/SVGLoader.js'
import Materials from './Materials.js';
import { VertexNormalsHelper } from '../libs/VertexNormalsHelper.js';

export default class ExShape {

  constructor(height) {

    this.group = new THREE.Group();
    this.materials = new Materials();
    this.height = height;

    

    const loader = new SVGLoader();
    loader.load(
      './exshape.svg',
      (data) => {
        const paths = data.paths;
        for(let i=0; i<paths.length; i++) {
          const path = paths[i];
          
          const shapes = SVGLoader.createShapes(path);

          for (let j=0; j<shapes.length; j++) {

            const shape = shapes[j];
          
            const geom = new THREE.ExtrudeGeometry(shape, {
              steps: 2,
              depth: this.height-1,
              bevelEnabled: true,
              bevelThickness: 0.5,
              bevelSize: 0.5,
              bevelOffset: 0,
              bevelSegments: 1
            });
            const mat = new THREE.MeshNormalMaterial();
            const mesh = new THREE.Mesh(geom, this.materials.lightMat);
 
            mesh.rotation.x = Math.PI/2;
            mesh.position.y = this.height/2-0.5;
            this.group.add(mesh);
          }
        }
      }
    )
  }

}