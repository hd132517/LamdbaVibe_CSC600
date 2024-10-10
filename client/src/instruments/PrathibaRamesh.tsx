import * as Tone from 'tone';
import classNames from 'classnames';
import { is, List } from 'immutable';
import React, { useState } from 'react';
import '../../src/css/flute.css';

// project imports
import { Instrument, InstrumentProps } from '../Instruments';

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Flute
 ** ------------------------------------------------------------------------ */

interface FluteProps {
    note: string;
    duration?: string;
    synth?: Tone.Synth; // Contains library code for making sound
    index: number;
    pitchDecay: number;
}

const ASIA = 'fluteSounds/Low.wav';
const C2 = 'fluteSounds/Medium1.wav';
const JASSRIFF = 'fluteSounds/Medium2.wav';
const FLUTTER = 'fluteSounds/Medium3.wav';
const SQUEAK = 'fluteSounds/Long1.wav';
const ECHO = 'fluteSounds/Long2.wav';
const FLUTE1 = 'fluteSounds/Long3.wav';
const FLUTE2 = 'fluteSounds/Long4.wav';
const NATIVE1 = 'fluteSounds/High1.wav';
const NATIVE2 = 'fluteSounds/High2.wav';
const AFRO = 'fluteSounds/High3.wav';

const notes = [ASIA, C2, JASSRIFF, FLUTTER, SQUEAK, ECHO, FLUTE1, FLUTE2, NATIVE1, NATIVE2, AFRO];

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

export function FlutePadKey({
    note,
    synth,
    index,
}: FluteProps): JSX.Element {
    const [isKeyPressed, setIsKeyPressed] = useState(false);

    const handleMouseDown = () => {
        synth?.triggerAttackRelease(`${note}`, '8n');
        setIsKeyPressed(true);
        console.log(isKeyPressed);
    };

    const handleMouseUp = () => {
        setIsKeyPressed(false);
    };

    return (
        <div
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            className={classNames('pointer relative flute-pad')}
        >
            <div className={classNames('circle-outer', { 'circle-inner': isKeyPressed })}>
                {isKeyPressed && <div className="circle-fill" />}
            </div>
        </div>
    );
}

function Flute({ synth, setSynth }: InstrumentProps): JSX.Element {
    const keys = List([
        { note: 'ASIA', idx: 0 },
        { note: 'C2', idx: 1 },
        { note: 'JASSRIFF', idx: 2 },
        { note: 'FLUTTER', idx: 3 },
        { note: 'SQUEAK', idx: 4 },
        { note: 'ECHO', idx: 5 },
        { note: 'FLUTE1', idx: 6 },
        { note: 'FLUTE2', idx: 7 },
        { note: 'NATIVE1', idx: 8 },
        { note: 'NATIVE2', idx: 9 },
        { note: 'AFRO', idx: 10 },
    ]);
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
        <div className="pv4">
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                {keys.map((key) => {
                    const { note, idx } = key;
                    return (
                        <div 
                            key={note}
                            style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', margin: '10px' }}
                        >
                            <button
                                style={{
                                    alignItems: 'center',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    height: '50px',
                                    width: '50px',
                                    border: 'none',
                                    padding: '0',
                                    backgroundColor: '#C2B280',
                                    marginRight: '0px',
                                    marginBottom: '15px',
                                    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
                                    position: 'relative',
                                    borderRadius: '50%',
                                    overflow: 'hidden',
                                }}
                                onClick={() => {
                                    const tonePlayer = new Tone.Player(notes[idx]).toDestination();
                                    Tone.loaded().then(() => {
                                        tonePlayer.start();
                                    });
                                }}
                            >
                                <div className="circle-outer">
                                    <div className="circle-inner" />
                                </div>
                            </button>
                            {/*<div style={{ textAlign: 'center' }}>{note}</div>*/}
                        </div>
                    );
                })}
            </div>
            <div style={{ paddingLeft: "18%", paddingRight: "10%" }} className={'pl4 pt4 flex'}>
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

export const PrathibaRameshInstrument = new Instrument('PrathibaRamesh', Flute);