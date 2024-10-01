import { MyFlower } from './MyFlower.js';
import { CGFobject, CGFappearance } from '../lib/CGF.js';

export class MyGarden extends CGFobject{
    constructor(scene) {
        super(scene);
        this.flowers = [];
        this.suc = [];

        // Define o número de linhas e colunas no jardim
        const numRows = 5;
        const numCols = 5;

        // Define o espaçamento entre as flores
        const spacing = 22;

        // Calcula a largura e profundidade total do jardim
        const totalWidth = (numCols - 1) * spacing;
        const totalDepth = (numRows - 1) * spacing;

        // Calcula a posição inicial para a primeira flor
        const startX = -44;
        const startZ = -44;

        // Armazena o espaçamento para uso posterior
        this.spacing = spacing;
        this.startX = startX;
        this.startZ = startZ;

        // Cria as flores no momento da inicialização
        this.createFlowers();
    }

    createFlowers() {
        // Cria as flores em uma grade no jardim
        for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 5; col++) {
                // Calcula as coordenadas da flor atual
                const x = this.startX + col * this.spacing;
                const z = this.startZ + row * this.spacing;

                // Cria e armazena a flor na posição atual
                var l =this.getRandomValue(5, 10);
                this.suc.push(l);
                const flower = new MyFlower(this.scene, null, null, null, null, null, null, l, null, null, x, 0, z); // Posição Y definida como 0
                this.flowers.push(flower);
            }
        }
    }

    display() {
        // Exibe todas as flores no jardim
        for (var i=0;i<this.flowers.length;i++) {
            this.scene.pushMatrix();
            this.flowers[i].display();
            this.scene.popMatrix();
        }
    }

    getRandomValue(min, max) {
        return Math.random() * (max - min) + min;
    }
}
