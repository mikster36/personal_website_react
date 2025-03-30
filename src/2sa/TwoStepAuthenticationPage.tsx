import {Link} from "react-router-dom";
import ShowEntry from "./components/ShowEntry.tsx";
import {useState} from "react";
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
    const [showType, setShowType] = useState<ShowType>(ShowType.SA2);

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
            <ShowEntry direction={'right'} date={'February 7, 2025'}
                       audioSrc={'https://2saarchive.s3.amazonaws.com/music/2sa020725.mp3'}
                       note={" Don't have a set list for this one unfortunately! But, the first " +
                           "40 minutes is mostly OSSX and DJ Swisha."}
                       tags={'#club #baltimore-club #breaks #garage'}
            />
            <ShowEntry direction={'left'} date={'December 13, 2024'}
                       audioSrc={'https://2saarchive.s3.amazonaws.com/music/2sa121324.mp3'}
                       tracklistSrc={'https://2saarchive.s3.amazonaws.com/tracklist/121324.json'}
                       tags={'#speed-garage #baile-funk #jersey-club #techno #donk'}
            />
            <ShowEntry direction={'right'} date={'December 6, 2024'}
                       audioSrc={'https://2saarchive.s3.amazonaws.com/music/2sa120624.mp3'}
                       tracklistSrc={'https://2saarchive.s3.amazonaws.com/tracklist/120624.json'}
                       tags={'#club #volt #breaks'}
            />
            <ShowEntry direction={'left'} date={'November 29, 2024 | 100% PRODUCTION MIX'}
                       audioSrc={'https://2saarchive.s3.amazonaws.com/music/2sa112924.mp3'}
                       tracklistSrc={'https://2saarchive.s3.amazonaws.com/tracklist/112924.json'}
                       tags={'#garage #club #breaks #house'}
            />
            <ShowEntry direction={'right'} date={'November 15, 2024'}
                       audioSrc={'https://2saarchive.s3.amazonaws.com/music/2sa111524.mp3'}
                       tracklistSrc={'https://2saarchive.s3.amazonaws.com/tracklist/111524.json'}
                       tags={'#club #speed-garage #baile-funk #footwork #breaks #jungle'}
            />
            <ShowEntry direction={'left'} date={'November 8, 2024'}
                       audioSrc={'https://2saarchive.s3.amazonaws.com/music/2sa110824.mp3'}
                       tracklistSrc={'https://2saarchive.s3.amazonaws.com/tracklist/110824.json'}
                       tags={'#breaks #club #garage #baile-funk #jungle #footwork'}
            />
            <ShowEntry direction={'right'} date={'November 1, 2024'}
                       audioSrc={'https://2saarchive.s3.amazonaws.com/music/2sa110124.mp3'}
                       tracklistSrc={'https://2saarchive.s3.amazonaws.com/tracklist/110124.json'}
                       tags={'#footwork #electro'}
            />
            <ShowEntry direction={'left'} date={'October 25, 2024'}
                       audioSrc={'https://2saarchive.s3.amazonaws.com/music/2sa102524.mp3'}
                       tracklistSrc={'https://2saarchive.s3.amazonaws.com/tracklist/102524.json'}
                       tags={'#speed-garage #latin-club #jersey-club #footwork #donk'}
            />
            <ShowEntry direction={'right'} date={'October 18, 2024'}
                       audioSrc={'https://2saarchive.s3.amazonaws.com/music/2sa101824.mp3'}
                       tracklistSrc={'https://2saarchive.s3.amazonaws.com/tracklist/101824.json'}
                       tags={'#speed-garage #jersey-club #house #breaks'}
            />
            <ShowEntry direction={'left'} date={'October 4, 2024'}
                       audioSrc={'https://2saarchive.s3.amazonaws.com/music/2sa100424.mp3'}
                       tracklistSrc={'https://2saarchive.s3.amazonaws.com/tracklist/100424.json'}
                       tags={'#jersey-club #baile-funk #speed-garage'}
            />
            <ShowEntry direction={'right'} date={'September 27, 2024'}
                       audioSrc={'https://2saarchive.s3.amazonaws.com/music/2sa092724.mp3'}
                       tracklistSrc={'https://2saarchive.s3.amazonaws.com/tracklist/092724.json'}
                       tags={'#speed-garage #jersey-club #jungle #breakcore'}
            />
            <ShowEntry direction={'left'} date={'September 20, 2024'}
                       audioSrc={'https://2saarchive.s3.amazonaws.com/music/2sa092024.mp3'}
                       tracklistSrc={'https://2saarchive.s3.amazonaws.com/tracklist/092024.json'}
                       tags={'#garage #speed-garage'}
            />
            <ShowEntry direction={'right'} date={'September 13, 2024'}
                       audioSrc={'https://2saarchive.s3.amazonaws.com/music/2sa091324.mp3'}
                       tracklistSrc={'https://2saarchive.s3.amazonaws.com/tracklist/091324.json'}
                       tags={'#speed-garage #club #jersey-club #hyperflip'}
            />
            <ShowEntry direction={'left'} date={'September 6, 2024'}
                       audioSrc={'https://2saarchive.s3.amazonaws.com/music/2sa090624.mp3'}
                       tracklistSrc={'https://2saarchive.s3.amazonaws.com/tracklist/090624.json'}
                       tags={'#garage #house #jersey-club #baile-funk'}
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
            <ShowEntry direction={'right'} date={'March 29, 2025'}
                       audioSrc={'https://3saarchive.s3.amazonaws.com/music/3sa032924.mp3'}
                       note=" i'll upload it later..."
            >
            </ShowEntry>
            <ShowEntry direction={'left'} date={'March 6, 2025'}
                       audioSrc={'https://3saarchive.s3.amazonaws.com/music/3sa030624.mp3'}
                       note=" i'll upload it later..."
            >
            </ShowEntry>
        </>
    )

    return (
        <>
            <Helmet>
                <link rel="icon" type="image/svg+xml" href="/2sa/media/2sa_logo_favicon_64x64.png"/>
                <link rel="apple-touch-icon" sizes="180x180" href="/2sa/media/2sa_apple_touch_icon.png"/>
                <title>Two Step Authentication</title>
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
                                                           href={"https://www.dublab.com/archive/swami-sound-two-step-verification-01-22-23"}>dublab</a>.
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
