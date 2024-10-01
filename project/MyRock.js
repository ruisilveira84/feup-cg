import { CGFobject, CGFappearance } from '../../lib/CGF.js';

export class MyRock extends CGFobject {
  constructor(scene, radius, slices, stacks, perturbation, texture) {
    super(scene);
    this.radius = radius;
    this.slices = slices;
    this.stacks = stacks;
    this.perturbation = perturbation;
    this.texture = texture;
    this.initBuffers();
  }

  initBuffers() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    let theta, phi, x, y, z, nx, ny, nz;
    let perturbX, perturbY, perturbZ;
    for (let stackNumber = 0; stackNumber <= this.stacks; stackNumber++) {
      theta = (Math.PI / this.stacks) * stackNumber;
      perturbX = this.perturbation * (Math.random() - 0.5);
      perturbY = this.perturbation * (Math.random() - 0.5);
      perturbZ = this.perturbation * (Math.random() - 0.5);

      for (let sliceNumber = 0; sliceNumber <= this.slices; sliceNumber++) {
        phi = (2 * Math.PI / this.slices) * sliceNumber;

        x = this.radius * Math.sin(theta) * Math.cos(phi);
        y = this.radius * Math.sin(theta) * Math.sin(phi);
        z = this.radius * Math.cos(theta);

        // Perturbation is constant for the first and last vertex of each slice
        if (sliceNumber === this.slices) {
          nx = this.vertices[3 * stackNumber * (this.slices + 1)];
          ny = this.vertices[3 * stackNumber * (this.slices + 1) + 1];
          nz = this.vertices[3 * stackNumber * (this.slices + 1) + 2];
        } else {
          nx = x + perturbX;
          ny = y + perturbY;
          nz = z + perturbZ;
        }

        this.vertices.push(nx, ny, nz);
        this.normals.push(nx, ny, nz); // In a real scenario, you should recompute the normal from the actual geometry
        this.texCoords.push(sliceNumber / this.slices, stackNumber / this.stacks);
      }
    }

    for (let stackNumber = 0; stackNumber < this.stacks; stackNumber++) {
      let first = stackNumber * (this.slices + 1);
      let second = first + this.slices + 1;

      for (let sliceNumber = 0; sliceNumber < this.slices; sliceNumber++) {
        this.indices.push(first + sliceNumber, second + sliceNumber, first + sliceNumber + 1);
        this.indices.push(second + sliceNumber, second + sliceNumber + 1, first + sliceNumber + 1);
      }
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }

  display() {
    let appearance = new CGFappearance(this.scene);
    appearance.setTexture(this.texture);
    appearance.setTextureWrap('REPEAT', 'REPEAT');
    appearance.apply();  // Aplica a textura e configurações de aparência
    super.display();
  }

}
