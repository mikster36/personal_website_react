import {Link} from "react-router-dom";
import ShowEntry from "./components/ShowEntry.tsx";
import {useEffect, useState} from "react";
import {Helmet} from "react-helmet-async";

export interface track {
    song: string;
    artist: string;
}

interface tracklistlist {
    [date: string]: track[] | string
}

const dates = ['090624', '091324', '092024', '092724', '100424', '101824', '102524', '110124', '110824'];


function TwoStepAuthentication() {
    const [tracklists, setTracklists] = useState<tracklistlist>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);


    useEffect(() => {
        const fetchTracklists = async () => {
            try {
                const allTracklists = await Promise.all(
                    dates.map(async (date) => {
                        const response = await fetch(`https://2saarchive.s3.amazonaws.com/tracklist/${date}.json`);
                        if (response.ok) {
                            const result = await response.json() as track[];
                            return { [date]: result };
                        } else {
                            return { [date]: 'none' };
                        }
                    })
                );

                const mergedTracklists = Object.assign({}, ...allTracklists);
                setTracklists(mergedTracklists);
                setLoading(false);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (err) {
                setError(true);
                setLoading(false);
            }
        };
        fetchTracklists();
    }, []);

    return (
        <>
            <Helmet>
                <link rel="icon" type="image/svg+xml" href="/2sa/media/2sa_logo_favicon_64x64.png"/>
                <title>Two Step Authentication</title>
            </Helmet>
            {
                !error && !loading && (
                    <div style={{
                        backgroundImage: `url("/2sa/media/2sa_bg.jpg")`,
                        backgroundRepeat: 'repeat',
                        backgroundPosition: 'center',
                        backgroundSize: 'contain',
                        height: '100vh'
                    }
                    }>
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

                                    <div className="row mt-3">
                                        <p className="font-monospace text-center">
                                            Friday afternoons from 4-5 on WREK 91.1 MHz or{' '}
                                            <a href="https://www.wrek.org/player"
                                               className="link-dark">wrek.org/player</a>
                                        </p>
                                    </div>

                                    <ShowEntry direction={'left'} date={'November 8, 2024'}
                                               audioSrc={'https://2saarchive.s3.amazonaws.com/music/2sa110824.mp3'}
                                               tracklist={tracklists['110824']}
                                               tags={'#breaks #club #garage #baile-funk #jungle #footwork'}
                                    />
                                    <ShowEntry direction={'right'} date={'November 1, 2024'}
                                               audioSrc={'https://2saarchive.s3.amazonaws.com/music/2sa110124.mp3'}
                                               tracklist={tracklists['110124']}
                                               tags={'#footwork #electro'}
                                    />
                                    <ShowEntry direction={'left'} date={'October 25, 2024'}
                                               audioSrc={'https://2saarchive.s3.amazonaws.com/music/2sa102524.mp3'}
                                               tracklist={tracklists['102524']}
                                               tags={'#speed-garage #latin-club #jersey-club #footwork #donk'}
                                    />
                                    <ShowEntry direction={'right'} date={'October 18, 2024'}
                                               audioSrc={'https://2saarchive.s3.amazonaws.com/music/2sa101824.mp3'}
                                               tracklist={tracklists['101824']}
                                               tags={'#speed-garage #jersey-club #house #breaks'}
                                    />
                                    <ShowEntry direction={'left'} date={'October 4, 2024'}
                                               audioSrc={'https://2saarchive.s3.amazonaws.com/music/2sa100424.mp3'}
                                               tracklist={tracklists['100424']}
                                               tags={'#jersey-club #baile-funk #speed-garage'}
                                    />
                                    <ShowEntry direction={'right'} date={'September 27, 2024'}
                                               audioSrc={'https://2saarchive.s3.amazonaws.com/music/2sa092724.mp3'}
                                               tracklist={tracklists['092724']}
                                               tags={'#speed-garage #jersey-club #jungle #breakcore'}
                                    />
                                    <ShowEntry direction={'left'} date={'September 20, 2024'}
                                               audioSrc={'https://2saarchive.s3.amazonaws.com/music/2sa092024.mp3'}
                                               tracklist={tracklists['092024']}
                                               tags={'#garage #speed-garage'}
                                    />
                                    <ShowEntry direction={'right'} date={'September 13, 2024'}
                                               audioSrc={'https://2saarchive.s3.amazonaws.com/music/2sa091324.mp3'}
                                               tracklist={tracklists['091324']}
                                               tags={'#speed-garage #club #jersey-club #hyperflip'}
                                    />
                                    <ShowEntry direction={'left'} date={'September 6, 2024'}
                                               audioSrc={'https://2saarchive.s3.amazonaws.com/music/2sa090624.mp3'}
                                               tracklist={tracklists['090624']}
                                               tags={'#garage #house #jersey-club #baile-funk'}
                                    />

                                    <br/>
                                    <br/>
                                    <br/>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 d-flex align-items-center">
                                        <div className="font-monospace text-adapt-width">
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
                                                all sets are recorded live and archived shortly after, so you MAY hear
                                                the
                                                occasional sloppy transition (whoops!)
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
