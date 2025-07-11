import {Link} from "react-router-dom";
import ShowEntry from "./components/ShowEntry.tsx";
import {useRef, useState} from "react";
import {Helmet} from "react-helmet-async";

export interface track {
    song: string;
    artist: string;
}

enum ShowType {
    SA2 = '2SA',
    SA3 = '3SA'
}

function TwoStepAuthentication() {
    const [showType, setShowType] = useState<ShowType>(
        new URLSearchParams(window.location.search).get('3sa') ? ShowType.SA3 : ShowType.SA2);
    const [currentEpisode, setCurrentEpisode] = useState<string | null>(null);
    const audio = useRef<HTMLAudioElement>();
    
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
    }

     
    const handlePause = () => {
        // idk
    }


    const handleClick = (newShowType: ShowType) => {
        if (newShowType !== showType) {
            setShowType((prev) => prev === ShowType.SA2 ? ShowType.SA3 : ShowType.SA2);
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

    const twoStepAuthShowEntries = (
        <>
            <ShowEntry
                direction={'right'}
                date={'February 7, 2025'}
                audioSrc={'https://2saarchive.s3.amazonaws.com/music/2sa020725.mp3'}
                onPlay={handlePlay}
                onPause={handlePause}
                note={" Don't have a set list for this one unfortunately! But, the first " +
                           "40 minutes is mostly OSSX and DJ Swisha."}
                tags={'#club #baltimore-club #breaks #garage'}
                setAudioRef={setAudioRef}
            />
            <ShowEntry
                direction={'left'}
                date={'December 13, 2024'}
                onPlay={handlePlay}
                onPause={handlePause}
                audioSrc={'https://2saarchive.s3.amazonaws.com/music/2sa121324.mp3'}
                tracklistSrc={'https://2saarchive.s3.amazonaws.com/tracklist/121324.json'}
                tags={'#speed-garage #baile-funk #jersey-club #techno #donk'}
                setAudioRef={setAudioRef}
            />
            <ShowEntry
                direction={'right'}
                date={'December 6, 2024'}
                onPlay={handlePlay}
                onPause={handlePause}
                audioSrc={'https://2saarchive.s3.amazonaws.com/music/2sa120624.mp3'}
                tracklistSrc={'https://2saarchive.s3.amazonaws.com/tracklist/120624.json'}
                tags={'#club #volt #breaks'}
                setAudioRef={setAudioRef}
            />
            <ShowEntry
                direction={'left'}
                date={'November 29, 2024 | 100% PRODUCTION MIX'}
                onPlay={handlePlay}
                onPause={handlePause}
                audioSrc={'https://2saarchive.s3.amazonaws.com/music/2sa112924.mp3'}
                tracklistSrc={'https://2saarchive.s3.amazonaws.com/tracklist/112924.json'}
                tags={'#garage #club #breaks #house'}
                setAudioRef={setAudioRef}
            />
            <ShowEntry
                direction={'right'}
                date={'November 15, 2024'}
                onPlay={handlePlay}
                onPause={handlePause}
                audioSrc={'https://2saarchive.s3.amazonaws.com/music/2sa111524.mp3'}
                tracklistSrc={'https://2saarchive.s3.amazonaws.com/tracklist/111524.json'}
                tags={'#club #speed-garage #baile-funk #footwork #breaks #jungle'}
                setAudioRef={setAudioRef}
            />
            <ShowEntry
                direction={'left'}
                date={'November 8, 2024'}
                onPlay={handlePlay}
                onPause={handlePause}
                audioSrc={'https://2saarchive.s3.amazonaws.com/music/2sa110824.mp3'}
                tracklistSrc={'https://2saarchive.s3.amazonaws.com/tracklist/110824.json'}
                tags={'#breaks #club #garage #baile-funk #jungle #footwork'}
                setAudioRef={setAudioRef}
            />
            <ShowEntry
                direction={'right'}
                date={'November 1, 2024'}
                onPlay={handlePlay}
                onPause={handlePause}
                audioSrc={'https://2saarchive.s3.amazonaws.com/music/2sa110124.mp3'}
                tracklistSrc={'https://2saarchive.s3.amazonaws.com/tracklist/110124.json'}
                tags={'#footwork #electro'}
                setAudioRef={setAudioRef}
            />
            <ShowEntry
                direction={'left'}
                date={'October 25, 2024'}
                onPlay={handlePlay}
                onPause={handlePause}
                audioSrc={'https://2saarchive.s3.amazonaws.com/music/2sa102524.mp3'}
                tracklistSrc={'https://2saarchive.s3.amazonaws.com/tracklist/102524.json'}
                tags={'#speed-garage #latin-club #jersey-club #footwork #donk'}
                setAudioRef={setAudioRef}
            />
            <ShowEntry
                direction={'right'}
                date={'October 18, 2024'}
                onPlay={handlePlay}
                onPause={handlePause}
                audioSrc={'https://2saarchive.s3.amazonaws.com/music/2sa101824.mp3'}
                tracklistSrc={'https://2saarchive.s3.amazonaws.com/tracklist/101824.json'}
                tags={'#speed-garage #jersey-club #house #breaks'}
                setAudioRef={setAudioRef}
            />
            <ShowEntry
                direction={'left'}
                date={'October 4, 2024'}
                onPlay={handlePlay}
                onPause={handlePause}
                audioSrc={'https://2saarchive.s3.amazonaws.com/music/2sa100424.mp3'}
                tracklistSrc={'https://2saarchive.s3.amazonaws.com/tracklist/100424.json'}
                tags={'#jersey-club #baile-funk #speed-garage'}
                setAudioRef={setAudioRef}
            />
            <ShowEntry
                direction={'right'}
                date={'September 27, 2024'}
                onPlay={handlePlay}
                onPause={handlePause}
                audioSrc={'https://2saarchive.s3.amazonaws.com/music/2sa092724.mp3'}
                tracklistSrc={'https://2saarchive.s3.amazonaws.com/tracklist/092724.json'}
                tags={'#speed-garage #jersey-club #jungle #breakcore'}
                setAudioRef={setAudioRef}
            />
            <ShowEntry
                direction={'left'}
                date={'September 20, 2024'}
                onPlay={handlePlay}
                onPause={handlePause}
                audioSrc={'https://2saarchive.s3.amazonaws.com/music/2sa092024.mp3'}
                tracklistSrc={'https://2saarchive.s3.amazonaws.com/tracklist/092024.json'}
                tags={'#garage #speed-garage'}
                setAudioRef={setAudioRef}
            />
            <ShowEntry
                direction={'right'}
                date={'September 13, 2024'}
                onPlay={handlePlay}
                onPause={handlePause}
                audioSrc={'https://2saarchive.s3.amazonaws.com/music/2sa091324.mp3'}
                tracklistSrc={'https://2saarchive.s3.amazonaws.com/tracklist/091324.json'}
                tags={'#speed-garage #club #jersey-club #hyperflip'}
                setAudioRef={setAudioRef}
            />
            <ShowEntry
                direction={'left'}
                date={'September 6, 2024'}
                onPlay={handlePlay}
                onPause={handlePause}
                audioSrc={'https://2saarchive.s3.amazonaws.com/music/2sa090624.mp3'}
                tracklistSrc={'https://2saarchive.s3.amazonaws.com/tracklist/090624.json'}
                tags={'#garage #house #jersey-club #baile-funk'}
                setAudioRef={setAudioRef}
            />
        </>
    );

    const threeStepAuthDescription = (
        <div className="row mt-3">
            <p className="text-center">
                not airing on WREK 91.1 MHz or {' '} <a href="https://www.wrek.org/player"
                    className="link-dark">wrek.org/player</a> | these are
                additional mixes I've uploaded here for your listening pleasure
            </p>
        </div>
    );

    const threeStepAuthShowEntries = (
        <>
            <ShowEntry
                direction={'right'}
                date={'July 20, 2025'}
                onPlay={handlePlay}
                onPause={handlePause}
                audioSrc={'https://2saarchive.s3.us-east-1.amazonaws.com/music/3sa072025.mp3'}
                tags={'#hardgroove-techno'}
                setAudioRef={setAudioRef}
            />
            <ShowEntry
                direction={'left'}
                date={'June 24, 2025'}
                onPlay={handlePlay}
                onPause={handlePause}
                audioSrc={'https://2saarchive.s3.us-east-1.amazonaws.com/music/3sa062425.mp3'}
                tracklistSrc={'https://2saarchive.s3.us-east-1.amazonaws.com/tracklist/062425.json'}
                tags={'#bass #breaks'}
                setAudioRef={setAudioRef}
            />
            <ShowEntry
                direction={'right'}
                date={'June 14, 2025'}
                onPlay={handlePlay}
                onPause={handlePause}
                audioSrc={'https://2saarchive.s3.us-east-1.amazonaws.com/music/3sa061425.mp3'}
                tracklistSrc={'https://2saarchive.s3.us-east-1.amazonaws.com/tracklist/061425.json'}
                tags={'#breaks #bass'}
                setAudioRef={setAudioRef}
            />
            <ShowEntry
                direction={'left'}
                date={'May 17, 2025'}
                onPlay={handlePlay}
                onPause={handlePause}
                audioSrc={'https://2saarchive.s3.us-east-1.amazonaws.com/music/3sa051725.mp3'}
                tracklistSrc={'https://2saarchive.s3.us-east-1.amazonaws.com/tracklist/051725.json'}
                tags={'#breaks'}
                note={'hit the panic button at least 8 times this set (no pun intended)'}
                setAudioRef={setAudioRef}
            />
            <ShowEntry
                direction={'right'}
                date={'May 6, 2025'}
                onPlay={handlePlay}
                onPause={handlePause}
                audioSrc={'https://2saarchive.s3.us-east-1.amazonaws.com/music/3sa050625.mp3'}
                tracklistSrc={'https://2saarchive.s3.us-east-1.amazonaws.com/tracklist/050625.json'}
                tags={'#club #club #club'}
                setAudioRef={setAudioRef}
            />
            <ShowEntry
                direction={'left'}
                date={'April 5, 2025'}
                onPlay={handlePlay}
                onPause={handlePause}
                audioSrc={'https://2saarchive.s3.us-east-1.amazonaws.com/music/3sa040525.mp3'}
                tracklistSrc={'https://2saarchive.s3.us-east-1.amazonaws.com/tracklist/040525.json'}
                tags={'#club'}
                setAudioRef={setAudioRef}
            />
            <ShowEntry
                direction={'right'}
                date={'March 29, 2025'}
                onPlay={handlePlay}
                onPause={handlePause}
                audioSrc={'https://2saarchive.s3.us-east-1.amazonaws.com/music/3sa032925.mp3'}
                tracklistSrc={'https://2saarchive.s3.us-east-1.amazonaws.com/tracklist/032925.json'}
                tags={'#rap #pc-music #baile-funk'}
                note={'thanks miggy for the tracks!'}
                setAudioRef={setAudioRef}
            />
            <ShowEntry
                direction={'left'}
                date={'March 6, 2025'}
                onPlay={handlePlay}
                onPause={handlePause}
                audioSrc={'https://2saarchive.s3.us-east-1.amazonaws.com/music/3sa030625.mp3'}
                tracklistSrc={'https://2saarchive.s3.us-east-1.amazonaws.com/tracklist/030625.json'}
                tags={'#music'}
                setAudioRef={setAudioRef}
            />
        </>
    )

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
                                        showType === ShowType.SA2 && twoStepAuthShowEntries
                                    }
                                    {
                                        showType === ShowType.SA3 && threeStepAuthShowEntries
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
