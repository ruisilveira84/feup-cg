import { CGFscene, CGFcamera, CGFaxis, CGFappearance } from "../lib/CGF.js";
import { CGFobject } from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyScene } from './MyScene.js';

/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class MyTangram extends CGFobject {
    constructor(scene) {
        super(scene);
        this.diamond = new MyDiamond(this.scene);
        this.triangle = new MyTriangle(this.scene);
        this.triangleBig = new MyTriangleBig(this.scene);
        this.triangleSmall = new MyTriangleSmall(this.scene);
        this.parallelogram = new MyParallelogram(this.scene);
        this.initMaterials();
    }

    initMaterials() {
    //Tangram componente especular alta
    this.materialOrange = new CGFappearance(this.scene);
    this.materialOrange.setAmbient(1.0, 0.65, 0.0, 1.0); // Cor laranja
    this.materialOrange.setDiffuse(1.0, 0.65, 0.0, 1.0);
    this.materialOrange.setSpecular(1.0, 1.0, 1.0, 1.0); // Componente especular alta
    this.materialOrange.setShininess(120.0); // Brilho elevado

    this.materialBlue = new CGFappearance(this.scene);
    this.materialBlue.setAmbient(0.0, 0.0, 1.0, 1.0); // Cor azul
    this.materialBlue.setDiffuse(1.0, 0.65, 0.0, 1.0);
    this.materialBlue.setSpecular(1.0, 1.0, 1.0, 1.0); // Componente especular alta
    this.materialBlue.setShininess(120.0); // Brilho elevado


    this.materialGreen = new CGFappearance(this.scene);
    this.materialGreen.setAmbient(0.0, 1.0, 0.0, 1.0);
    this.materialGreen.setDiffuse(1.0, 0.65, 0.0, 1.0);
    this.materialGreen.setSpecular(1.0, 1.0, 1.0, 1.0); // Componente especular alta
    this.materialGreen.setShininess(120.0); // Brilho elevado


    this.materialPink = new CGFappearance(this.scene);
    this.materialPink.setAmbient(1.0, 0.75, 0.79, 1.0);
    this.materialPink.setDiffuse(1.0, 0.65, 0.0, 1.0);
    this.materialPink.setSpecular(1.0, 1.0, 1.0, 1.0); // Componente especular alta
    this.materialPink.setShininess(120.0); // Brilho elevado

    this.materialPurple = new CGFappearance(this.scene);
    this.materialPurple.setAmbient(0.58, 0.0, 0.82, 1.0);
    this.materialPurple.setDiffuse(1.0, 0.65, 0.0, 1.0);
    this.materialPurple.setSpecular(1.0, 1.0, 1.0, 1.0); // Componente especular alta
    this.materialPurple.setShininess(120.0); // Brilho elevado

    this.materialRed = new CGFappearance(this.scene);
    this.materialRed.setAmbient(1.0, 0.0, 0.0, 1.0);
    this.materialRed.setDiffuse(1.0, 0.65, 0.0, 1.0);
    this.materialRed.setSpecular(1.0, 1.0, 1.0, 1.0); // Componente especular alta
    this.materialRed.setShininess(120.0); // Brilho elevado

    this.materialYellow = new CGFappearance(this.scene);
    this.materialYellow.setAmbient(1.0, 1.0, 0.0, 1.0);
    this.materialYellow.setDiffuse(1.0, 0.65, 0.0, 1.0);
    this.materialYellow.setSpecular(1.0, 1.0, 1.0, 1.0); // Componente especular alta
    this.materialYellow.setShininess(120.0); // Brilho elevado
    }

    display(){
        //Diamond
        this.scene.pushMatrix();
        let translationMatrix = [1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            2, -1, 0, 1
        ]
        this.scene.multMatrix(translationMatrix);
        this.scene.customMaterial.apply();
        this.diamond.display();
        this.scene.popMatrix();

        //pink triangle
        this.scene.pushMatrix()
        this.scene.translate(1.6, 1.8, 0)
        this.scene.rotate(225 * Math.PI / 180, 0, 0, 1)
        this.materialPink.apply();
        this.triangle.display()
        this.scene.popMatrix()

        //parallelogram
        this.scene.pushMatrix()
        this.scene.translate(3, 0.4, 0)
        this.scene.scale(1, 1, 1)
        this.scene.rotate(135 * Math.PI / 180, 0, 0, 1)
        this.materialYellow.apply();
        this.parallelogram.display()
        this.scene.popMatrix()

        //red triangle
        this.scene.pushMatrix()
        this.scene.translate(2.3, -0.3, 0)
        this.scene.rotate(315 * Math.PI / 180, 0, 0, 1)
        this.materialRed.apply();
        this.triangleSmall.display()
        this.scene.popMatrix()

        //purple triangle
        this.scene.pushMatrix()
        this.scene.translate(1, 0, 0)
        this.scene.rotate(Math.PI , 0, 0, 1)
        this.materialPurple.apply();
        this.triangleSmall.display()
        this.scene.popMatrix()


        //blue triangle
        this.scene.pushMatrix()
        this.scene.translate(0, -2, 0)
        this.scene.rotate(0, 0, 0, 0)
        this.materialBlue.apply();
        this.triangleBig.display()
        this.scene.popMatrix()


        //orange triangle
        this.scene.pushMatrix()
        this.scene.translate( -2, 0, 0)
        this.scene.rotate(Math.PI, 0, 0, 1)
        this.materialOrange.apply();
        this.triangleBig.display()
        this.scene.popMatrix()
    }
    updateBuffers (){
        //empty function
    }
}