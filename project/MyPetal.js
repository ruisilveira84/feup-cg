import { CGFobject } from '../../lib/CGF.js';

export class MyPetal extends CGFobject {
    constructor(scene, size) {
        super(scene);
        this.size = size;
        this.initBuffers();
    }

    initBuffers() {
        const halfSize = this.size / 2;

        this.vertices = [
            0, 0, 0,                          // V0
            halfSize, this.size, halfSize/2,  // V1
            halfSize, this.size, -halfSize/2, // V2
            0, 2 * this.size, 0               // V3
        ];

        this.indices = [
            0, 1, 2,
            0, 2, 1,
            3, 1, 2,
            3, 2, 1
        ];

        // Calculando as normais com base nas posições dos vértices
        this.normals = [];
        for (let i = 0; i < 4; i++) {
            // A normal de cada vértice aponta para fora da pétala
            this.normals.push(-1, -1, -1);
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    rotate(x, y, z) {
        // Aplica a rotação diretamente aos vértices V1, V2 e V3 em relação ao vértice V0
        const V1 = [this.vertices[3] - this.vertices[0], this.vertices[4] - this.vertices[1], this.vertices[5] - this.vertices[2]];
        const V2 = [this.vertices[6] - this.vertices[0], this.vertices[7] - this.vertices[1], this.vertices[8] - this.vertices[2]];
        const V3 = [this.vertices[9] - this.vertices[0], this.vertices[10] - this.vertices[1], this.vertices[11] - this.vertices[2]];
    
        // Aplica a rotação a cada vértice em torno do vértice V0
        for (let i = 0; i < 3; i++) {
            // Rotaciona em torno do eixo X
            const rotatedX = V1[i] * Math.cos(x) - V1[i + 1] * Math.sin(x);
            const rotatedY = V1[i] * Math.sin(x) + V1[i + 1] * Math.cos(x);
            this.vertices[i + 3] = rotatedX + this.vertices[0];
            this.vertices[i + 4] = rotatedY + this.vertices[1];
            
            // Rotaciona em torno do eixo Y
            const rotatedX2 = V2[i] * Math.cos(y) - V2[i + 1] * Math.sin(y);
            const rotatedZ2 = V2[i] * Math.sin(y) + V2[i + 1] * Math.cos(y);
            this.vertices[i + 6] = rotatedX2 + this.vertices[0];
            this.vertices[i + 7] = this.vertices[1];
            this.vertices[i + 8] = rotatedZ2 + this.vertices[2];
    
            // Rotaciona em torno do eixo Z
            const rotatedY3 = V3[i] * Math.cos(z) - V3[i + 1] * Math.sin(z);
            const rotatedZ3 = V3[i] * Math.sin(z) + V3[i + 1] * Math.cos(z);
            this.vertices[i + 9] = this.vertices[0];
            this.vertices[i + 10] = rotatedY3 + this.vertices[1];
            this.vertices[i + 11] = rotatedZ3 + this.vertices[2];
        }
    }    
    
}
