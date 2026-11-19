import { Sparkles, Star } from 'lucide-react';
import { useRef } from 'react';

type EnvelopeProps = {
  name: string;
  open: boolean;
  onOpen: () => void;
};

export default function Envelope({ name, open, onOpen }: EnvelopeProps) {
  const openingRef = useRef(false);

  function handleOpen() {
    if (open || openingRef.current) return;
    openingRef.current = true;
    onOpen();
  }

  return (
    <div className="relative mx-auto animate-fade-up" style={{ animationDelay: '600ms' }}>
      <button
        type="button"
        className={`envelope-shell relative mx-auto block ${open ? 'envelope-shell-open cursor-default' : 'envelope-shell-sealed cursor-pointer'}`}
        onClick={handleOpen}
        disabled={open}
        aria-label={open ? `Letter for ${name} is opening` : `Open the birthday letter for ${name}`}
      >
        <span className={`envelope-letter absolute bottom-3 left-1/2 z-10 ${open ? 'envelope-letter-open' : ''}`} aria-hidden="true">
          <span className="block font-display text-2xl italic text-ink-800">For {name}</span>
          <span className="mt-2 block text-[11px] uppercase tracking-widest2 text-gold-600">A birthday surprise</span>
          <span className="envelope-letter-mark block" />
        </span>
        <span className="envelope-back absolute inset-0 z-20" aria-hidden="true" />
        <span
          className="absolute inset-0 rounded-lg"
          aria-hidden="true"
          style={{
            background: 'linear-gradient(180deg, #49304F 0%, #34213D 100%)',
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 22%, 50% 62%, 100% 22%, 100% 100%, 0 100%)',
          }}
        />
        <span className="envelope-pocket envelope-pocket-left absolute inset-0 z-30" aria-hidden="true" />
        <span className="envelope-pocket envelope-pocket-right absolute inset-0 z-30" aria-hidden="true" />
        <span className="envelope-pocket envelope-pocket-bottom absolute inset-0 z-40" aria-hidden="true" />
        <span className={`envelope-flap absolute inset-x-0 top-0 z-50 origin-top ${open ? 'envelope-flap-open' : ''}`} aria-hidden="true" />
        {!open && (
          <span className="absolute left-1/2 top-1/2 z-[60] flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full shadow-lg shadow-emerald-950/50 ring-2 ring-gold-400/40" style={{ background: 'radial-gradient(circle at 35% 35%, #A94F73, #783B56)' }} aria-hidden="true">
            <Star className="h-5 w-5 text-cream-50" fill="currentColor" strokeWidth={0} />
          </span>
        )}
      </button>
      {!open && <p className="mt-8 animate-pulse text-center text-xs uppercase tracking-widest2 text-gold-400">Tap to open your letter</p>}
      {open && (
        <div className="mt-6 animate-fade-in text-center">
          <div className="inline-flex items-center gap-2 text-gold-300">
            <Sparkles className="h-4 w-4" strokeWidth={1.5} />
            <span className="text-xs uppercase tracking-widest2">The celebration begins</span>
            <Sparkles className="h-4 w-4" strokeWidth={1.5} />
          </div>
        </div>
      )}
    </div>
  );
}
