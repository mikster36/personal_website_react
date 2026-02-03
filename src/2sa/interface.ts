export interface ShowStuff {
    title: string;
    id: string;
    tags?: string;
    note?: string;
    video?: boolean;
    image?: string;
    imageAlt?: string;
}

export interface SpectrumMeta {
    sampleRate: number;
    fftSize: number;
    hopSize: number;
    fps: number;
    bands: number;
    minDb: number;
    maxDb: number;
    duration: number;
    frames: number;
}
