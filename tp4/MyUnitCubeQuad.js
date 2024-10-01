import { CGFobject } from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';

/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
    constructor(scene, texture4, texture5, texture6) {
        super(scene);
        this.texture4 = texture4;
        this.texture5 = texture5;
        this.texture6 = texture6;
        this.quad = new MyQuad(this.scene);
    }


    display() {

        //Front
        this.scene.pushMatrix()
        this.scene.translate(0.5, 0, 0)
        this.scene.rotate(Math.PI / 2, 0, 1, 0)
        this.texture5.bind();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display()
        this.scene.popMatrix()

        //Back
        this.scene.pushMatrix()
        this.scene.translate(-0.5, 0, 0)
        this.scene.rotate(3 * Math.PI / 2, 0, 1, 0)
        this.texture5.bind();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display()
        this.scene.popMatrix()

        //Left
        this.scene.pushMatrix()
        this.scene.translate(0,0,0.5)
        this.texture5.bind();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display()
        this.scene.popMatrix()

        //Right
        this.scene.pushMatrix()
        this.scene.translate(0,0,-0.5)
        this.scene.rotate(Math.PI, 0, 1, 0)
        this.texture5.bind();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display()
        this.scene.popMatrix()

        //Top
        this.scene.pushMatrix()
        this.scene.translate(0,0.5,0)
        this.scene.rotate(3 * Math.PI/2 ,1, 0, 0)
        this.texture4.bind();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display()
        this.scene.popMatrix()

        //Bottom
        this.scene.pushMatrix()
        this.scene.translate(0,-0.5,0)
        this.scene.rotate(Math.PI/2 ,1, 0, 0)
        this.texture6.bind();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display()
        this.scene.popMatrix()

        
    }


}
