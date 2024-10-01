import { CGFobject } from '../../lib/CGF.js';
import { MyRock } from './MyRock.js';

export class MyRockSet extends CGFobject {
  constructor(scene, numRocks, baseRadius, minScale, maxScale, texture) {
    super(scene);
    this.scene = scene;
    this.rocks = [];
    this.numRocks = numRocks;
    this.texture = texture;

    // Generate rocks with random scales and orientations
    for (let i = 0; i < numRocks; i++) {
      const scale = Math.random() * (maxScale - minScale) + minScale;
      const rock = new MyRock(scene, baseRadius, 16, 16, 0.3, this.texture); // baseRadius, slices, stacks, perturbation

      // Randomize position and orientation
      const x = Math.random() * 10 - 5; // Random x in range [-5, 5]
      const y = Math.random() * 10 - 5; // Random y in range [-5, 5]
      const z = Math.random() * 10 - 5; // Random z in range [-5, 5]
      const rotationAngle = Math.random() * 360; // Random rotation in degrees

      this.rocks.push({ rock, scale, position: [x, y, z], rotationAngle });
    }
  }

  display() {
    for (const rockData of this.rocks) {
      const { rock, scale, position, rotationAngle } = rockData;

      this.scene.pushMatrix();
      this.scene.translate(position[0], position[1], position[2]);
      this.scene.rotate(rotationAngle, 0, 1, 0); // Rotate around the y-axis
      this.scene.scale(scale, scale, scale); // Apply the scale
      rock.display(); // Display the rock with the transformations applied
      this.scene.popMatrix();
    }
  }
}
