import {readMore} from "../util.ts";
import HomeNav from "./HomeNav.tsx";
import {Helmet} from "react-helmet-async";
import {useState} from "react";
import {Button, CloseButton, Modal} from "react-bootstrap";

const MoreInfoModal = (props: {src: string}) => {
    const [show, setShow] = useState(false);
    const src = props.src;

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="light" className="mb-4 ms-2 font-monospace" onClick={handleShow}>
                <i className="bi bi-info-circle-fill"></i> More info
            </Button>

            <Modal show={show} onHide={handleClose} size={"xl"}>
                <Modal.Header>
                    <CloseButton onClick={handleClose}/>
                </Modal.Header>
                <Modal.Body>
                    <img src={src} alt="Climate Sustainability Workshop" className="img-fluid" />
                </Modal.Body>
            </Modal>
        </>
    );
};


function Projects() {
    return (
        <>
            <Helmet>
                <link rel="icon" type="image/svg+xml" href="/home/media/favicon.png"/>
                <title>Michael Ortega's Projects</title>
            </Helmet>
            <HomeNav />
                <section id="Projects" className="px-4 p-5 text-center">
                    <div id="scroll-child" className="container">
                        <div>
                            <h1 className="display-5 header fw-bold mb-5">
                                Projects
                            </h1>
                        </div>

                        <div className="container-fluid" style={{marginBottom: '20vh'}}>
                        <div
                                className="row row-cols-1 row-cols-lg-2 justify-content-start p-0 p-lg-3 mt-lg-3 mb-lg-5">
                                <div className="flex-lg-column mb-3 mb-lg-1">
                                    <div className="collaborative card mt-lg-0" style={{maxWidth: '37.5em'}}>
                                        <div className="card-body">
                                            <h5 className="card-title mt-2">
                                                Cichlid Behavior Classification
                                                <i className="bi bi-people-fill"></i>
                                            </h5>
                                            <h6 className="card-subtitle mt-1" style={{color: '#7dd299'}}>
                                                ((completed))
                                            </h6>
                                            <p className="card-text my-3 font-monospace">
                                                A computer vision model that classifies mating mechanisms and other
                                                important
                                                behavioral interactions between cichlid fish.
                                                Built on <a
                                                href="https://deeplabcut.github.io/DeepLabCut/README.html#welcome"
                                                className="link">DeepLabCut</a>, we use coordinate
                                                and velocity information to classify 6 different behaviors. Currently,
                                                we
                                                are
                                                analysing our dataset and automating the creation
                                                of our behavioral dataset. In the next steps, we will develop the
                                                architecture
                                                for our network.
                                            </p>
                                            <button type="button" className="btn btn-light mb-4 font-monospace"
                                                    onClick={() => {
                                                        window.open('https://github.com/mikster36/cichlid-behavior-detection', '_blank');
                                                    }}>
                                            <i className="text-dark bi bi-git"></i>
                                                Source code
                                            </button>
                                            <MoreInfoModal src='/home/media/climate_sustainability_workshop_poster.png' />
                                            <img src={'/home/media/dlc_clip.gif'} className="img-fluid p-3"
                                                 alt="A poor drawing of a spiral on top of an Archimedean spiral"/>
                                            <em className="card-text my-3 font-monospace mb-5"><strong>Figure
                                                1:</strong> Unfiltered pose predictions on a short clip of our
                                                cichlids.</em>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-lg-column mb-3 mb-lg-1">
                                    <div className="collaborative card mt-lg-0 " style={{maxWidth: '37.5em'}}>
                                        <div className="card-body">
                                            <h5 className="card-title mt-0">
                                                Parkinson's Disease Detection
                                                <i className="bi bi-people-fill"></i>
                                            </h5>
                                            <h6 className="card-subtitle mt-1" style={{color: '#7dd299'}}>
                                                ((completed))
                                            </h6>
                                            <p className="card-text my-3 font-monospace">
                                                A collection of machine learning models using TensorFlow and Scikit-learn
                                                libraries trained on data from
                                                cognitive and behavioral testing sourced from the <a
                                                href="https://www.ppmi-info.org/" className="link">PPMI</a> database.
                                                Some methods used include <a href="https://en.wikipedia.org/wiki/Convolutional_neural_network"
                                                   className="link">CNNs</a>, <a href="https://en.wikipedia.org/wiki/XGBoost" className="link">XGBoost</a>,
                                                and <a href="https://en.wikipedia.org/wiki/Support_vector_machine"
                                                   className="link">SVMs</a>.
                                                Our most robust model trained on biomedical voice measurements from 219
                                                patients
                                                performed at 88% accuracy (# correct predictions / # truth).
                                                I left this project in May 2023 as the semester ended<a id="readMoreDots"
                                                                                                        className="link"
                                                                                                        onClick={() => readMore()}>...</a>
                                            </p>
                                            <p className="card-text my-3 font-monospace mb-4" id="more">
                                                With this project, we intended to develop low-cost solutions to help detect
                                                Parkinson's through a variety of tests.
                                                We chose to develop a model for several cognitive tests that are easily
                                                replicable at home, such as the spiral test
                                                (as pictured below) and Boston naming test.
                                                However, we struggled with small datasets and general unfamiliarity with a
                                                lot
                                                of the concepts we were working with.
                                                In retrospect, we could have done more with our data, e.g. use different
                                                architecture, as well as focus more
                                                deeply on strengthening our models. Of course, it is also possible that
                                                these
                                                tests (Boston naming test and trail-making test)
                                                are simply not good indicators of whether someone has Parkinson's.

                                            </p>
                                            <div className="row-cols-md-3 my-4 gx-5">
                                                <button type="button"
                                                        onClick={() => window.open('https://gist.github.com/mikster36/018e111a1230f175dde97b686f6b52f1', '_blank')}
                                                        className="btn btn-light font-monospace">
                                                    <i className="text-dark bi bi-git"></i> Source code
                                                </button>
                                                <button type="button"
                                                        onClick={() => window.open('https://www.mayoclinic.org/diseases-conditions/parkinsons-disease/diagnosis-treatment/drc-20376062', '_blank')}
                                                        className="btn btn-light ms-2 font-monospace">
                                                    <i className="bi bi-info-circle-fill"></i> More info
                                                </button>
                                            </div>
                                            <img src={'/home/media/spiral_test_example.jpg'} className="img-fluid"
                                                 alt="A poor drawing of a spiral on top of an Archimedean spiral"/>
                                            <em className="card-text my-3 font-monospace mb-5"><strong>Figure 2:</strong> A
                                                sample tracing of an Archimedean spiral by a patient with Parkinson's.</em>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>
        </>
    )
}

export default Projects;