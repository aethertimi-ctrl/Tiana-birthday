import { Sparkles, Star } from 'lucide-react';
import { useRef } from 'react';
import { Sparkles } from 'lucide-react';

type EnvelopeProps = {
  name: string;
  open: boolean;
  onOpen: () => void;
};

export default function Envelope({ name, open, onOpen }: EnvelopeProps) {
  const openingRef = useRef(false);

  function handleOpen() {
    // React state updates are asynchronous; this synchronous guard prevents
    // double taps/click bubbling from scheduling multiple opening transitions.
    if (open || openingRef.current) return;
    openingRef.current = true;
    onOpen();
  }

  return (
    <div className="relative mx-auto animate-fade-up" style={{ animationDelay: '600ms' }}>
      <div
        className={`envelope-shell relative mx-auto ${open ? 'envelope-shell-open' : 'envelope-shell-sealed'} ${
          open ? 'cursor-default' : 'cursor-pointer'
        }`}
        onClick={handleOpen}
      >
        <div
          className={`envelope-letter absolute left-1/2 bottom-3 z-10 ${open ? 'envelope-letter-open' : ''}`}
          aria-hidden={!open}
        >
          <p className="font-display italic text-2xl text-ink-800">For {name}</p>
          <p className="mt-2 text-[11px] uppercase tracking-widest2 text-gold-600">
            A birthday surprise
          </p>
          <div className="envelope-letter-mark" />
          <p className="font-display text-[1.7rem] italic leading-tight text-ink-800">For {name}</p>
          <p className="mt-3 text-[10px] uppercase tracking-[0.35em] text-gold-600">With love</p>
        </div>

        <div className="envelope-back absolute inset-0 z-20" />

        {/* Envelope front pockets */}
        <div
          className="absolute inset-0 rounded-lg"
          style={{
            background: 'linear-gradient(180deg, #49304F 0%, #34213D 100%)',
            clipPath:
              'polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 22%, 50% 62%, 100% 22%, 100% 100%, 0 100%)',
          }}
        />
        <div className="envelope-pocket envelope-pocket-left absolute inset-0 z-30" />
        <div className="envelope-pocket envelope-pocket-right absolute inset-0 z-30" />
        <div className="envelope-pocket envelope-pocket-bottom absolute inset-0 z-40" />

        <div
          className={`envelope-flap absolute inset-x-0 top-0 z-50 origin-top ${open ? 'envelope-flap-open' : ''}`}
          aria-hidden="true"
        />

        {!open && (
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full flex items-center justify-center shadow-lg shadow-emerald-950/50 ring-2 ring-gold-400/40"
            style={{ background: 'radial-gradient(circle at 35% 35%, #A94F73, #783B56)' }}
          >
            <Star className="w-5 h-5 text-cream-50" fill="currentColor" strokeWidth={0} />
          </div>
          <button
            type="button"
            className="wax-seal absolute left-1/2 top-[51%] z-[60] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
            onClick={(event) => {
              event.stopPropagation();
              handleOpen();
            }}
            aria-label="Open the letter"
          >
            <span className="seal-thread" aria-hidden="true" />
            <span className="relative z-10 font-display text-3xl font-semibold italic leading-none">T</span>
          </button>
        )}
      </div>

      {!open && (
        <p className="mt-8 animate-pulse text-center text-xs uppercase tracking-widest2 text-gold-400">
          Tap the T seal to open
        </p>
      )}

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
