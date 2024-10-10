//Donghyun Nam

// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';
import React from 'react';

// project imports
import { Instrument, InstrumentProps } from "../Instruments";
import './Otamatone.css';

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Otamatone.
 ** ------------------------------------------------------------------------ */
function PianoType({ title, onClick, active }: any): JSX.Element {
    return (
        <div
            onClick={onClick}
            className={classNames('dim pointer ph2 pv1 ba mr2 br1 fw7 bw1', {
                'b--black black': active,
                'gray b--light-gray': !active,
            })}
        >
            {title}
        </div>
    );
}

function Otamatone({ synth, setSynth }: InstrumentProps): JSX.Element {
    const [playing, setPlaying] = React.useState(false);

    const setOscillator = (newType: Tone.ToneOscillatorType) => {
        setSynth(oldSynth => {
            oldSynth.disconnect();

            return new Tone.Synth({
                oscillator: { type: newType } as Tone.OmniOscillatorOptions,
            }).toDestination();
        });
    };

    const oscillators: List<OscillatorType> = List([
        'sine',
        'sawtooth',
        'square',
        'triangle',
        'fmsine',
        'fmsawtooth',
        'fmtriangle',
        'amsine',
        'amsawtooth',
        'amtriangle',
    ]) as List<OscillatorType>;

    return (
        <div className="otamatone">
            <div id="otamatone">
                <div className="face">
                    <div className="eye1"/>
                    <div className="eye2"/>
                    <div className="mouth" style={playing?{left: '50px', width: '100px'}:{}}/>
                </div>
                <div className="neck">
                    <div className="stem">
                        <div className="note"
                            onMouseDown={(event) => {
                                const noteNumber = Math.floor((event.clientX / window.innerWidth) * 7); // Map X-coordinate to note number
                                synth?.triggerAttack(`C${noteNumber}`);
                                setPlaying(true);
                            }}
                            onMouseUp={() => {synth?.triggerRelease('+0.1'); setPlaying(false);}}/>
                    </div>
                </div>
                <div className="tail"/>
            </div>
            <div className={'pl4 pt4 flex'}>
                {oscillators.map(o => (
                    <PianoType
                        key={o}
                        title={o}
                        onClick={() => setOscillator(o)}
                        active={synth?.oscillator.type === o}
                    />
                ))}
            </div>
        </div>
    );
}

export const OtamatoneInstrument = new Instrument("hd132517", Otamatone);