import { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { Photo } from '@/data/gallery';

type LightboxProps = {
  photos: Photo[];
  /** Index of the photo on screen, or null when closed. */
  index: number | null;
  onClose: () => void;
  onChange: (index: number) => void;
};

const navButton =
  'absolute top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full ' +
  'border border-cream-50/25 bg-emerald-950/60 text-cream-50 transition-colors ' +
  'hover:bg-gold-500 hover:text-emerald-950 focus-visible:outline focus-visible:outline-2 ' +
  'focus-visible:outline-gold-300';

/** Full-screen photo viewer: arrow keys / swipe to browse, Esc or backdrop tap to close. */
export default function Lightbox({ photos, index, onClose, onChange }: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);

  const count = photos.length;
  const open = index !== null && index >= 0 && index < count;

  const go = useCallback(
    (delta: number) => {
      if (index === null || count < 2) return;
      onChange((index + delta + count) % count);
    },
    [index, count, onChange]
  );

  // Lock page scroll while open, move focus into the dialog and hand it back on close.
  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        go(1);
      } else if (e.key === 'ArrowLeft') {
        go(-1);
      } else if (e.key === 'Tab') {
        // Keep keyboard focus inside the dialog.
        const buttons = dialogRef.current?.querySelectorAll<HTMLElement>('button');
        if (!buttons || buttons.length === 0) return;
        const first = buttons[0];
        const last = buttons[buttons.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, go, onClose]);

  // Warm the cache for the neighbouring photos so browsing feels instant.
  useEffect(() => {
    if (!open || index === null || count < 2) return;
    [1, -1].forEach((delta) => {
      const img = new Image();
      img.src = photos[(index + delta + count) % count].src;
    });
  }, [open, index, count, photos]);

  if (!open || index === null) return null;
  const photo = photos[index];

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      className="fixed inset-0 z-[60] flex items-center justify-center bg-emerald-950/95 backdrop-blur-sm"
      onClick={onClose}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        touchStartX.current = null;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
      }}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Close photo viewer"
        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-cream-50/25 bg-emerald-950/60 text-cream-50 transition-colors hover:bg-gold-500 hover:text-emerald-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-300"
      >
        <X className="h-5 w-5" strokeWidth={1.5} />
      </button>

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
            aria-label="Previous photo"
            className={`${navButton} left-3 sm:left-6`}
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
            aria-label="Next photo"
            className={`${navButton} right-3 sm:right-6`}
          >
            <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </>
      )}

      <figure className="max-w-[92vw] px-2 sm:max-w-3xl" onClick={(e) => e.stopPropagation()}>
        <img
          key={photo.src}
          src={photo.src}
          alt={photo.caption || `Photo ${index + 1} of ${count}`}
          className="mx-auto max-h-[78vh] w-auto max-w-full rounded-sm bg-cream-50 object-contain p-2 shadow-2xl sm:p-3"
        />
        <figcaption className="mt-4 text-center text-cream-100">
          {photo.caption && <p className="font-display text-xl italic">{photo.caption}</p>}
          {count > 1 && (
            <p className="mt-1 text-[11px] uppercase tracking-widest2 text-gold-400">
              {index + 1} / {count}
            </p>
          )}
        </figcaption>
      </figure>
    </div>,
    document.body
  );
}
