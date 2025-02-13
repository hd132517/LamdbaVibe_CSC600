// 3rd party library imports
import classNames from 'classnames';
import { List } from 'immutable';
import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
    RadioButton20,
    RadioButtonChecked20,
    Music20,
    Add20,
    Subtract20,
} from '@carbon/icons-react';

// project imports
import { DispatchAction } from './Reducer';
import { AppState } from './State';
import { Instrument } from './Instruments';
import { Visualizer } from './Visualizers';


/** ------------------------------------------------------------------------ **
 * SideNav component
 ** ------------------------------------------------------------------------ */

type SideNavProps = {
    state: AppState;
    dispatch: React.Dispatch<DispatchAction>;
};

export function SideNav({ state, dispatch }: SideNavProps): JSX.Element {
    /**
     * 
     * SideNav
     * |-----------------|
     * | Nameless App    |
     * | |-----------|   |
     * | |           |   |
     * | |-----------|   |
     * |                 |
     * | InstrumentsNav  |
     * | |-----------|   |
     * | |           |   |
     * | |-----------|   | 
     * |                 |
     * | VisualizersNav  |
     * | |-----------|   |
     * | |           |   |
     * | |-----------|   |
     * |                 |
     * | SongsNav        |
     * | |-----------|   |
     * | |           |   |
     * | |-----------|   |
     * |                 |
     * |-----------------|
    */

    return (
        <div className="absolute top-0 left-0 bottom-0 w5 z-1 shadow-1 bg-white flex flex-column">
            <div className="h3 fw7 f5 flex items-center pl3 bb b--light-gray">
                Team Malloc - Final Project
            </div>
            <br />
            <div className="flex-auto">
                <InstrumentsNav state={state} dispatch={dispatch} />
                <VisualizersNav state={state} dispatch={dispatch} />
                <SongsNav state={state} dispatch={dispatch} />
            </div>
        </div>
    );
}


/** ------------------------------------------------------------------------ **
 * SideNav Sub-Components
 ** ------------------------------------------------------------------------ */

function InstrumentsNav({ state }: SideNavProps): JSX.Element {
    /** 
     *  InstrumentsNav
     *  |-----------------|
     *  | Section         |
     *  | |-------------| |
     *  | | RadioButton | |
     *  | |-------------| | 
     *  | | RadioButton | |
     *  | |-------------| |
     *  |      ...        |
     *  |-----------------|
    */

    const instruments: List<Instrument> = state.get('instruments');
    const activeInstrument = state.get('instrument')?.name;
    const location = useLocation();

    return (
        <Section title="Instruments">
            {instruments.map(i => (
                <RadioButton
                    key={i.name}
                    to={`/${i.name}${location.search}`}
                    text={i.name}
                    active={i.name === activeInstrument}
                    onClick={() => console.log(i.name)}
                />
            ))}
        </Section>
    );
}

function VisualizersNav({ state }: SideNavProps): JSX.Element {
    /** 
     *  VisualizersNav
     *  |-----------------|
     *  | Section         |
     *  | |-------------| |
     *  | | RadioButton | |
     *  | |-------------| | 
     *  | | RadioButton | |
     *  | |-------------| |
     *  |      ...        |
     *  |-----------------|
    */

    const visualizers: List<Visualizer> = state.get('visualizers');
    const activeVisualizer = state.get('visualizer')?.name;
    const location = useLocation();

    return (
        <Section title="Visualizers">
            {visualizers.map(v => (
                <RadioButton
                    key={v.name}
                    to={{
                        pathname: location.pathname,
                        search: `?visualizer=${v.name}`,
                    }}
                    text={v.name}
                    active={v.name === activeVisualizer}
                    onClick={() => console.log(v.name)}
                />
            ))}
        </Section>
    );
}

function SongsNav({ state, dispatch }: SideNavProps): JSX.Element {
    /** 
     * 
     *  SongsNav
     *  |-----------------|
     *  | Section         |
     *  | |-------------| |
     *  | | Music20     | |
     *  | |-------------| | 
     *  | | Music20     | |
     *  | |-------------| |
     *  |      ...        |
     *  |-----------------|
    */

    const songs: List<any> = state.get('songs', List());
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedArtist, setExpandedArtist] = useState('');
    const filteredSongs = songs.filter((song) =>
        song.get('songTitle').toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.get('artist').toLowerCase().includes(searchQuery.toLowerCase())
    );
    const artistList = filteredSongs
        .reduce((artists: any, song: any) => {
            const artist = song.get('artist');
            if (!artists.includes(artist)) {
                return [...artists, artist];
            }
            return artists;
        }, [])
        .sort();

    return (
        <div style={{ height: '1200px' }}>
            <Section title="Playlist">
                <div className="fixed-search-bar">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search songs or artist"
                        style={{ height: '20px', fontSize: '13px' }}
                    />
                </div>
                <br />
                {artistList.map((artist: any) => {
                    const artistSongs = filteredSongs.filter(
                        (song) => song.get('artist') === artist
                    );
                    const isExpanded = expandedArtist === artist;
                    return (
                        <React.Fragment key={artist}>
                            <div
                                className="f6 pointer underline flex items-center no-underline i dim"
                                onClick={() => setExpandedArtist(isExpanded ? '' : artist)}
                            >
                                {isExpanded ? <Subtract20 className="mr1" /> : <Add20 className="mr1" />}
                                {artist}
                            </div>
                            {isExpanded &&
                                artistSongs.map((song) => (
                                    <div
                                        key={song.get('id')}
                                        className="f6 pointer underline flex items-center no-underline i dim pl3"
                                        onClick={() =>
                                            dispatch(
                                                new DispatchAction('PLAY_SONG', { id: song.get('id') })
                                            )
                                        }
                                    >
                                        <Music20 className="mr1" />
                                        {song.get('songTitle')}
                                    </div>
                                ))}
                        </React.Fragment>
                    );
                })}
            </Section>
        </div>
    );
}


/** ------------------------------------------------------------------------ **
 * Auxilliary components
 ** ------------------------------------------------------------------------ */

/** ------------------------------------- **
 * Radio Button
 ** ------------------------------------- */

type RadioButtonProps = {
    to: any,
    text: string,
    active: boolean,
    onClick: () => void
};

function RadioButton({ to, text, active, onClick }: RadioButtonProps): JSX.Element {
    return (
        <Link to={to} className="no-underline">
            <div
                className={classNames('f6 flex items-center black', { fw7: active })}
                onClick={onClick}
            >
                {active ? (
                    <RadioButtonChecked20 className="mr1" />
                ) : (
                    <RadioButton20 className="mr1" />
                )}
                <div className="dim">{text}</div>
            </div>
        </Link>
    );
}


/** ------------------------------------- **
 * Section
 ** ------------------------------------- */

const Section: React.FC<{ title: string }> = ({ title, children }) => {
    return (
        <div className="flex flex-column h-25 bb b--light-gray pa3">
            <div className="fw7 mb2">{title} </div>
            <div className="flex-auto overflow-scroll">{children}</div>
        </div>
    );
};
