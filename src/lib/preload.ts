import { photos, portrait } from '@/data/gallery';

// Kept so the browser doesn't throw the decoded images away before they're needed.
const kept: HTMLImageElement[] = [];

/**
 * Download and decode every photo while the visitor is still on the countdown
 * or envelope screen. Otherwise they all load and decode at the instant the
 * letter opens, which is exactly when the page is busiest and stutters.
 */
export function preloadImages(): void {
  const urls = [portrait?.src, ...photos.map((p) => p.src)].filter((u): u is string => Boolean(u));

  const run = () => {
    urls.forEach((url) => {
      const img = new Image();
      img.decoding = 'async';
      img.src = url;
      img.decode?.().catch(() => {});
      kept.push(img);
    });
  };

  // Older Safari has no requestIdleCallback.
  if (typeof window.requestIdleCallback === 'function') window.requestIdleCallback(run, { timeout: 3000 });
  else window.setTimeout(run, 500);
}
