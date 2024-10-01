import { CGFobject } from '../lib/CGF.js';

export class MyStem extends CGFobject {
    constructor(scene, baseRadius, topRadius, height, slices, stacks) {
        super(scene);
        this.baseRadius = (baseRadius || 0.1) * 2; // raio da base do cilindro (padrão: 0.1)
        this.topRadius = (topRadius || 0.05) * 2; // raio do topo do cilindro (padrão: 0.05)
        this.height = height // altura do cilindro (padrão: 1.0)
        this.slices = slices || 20; // número de fatias (padrão: 20)
        this.stacks = stacks || 10; // número de pilhas (padrão: 10)

        this.initBuffers();
    }


    initBuffers() {
        this.vertices = [];
        this.normals = [];
        this.indices = [];
        this.texCoords = [];
    
        var deltaTheta = (2 * Math.PI) / this.slices;
        var deltaHeight = this.height / this.stacks;
    
        // Vértices, normais e coordenadas de textura
        for (var i = 0; i <= this.stacks; i++) {
            var height = -this.height / 2 + i * deltaHeight;
            var radius = this.baseRadius - (this.baseRadius - this.topRadius) * i / this.stacks;
    
            for (var j = 0; j <= this.slices; j++) {
                var theta = j * deltaTheta;
                var x = radius * Math.cos(theta);
                var z = radius * Math.sin(theta);
    
                this.vertices.push(x, height, z);
                this.normals.push(x, 0, z);
                this.texCoords.push(j / this.slices, i / this.stacks);
            }
        }
    
        // Índices
        for (var i = 0; i < this.stacks; i++) {
            for (var j = 0; j < this.slices; j++) {
                var first = i * (this.slices + 1) + j;
                var second = first + this.slices + 1;
                this.indices.push(first, second, first + 1);
                this.indices.push(second, second + 1, first + 1);
            }
        }
    
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    display() {
        this.scene.pushMatrix(); // Salva a matriz atual

        // Translada o caule para abaixo do receptáculo
        this.scene.translate(0, -this.height / 2, 0);

        // Chama o método display do CGFobject para desenhar o caule
        super.display();

        this.scene.popMatrix(); // Restaura a matriz anterior
    }
    
}
