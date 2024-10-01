import { CGFobject } from '../../lib/CGF.js';
import { MyRock } from './MyRock.js';

export class MyRockSet2 extends CGFobject {
  constructor(scene, baseRadius, layers, texture) {
    super(scene);
    this.scene = scene;
    this.baseRadius = baseRadius;
    this.layers = layers;
    this.rocks = [];
    this.texture = texture;
    this.initRocks();
  }

  initRocks() {
    let layerSpacing = this.baseRadius * 0.5; // Espaçamento vertical maior entre as camadas

    // Diminui o raio da base da pirâmide para aumentar o espaçamento horizontal
    let baseLayerRadius = this.baseRadius * 0.9; 

    for (let layer = 0; layer < this.layers; layer++) {
      // Em cada camada superior, o número de pedras diminui
      let numRocksThisLayer = this.layers - layer; // Simplificado para um número linear
      let angleStep = Math.PI * 2 / numRocksThisLayer;
      
      // Ajuste o raio da camada para espaçamento horizontal maior
      let layerRadius = baseLayerRadius * ((this.layers - layer) / this.layers);

      for (let i = 0; i < numRocksThisLayer; i++) {
        let angle = i * angleStep;
        let x = layerRadius * Math.cos(angle);
        let z = layerRadius * Math.sin(angle);
        let y = layer * layerSpacing; // Uso do espaçamento vertical ajustado

        let rock = new MyRock(this.scene, this.baseRadius * 0.5, 16, 16, 0.3, this.texture); // Reduz o raio da rocha para maior espaçamento
        let scale = (1 - layer * 0.2 / this.layers); // Ajuste de escala para as camadas superiores
        this.rocks.push({
          rock: rock,
          position: [x, y, z],
          scale: [scale, scale, scale]
        });
      }

      // Ajuste a base do raio da próxima camada para que as pedras não fiquem muito próximas
      baseLayerRadius -= this.baseRadius * 0.25 / this.layers;
    }
  }


  display() {
    this.rocks.forEach(({ rock, position, scale }) => {
      this.scene.pushMatrix();
      this.scene.translate(...position);
      this.scene.scale(...scale);
      rock.display();
      this.scene.popMatrix();
    });
  }
}


