import {Link} from "react-router-dom";
import HomeNav from "./HomeNav.tsx";
import {Helmet} from "react-helmet-async";

function AboutMe() {
    return (
        <>
            <Helmet>
                <link rel="icon" type="image/svg+xml" href="/home/media/favicon.png"/>
                <title>Michael Ortega's Portfolio</title>
            </Helmet>
            <HomeNav/>
            <section id="About Me" className="bg-white pb-5 py-3 px-4 p-lg-5 text-left">
                <div id="scroll-child" className="container">
                    <div className="row justify-content-between mb-lg-5" style={{marginBottom: '20vh'}}>
                        <div className="mb-4"></div>
                        <div className="col-lg mb-3 me-5">
                            <img
                                src={"/home/media/me.jpg"}
                                className="img-fluid mb-2"
                                alt="A man facing left"/>
                            <div className="justify-content-center">
                                <div className="mt-4 row">
                                    <h1 className="header text-center">
                                        <strong>Michael Ortega</strong>
                                    </h1>
                                </div>
                                <div className="mt-4 row justify-content-center">
                                    <ul className="header text-center list-unstyled">
                                        <li id="header" className="h4 font-monospace">
                                            <p>Computer Science Student</p>
                                        </li>
                                        <li className="h4 font-monospace">
                                            <a href="https://www.cc.gatech.edu/" className="link-dark">
                                                Georgia Institute of Technology
                                            </a>
                                        </li>
                                        <li className="mt-3 h4 font-monospace">
                                            <a href="mailto: michaelrortega@pm.me" className="link-dark">
                                                michaelrortega_at_pm_dot_me
                                            </a>
                                        </li>
                                        <li className="h4 font-monospace">
                                            <div className="mt-4 row justify-content-center">
                                                <div className="col-auto">
                                                    <a href="https://twitter.com/downbadbot" className="link-dark">
                                                        <i className="bi bi-twitter enlarged" role="link"
                                                            aria-label="Twitter"></i>
                                                    </a>
                                                </div>
                                                <div className="col-auto">
                                                    <a href="https://github.com/mikster36" className="link-dark">
                                                        <i className="bi bi-github enlarged" role="link"
                                                            aria-label="GitHub"></i>
                                                    </a>
                                                </div>
                                                <div className="col-auto">
                                                    <a href="https://www.linkedin.com/in/michaelrortega45/"
                                                        className="link-dark">
                                                        <i className="bi bi-linkedin enlarged" role="link"
                                                            aria-label="LinkedIn"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <h1 className="header display-5 fw-bold">About Me</h1>
                            <div className="mt-3">
                                <p id="bio" className="text-body font-monospace">
                                    I'm Michael, an aspiring machine learning engineer/researcher studying Computer
                                    science.
                                    I plan to pursue a PhD, focused on research in Machine Learning algorithms and
                                    methods.
                                    I'm still exploring literature to develop my specific research interests.<br/><br/>
                                    I care about collaborating, learning, and finding solutions to even the smallest
                                    things.
                                    In my free time, I enjoy deejaying and producing{' '}
                                    <a href="https://mikster36.bandcamp.com/" className="link">
                                        electronic music
                                    </a>
                                    , skateboarding, playing video games (Overwatch, Zelda, & SSBU), and baking (bread,
                                    pizza, & sweets).
                                    At school, I run an EDM specialty show called{' '}
                                    <Link className="link" to={'/two-step-authentication'}>
                                        Two Step Authentication
                                    </Link>{' '}
                                    and another called{' '}
                                    <a href="https://www.wrek.org/shows/electronic-soundsystem/" className="link">
                                        Electronic Soundsystem
                                    </a>{' '}
                                    on the 100% student-run WREK 91.1FM, and I film for the{' '}
                                    <a href="https://www.instagram.com/gtskateboardingclub/" className="link">
                                        Georgia Tech Skateboarding Club
                                    </a>
                                    .
                                </p>
                            </div>
                            <div className="row row-1 mt-5 justify-content-center">
                                <div className="col-sm-8">
                                    <h1 className="header display-6 fw-bold text-center text-md-start">Education</h1>
                                    <div className="icon list-group-flush list-inline mt-3">
                                        <div className="container justify-content-start">
                                            <div className="row">
                                                <i className="col-1 align-self-center bi-mortarboard-fill"></i>
                                                <div className="col">
                                                    <h2 className="mt-2 font-monospace fw-bold">
                                                        B.S. of Computer Science, December 2024
                                                    </h2>
                                                    <h2 className="mt-1 font-monospace small">
                                                        Georgia Institute of Technology
                                                    </h2>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="container justify-content-start mb-5">
                                            <div className="row">
                                                <i className="col-1 align-self-center bi-mortarboard-fill"></i>
                                                <div className="col">
                                                    <h2 className="mt-2 font-monospace fw-bold">
                                                        Associate of Arts, Jan 2019 - May 2022
                                                    </h2>
                                                    <h2 className="mt-1 font-monospace small">
                                                        Broward College
                                                    </h2>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="box col-sm">
                                    <h1 className="header display-6 fw-bold">Interests</h1>
                                    <ul className="list-group-flush text-start ms-2 mt-1">
                                        <li className="list-group-item-light font-monospace">Machine Learning
                                            Algorithms
                                        </li>
                                        <li className="list-group-item-light font-monospace">Deep Learning</li>
                                        <li className="list-group-item-light font-monospace">Interpretable ML models
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default AboutMe;
