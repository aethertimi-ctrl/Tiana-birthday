import { useMemo, useState } from 'react';
import { Camera } from 'lucide-react';
import { photos } from '@/data/gallery';
import Reveal from '@/components/Reveal';
import Lightbox from '@/components/Lightbox';

// Polaroid-style tilt, only from tablet width up. Written out in full so Tailwind sees them.
const TILTS = ['md:-rotate-2', 'md:rotate-1', 'md:rotate-2', 'md:-rotate-1'];

// One column on phones (big photos), two on tablets, three on desktop. Rows are
// centred with flex-wrap, so a short last row never leaves an awkward hole.
const CARD_WIDTH =
  'w-full max-w-[22rem] sm:max-w-none sm:w-[calc(50%_-_0.75rem)] lg:w-[calc(33.333%_-_1rem)]';

/** Dev-only preview so the layout is visible before any photos are added. */
function SetupPreview() {
  return (
    <div>
      {isEmpty && (
        <div className="max-w-xl mx-auto rounded-2xl border border-dashed border-gold-500/40 bg-gold-300/5 px-8 py-12 text-center">
          <p className="font-display text-xl italic text-ink-800">Your memories will look lovely here.</p>
          <p className="mt-2 text-sm text-ink-800/60 leading-relaxed">
            Add up to five photographs to the gallery folder in the project, and they will appear in this frame.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {filled.map((photo, i) => (
          <Reveal
            key={photo.src + i}
            delay={(i % 3) * 120}
            className={i === 0 && filled.length > 2 ? 'sm:col-span-2 sm:row-span-2' : ''}
    <div className="mx-auto max-w-5xl">
      <p className="mb-8 text-center text-sm leading-relaxed text-ink-800/60">
        Preview only. Visitors won't see this section until you add photos. Drop image files into{' '}
        <code className="rounded bg-gold-300/20 px-1.5 py-0.5">src/assets/gallery/</code> and they
        replace these frames.
      </p>
      <div className="flex flex-wrap justify-center gap-6">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`${CARD_WIDTH} ${TILTS[i % TILTS.length]} rounded-sm bg-cream-50 p-3 pb-4 shadow-lg shadow-emerald-950/15 ring-1 ring-gold-500/20`}
          >
            <div className="flex aspect-[4/5] items-center justify-center bg-emerald-900/10 text-gold-600/60">
              <Camera className="h-8 w-8" strokeWidth={1.25} />
            </div>
            <p className="mt-3 text-center font-display text-lg italic text-ink-800/50">
              Photo slot {i + 1}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Gallery() {
  const [failed, setFailed] = useState<string[]>([]);
  const [activeSource, setActiveSource] = useState<string | null>(null);

  // Drop any photo whose file can't be loaded instead of showing a broken-image icon.
  const visible = useMemo(() => photos.filter((p) => !failed.includes(p.src)), [failed]);
  const activeIndex = activeSource === null ? null : visible.findIndex((photo) => photo.src === activeSource);
  const lightboxIndex = activeIndex !== null && activeIndex >= 0 ? activeIndex : null;

  if (visible.length === 0) {
    return import.meta.env.DEV ? <SetupPreview /> : null;
  }

  return (
    <>
      <div className="mx-auto flex max-w-5xl flex-wrap justify-center gap-6">
        {visible.map((photo, i) => (
          <Reveal key={photo.src} delay={(i % 3) * 120} className={CARD_WIDTH}>
            <button
              type="button"
              onClick={() => setActiveSource(photo.src)}
              aria-label={photo.caption ? `Open photo: ${photo.caption}` : `Open photo ${i + 1}`}
              className={`group block w-full rounded-sm bg-cream-50 p-2.5 pb-3 text-left shadow-lg shadow-emerald-950/15 ring-1 ring-gold-500/20 transition duration-500 ease-out hover:-translate-y-1 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-500 ${TILTS[i % TILTS.length]}`}
            >
              <span className="block aspect-[4/5] overflow-hidden bg-emerald-900/10">
                <img
                  src={photo.src}
                  alt={photo.caption || `Photo ${i + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ objectPosition: photo.focus ?? 'center 25%' }}
                  onError={() =>
                    setFailed((prev) => (prev.includes(photo.src) ? prev : [...prev, photo.src]))
                  }
                />
              </span>
              {photo.caption && (
                <span className="mt-3 block text-center font-display text-lg italic leading-snug text-ink-800">
                  {photo.caption}
                </span>
              )}
            </button>
          </Reveal>
        ))}
      </div>

      <Lightbox
        photos={visible}
        index={lightboxIndex}
        onClose={() => setActiveSource(null)}
        onChange={(index) => setActiveSource(visible[index]?.src ?? null)}
      />
    </>
  );
}
