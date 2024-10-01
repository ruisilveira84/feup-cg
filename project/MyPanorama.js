import { CGFobject , CGFappearance } from "../../lib/CGF.js";
import { MySphere } from "./MySphere.js";

export class MyPanorama extends CGFobject {
  constructor(scene, texture) {
    super(scene);
    this.texture = texture;
    this.sphere = new MySphere(this.scene, 200, 40, 40, true); // Invert normals

    this.material = new CGFappearance(scene);
    this.material.setTexture(texture);
    this.material.setEmission(1, 1, 1, 1); // White emission
  }

  display() {
    this.scene.pushMatrix();
    this.material.apply();

    if (this.scene.MyPanorama) {
      this.scene.translate(
        this.cameraPosition[0],
        this.cameraPosition[1],
        this.cameraPosition[2]
      );
    }
    this.sphere.display();
    this.scene.popMatrix();
  }
}