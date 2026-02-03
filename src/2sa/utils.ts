import { AUDIO_S3_PATH, TRACKLIST_S3_PATH, VIDEO_S3_PATH } from './constants.ts';
import { TWO_STEP_AUTH_SHOWS } from './data/2sa_shows.ts';
import { THREE_STEP_AUTH_SHOWS } from './data/3sa_shows.ts';

export const getTracklistSrc = (id: string) => `${TRACKLIST_S3_PATH}${id.substring(3)}.json`;

export const getAudioSrc = (id: string) => `${AUDIO_S3_PATH}${id}.mp3`;

export const getVideoSrc = (id: string) => `${VIDEO_S3_PATH}${id}.mp4`;

export const getStftBinaries = (id: string) => `/2sa/temp/${id}.spectrum.bin`;

export const getStftMeta = (id: string) => `/2sa/temp/${id}.spectrum.meta.json`;

export const getSomeRandomGenres = (count: number) => {
    const tags = [
        ...new Set(
            [...TWO_STEP_AUTH_SHOWS, ...THREE_STEP_AUTH_SHOWS]
                .map(({ tags }) => (tags ? [...tags?.split('#')] : []))
                .flat()
                .map((tag) => tag.trim())
                .filter((tag) => tag.trim() !== ''),
        ),
    ];
    // i don't even care that this isn't uniformly distributed
    // whatcha gonna do about it?
    return tags.sort(() => Math.random() - 0.5).slice(0, count);
};
