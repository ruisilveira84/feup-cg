import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyFlower } from "./MyFlower.js";
import { MyGarden } from "./MyGarden.js";
import { MyRock } from "./MyRock.js";
import { MyRockSet } from "./MyRockSet.js";
import { MyRockSet2 } from "./MyRockSet2.js";
import { MySphere } from "./MySphere.js";
import { MyGrass } from "./MyGrass.js";
import { MyBee } from "./MyBee.js";
import { MyPollen } from "./MyPollen.js";
import { MyHive } from "./MyHive.js";

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
    this.lastTime = 0;
    this.speedFactor = 1;
    this.scaleFactor = 1;
  }
  
  init(application) {
    super.init(application);

    this.initCameras();
    this.initLights();

    // Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    this.enableTextures(true);
    this.initTextures();
    this.appearance = new CGFappearance(this);
    this.appearance.setTextureWrap("REPEAT", "REPEAT");
    this.setUpdatePeriod(1000 / 60);

    // Initialize scene objects
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this, 30);
    this.panorama = new MyPanorama(this, this.panoramaTexture);
    this.sphere = new MySphere(this, 16, 8, 8, false, 1, 1);
    this.rock = new MyRock(this, 0.6, 10, 10, 0.3, this.rockTexture);
    this.rockSet = new MyRockSet(this, 10, 2, 0.1, 0.3, this.rockTexture);
    this.rockPyramid = new MyRockSet2(this, 1, 4, this.rockTexture);
    this.bee = new MyBee(this);
    this.stemTexture = new CGFtexture(this, "textures/textureGreen.jpg");
    this.receptacleTexture = new CGFtexture(this, "textures/textureYellow.jpg");
    this.petalTexture = new CGFtexture(this, "textures/textureRed.jpg");
    this.flower = new MyFlower(this, null, null, null, null, null, null, null, null, null, null, null, null, this.stemTexture, this.receptacleTexture, this.petalTexture);
    this.garden = new MyGarden(this);
    this.pollen = new MyPollen(this, 1, 8, 8, 1.5, 0.8);
    this.grass = new MyGrass(this, "textures/textureGreen.jpg");
    this.hive = new MyHive(this);
    

    // Objects connected to MyInterface
    this.displayAxis = true;
    this.displayPlane = true;
    this.displayPanorama = true;
    this.displaySphere = false;
    this.displayRock = false;
    this.displayRockSet = false;
    this.displayRockPyramid = true;
    this.displayBee = true;
    this.scaleFactor = 1;
    this.displayFlower = false;
    this.displayGarden = true;
    this.displayGrass = true;
    this.displayPollen = false;
    this.displayHive = true;
    this.texture = new CGFtexture(this, "images/terrain.jpg");
    this.appearance.setTexture(this.texture);
  }

  checkKeys() {
    var text="Keys pressed: ";
    var keysPressed=false;
    // Check for key codes e.g. in https://keycode.info/
    if (this.gui.isKeyPressed("KeyW")) {
      text+=" W ";
      this.bee.accelerate(this.speedFactor * 0.1);
      keysPressed=true;
    }
    if (this.gui.isKeyPressed("KeyS"))        {
      text+=" S ";
      this.bee.accelerate(-this.speedFactor * 0.1);
      keysPressed=true;
    }
    if (this.gui.isKeyPressed("KeyA")) {
      text+=" A ";
      this.bee.turn(this.speedFactor * 0.05);
      keysPressed = true;
    }
    if (this.gui.isKeyPressed("KeyD")) {
      text+=" D ";
      this.bee.turn(-this.speedFactor * 0.05);
      keysPressed = true;
    }
    if (this.gui.isKeyPressed("KeyR")) {
      text+=" R "
      this.bee.reset();
      keysPressed = true;
    }
    if (this.gui.isKeyPressed("KeyF")) {
      text+=" F "
      this.bee.startDescending();
      keysPressed = true;
    }
    if (this.gui.isKeyPressed("KeyP")) {
      text+=" P "
      this.bee.startAscending();
      keysPressed = true;
    }
    if (this.gui.isKeyPressed("KeyO")) {
      text+=" O "
      this.bee.dropPollen();
      keysPressed = true;
    }
    if (keysPressed)
      console.log(text);
  }

  initTextures() {
    this.stemTexture = new CGFtexture(this, 'textures/textureGreen.jpg');
    this.receptacleTexture = new CGFtexture(this, 'textures/textureYellow.jpg');
    this.petalTexture = new CGFtexture(this, 'textures/textureRed.jpg');
    this.panoramaTexture = new CGFtexture(this, "images/panorama4.jpg");
    this.rockTexture = new CGFtexture(this, "images/rockTexture.jpg");
  }

  initLights() {
    this.lights[0].setPosition(-200, 200, 200, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }

  initCameras() {
    this.camera = new CGFcamera(
      1.0, // FoV
      0.1,
      1000,
      vec3.fromValues(5, 5, 5), // Position
      vec3.fromValues(0, 0, 0)
    );
  }

  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }

  update(t) {

    this.checkKeys();
    this.bee.update(t / 1000);
    this.lastTime = t;
  }

  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer every time we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation)
    this.updateProjectionMatrix();
    this.loadIdentity();
    this.lights[0].update();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw flower
    if (this.displayFlower) {
      this.flower.display();
    }

    // Draw Garden
    if (this.displayGarden) {
      this.garden.display();
    }

    if (this.displayAxis) {
      this.pushMatrix();
      this.appearance.apply(); 
      this.axis.display();
      this.popMatrix();
    }

    if (this.displayPlane) {
      this.pushMatrix();
      this.appearance.apply(); 
      this.translate(0, 0, 0);
      this.scale(400, 400, 400);
      this.rotate(-Math.PI / 2.0, 1, 0, 0);
      this.plane.display();
      this.popMatrix();
    }

    if (this.displayPanorama) {
      this.pushMatrix();
      this.appearance.apply();
      this.panorama.display();
      this.popMatrix();
    }

    if (this.displaySphere) {
      this.pushMatrix();
      this.appearance.apply();
      this.sphere.display();
      this.popMatrix();
    }

    if (this.displayRock) {
      this.pushMatrix();
      this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
      this.rock.display();
      this.popMatrix();
    }

    if (this.displayRockSet) {
      this.pushMatrix();
      this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
      this.rockSet.display();
      this.popMatrix();
    }

    if (this.displayRockPyramid) {
      this.pushMatrix();
      this.translate(10, 0, 0); // Ajusta a posição do monte de pedras
      this.rockPyramid.display();
      this.popMatrix();

      // Desenha a colmeia
      this.pushMatrix();
      this.translate(10, 0, 0); // Ajusta a posição da colmeia sobre o monte de pedras
      this.scale(1, 1, 1); // Ajuste de escala se necessário
      this.hive.display();
      this.popMatrix();
    }

    if (this.displayGrass) {
      this.grass.display();
    }

    if (this.displayBee) {
      this.bee.display();
    }

    if (this.displayPollen) { 
      this.pushMatrix();
      this.appearance.apply();
      this.pollen.display();
      this.popMatrix();
    }


  }
}
