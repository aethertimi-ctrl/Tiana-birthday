import feelingGood from '../assets/music/nina-simone-feeling-good.mp3';

export type Track = {
  title: string;
  artist: string;
  src: string;
};

export const tracks: Track[] = [
  { title: 'Feeling Good', artist: 'Nina Simone', src: feelingGood },
];
