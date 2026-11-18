/**
 * Drop your music files into `src/assets/music/` in the project's file tree,
 * then import each one below and add it to the list. Example:
 *
 *   import midnight from '../assets/music/midnight.mp3';
 *   ...
 *   { title: 'Midnight in Paris', artist: 'Her favorite', src: midnight },
 *
 * MP3, M4A, OGG and WAV all work. The player below picks them up automatically.
 */
export type Track = {
  title: string;
  artist: string;
  src: string;
};

export const tracks: Track[] = [];
