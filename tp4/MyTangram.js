import { CGFobject } from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";

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
        this.triangleBig1 = new MyTriangleBig(this.scene, 1);
        this.triangleBig2 = new MyTriangleBig(this.scene, 2);
        this.triangleSmall1 = new MyTriangleSmall(this.scene, 1);
        this.triangleSmall2 = new MyTriangleSmall(this.scene, 2);
        this.parallelogram = new MyParallelogram(this.scene);
    }


    display(){
        this.scene.tangramMaterial.apply();
        //Diamond
        this.scene.pushMatrix();
        let translationMatrix = [1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            2, -1, 0, 1
        ]
        this.scene.multMatrix(translationMatrix);
        this.scene.setDiffuse(0, 255 / 255, 0, 0);
        this.diamond.display();
        this.scene.popMatrix();

        //pink triangle
        this.scene.pushMatrix()
        this.scene.translate(1.6, 1.8, 0)
        this.scene.rotate(225 * Math.PI / 180, 0, 0, 1)
        this.scene.setDiffuse(255 / 255, 0 / 192, 203 / 255, 0)
        this.triangle.display()
        this.scene.popMatrix()

        //parallelogram
        this.scene.pushMatrix()
        this.scene.translate(3, 0.4, 0)
        this.scene.scale(1, 1, 1)
        this.scene.rotate(135 * Math.PI / 180, 0, 0, 1)
        this.scene.setDiffuse(255 , 255, 0, 0)
        this.parallelogram.display()
        this.scene.popMatrix()

        //red triangle
        this.scene.pushMatrix()
        this.scene.translate(2.3, -0.3, 0)
        this.scene.rotate(315 * Math.PI / 180, 0, 0, 1)
        this.scene.setDiffuse(1, 0, 0, 0)
        this.triangleSmall2.display()
        this.scene.popMatrix()

        //purple triangle
        this.scene.pushMatrix()
        this.scene.translate(1, 0, 0)
        this.scene.rotate(Math.PI , 0, 0, 1)
        this.scene.setDiffuse(128 / 255, 0 / 255, 128 / 255, 0)
        this.triangleSmall1.display()
        this.scene.popMatrix()


        //blue triangle
        this.scene.pushMatrix()
        this.scene.translate(0, -2, 0)
        this.scene.rotate(0, 0, 0, 0)
        this.scene.setDiffuse(0, 0, 1, 0)
        this.triangleBig1.display()
        this.scene.popMatrix()


        //orange triangle
        this.scene.pushMatrix()
        this.scene.translate( -2, 0, 0)
        this.scene.rotate(Math.PI, 0, 0, 1)
        this.scene.setDiffuse(255 / 255, 165 / 255, 0 / 255, 0)
        this.triangleBig2.display()
        this.scene.popMatrix()
    }
}