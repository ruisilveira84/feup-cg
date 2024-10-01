import { CGFobject, CGFappearance, CGFtexture } from '../lib/CGF.js';
import { MyPetal } from './MyPetal.js';
import { MyReceptacle } from './MyReceptacle.js';
import { MyStem } from './MyStem.js';
import { MyPollen } from './MyPollen.js';

export class MyFlower extends CGFobject {
    constructor(scene, outerRadius, numPetals, petalColor, heartRadius, heartColor, stemRadius, stemLength, stemColor, leafColor,
        posX = 0, posY = 0, posZ = 0, stemTexture, receptacleTexture, petalTexture) {
        super(scene);
        this.outerRadius = outerRadius || this.getRandomValue(3, 7); // Raio exterior da flor (entre 3 e 7 unidades)
        this.numPetals = numPetals || this.getRandomValue(5, 10); // Número de pétalas
        this.petalColor = petalColor || [1.0, 0.8, 0.0, 1.0]; // Cor das pétalas (padrão: amarelo)
        this.heartRadius = heartRadius || this.outerRadius * 0.5; // Raio do círculo do coração da flor (10% do raio exterior)
        this.heartColor = heartColor || [0.0, 0.0, 0.0, 1.0]; // Cor do círculo do coração da flor (padrão: vermelho)
        this.stemRadius = stemRadius || this.outerRadius * 0.07; // Raio do cilindro do caule (5% do raio exterior)
        this.stemLength = (stemLength || 1.0) * 3; // Tamanho do caule (número de cilindros do caule)
        this.stemColor = stemColor || [0.0, 1.0, 0.0, 1.0]; // Cor do caule (padrão: verde)
        this.leafColor = leafColor || [0.0, 0.6, 0.0, 1.0]; // Cor das folhas (padrão: verde escuro)

        // Posição da flor
        this.posX = posX;
        this.posY = posY;
        this.posZ = posZ;

        // Texturas
        this.stemTexture = stemTexture;
        this.receptacleTexture = receptacleTexture;
        this.petalTexture = petalTexture;

        // Inicializar componentes da flor
        this.stem = new MyStem(this.scene, this.stemRadius, this.outerRadius * 0.07, this.stemLength); // O raio do topo do caule é 5% do raio do caule
        this.receptacle = new MyReceptacle(this.scene, this.heartRadius, 20, 20); // Utilizando 20 slices e 20 stacks para a esfera
        this.petals = [];
        this.pollen = new MyPollen(this.scene, 0.3, 16, 8, 1.5, 0.8);

        // Ângulo entre cada pétala
        let totalAngle = 2 * Math.PI; // Círculo completo em radianos
        let angleBetweenPetals = totalAngle / this.numPetals;

        // Ângulo de deslocamento baseado no número de pétalas
        let offsetAngle = this.numPetals % 2 === 0 ? angleBetweenPetals / 2 : 0;

        // Criar e posicionar as pétalas em volta do receptáculo
        for (let i = 0; i < this.numPetals; i++) {
            // Calcular o ângulo de rotação para cada pétala
            let angle = (i * angleBetweenPetals) + offsetAngle;

            // Calcular as coordenadas da pétala com base no ângulo e na distância do centro
            let distanceFromCenter = this.outerRadius + 0.8; // Adicionar um pequeno deslocamento para garantir que as pétalas não estejam tocando o receptáculo
            let y = Math.cos(angle) * distanceFromCenter;
            let x = -Math.sin(angle) * distanceFromCenter;

            // Criar a pétala e ajustar sua posição e orientação
            let petal = new MyPetal(this.scene, this.outerRadius * 1); // Tamanho da pétala
            petal.rotate(0, angle, 0); // Rotacionar a pétala em torno do eixo Y
            this.petals.push(petal);
        }
        
        this.initMaterials();

        this.defineColorsOrTextures();

    }

