import feelingGood from '../assets/music/nina-simone-feeling-good.mp3';

export type Track = {
  title: string;
  artist: string;
  src: string;
};

// The page plays a single song: the first entry below.
export const tracks: Track[] = [
  { title: 'Feeling Good', artist: 'Nina Simone', src: feelingGood },
];
