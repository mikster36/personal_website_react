import {AUDIO_S3_PATH, TRACKLIST_S3_PATH, VIDEO_S3_PATH} from "./constants.ts";

export const getTracklistSrc = (id: string) => `${TRACKLIST_S3_PATH}${id.substring(3)}.json`;

export const getAudioSrc = (id: string) => `${AUDIO_S3_PATH}${id}.mp3`;

export const getVideoSrc = (id: string) => `${VIDEO_S3_PATH}${id}.mp4`;