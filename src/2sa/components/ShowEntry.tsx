import Marquee from 'react-fast-marquee';
import React, {memo, useEffect, useState} from 'react';
import {track} from "../TwoStepAuthenticationPage.tsx";
import {int2roman} from "../../util.ts";
import ReactAudioPlayer from "react-audio-player";

interface ShowEntryProps {
    direction: 'left' | 'right';
    date: string;
    audioSrc: string;
    note?: string;
    tracklistSrc?: string;
    tags?: string;
    onPlay?: (epsiode: string) => void;
    onPause?: (epsiode: string) => void;
    setAudioRef: (audioRef: HTMLAudioElement, episode: string) => void;
}

const MemoizedMarquee = memo(({direction, date} : {direction: 'left' | 'right', date: string}) => {
    const speed = 30 + Math.random() * 10;
    return (
        <Marquee pauseOnClick direction={direction} autoFill={true} speed={speed} className="font-monospace my-2">
            {` ${date}`}‎ | ‎
        </Marquee>
    );
});

function ShowEntry(props: ShowEntryProps) {
    const {direction, date, audioSrc, note, tracklistSrc, tags,
        onPlay = () => {}, onPause = () => {}, setAudioRef} = props;
    const [click, setClick] = useState<boolean>(false);
    const [error, setError] = useState(false);
    const [tracks, setTracks] = useState<track[]>([]);

    useEffect(() => {
        if (!tracklistSrc) {
            return;
        }
        const fetchTracklists = async () => {
            try {
                const response = await fetch(tracklistSrc);
                if (response.ok) {
                    setTracks(await response.json() as track[]);
                } else {
                    setError(true);
                }
            } catch (_) {
                setError(true);
            }
        };
        fetchTracklists();
    }, [tracklistSrc]);

    const cursorOptions = ['zoom-in', 'pointer', 'crosshair', 'help', 'grab', 'grabbing'];
    const cursor = cursorOptions[Math.floor(Math.random() * 6)];

    const tracklist = <>
        {Object.entries(tracks).map(([, _track], i) => (
            <p key={i}>
                {int2roman(i + 1)}. {_track.song} {'>>'} {_track.artist}
            </p>
        ))}
    </>

    const genres = <>
        {
            tags && <p className={"mt-2 text-lg-end"}>genres: <em>{tags}</em></p>
        }
    </>

    return (
        <div className="row mt-3">
            <MemoizedMarquee direction={direction} date={date} />
            <ReactAudioPlayer
                src={audioSrc}
                controls
                style={
                    {boxShadow: 'none',
                        outline: 'none',
                        backgroundColor:'#f1f3f4',
                        width: '100%',
                        borderWidth: '2',
                        borderColor: '#e29ef9',
                        borderStyle: 'solid'}
                }
                onPlay={() => onPlay(date)}
                onPause={() => onPause(date)}
                ref={(ref) => setAudioRef(ref?.audioEl?.current, date)}
            />
            <p className="link-dark mt-2" style={{width: '9ch', cursor: cursor, margin: 'auto'}} onClick={() => setClick(!click)}>tracklist</p>
            {
                click && <div className="mt-3">
                    {!error && tracklistSrc && tracks.length && tracklist}
                    {error && <p className="text-center text-warning">an error occured while fetching tracks, try reloading the page!</p>}
                    {note}
                    {genres}
                </div>
            }
        </div>
    )
}

export default ShowEntry;