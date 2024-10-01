import { CGFobject } from '../lib/CGF.js';
import { CGFappearance } from '../lib/CGF.js';
import { CGFtexture } from '../lib/CGF.js';
import { MySphere } from './MySphere.js';
import { MyCylinder } from './MyCylinder.js';
import { MyCone } from './MyCone.js';

export class MyBee extends CGFobject {
    constructor(scene) {
        super(scene);
        this.scene = scene;
        this.initComponents();
        this.initMaterials();

        this.reset();
        this.verticalPosition = 0;
        this.wingAngle = 0;
        this.acceleration = 0;
        this.maxSpeed = 2; 
        // Estado para o pólen
        this.hasPollen = false;
        this.pollen = null;
        this.isDescending = false;
        this.isAscending = false;
        this.targetHeight = 3; // Altura inicial da abelha
    }


    startDescending() {
        this.isDescending = true;
        this.isAscending = false;
    }
    
    startAscending() {
        if (this.hasPollen) {
            this.isAscending = true;
            this.isDescending = false;
        }
    }
    
    dropPollen() {
        if (this.hasPollen) {
            this.hasPollen = false;
            this.isAscending = false;
            this.pollen = null;
        }
    }
    

    initComponents() {
        this.body = new MySphere(this.scene, 1, 20, 20);
        this.head = new MySphere(this.scene, 0.5, 16, 16);
        this.antenna = new MyCone(this.scene, 10, 20); // Usar cone para as antenas
        this.eye = new MySphere(this.scene, 0.1, 10, 10);
        this.wing = new MySphere(this.scene, 0.5, 16, 16); // Esfera menor para as asas
        this.patas = new MyCylinder(this.scene, 10, 1);
    }

    initMaterials() {
        //texturas
        this.bodyTexture = new CGFtexture(this.scene, 'images/abelha.png');
        this.bodyMaterial = new CGFappearance(this.scene);
        this.bodyMaterial.setTexture(this.bodyTexture);

        this.wingTexture = new CGFtexture(this.scene, 'images/wingTexture.png');
        this.wingMaterial = new CGFappearance(this.scene);
        this.wingMaterial.setTexture(this.wingTexture);

        this.eyeTexture = new CGFtexture(this.scene, 'images/eyes.png');
        this.eyeMaterial = new CGFappearance(this.scene);
        this.eyeMaterial.setTexture(this.eyeTexture);

        this.yellowMaterial = new CGFappearance(this.scene);
        this.yellowMaterial.setAmbient(204 / 255, 153 / 255, 0 / 255, 1.0); // Amarelo torrado para o componente ambiente
        this.yellowMaterial.setDiffuse(204 / 255, 153 / 255, 0 / 255, 1.0); // Amarelo torrado para o componente difuso
        this.yellowMaterial.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.yellowMaterial.setShininess(10.0);
    }

    update(t) {
        let delta_t = (t - this.scene.lastTime) / 1000.0; 
        this.scene.lastTime = t;
        if (delta_t > 0.05) delta_t = 0.05;


        // Controle de descida
        if (this.isDescending) {
            this.y -= this.maxSpeed * delta_t / 50000000000;
            if (this.y <= 1) { // Supondo que a flor está na altura y = 1
                this.y = 1;
                this.isDescending = false;
                this.hasPollen = true;
                this.pollen = this.scene.pollen; // Pegando referência ao pólen da cena
                this.scene.pollen = null; // Remover pólen da cena
            }
        }
        // Controle de subida
        if (this.isAscending) {
            this.y += this.maxSpeed * delta_t / 50000000000;
            if (this.y >= this.targetHeight) { // Altura inicial da abelha
                this.y = this.targetHeight;
                this.isAscending = false;
            }
        }

        // Aplicar aceleração à velocidade
        this.velocity.x += this.acceleration * Math.cos(this.angle) * delta_t;
        this.velocity.z += this.acceleration * Math.sin(this.angle) * delta_t;

        // Limitar a velocidade máxima
        let speed = Math.sqrt(this.velocity.x ** 2 + this.velocity.z ** 2);
        if (speed > this.maxSpeed) {
            this.velocity.x = (this.velocity.x / speed) * this.maxSpeed;
            this.velocity.z = (this.velocity.z / speed) * this.maxSpeed;
        }

        // Atualizar a posição
        this.x += this.velocity.x * delta_t / 50000000000;
        this.y += this.velocity.y * delta_t / 50000000000;
        this.z += this.velocity.z * delta_t / 50000000000;

        console.log(`Update: x=${this.x}, y=${this.y}, z=${this.z}`); // Debug log for position

        this.verticalPosition = 1.5 + 0.5 * Math.sin(t * 2 * Math.PI);
        this.wingAngle = Math.sin(t * 20 * Math.PI);
        
    }


