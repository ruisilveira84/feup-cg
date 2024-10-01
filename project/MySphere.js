import { CGFobject } from '../../lib/CGF.js';

export class MySphere extends CGFobject {
  constructor(scene, radius, slices, stacks, insideOut=false, north=1, south=1) {
    super(scene);
    this.radius = radius;
    this.slices = slices;
    this.stacks = stacks;
    this.insideOut = insideOut ? -1 : 1;
    this.north = north;
    this.south = south;
    this.initBuffers();
  }
  initBuffers() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];


    let theta;
    for(let stackNumber = 0; stackNumber <= this.stacks * 2; stackNumber += 1) {
      theta = - Math.PI / 2 + stackNumber * Math.PI / (2 * this.stacks);
      this.vertices.push(this.radius * Math.cos(theta), this.radius * Math.sin(theta), 0);
      this.normals.push(this.insideOut * Math.cos(theta), this.insideOut * Math.sin(theta), 0);
      this.texCoords.push(0, 1 - stackNumber / (this.stacks * 2));
    }

    let delta, alfa, x, y, z, points, lowerLeftIndex, lowerRightIndex, upperRightIndex, upperLeftIndex, northSouthFactor;
    for (let sliceNumber = 1; sliceNumber <= this.slices + 1; sliceNumber++) {

      delta = 2 * Math.PI * sliceNumber / this.slices;

      this.vertices.push(0, -this.radius , 0);
      this.texCoords.push(0, 1);
      this.normals.push(0, this.inside, 0);

      for (let stackNumber = 0; stackNumber <= this.stacks * 2; stackNumber++) {

          alfa = - Math.PI / 2 + Math.PI * stackNumber / (2 * this.stacks);
          northSouthFactor = alfa >= 0 ? this.north : this.south;

          x = Math.cos(delta) * Math.cos(alfa);
          z = Math.sin(delta) * Math.cos(alfa);
          y = Math.sin(alfa);
          
          this.vertices.push(this.radius * x, this.radius * y * northSouthFactor, this.radius * z);
          this.normals.push(this.insideOut * x, this.insideOut * y, this.insideOut * z);
          this.texCoords.push(sliceNumber / this.slices, 1 - stackNumber / (this.stacks * 2));
          points = this.vertices.length / 3;
          upperRightIndex = points - 2;
          upperLeftIndex = points - 1;
          lowerRightIndex = upperLeftIndex - (this.stacks*2 + 1);
          lowerLeftIndex = lowerRightIndex - 1;

          if (this.insideOut == -1) {
              this.indices.push(lowerLeftIndex, upperRightIndex, upperLeftIndex, lowerLeftIndex, upperLeftIndex, lowerRightIndex);
          } else {
              this.indices.push(upperLeftIndex, upperRightIndex, lowerLeftIndex, lowerRightIndex, upperLeftIndex, lowerLeftIndex);
          }
      }
  }
  this.primitiveType = this.scene.gl.TRIANGLES;
  this.initGLBuffers();
  }
}
