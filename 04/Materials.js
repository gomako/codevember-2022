import { MeshStandardMaterial, DoubleSide } from '../libs/three.module.js';

export default class Materials {

  constructor() {
    this.lightMat = new MeshStandardMaterial({
      color: 0xcfcfcf,
      roughness: 0,
      metalness: .164,
      flatShading: true,
      
    })
    this.darkMat = new MeshStandardMaterial({
      color: 0x111111,
      roughness: 0.5,
      metalness: 0.7,
      flatShading: true,
      
    })
  }

}