import { useState } from 'react';
import type { Photo } from '@/data/gallery';

type PortraitProps = {
  photo: Photo;
  name: string;
};

/** Arched, gold-ringed portrait for the hero. Renders nothing if the image fails to load. */
export default function Portrait({ photo, name }: PortraitProps) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;

  return (
    <div
      className="animate-fade-up relative mx-auto mt-8 w-40 sm:w-48"
      style={{ animationDelay: '100ms' }}
    >
      <div
        className="absolute -inset-2 rounded-t-full rounded-b-3xl border border-gold-400/40"
        aria-hidden
      />
      <div className="relative aspect-[3/4] overflow-hidden rounded-t-full rounded-b-2xl bg-emerald-900 shadow-2xl shadow-black/30 ring-2 ring-gold-400/60">
        <img
          src={photo.src}
          alt={name ? `Portrait of ${name}` : 'Portrait'}
          decoding="async"
          className="h-full w-full object-cover"
          style={{ objectPosition: photo.focus ?? 'center 20%' }}
          onError={() => setFailed(true)}
        />
      </div>
    </div>
  );
}
