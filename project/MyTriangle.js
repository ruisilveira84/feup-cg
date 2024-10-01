import { CGFobject } from '../lib/CGF.js';

export class MyTriangle extends CGFobject {
    constructor(scene, x, z, width, height) {
        super(scene);
        
        this.vertices = [
            x, 0, z,
            x + width, 0, z,
            x + width / 2, height, z + width / 2
        ];

        this.indices = [0, 1, 2];

        this.normals = [
            0, 1, 0,
            0, 1, 0,
            0, 1, 0
        ];

        this.texCoords = [
            0, 0,
            1, 0,
            0.5, 1
        ];

        this.initBuffers();
    }

    display() {
        this.drawElements(this.scene.gl.TRIANGLES);
    }
}
