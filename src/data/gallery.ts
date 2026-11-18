export type Photo = {
  src: string;
  caption: string;
};

/**
 * Place up to 5 photos inside `public/gallery/` in the project's file tree.
 * For each photo below, set `src` to its path (e.g. "/gallery/1.jpg") and
 * write a short caption. Leave `src` as "" for any slot you are not using yet.
 */
export const photos: Photo[] = [
  { src: '', caption: 'The golden hour' },
  { src: '', caption: 'Laughter, always' },
  { src: '', caption: 'City lights and quiet nights' },
  { src: '', caption: 'Her favorite table' },
  { src: '', caption: 'Perfect as she is' },
];
