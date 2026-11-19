import { tracks } from '@/data/music';

/** The page plays one song: the first entry in `src/data/music.ts`. */
export const track = tracks[0] ?? null;

let audio: HTMLAudioElement | null = null;

/**
 * One shared <audio> element for the whole page. It is created lazily and is
 * started straight from the envelope tap, because phones (iOS especially) only
 * allow sound that begins inside a tap.
 */
export function getAudio(): HTMLAudioElement | null {
  if (!track) return null;
  if (!audio) {
    audio = new Audio();
    audio.preload = 'none'; // don't download the whole song until she opens the letter
    audio.src = track.src;
  }
  return audio;
}

export function playSong(): void {
  // Rejections (autoplay blocked, interrupted load) are fine: the player UI
  // follows the real audio events, so it just stays on "play".
  getAudio()
    ?.play()
    .catch(() => {});
}

export function pauseSong(): void {
  audio?.pause();
}

export function toggleSong(): void {
  const a = getAudio();
  if (!a) return;
  if (a.paused) playSong();
  else a.pause();
}

/**
 * Pause when the tab is hidden, the phone is locked, the app is switched away
 * or the page is being closed. Returns a cleanup function.
 */
export function pauseSongWhenHidden(): () => void {
  const onVisibility = () => {
    if (document.hidden) pauseSong();
  };
  document.addEventListener('visibilitychange', onVisibility);
  window.addEventListener('pagehide', pauseSong);
  return () => {
    document.removeEventListener('visibilitychange', onVisibility);
    window.removeEventListener('pagehide', pauseSong);
  };
}
