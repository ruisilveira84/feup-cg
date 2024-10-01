import { CGFobject, CGFappearance } from '../lib/CGF.js';

export class MyReceptacle extends CGFobject {
    constructor(scene, radius, slices, stacks) {
        super(scene);
        this.radius = radius || 1;
        this.slices = slices || 20;
        this.stacks = stacks || 20;

        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        for (let i = 0; i <= this.stacks; i++) {
            let phi = i * Math.PI / this.stacks;
            let sinPhi = Math.sin(phi);
            let cosPhi = Math.cos(phi);

            for (let j = 0; j <= this.slices; j++) {
                let theta = j * 2 * Math.PI / this.slices;
                let sinTheta = Math.sin(theta);
                let cosTheta = Math.cos(theta);

                let x = this.radius * cosTheta * sinPhi;
                let y = this.radius * cosPhi;
                let z = this.radius * sinTheta * sinPhi;

                this.vertices.push(x, z, y);
                this.normals.push(x, z, y);
                this.texCoords.push(j / this.slices, i / this.stacks);
            }
        }

        for (let i = 0; i < this.stacks; i++) {
            for (let j = 0; j < this.slices; j++) {
                let first = i * (this.slices + 1) + j;
                let second = first + this.slices + 1;
                this.indices.push(first, second, first + 1);
                this.indices.push(second, second + 1, first + 1);
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    display() {
        // Exibe o objeto chamando o método display do CGFobject pai
        super.display();
    }
    
}
