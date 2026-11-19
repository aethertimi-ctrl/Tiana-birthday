import { Sparkles } from 'lucide-react';
import WaxSeal from '@/components/WaxSeal';
import { useRef } from 'react';

type EnvelopeProps = {
  name: string;
  open: boolean;
  onOpen: () => void;
};

const SEAL_SIZE = 'h-20 w-20 sm:h-24 sm:w-24';

export default function Envelope({ name, open, onOpen }: EnvelopeProps) {
  const initial = name.trim().charAt(0).toUpperCase() || '♥';
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
            background: 'linear-gradient(180deg, #7A1727 0%, #4A0E19 100%)',
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 22%, 50% 62%, 100% 22%, 100% 100%, 0 100%)',
          }}
        />
        <span className="envelope-pocket envelope-pocket-left absolute inset-0 z-30" aria-hidden="true" />
        <span className="envelope-pocket envelope-pocket-right absolute inset-0 z-30" aria-hidden="true" />
        <span className="envelope-pocket envelope-pocket-bottom absolute inset-0 z-40" aria-hidden="true" />
        <span className={`envelope-flap absolute inset-x-0 top-0 z-50 origin-top ${open ? 'envelope-flap-open' : ''}`} aria-hidden="true" />
        <span className="pointer-events-none absolute left-1/2 top-1/2 z-[60] -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
          {open ? (
            <span className={`relative block ${SEAL_SIZE}`}>
              <WaxSeal letter={initial} half="left" className="seal-half-left absolute inset-0 h-full w-full" />
              <WaxSeal letter={initial} half="right" className="seal-half-right absolute inset-0 h-full w-full" />
            </span>
          ) : (
            <span className="seal-pulse block">
              <WaxSeal letter={initial} className={`${SEAL_SIZE} drop-shadow-[0_6px_10px_rgba(0,0,0,0.45)]`} />
            </span>
          )}
        </span>
      </button>
      {!open && <p className="mt-8 animate-pulse text-center text-xs uppercase tracking-widest2 text-gold-400">Tap the envelope to open</p>}
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