    initMaterials(){
        
        this.stemGreenMaterial = new CGFappearance(this.scene);
        this.stemGreenMaterial.setAmbient(0 / 255, 128 / 255, 0 / 255, 1.0); // Green color for ambient
        this.stemGreenMaterial.setDiffuse(0 / 255, 128 / 255, 0 / 255, 1.0); // Green color for diffuse
        this.stemGreenMaterial.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.stemGreenMaterial.setShininess(10.0);

        this.stemBrownMaterial = new CGFappearance(this.scene);
        this.stemBrownMaterial.setAmbient(139 / 255, 69 / 255, 19 / 255, 1.0); // Brown color for ambient
        this.stemBrownMaterial.setDiffuse(139 / 255, 69 / 255, 19 / 255, 1.0); // Brown color for diffuse
        this.stemBrownMaterial.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.stemBrownMaterial.setShininess(10.0);


        this.receptacleOrangeMaterial = new CGFappearance(this.scene);
        this.receptacleOrangeMaterial.setAmbient(255 / 255, 140 / 255, 0 / 255, 1.0); // Laranja escuro para o componente ambiente
        this.receptacleOrangeMaterial.setDiffuse(255 / 255, 140 / 255, 0 / 255, 1.0); // Laranja escuro para o componente difuso
        this.receptacleOrangeMaterial.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.receptacleOrangeMaterial.setShininess(10.0);

        this.receptacleYellowMaterial = new CGFappearance(this.scene);
        this.receptacleYellowMaterial.setAmbient(255 / 255, 255 / 255, 0 / 255, 1.0); // Amarelo para o componente ambiente
        this.receptacleYellowMaterial.setDiffuse(255 / 255, 255 / 255, 0 / 255, 1.0); // Amarelo para o componente difuso
        this.receptacleYellowMaterial.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.receptacleYellowMaterial.setShininess(10.0);


        this.petalPinkMaterial = new CGFappearance(this.scene);
        this.petalPinkMaterial.setAmbient(255 / 255, 192 / 255, 203 / 255, 1.0); // Pink color for ambient
        this.petalPinkMaterial.setDiffuse(255 / 255, 192 / 255, 203 / 255, 1.0); // Pink color for diffuse
        this.petalPinkMaterial.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.petalPinkMaterial.setShininess(10.0);

        this.petalRedMaterial = new CGFappearance(this.scene);
        this.petalRedMaterial.setAmbient(180 / 255, 0 / 255, 0 / 255, 1.0); // Red color for ambient
        this.petalRedMaterial.setDiffuse(255 / 220, 0 / 255, 0 / 255, 1.0); // Red color for diffuse
        this.petalRedMaterial.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.petalRedMaterial.setShininess(10.0);


        // Material para o caule com textura
        this.stemTextureMaterial = new CGFappearance(this.scene);
        this.stemTextureMaterial.setTexture(new CGFtexture(this.scene, "textures/textureGreen.jpg"));
        this.stemTextureMaterial.setTextureWrap('REPEAT', 'REPEAT');
        this.stemTextureMaterial.setShininess(10.0);

        // Material para o receptáculo com textura
        this.receptacleTextureMaterial = new CGFappearance(this.scene);
        this.receptacleTextureMaterial.setTexture(new CGFtexture(this.scene, "textures/textureYellow.jpg"));
        this.receptacleTextureMaterial.setTextureWrap('REPEAT', 'REPEAT');
        this.receptacleTextureMaterial.setShininess(10.0);

        // Material para as pétalas com textura
        this.petalTextureMaterial = new CGFappearance(this.scene);
        this.petalTextureMaterial.setTexture(new CGFtexture(this.scene, "textures/textureRed.jpg"));
        this.petalTextureMaterial.setTextureWrap('REPEAT', 'REPEAT');
        this.petalTextureMaterial.setShininess(10.0);

    }

    // Dentro da função display da classe MyFlower
    // Dentro da função display da classe MyFlower
    defineColorsOrTextures() {
        // Definir cores para o caule
        let getRandomValue1 = Math.random();
        if (getRandomValue1 < 0.3) {
            this.stemMaterial = this.stemBrownMaterial;
        }
        else if (getRandomValue1 > 0.7) {
            this.stemMaterial = this.stemTextureMaterial;
            this.stemTextureMaterial.setTextureWrap("REPEAT", "REPEAT");
        }
        else {
            this.stemMaterial = this.stemGreenMaterial;
        }

        // Definir cores para o receptáculo
        let getRandomValue2 = Math.random();
        if (getRandomValue2 < 0.3) {
            this.receptacleMaterial = this.receptacleOrangeMaterial;
        }
        else if (getRandomValue2 > 0.7) {
            this.receptacleMaterial = this.receptacleTextureMaterial;
            this.receptacleTextureMaterial.setTextureWrap("REPEAT", "REPEAT");
        }
        else {
            this.receptacleMaterial = this.receptacleYellowMaterial;
        }

        // Definir cores para as pétalas
        let getRandomValue3 = Math.random();
        if (getRandomValue3 < 0.5) {
            this.petalMaterial = this.petalPinkMaterial;
        }
        else {
            this.petalMaterial = this.petalRedMaterial;
        }

    }

    // Dentro da função display da classe MyFlower
    display() {
        this.scene.pushMatrix();
        
        // Aplica a translação para posicionar a flor corretamente
        this.scene.translate(this.posX, this.posY + this.stemLength, this.posZ);
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        
        // Exibir o caule
        this.scene.pushMatrix();
        this.stemMaterial.apply();
        this.stem.display();
        this.scene.popMatrix();

        // Exibir o receptáculo (coração)
        this.scene.pushMatrix();
        this.receptacleMaterial.apply();
        this.receptacle.display();
        this.scene.popMatrix();

        // Exibir as pétalas
        for (let i = 0; i < this.numPetals; i++) {
            this.scene.pushMatrix();

            // Calcular o ângulo de rotação para esta pétala
            const angle = (2 * Math.PI * i) / this.numPetals;

            // Calcular a posição da pétala em torno do centro da flor
            const x = Math.cos(angle) * this.outerRadius;
            const y = Math.sin(angle) * this.outerRadius;
            
            // Aplicar a transformação de translação e rotação para posicionar a pétala corretamente
            this.scene.rotate(angle, 1, 0, 0);

            this.petalMaterial.apply(); // Aplicar a cor da pétala
            // Exibir a pétala
            this.petals[i].display();

            // Exibir o pólen no centro da flor
        if (this.pollen) {
            this.scene.pushMatrix();
            this.scene.translate(0, this.heartRadius, 0);
            const randomRotation = Math.random() * 2 * Math.PI;
            this.scene.rotate(randomRotation, 0, 1, 0);
            this.pollen.display();
            this.scene.popMatrix();
        }

            this.scene.popMatrix();
        }
        
        
        this.scene.popMatrix();
    }



    // Função para gerar um valor aleatório dentro de um intervalo
    getRandomValue(min, max) {
        return Math.random() * (max - min) + min;
    }
    
}
