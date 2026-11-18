import { photos } from '@/data/gallery';
import Reveal from '@/components/Reveal';

export default function Gallery() {
  const filled = photos.filter((p) => p.src);
  const isEmpty = filled.length === 0;

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
          >
            <figure
              className={`group relative overflow-hidden rounded-2xl bg-emerald-900 shadow-lg shadow-emerald-950/15 ${
                i === 0 && filled.length > 2 ? 'h-full min-h-[320px]' : 'aspect-[4/5]'
              }`}
            >
              <img
                src={photo.src}
                alt={photo.caption}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/70 via-transparent to-transparent opacity-80" />
              <div className="absolute inset-3 border border-cream-50/25 rounded-xl pointer-events-none" />
              <figcaption className="absolute bottom-5 left-6 right-6 text-cream-50">
                <p className="font-display italic text-lg">{photo.caption}</p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
