// 3rd party
import { List, Map } from 'immutable';

// project dependencies
import { PianoInstrument } from './instruments/Piano';
import { OtamatoneInstrument } from './instruments/Otamatone';
import { PrathibaRameshInstrument } from './instruments/PrathibaRamesh';
import { anudeepkatukojwalaDrum } from './instruments/anudeepkatukojwala';

import { BassInstrument } from './instruments/jadrianoo'
import { WaveformVisualizer } from './visualizers/Waveform';
import { BarGraphVisualizer } from './visualizers/PrathibaRamesh';
import { anudeepkatukojwala } from './visualizers/anudeepkatukojwala-1';
import { JadrianooVisualizer } from './visualizers/jadrianoo';
import { DonghyunVisualizer } from './visualizers/donghyun';



/** ------------------------------------------------------------------------ **
 * The entire application state is stored in AppState.
 ** ------------------------------------------------------------------------ */
export type AppState = Map<string, any>;           // similar to { [id: string]: any }

/**
 * Start with the default piano instrument.
 * Add your instruments to this list.
 */
const instruments = List([PianoInstrument, PrathibaRameshInstrument, anudeepkatukojwalaDrum, BassInstrument, OtamatoneInstrument]);       // similar to Instrument[]

/**
 * Start with the default waveform visualizer.
 * Add your visualizers to this list.
 */
const visualizers = List([WaveformVisualizer, BarGraphVisualizer, anudeepkatukojwala, JadrianooVisualizer, DonghyunVisualizer]);    // similar to Visualizer[]


/**
 * The default application state contains a list of instruments and a list of visualizers.
 *
 * 'instrument': List<Instrument>
 * 'visualizer': List<Visualizer>
 */
export const defaultState: AppState = Map<string, any>({
  'instruments': instruments,
  'visualizers': visualizers,
});