import { CGFobject } from '../lib/CGF.js';

export class MyCone extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        for (let j = 0; j <= this.stacks; j++) {
            let stackStep = j / this.stacks;
            let radius = 1 - stackStep;

            for (let i = 0; i <= this.slices; i++) {
                let sliceStep = i / this.slices;
                let angle = sliceStep * 2 * Math.PI;

                let x = Math.cos(angle) * radius;
                let y = Math.sin(angle) * radius;
                let z = stackStep;

                this.vertices.push(x, y, z);
                this.normals.push(x, y, z);
                this.texCoords.push(sliceStep, stackStep);

                if (j < this.stacks && i < this.slices) {
                    let a = j * (this.slices + 1) + i;
                    let b = a + this.slices + 1;

                    this.indices.push(a, b + 1, b);
                    this.indices.push(a, a + 1, b + 1);
                }
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
