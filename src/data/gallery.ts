export type Photo = {
  /** Final URL of the image (resolved by the bundler, so it works on GitHub Pages). */
  src: string;
  /** Short caption shown under the photo. Empty means no caption. */
  caption: string;
  /** Optional CSS object-position for the cropped thumbnail, e.g. "center 15%". */
  focus?: string;
};

/**
 * HOW TO ADD PHOTOS
 * -----------------
 * Drop image files (jpg, jpeg, png, webp or avif) into `src/assets/gallery/`.
 * That's it: every file is picked up automatically, in filename order
 * (1.jpg, 2.jpg, 10.jpg ...), with no list to maintain.
 *
 *   portrait.jpg  -> shown in the hero at the very top (not in the gallery).
 *   anything else -> shown in the gallery, tap to open full screen.
 *
 * Tips: export photos around 1600px wide so the page loads fast on phones.
 * iPhone .HEIC files don't display in browsers, so convert them to .jpg first.
 */
const files = import.meta.glob(
  '../assets/gallery/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}',
  { eager: true, query: '?url', import: 'default' }
) as unknown as Record<string, string>;

/**
 * Optional captions, keyed by file name WITHOUT the extension.
 * Example: a file called `3.jpg` gets the caption under key '3'.
 */
export const captions: Record<string, string> = {
  '1': 'Add a favourite memory here',
  '2': 'Every photo gets its own caption',
  '3': 'Celebrating another beautiful year',
  '4': 'A moment worth keeping',
  '5': 'Your caption goes here',
};

/**
 * Optional crop focus per photo (same keys as captions). Thumbnails are cropped
 * to a portrait frame; point it at the face if it gets cut off.
 * Example: { '3': 'center 10%' }  -> keep the top of the photo.
 */
export const focus: Record<string, string> = {};

const all = Object.entries(files)
  .map(([path, src]) => {
    const name = (path.split('/').pop() ?? '').replace(/\.[^.]+$/, '');
    return { name, src, caption: captions[name] ?? '', focus: focus[name] };
  })
  .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));

const isPortrait = (p: { name: string }) => /^portrait/i.test(p.name);

function toPhoto({ src, caption, focus: f }: (typeof all)[number]): Photo {
  return { src, caption, focus: f };
}

/** Hero photo (file name starts with "portrait"), or null when there isn't one. */
export const portrait: Photo | null = (() => {
  const match = all.find(isPortrait);
  return match ? toPhoto(match) : null;
})();

/** Gallery photos, in filename order. */
export const photos: Photo[] = all.filter((p) => !isPortrait(p)).map(toPhoto);
