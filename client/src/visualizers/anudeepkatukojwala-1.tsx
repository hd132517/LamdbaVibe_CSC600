// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';

export const anudeepkatukojwala = new Visualizer(
  'anudeepkatukojwala',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight;
  
    p5.background(10,15,20);
    p5.translate(width / 2.5, height / 4);
    
    const values = analyzer.getValue();
    p5.beginShape();

    for (let i = 0; i < values.length; i++) {
      const amplitude = values[i] as number;

      // Only move squares based on audio input
      const rotationSpeed = amplitude * 20;
      p5.rotate(rotationSpeed);

      const size = p5.map(amplitude*2, -2, 2, 10, 100);
      const x = (i % 4) * (size + 10) - (2 * size + 20);
      const y = Math.floor(i / 4) * (size + 10) - (2 * size + 20);
      p5.rect(x, y, size, size);
    
  
      //colors
      var m = p5.map(Math.sin(p5.frameCount),-1,1,50,5)
      var k = p5.map(Math.sin(p5.frameCount/2),-1,1,50,150)
      var u = p5.map(Math.sin(p5.frameCount/4), -1,1,50,250) 
      p5.stroke (m,k,u)
      p5.fill( m, u, k);

    }
    p5.endShape();

  },
);
