import { CGFinterface, dat } from '../lib/CGF.js';

export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        super.init(application);

        this.gui = new dat.GUI();
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');
        this.gui.add(this.scene, 'displaySphere').name('Display Sphere');
        this.gui.add(this.scene, 'displayGarden').name('Display Garden');
        this.gui.add(this.scene, 'displayPlane').name('Display Plane');
        this.gui.add(this.scene, 'displayPanorama').name('Panorama');
        this.gui.add(this.scene, 'displayRock').name('Rock');
        this.gui.add(this.scene, 'displayRockSet').name('Rock Set');
        this.gui.add(this.scene, 'displayRockPyramid').name('Rock Pyramid');
        this.gui.add(this.scene, 'displayBee').name('Bee');
        this.gui.add(this.scene, 'displayGrass').name('Display Grass');
        this.gui.add(this.scene, 'displayPollen').name('Display Pollen');
        this.gui.add(this.scene, 'scaleFactor', 0.5, 3).name('Scale Factor');
        this.gui.add(this.scene, 'speedFactor', 0.1, 3).name('Speed Factor');

        this.initKeys();
        return true;
    }

    initKeys() {
        this.scene.gui = this;
        this.processKeyboard = function() { };
        this.activeKeys = { };
    }

    processKeyDown(event) {
        this.activeKeys[event.code] = true;
    }

    processKeyUp(event) {
        this.activeKeys[event.code] = false;
    }

    isKeyPressed(keyCode) {
        return this.activeKeys[keyCode] || false;
    }
}
