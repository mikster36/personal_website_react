import Marquee from 'react-fast-marquee';
import {memo, useEffect, useRef, useState} from 'react';
import {track} from "../TwoStepAuthenticationPage.tsx";
import {int2roman} from "../../util.ts";
import ReactAudioPlayer from "react-audio-player";
import { IconButton } from '@mui/material';
import { ChevronRight } from '@mui/icons-material';
import {Col, Row } from 'react-bootstrap';

interface ShowEntryProps {
    id: string;
    direction: 'left' | 'right';
    title: string;
    audioSrc: string;
    initiallyPlaying?: boolean;
    note?: string;
    tracklistSrc?: string;
    tags?: string;
    onPlay?: (epsiode: string) => void;
    onPause?: (epsiode: string) => void;
    onExpand?: (id: string) => void;
    setAudioRef: (audioRef: HTMLAudioElement | null | undefined, episode: string) => void;
}

const MemoizedMarquee = memo(({direction, date} : {direction: 'left' | 'right', date: string}) => {
    const speed = 30 + Math.random() * 10;
    return (
        <Marquee pauseOnClick direction={direction} autoFill={true} speed={speed} className="font-monospace my-2">
            {` ${date}`}‎ | ‎
        </Marquee>
    );
});

const style = {
    boxShadow: 'none',
    outline: 'none',
    backgroundColor:'#f1f3f4',
    width: '100%',
    borderWidth: '2',
    borderColor: '#e29ef9',
    borderStyle: 'solid'
};

export const ShowEntry = (props: ShowEntryProps) => {
    const {direction, title, audioSrc, note, tracklistSrc, tags, initiallyPlaying = false, id,
        onPlay = () => {}, onPause = () => {}, setAudioRef, onExpand} = props;
    const scroll = useRef(initiallyPlaying);
    const [click, setClick] = useState<boolean>(initiallyPlaying);
    const [error, setError] = useState(false);
    const [tracks, setTracks] = useState<track[]>([]);
    const [hasTracklist, setHasTracklist] = useState<boolean | undefined>();
    const [loading, setLoading] = useState(true);
    console.log(id);

    useEffect(() => {
        if (!tracklistSrc) {
            setLoading(false);
            return;
        }
        const fetchTracklists = async () => {
            try {
                const response = await fetch(tracklistSrc);
                console.log(tracklistSrc);
                if (response.ok) {
                    setTracks(await response.json() as track[]);
                    setHasTracklist(true);
                } else if (response.status === 403) {
                    setHasTracklist(false);
                }
                else {
                    setError(true);
                }
            } catch (_) {
                setError(true);
            } finally {
                setLoading(false);
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
        <div className="row mt-3" ref={(ref) => {
            if (scroll.current) {
                console.log(ref);
                ref?.scrollIntoView();
                scroll.current = false;
            }
        }}>
            <MemoizedMarquee direction={direction} date={title} />
            <Row style={{alignItems: 'center'}}>
                <Col style={style}>
                    <ReactAudioPlayer
                        src={audioSrc}
                        controls
                        style={{width: "100%", flexGrow: 1}}
                        onPlay={() => onPlay(title)}
                        onPause={() => onPause(title)}
                        ref={(ref) => setAudioRef(ref?.audioEl?.current, title)}
                    />
                </Col>{
                onExpand && <Col style={{maxWidth: "1%", ...style, borderLeft: 'none'}}>
                    <IconButton style={{color: '#e29ef9', paddingLeft: '16px'}} onClick={() => onExpand(id)}>
                        <ChevronRight />
                    </IconButton>
                </Col>
                }
            </Row>
            {
                (note || tags || hasTracklist) &&
                <div style={{justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                <p
                    className="link-dark mt-2"
                    style={{cursor: cursor, margin: 'auto', textAlign: 'center'}}
                    onClick={() => setClick(!click)}>
                    {
                        loading && <div style={{display: 'flex', justifyContent: 'center'}}>
                            ‎
                        </div>
                    }
                    {
                        !loading && (
                            hasTracklist ? 'tracklist' :
                            `${tags?.length ? 'tags ' : ''}${tags?.length && note?.length ? '+' : ''}${note?.length ? ' note' : ''}`.trim()
                        )
                    }
                </p>
                </div>
            }
            {
                click && <div className="mt-3">
                    {!error && tracklistSrc && !!tracks.length && tracklist}
                    {error &&
                        <p className="text-center text-warning">an error occured while fetching tracks, try reloading the
                            page!</p>}
                    {note}
                    {genres}
                </div>
            }
        </div>
    )
}

export default ShowEntry;