import { CGFobject, CGFappearance, CGFtexture } from '../../lib/CGF.js';
import { MySphere } from './MySphere.js';

export class MyPollen extends MySphere {
  constructor(scene, radius, slices, stacks, northScale, southScale) {
    super(scene, radius, slices, stacks, false, northScale, southScale);
    this.texture = new CGFtexture(this.scene, "images/pollenTexture.png");
    this.material = new CGFappearance(this.scene);
    this.material.setAmbient(0.5, 0.5, 0.5, 1);
    this.material.setDiffuse(0.8, 0.4, 0, 1);
    this.material.setSpecular(0.3, 0.3, 0.3, 1);
    this.material.setShininess(10.0);
    this.material.setTexture(this.texture);
  }

  display() {
    this.material.apply();
    super.display();
  }
}
