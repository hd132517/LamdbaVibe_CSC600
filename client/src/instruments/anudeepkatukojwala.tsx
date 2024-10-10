// 3rd party library imports
import * as Tone from 'tone';
import P5 from 'p5';
import classNames from 'classnames';
import { List } from 'immutable';
import React from 'react';
import '../css/drums.css';


// project imports
import { Instrument, InstrumentProps } from '../Instruments';

interface DrumKeyProps {
    note: string; 
    duration?: string;
    synth?: Tone.Synth; // Contains library code for making sound
    index: number; 
    pitchDecay: number;
}


const BOOM = 'drumSounds/Drumkit_sounds_boom.wav';
const CLAP = 'drumSounds/Drumkit_sounds_clap.wav';
const HiHat = 'drumSounds/Drumkit_sounds_hihat.wav';
const KICK = 'drumSounds/Drumkit_sounds_kick.wav';
const OpenHat = 'drumSounds/Drumkit_sounds_openhat.wav';
const RIDE = 'drumSounds/Drumkit_sounds_ride.wav';
const SNARE = 'drumSounds/Drumkit_sounds_snare.wav';
const TINK = 'drumSounds/Drumkit_sounds_tink.wav';
const TOM = 'drumSounds/Drumkit_sounds_tom.wav';

const player = [BOOM, CLAP, HiHat, KICK, OpenHat, RIDE, SNARE, TINK, TOM];

export function DrumPadKey({
    note,
    synth,
    index,
}: DrumKeyProps): JSX.Element {
   
 
    return (
      
        
        <div
        onMouseDown={() =>synth?.triggerAttackRelease(`${note}`, '8n')}// does not keep playing when you hold note
            className={classNames('  pointer  relative  drumPad ')}
            style={{
                padding: 10,
                margin:20,
                display: "inline",
                backgroundColor: "BLACK",
                borderRadius:10,
                               
                }}
                
        ></div >
    );
}



function DrumPad({ synth, setSynth }: InstrumentProps): JSX.Element {
    const keys = List([
      { note: 'BOOM', idx: 0 },
      { note: 'CLAP', idx: 1 },
      { note: 'HiHat', idx: 2 },
      { note: 'KICK', idx: 3 },
      { note: 'OpenHat', idx: 4 },
      { note: 'RIDE', idx: 5 },
      { note: 'SNARE', idx: 6 },
      { note: 'TINK', idx: 7 },
      { note: 'TOM', idx: 8 },
    ]);
  
    return (
      <div className="pv4" style={{ display: 'flex', justifyContent: 'center' }}>
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
                  flexDirection: 'row',
                  height: '60px',
                  width: '60px',
                  border: '1px solid black',
                  padding: '10px',
                  backgroundColor: 'white',
                  marginRight: '0px',
                  marginBottom: '15px',
                  boxShadow: '2px 3px 3px black',
                }}
                onClick={() => {
                  const tonePlayer = new Tone.Player(player[idx]).toDestination();
                  Tone.loaded().then(() => {
                    tonePlayer.start();
                  });
                }}
              ></button>
              <div style={{ textAlign: 'center' }}>{note}</div>
            </div>
          );
        })}
      </div>
    );
  }
  

export const anudeepkatukojwalaDrum = new Instrument('anudeepkatukojwala', DrumPad);