    display() {
        this.scene.gl.frontFace(this.scene.gl.CCW); // Corrigir orientação dos polígonos
        this.scene.gl.blendFunc(this.scene.gl.SRC_ALPHA, this.scene.gl.ONE_MINUS_SRC_ALPHA);
        this.scene.gl.enable(this.scene.gl.BLEND);
        this.scene.gl.disable(this.scene.gl.DEPTH_TEST);

        this.scene.pushMatrix();
        this.scene.translate(this.x, this.y + this.verticalPosition, this.z);
        this.scene.rotate(this.angle, 0, 1, 0);
        this.scene.scale(this.scene.scaleFactor, this.scene.scaleFactor, this.scene.scaleFactor);

        this.displayLegs(); // Renderizar as patas primeiro
        this.displayBody();
        this.displayHead();
        this.displayEyes();
        this.displayWings();
        this.displayAntenas();

        // Desenha o pólen se a abelha estiver carregando
        if (this.hasPollen && this.pollen) {
            this.scene.pushMatrix();
            this.scene.translate(0, -0.5, 0);
            this.pollen.display();
            this.scene.popMatrix();
        }

        this.scene.popMatrix();

        this.scene.gl.enable(this.scene.gl.DEPTH_TEST);
        this.scene.gl.disable(this.scene.gl.BLEND);

        this.scene.setDefaultAppearance();
    }

    turn(v) {
        this.angle += v;
        this.updateVelocityDirection();
    }

    accelerate(v) {
        this.acceleration += v;
        console.log(`Accelerate: acceleration=${this.acceleration}`); // Debug log
    }

    updateVelocityDirection() {
        let speed = Math.sqrt(this.velocity.x ** 2 + this.velocity.y ** 2 + this.velocity.z ** 2);
        let newSpeed = speed + this.acceleration;
        if (newSpeed > this.maxSpeed) newSpeed = this.maxSpeed;
        if (newSpeed < -this.maxSpeed) newSpeed = -this.maxSpeed;

        this.velocity.x = newSpeed * Math.cos(this.angle);
        this.velocity.z = newSpeed * Math.sin(this.angle);
        console.log(`Update Velocity Direction: angle=${this.angle}, velocity=(${this.velocity.x}, ${this.velocity.z})`); // Debug log
    }

    reset() {
        this.x = 0;
        this.y = 3;
        this.z = 0;
        this.angle = 0;
        this.velocity = { x: 0, y: 0, z: 0 };
        this.acceleration = 0;
    }

    displayBody() {
        this.bodyMaterial.apply(); //textura do corpo
        this.scene.pushMatrix();
        this.scene.scale(1.3, 0.9, 1.2);
        this.body.display();
        this.scene.popMatrix();
    }

    displayHead() {
        this.yellowMaterial.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 1.2);
        this.head.display();
        this.scene.popMatrix();
    }

    displayEyes() {
        this.eyeMaterial.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, 0.3, 1.6);
        this.scene.rotate(Math.PI / 3, 1, 0, 0);
        for (let i = -1; i <= 1; i += 2) {
            //distancias dos olhos
            this.scene.pushMatrix();
            this.scene.translate(i * 0.2, 0, 0.2);
            this.scene.scale(1.0, 1.0, 1.0);
            this.eye.display();
            this.scene.popMatrix();
        }
        this.scene.popMatrix();
    }

    displayWings() {
        this.wingMaterial.apply();
        const wingPositions = [
            { x: -0.75, y: 1.0, z: 0 },
            { x: 0.75, y: 1.0, z: 0 },
            { x: -0.75, y: 1.0, z: 0.5 },
            { x: 0.75, y: 1.0, z: 0.5 }
        ];
        for (let pos of wingPositions) {
            this.scene.pushMatrix();
            this.scene.translate(pos.x, pos.y, pos.z);
            this.scene.rotate(this.wingAngle, 0.5, 1, 0);
            this.scene.scale(1.2, 0.3, 0.25); // Achatar e ajustar o tamanho das asas
            this.wing.display();
            this.scene.popMatrix();
        }
    }

    displayAntenas() {
        this.bodyMaterial.apply();
        for (let i = -1; i <= 1; i += 2) {
            this.scene.pushMatrix();
            this.scene.translate(i * 0.4, 0.5, 1.4);
            this.scene.rotate(i * Math.PI / 4, 0, 1, 0);
            this.scene.scale(0.05, 0.1, 0.6);
            this.antenna.display();
            this.scene.popMatrix();
        }
    }

    displayLegs() {
        this.bodyMaterial.apply();
        const patasPositions = [
            { x: -0.75, y: -0.5, z: -0.6 },
            { x: 0.75, y: -0.5, z: -0.6 },
            { x: -0.75, y: -0.5, z: 0 },
            { x: 0.75, y: -0.5, z: 0 },
            { x: -0.75, y: -0.5, z: 0.6 },
            { x: 0.75, y: -0.5, z: 0.6 }
        ];
        for (let pos of patasPositions) {
            this.scene.pushMatrix();
            this.scene.translate(pos.x, pos.y, pos.z);
            this.scene.rotate(Math.PI / 2, 1, 0, 0);
            this.scene.scale(0.2, 0.1, 0.4); 
            this.patas.display();
            this.scene.popMatrix();
        }
    }
}
