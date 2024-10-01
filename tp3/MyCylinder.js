import { CGFobject } from '../lib/CGF.js';

export class MyCylinder extends CGFobject {
    constructor(scene, slices, stacks){
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        const angleIncrement = 2 * Math.PI / this.slices;
        const stackHeight = 1 / this.stacks;

        for (let slice = 0; slice <= this.slices; slice++) {
            let angle = slice * angleIncrement;
            let x = Math.cos(angle);
            let y = Math.sin(angle);

            for (let stack = 0; stack <= this.stacks; stack++) {
                let z = stack * stackHeight;

                // Push vertex for each slice and stack
                this.vertices.push(x, y, z);

                // Normals are the same as the vertices for a cylinder, but need to be normalized
                this.normals.push(x, y, 0);
            }
        }

        for (let slice = 0; slice < this.slices; slice++) {
            for (let stack = 0; stack < this.stacks; stack++) {
                let first = (slice * (this.stacks + 1)) + stack;
                let second = first + (this.stacks + 1);

                // Two triangles per slice per stack
                this.indices.push(first, second, first + 1);
                this.indices.push(second, second + 1, first + 1);
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
