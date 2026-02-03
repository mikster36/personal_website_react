import Marquee from 'react-fast-marquee';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { track } from '../TwoStepAuthenticationPage.tsx';
import { int2roman } from '../../util.ts';
import ReactAudioPlayer from 'react-audio-player';
import ReactPlayer from 'react-player';
import { IconButton } from '@mui/material';
import { ChevronRight } from '@mui/icons-material';
import { Col, Row } from 'react-bootstrap';
import AudioMotionAnalyzer from 'audiomotion-analyzer';
import { getVideoSrc } from '../utils.ts';

export interface ShowEntryProps {
    id: string;
    direction: 'left' | 'right';
    title: string;
    audioSrc: string;
    isPlaying: boolean;
    initiallyPlaying?: boolean;
    note?: string;
    tracklistSrc?: string;
    imgSrc?: string;
    imgAlt?: string;
    hasVideo?: boolean;
    showSpectrogram?: boolean;
    tags?: string;
    onPlay?: (epsiode: string) => void;
    onVideoPlay?: (epsiode: string) => void;
    onPause?: (epsiode: string) => void;
    onExpand?: (id: string) => void;
    setAudioRef: (audioRef: HTMLAudioElement | null | undefined, episode: string) => void;
}

const MemoizedMarquee = memo(
    ({ direction, date }: { direction: 'left' | 'right'; date: string }) => {
        const speed = 30 + Math.random() * 10;
        return (
            <Marquee
                pauseOnClick
                direction={direction}
                autoFill={true}
                speed={speed}
                className="font-monospace my-2"
            >
                {` ${date}`}‎ | ‎
            </Marquee>
        );
    },
);

const style = {
    boxShadow: 'none',
    outline: 'none',
    backgroundColor: '#f1f3f4',
    width: '100%',
    borderWidth: '2',
    borderColor: '#e29ef9',
    borderStyle: 'solid',
};

