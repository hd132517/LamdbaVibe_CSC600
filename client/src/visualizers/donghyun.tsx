import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';

export const DonghyunVisualizer = new Visualizer(
    'donghyun',
    (p5: P5, analyzer: Tone.Analyser) => {
        const width = window.innerWidth;
        const height = window.innerHeight / 2;
        const dim = Math.min(width, height);

        p5.background(0, 0, 0, 255);

        const spectrum = analyzer.getValue();
        const spectrumLength = spectrum.length;

        p5.noStroke();
        p5.fill(255, 255, 255, 200);

        const barWidth = width / spectrumLength;

        for (let i = 0; i < spectrumLength; i++) {
            const barHeight = Number(spectrum[i]) * height * 2;
            const x = i * barWidth;
            const y = height - barHeight;
            p5.rect(x, y, barWidth, barHeight);
        }
    },
);