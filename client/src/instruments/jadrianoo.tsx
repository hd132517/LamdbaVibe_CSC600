import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';
import React from 'react';

// project imports
import { Instrument, InstrumentProps } from '../Instruments';

interface BassGuitarProps {
  note: string; // E, A, D, G
  duration?: string;
  synth?: Tone.Synth; // Contains library code for making sound
  minor?: boolean; // True if minor key, false if major key
  octave: number;
  index: number; // octave + index together give a location for the piano key
}

export function BassString({
  note,
  synth,
  minor,
}: BassGuitarProps): JSX.Element {
  const numFrets = 4; 
  const fretHeight = 40; 
  const stringHeight = minor ? 40 : 180; 
  const frets = Range(1, numFrets + 1).toArray(); 

  return (
    <div
      onMouseDown={() => {
        console.log(`Playing note ${note}`);
        synth?.triggerAttack(`${note}`);
      }}
      onMouseUp={() => synth?.triggerRelease('+0.25')}
      className={classNames('ba pointer absolute dim', {
        'bg-black black h6': minor,
        'black bg-white h4': !minor,
    })}
    style={{
      display: 'flex',
      flexDirection: 'column',
      width: '20px',
      height: stringHeight,
      marginTop: minor ? '0.1rem' : 0,
      borderRadius: '25px',
      backgroundColor: '#5C4033', 
    }}
  >
      {frets.map((fret) => (
        <div
          key={fret}
          style={{
            position: 'absolute',
            top: fretHeight * (fret - 1),
            left: 0,
            right: 0,
            marginTop: '30px',
            borderBottom: '7px solid black',
          }}
        />
      ))}
    </div>
  );
}

function BassType({ title, onClick, active }: any): JSX.Element {
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
  
function Bass({ synth, setSynth }: InstrumentProps): JSX.Element {
  const strings = List([
    { note: 'E', idx: 0 },
    { note: 'A', idx: 1 },
    { note: 'D', idx: 2 },
    { note: 'G', idx: 3 },
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
      <div className="dib w-100 ml4 flex" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        {strings.map(string => {
            const note = `${string.note}1`;
            return (
              <div style={{ minWidth: '1rem', marginLeft: '12px', display: 'row' }}>
                <BassString
                  key={note} 
                  note={note}
                  synth={synth}
                  octave={1}
                  minor={false}
                  index={string.idx}
                />
              </div>
            );
        })}
      </div>
      <div className={'pl4 pt4 flex'} style={{ marginTop: '165px'}}>
        {oscillators.map(o => (
          <BassType
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

export const BassInstrument = new Instrument('jadrianoo', Bass);