export const ShowEntry = (props: ShowEntryProps) => {
    const {
        direction,
        title,
        audioSrc,
        note,
        tracklistSrc,
        tags,
        initiallyPlaying = false,
        hasVideo,
        id,
        showSpectrogram,
        onPlay = () => {},
        onPause = () => {},
        setAudioRef,
    } = props;
    const videoSrc = useMemo(() => getVideoSrc(id), [id]);
    const videoRef = useRef<HTMLVideoElement>(null);
    const scroll = useRef(initiallyPlaying);
    const [click, setClick] = useState<boolean>(initiallyPlaying);
    const [error, setError] = useState(false);
    const [tracks, setTracks] = useState<track[]>([]);
    const [hasTracklist, setHasTracklist] = useState<boolean | undefined>();
    const [loading, setLoading] = useState(true);
    const [expand, setExpand] = useState(initiallyPlaying);
    const [progressValue, setProgressValue] = useState(0);
    const currentPosition = useRef<number>(0);
    const videoDuration = useRef<number>(100);
    const [videoVolume, setVideoVolume] = useState(1);
    const spectrumAnalyzerRef = useRef<AudioMotionAnalyzer | null>(null);
    const audioElementRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (!showSpectrogram) return;
        if (!audioElementRef.current) return;
        if (spectrumAnalyzerRef.current) return;

        const containerEl = document.getElementById(`spectrum-analyser-${id}`);
        if (!containerEl) return;

        spectrumAnalyzerRef.current = new AudioMotionAnalyzer(containerEl, {
            showPeaks: true,
            fadePeaks: true,
            showScaleX: false,
            colorMode: 'bar-level',
            source: audioElementRef.current,
        });

        const canvas = containerEl.querySelector('canvas') as HTMLCanvasElement;
        if (canvas) {
            canvas.style.backgroundColor = '#f1f3f4';
        }
    }, [showSpectrogram, id]);

    useEffect(() => {
        if (!hasVideo) {
            return;
        }
        const intervalId = setInterval(() => {
            setProgressValue(currentPosition.current / videoDuration.current);
        }, 300);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        if (!tracklistSrc) {
            setLoading(false);
            return;
        }
        const fetchTracklists = async () => {
            try {
                const response = await fetch(tracklistSrc);
                if (response.ok) {
                    setTracks((await response.json()) as track[]);
                    setHasTracklist(true);
                } else if (response.status === 403) {
                    setHasTracklist(false);
                } else {
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

    const tracklist = (
        <>
            {Object.entries(tracks).map(([, _track], i) => (
                <p key={i}>
                    {int2roman(i + 1)}. {_track.song} {'>>'} {_track.artist}
                </p>
            ))}
        </>
    );

    const genres = (
        <>
            {tags && (
                <p className={'mt-2 text-lg-end'}>
                    genres: <em>{tags}</em>
                </p>
            )}
        </>
    );

    const handlePlay = useCallback(() => {
        spectrumAnalyzerRef.current?.start();
        onPlay(title);
    }, [title]);

    const handlePause = useCallback(() => {
        spectrumAnalyzerRef.current?.stop();
        onPause(title);
    }, [title]);

    return (
        <div
            className="row mt-3"
            ref={(ref) => {
                if (scroll.current) {
                    ref?.scrollIntoView();
                    scroll.current = false;
                }
            }}
        >
            <MemoizedMarquee direction={direction} date={title} />
            <Row style={{ alignItems: 'center' }}>
                <Col style={style}>
                    {!hasVideo ? (
                        <>
                            <ReactAudioPlayer
                                id={`audio-player-${id}`}
                                src={audioSrc}
                                style={{ width: '100%', flexGrow: 1 }}
                                controls={true}
                                onPlay={handlePlay}
                                onPause={handlePause}
                                ref={(ref) => {
                                    audioElementRef.current = ref?.audioEl?.current ?? null;
                                    setAudioRef(ref?.audioEl?.current, title);
                                }}
                            />
                            <div
                                key={`spectrum-analyser-${id}`}
                                id={`spectrum-analyser-${id}`}
                                style={{
                                    width: '100%',
                                    height: '150px',
                                    marginBottom: '12px',
                                    color: '#f1f3f4',
                                    background: '#f1f3f4',
                                    backgroundColor: '#f1f3f4',
                                }}
                                hidden={!showSpectrogram}
                            ></div>
                        </>
                    ) : (
                        <Row
                            style={{
                                height: '50px',
                                marginLeft: '5px',
                                marginRight: '5px',
                                alignItems: 'center',
                            }}
                        >
                            {!!currentPosition.current ? (
                                <progress
                                    style={{ width: '100%' }}
                                    value={progressValue}
                                ></progress>
                            ) : (
                                <div className="loading-bouncer-container">
                                    <div className="loading-bouncer-bar" />
                                </div>
                            )}
                        </Row>
                    )}
                </Col>
                {hasVideo && (
                    <Col style={{ maxWidth: '1%', ...style, borderLeft: 'none' }}>
                        <IconButton
                            style={{ color: '#e29ef9', paddingLeft: '16px' }}
                            onClick={() => setExpand((isExpand) => !isExpand)}
                        >
                            <ChevronRight />
                        </IconButton>
                    </Col>
                )}
            </Row>
            {hasVideo && (
                <div
                    className="mt-4"
                    style={{
                        justifyContent: 'center',
                        width: 'auto',
                        height: 'auto',
                        margin: '0 auto',
                    }}
                    hidden={!expand}
                >
                    <ReactPlayer
                        style={{
                            maxHeight: '60vh',
                            height: 'auto',
                            width: '100%',
                            boxShadow: '0px 0px 31px 3px rgba(192,71,255,0.44)',
                        }}
                        ref={videoRef}
                        controls={true}
                        src={videoSrc}
                        onPlay={handlePlay}
                        onPause={handlePause}
                        volume={videoVolume}
                        onVolumeChange={(e) => {
                            setVideoVolume(e.currentTarget.volume);
                        }}
                        onTimeUpdate={() => {
                            if (videoRef.current) {
                                currentPosition.current = videoRef.current.currentTime;
                            }
                        }}
                        onLoadedData={() => {
                            if (videoRef.current) {
                                videoDuration.current = videoRef.current.duration;
                            }
                        }}
                    ></ReactPlayer>
                </div>
            )}
            {(note || tags || hasTracklist || props.imgSrc) && (
                <div style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    <p
                        className="link-dark mt-2"
                        style={{ cursor: cursor, margin: 'auto', textAlign: 'center' }}
                        onClick={() => setClick(!click)}
                    >
                        {loading && (
                            <div style={{ display: 'flex', justifyContent: 'center' }}>‎</div>
                        )}
                        {!loading &&
                            (hasTracklist
                                ? 'tracklist'
                                : `${tags?.length ? 'tags ' : ''}${tags?.length && note?.length ? '+' : ''}${note?.length ? ' note' : ''}`.trim())}
                    </p>
                </div>
            )}
            {click && (
                <div className="mt-3 col-sm">
                    {!error && tracklistSrc && !!tracks.length && (
                        <div className="row">{tracklist}</div>
                    )}
                    {error && (
                        <p className="text-center text-warning">
                            an error occurred while fetching tracks, try reloading the page!
                        </p>
                    )}
                    {note}
                    {props.imgSrc && (
                        <div className="d-flex justify-content-center">
                            <img
                                src={props.imgSrc}
                                className="mt-3"
                                width="50%"
                                alt={props.imgAlt}
                            />
                        </div>
                    )}
                    {genres}
                </div>
            )}
        </div>
    );
};

export default ShowEntry;
