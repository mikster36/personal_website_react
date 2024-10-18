import Marquee from 'react-fast-marquee';
import {memo, useState} from 'react';
import {track} from "../TwoStepAuthenticationPage.tsx";
import {int2roman} from "../../util.ts";
import ReactAudioPlayer from "react-audio-player";

interface ShowEntryProps {
    direction: 'left' | 'right';
    date: string;
    audioSrc: string;
    tracklist: track[] | string;
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
    const [click, setClick] = useState<boolean>(false);
    const items = props;

    const cursorOptions = ['zoom-in', 'pointer', 'crosshair', 'help', 'grab', 'grabbing'];
    const cursor = cursorOptions[Math.floor(Math.random() * 6)];


    return (
        <div className="row mt-3 font-monospace">
            <MemoizedMarquee direction={props.direction} date={props.date} />
            <ReactAudioPlayer src={props.audioSrc} controls style={{boxShadow: 'none', outline: 'none', backgroundColor: '#f1f3f4', width: '100%', borderWidth: 2, borderColor: '#e29ef9', borderStyle: 'solid'}}/>
            <p className="link-dark mt-2" style={{width: '9ch', cursor: cursor, margin: 'auto'}} onClick={() => setClick(!click)}>tracklist</p>{
            click && (typeof items.tracklist === 'string' ?
                <p className="text-warning">none. try reloading the page!</p> : <div className="mt-3">
                    {Object.entries(items.tracklist).map(([, track], i) => (
                        <p key={i}>
                            {int2roman(i + 1)}. {track.song} {'>>'} {track.artist}
                        </p>
                    ))}
                </div>)
        }
        </div>
    )
}

export default ShowEntry;