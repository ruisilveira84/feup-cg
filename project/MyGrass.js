import { CGFobject, CGFappearance, CGFtexture } from '../lib/CGF.js';
import { MyTriangle } from './MyTriangle.js';

export class MyGrass extends CGFobject {
    constructor(scene, grassTexture) {
        super(scene);
        
        // Definir o número de segmentos na largura e altura do canteiro
        this.numSegments = 7;
        
        // Definir a altura e largura máximas da relva
        this.grassHeight = 20;
        this.grassWidth = 10;

        this.grassTexture = grassTexture;

        // Inicializar a geometria da relva
        this.initGrass();
    }

    initGrass() {

        this.grassMaterial = new CGFappearance(this.scene);
        this.grassMaterial.setTexture(new CGFtexture(this.scene, "textures/textureGreen.jpg"));
        this.grassMaterial.setTextureWrap('REPEAT', 'REPEAT');
        this.grassMaterial.setShininess(20.0);

        // Inicializar arrays para armazenar vértices, normais, índices e coordenadas de textura
        this.vertices = [];
        this.normals = [];
        this.indices = [];
        this.texCoords = [];

        // Calcular o tamanho de cada segmento
        const segmentWidth = this.grassWidth / this.numSegments;
        const segmentHeight = this.grassHeight / this.numSegments;

        // Loop para criar os vértices da relva
        for (let i = 0; i < this.numSegments; i++) {
            for (let j = 0; j < this.numSegments; j++) {
                // Calcular as coordenadas dos vértices
                const x = i * segmentWidth - this.grassWidth / 2;
                const z = j * segmentHeight - this.grassHeight / 2;
                let y = 0;

                // Se estivermos na metade da largura da relva, ajuste a altura para cima
                if (i === Math.floor(this.numSegments / 2)) {
                    y = this.grassHeight;
                }

                // Adicionar os vértices ao array de vértices
                this.vertices.push(x, y, z);
                this.vertices.push(x + segmentWidth, y, z);
                this.vertices.push(x, y, z + segmentHeight);

                // Adicionar os vértices ao array de vértices
                this.vertices.push(x + segmentWidth, y, z);
                this.vertices.push(x, y, z + segmentHeight);
                this.vertices.push(x + segmentWidth, y, z + segmentHeight);

                // Definir as normais para a iluminação
                for (let k = 0; k < 6; k++) {
                    this.normals.push(0, 1, 0);
                }

                // Calcular as coordenadas de textura (opcional)
                for (let k = 0; k < 6; k++) {
                    const s = (i + (k % 2)) / this.numSegments;
                    const t = (j + Math.floor(k / 2)) / this.numSegments;
                    this.texCoords.push(s, t);
                }
            }
        }

        // Inicializar os buffers de vértices, normais, índices e coordenadas de textura
        this.initBuffers();
    }

    display() {
        // Desenhar a relva
        this.scene.pushMatrix();

        let getRandomValue = Math.random()/10+0.5;

        for (let j= -60; j < 50; j++) {

            for (let i = -60; i < 50; i++) {
                this.scene.pushMatrix();
                this.grassMaterial.apply(); // Aplicar o material da relva
                this.scene.translate(j+3, 1, i+3);
                this.scene.scale(1, getRandomValue*2+2, 3);
                this.drawElements(this.scene.gl.TRIANGLES);
                this.scene.popMatrix();
            }
        }

        this.scene.popMatrix();
    }  
}
