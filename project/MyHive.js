import { CGFobject, CGFappearance, CGFtexture } from '../lib/CGF.js';
import { MyCone } from './MyCone.js'; 

export class MyHive extends CGFobject {
    constructor(scene) {
        super(scene);
        this.scene = scene;

        // Cria os componentes da colmeia
        this.bottomCone = new MyCone(scene, 16, 1); // Cone inferior da colmeia
        this.topCone = new MyCone(scene, 16, 1); // Cone superior da colmeia

        this.initMaterials();
    }

    initMaterials() {
        // Inicializa materiais e texturas
        this.hiveTexture = new CGFtexture(this.scene, 'images/colmeiaTexture.png'); // Textura da colmeia

        this.hiveMaterial = new CGFappearance(this.scene);
        this.hiveMaterial.setTexture(this.hiveTexture);
        this.hiveMaterial.setTextureWrap('REPEAT', 'REPEAT');
        this.hiveMaterial.setAmbient(0.3, 0.3, 0.3, 1);
        this.hiveMaterial.setDiffuse(0.7, 0.7, 0.7, 1);
        this.hiveMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.hiveMaterial.setShininess(10);
    }

    display() {
        this.scene.pushMatrix();

        // Aplica a textura e material
        this.hiveMaterial.apply();

        // Desenha o cone inferior da colmeia
        this.scene.pushMatrix();
        this.scene.translate(0, 4, 0);
        this.scene.scale(2, 2, 2); // Ajusta a escala conforme necessário
        this.scene.rotate(Math.PI, 1, 0, 0); // Inverte o cone
        this.bottomCone.display();
        this.scene.popMatrix();

        // Desenha o cone superior da colmeia
        this.scene.pushMatrix();
        this.scene.translate(0, 4, 0); // Move o cone superior para cima do cone inferior
        this.scene.scale(2, 2, 2); // Ajusta a escala conforme necessário
        this.topCone.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }
}
