// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';

export const BarGraphVisualizer = new Visualizer(
    'PrathibaRamesh',
    (p5: P5, analyzer: Tone.Analyser) => {
        const width = window.innerWidth;
        const height = window.innerHeight / 2;
        const dim = Math.min(width, height);

        // Define color scheme
        const colorStops = [
            { offset: 0.2, color: '#ff0000' }, // Red
            { offset: 0.33, color: '#00ff00' }, // Green
            { offset: 0.66, color: '#0000ff' }, // Blue
            { offset: 0.8, color: '#FFBF00' }, // Amber
            { offset: 0.5, color: '#7554AE' }, // Amber
        ];
        const gradient = (p5.drawingContext as CanvasRenderingContext2D).createLinearGradient(0, 0, 0, height);
        colorStops.forEach((stop) => gradient.addColorStop(stop.offset, stop.color));

        p5.background(0, 0, 0, 255);

        const values = analyzer.getValue();
        const barWidth = width / values.length;
        const barSpacing = barWidth * 0.2;

        for (let i = 0; i < values.length; i++) {
            const amplitude = values[i] as number;
            const x = i * barWidth + barSpacing;
            const shapeSize = amplitude * dim;

            // Randomly adjust the y position of the shape
            const randomYOffset = p5.random(-amplitude * dim * 0.25, amplitude * dim * 0.25);

            // Define visual effect
            p5.push();
            p5.translate(x, height / 2 + randomYOffset);
            p5.rotate(p5.frameCount * 0.01 * (i % 2 === 0 ? 1 : -1));
            p5.translate(-x, -height / 2 + randomYOffset);

            // Draw 2D shape
            const fillColor = p5.color(
                parseInt(colorStops[i % colorStops.length].color.substr(1, 2), 16),
                parseInt(colorStops[i % colorStops.length].color.substr(3, 2), 16),
                parseInt(colorStops[i % colorStops.length].color.substr(5, 2), 16),
                200
            );
            p5.fill(fillColor);
            p5.rect(x - shapeSize / 2, height / 2 - shapeSize / 2, shapeSize, shapeSize);
            p5.pop();
        }
    },
);
