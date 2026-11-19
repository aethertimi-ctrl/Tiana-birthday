import { Sparkles } from 'lucide-react';

 type EnvelopeProps = {
  name: string;
  open: boolean;
  onOpen: () => void;
};

export default function Envelope({ name, open, onOpen }: EnvelopeProps) {
  return (
    <div
      className="relative mx-auto animate-fade-up"
      style={{ animationDelay: '600ms', perspective: '1200px' }}
    >
      <div
        className={`relative mx-auto w-[min(19rem,84vw)] aspect-[19/12] sm:w-[22rem] sm:aspect-[22/14] transition-all duration-700 ${
          open
            ? 'scale-90 opacity-70'
            : '[@media(hover:hover)]:hover:scale-105 cursor-pointer active:scale-95'
        }`}
        style={{ transformStyle: 'preserve-3d' }}
        onClick={() => !open && onOpen()}
        role="button"
        tabIndex={0}
        aria-label={open ? 'Letter opened' : 'Open the letter'}
        onKeyDown={(event) => {
          if (!open && (event.key === 'Enter' || event.key === ' ')) {
            event.preventDefault();
            onOpen();
          }
        }}
      >
        <div
          className={`absolute left-1/2 -translate-x-1/2 bottom-2 w-[88%] bg-cream-100 rounded-md shadow-lg px-6 py-6 text-center transition-all duration-1000 ease-out ${
            open ? '-translate-y-[115%] rotate-[1deg]' : 'translate-y-0'
          }`}
        >
          <p class="font-display italic text-2xl text-ink-800">For {name}</p>
          <p class="mt-2 text-[11px] uppercase tracking-widest2 text-gold-600">With love</p>
        </div>

        <div className="absolute inset-0 rounded-lg bg-emerald-900 shadow-xl shadow-emerald-950/40" />

        <div
          className="absolute inset-0 rounded-lg"
          style={{
            background: 'linear-gradient(180deg, #741421 0%, #3A0A13 100%)',
            clipPath:
              'polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 22%, 50% 62%, 100% 22%, 100% 100%, 0 100%)',
          }}
        />

        <div
          className={`absolute inset-x-0 top-0 h-1/2 origin-top transition-transform duration-700 ease-in-out ${
            open ? '[transform:rotateX(180deg)]' : ''
          }`}
          style={{ transformStyle: 'preserve-3d', zIndex: open ? 0 : 20 }}
        >
          <div
            className="w-full h-full rounded-t-lg bg-emerald-700 shadow-md"
            style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
          />
        </div>

        {!open && (
          <div
            className="wax-seal absolute left-1/2 top-1/2 z-30 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-cream-50 shadow-xl shadow-emerald-950/60"
            aria-hidden="true"
          >
            <span className="seal-thread" />
            <span className="relative z-10 font-display text-3xl font-semibold italic leading-none">T</span>
          </div>
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
