import {Link, useSearchParams} from "react-router-dom";
import ShowEntry from "./components/ShowEntry.tsx";
import {useEffect, useMemo, useRef, useState} from "react";
import {Helmet} from "react-helmet-async";
import {TWO_STEP_AUTH_SHOWS} from "./data/2sa_shows.ts";
import {getAudioSrc, getTracklistSrc} from "./utils.ts";
import {THREE_STEP_AUTH_SHOWS} from "./data/3sa_shows.ts";

export interface track {
    song: string;
    artist: string;
}

enum ShowType {
    SA2 = '2SA',
    SA3 = '3SA'
}

function TwoStepAuthentication() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [showType, setShowType] = useState<ShowType>(searchParams.get('which') &&
        [ShowType.SA2, ShowType.SA3].includes(searchParams.get('which') as ShowType)
        ? searchParams.get('which') as ShowType : ShowType.SA2);
    const audio = useRef<HTMLAudioElement>();
    const [currentEpisode, setCurrentEpisode] = useState<string | null>(searchParams.get('episode'));

    useEffect(() => {
        const urlEpisode = searchParams.get('episode');
        if (urlEpisode) {
            setCurrentEpisode(urlEpisode);
        }
    }, []);
    
    const setAudioRef = (audioRef: HTMLAudioElement | null | undefined, episode: string) => {
        if (episode === currentEpisode && audioRef) {
            audio.current = audioRef;
        }
    }

    const handlePlay = (episode: string) => {
        if (currentEpisode && episode !== currentEpisode) {
            audio.current?.pause();
        }
        setCurrentEpisode(episode);
        setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev);
            newParams.set('episode', episode);
            return newParams;
        })
    }

     
    const handlePause = () => {
        // idk
    }


    const handleClick = (newShowType: ShowType) => {
        if (newShowType !== showType) {
            setShowType((prev) => prev === ShowType.SA2 ? ShowType.SA3 : ShowType.SA2);
            setSearchParams((prev) => {
                const newParams = new URLSearchParams(prev);
                newParams.set('which', newShowType);
                return newParams;
            })
        }
    }

    const twoStepAuthDescription = (
        <div className="row mt-3">
            <p className="text-center">
                airing sporadically on WREK 91.1 MHz and {' '} <a href="https://www.wrek.org/player"
                    className="link-dark">wrek.org/player</a> | formerly
                aired on Friday
                afternoons from 4-5
            </p>
        </div>
    );

    const getCommonProps = useMemo(() => (title: string) => {
        const urlEpisode = searchParams.get('episode');
        return {
            onPlay: handlePlay,
            onPause: handlePause,
            initiallyPlaying: title === urlEpisode,
            setAudioRef,
        }}, [handlePlay, handlePause]);

    const threeStepAuthDescription = (
        <div className="row mt-3">
            <p className="text-center">
                not airing on WREK 91.1 MHz or {' '} <a href="https://www.wrek.org/player"
                    className="link-dark">wrek.org/player</a> | these are
                additional mixes I've uploaded here for your listening pleasure
            </p>
        </div>
    );

    return (
        <>
            <Helmet>
                <meta property="og:title" content="Two Step Authentication"/>
                <meta property="og:image"
                    content="/2sa/media/2sa_apple_touch_icon.png"/>
                <link rel="icon" type="image/svg+xml" href="/2sa/media/2sa_logo_favicon_64x64.png"/>
                <link rel="apple-touch-icon" sizes="180x180" href="/2sa/media/2sa_apple_touch_icon.png"/>
                <title>
                    {
                        `${showType === ShowType.SA2 ? 'Two' : 'Three'}
                         Step Authentication${currentEpisode !== null ? ` — ${currentEpisode}` : ''}`
                    }
                </title>
            </Helmet>
            {
                (
                    <div style={{
                        backgroundImage: `url("/2sa/media/2sa_bg.jpg")`,
                        backgroundRepeat: 'repeat',
                        backgroundPosition: 'center',
                        backgroundSize: 'contain',
                        height: '100vh'
                    }
                    } className="font-monospace">
                        <div className="ms-2">
                            <Link to={'/'} className="link">
                                &lt;--
                            </Link>
                        </div>
                        <div id="no-scroll-parent">
                            <div id="scroll-child" className="container">
                                <div className="flex-lg-column justify-content-center my-5">

                                    <div className="row">
                                        <img src={"/2sa/media/2sa_header.jpg"} className="img-fluid" alt="Header"/>
                                    </div>

                                    <div className="row">
                                        <img src={"/2sa/media/2sa_banner_lens_flare.jpg"} className="img-fluid"
                                            alt="Banner"/>
                                    </div>

                                    {
                                        showType === ShowType.SA2 && twoStepAuthDescription
                                    }
                                    {
                                        showType === ShowType.SA3 && threeStepAuthDescription
                                    }

                                    <div className="row mt-3">
                                        <div className="btn-group justify-content-center">
                                            <button
                                                type="button"
                                                style={showType === ShowType.SA2 ? {width: '15%'} : {width: '12%', background: 'none'}}
                                                className="link-dark"
                                                aria-selected={showType === ShowType.SA2}
                                                value={ShowType.SA2}
                                                onClick={() => handleClick(ShowType.SA2)}
                                            >
                                                {
                                                    showType === ShowType.SA2 ? <strong>2sa</strong> : '2sa'
                                                }
                                            </button>
                                            <button
                                                type="button"
                                                style={showType === ShowType.SA3 ? {width: '15%'} : {width: '12%', background: 'none'}}
                                                className="link-dark"
                                                aria-selected={showType === ShowType.SA3}
                                                value={ShowType.SA3}
                                                onClick={() => handleClick(ShowType.SA3)}
                                            >
                                                {
                                                    showType === ShowType.SA3 ? <strong>3sa</strong> : '3sa'
                                                }
                                            </button>
                                        </div>
                                    </div>

                                    {
                                        showType === ShowType.SA2 && TWO_STEP_AUTH_SHOWS.map(({id, title, note, tags}, i) => {
                                            const newId = `${ShowType.SA2.toLowerCase()}${id}`;
                                            return <ShowEntry
                                                id={newId}
                                                title={title}
                                                direction={i % 2 === 0 ? 'right' : 'left'}
                                                audioSrc={getAudioSrc(newId)}
                                                tracklistSrc={getTracklistSrc(newId)}
                                                note={note}
                                                tags={tags}
                                                {...getCommonProps(title)}
                                            />;
                                        })
                                    }
                                    {
                                        showType === ShowType.SA3 && THREE_STEP_AUTH_SHOWS.map(
                                            ({id, title, note, tags, video, videoOffset}, i) => {
                                            const newId = `${ShowType.SA3.toLowerCase()}${id}`;
                                            return <ShowEntry
                                                id={newId}
                                                title={title}
                                                direction={i % 2 === 0 ? 'right' : 'left'}
                                                audioSrc={getAudioSrc(newId)}
                                                tracklistSrc={getTracklistSrc(newId)}
                                                hasVideo={video}
                                                videoOffset={videoOffset}
                                                note={note}
                                                tags={tags}
                                                {...getCommonProps(title)}
                                            />;
                                        })
                                    }

                                    <br/>
                                    <br/>
                                    <br/>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 d-flex align-items-center">
                                        <div className="text-adapt-width">
                                            <em><strong>what is two step authentication?</strong></em>
                                            <br/>
                                            <br/>
                                            <p className="text-end">
                                                the name is taken from the multi-factor authentication you probably
                                                use for several apps, but more importantly it's an ode to swami sound's
                                                show on <a className="link-dark"
                                                    href={"https://www.dublab.com/archive/swami-sound-two-step-verification-01-22-23"}>
                                                dublab</a>.
                                            </p>
                                            <p className="text-start">
                                                on 2sa, you'll hear speed garage, baile funk, jersey club, trance,
                                                breaks, jungle,
                                                and everything in between.
                                            </p>
                                            <p className="text-end">
                                                if it makes me move, i'll play it :)
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-md-6 text-center">
                                        <img src={'/2sa/media/2sa_ipod.png'} className="img-fluid" alt="ipod"/>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                )
            }
        </>
    );
}

export default TwoStepAuthentication;
