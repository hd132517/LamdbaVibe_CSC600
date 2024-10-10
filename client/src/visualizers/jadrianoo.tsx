import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';

export const JadrianooVisualizer = new Visualizer(
  'jadrianoo',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    const dim = Math.min(width, height);

    p5.background(0, 0, 0, 255);

    const centerX = p5.frameCount % width / 1.5;
    const centerY = height / 2;
    const radius = dim / 4;

    p5.strokeWeight(4); 

    p5.colorMode(p5.HSB, 360, 100, 100);

    const values = analyzer.getValue();

    const multiplier = 30; 
    const amplitudeMin = 0.1;

    p5.beginShape();
    for (let i = 0; i < values.length; i+=2) {
      const amplitude = values[i] as number * multiplier; 
      if (amplitude < amplitudeMin) {
        continue;
      }
      const angle = p5.map(i, 0, values.length - 1, 0, p5.TWO_PI);
      const x = centerX + radius * p5.sin(angle) * amplitude;
      const y = centerY + radius * p5.cos(angle) * amplitude;

      const hue = p5.map(amplitude, 0, amplitude * 10, 255, 255);

      p5.stroke(hue, 180, 180, 255);
      p5.noFill();

      const numVertices = 10;

      for (let i = 0; i < numVertices; i++) {
        const vertexAngle = p5.map(i, 0, numVertices, 0, p5.TWO_PI);
        const vertexX = x + radius * p5.sin(vertexAngle) * 0.2 * amplitude;
        const vertexY = y + radius * p5.cos(vertexAngle) * 0.2 * amplitude;
        if (i === 0) {
          p5.beginShape();
        }
        p5.vertex(vertexX, vertexY);
        if (i === numVertices - 1) {
          p5.endShape(p5.CLOSE);
        }
      }
    }
  },
);
