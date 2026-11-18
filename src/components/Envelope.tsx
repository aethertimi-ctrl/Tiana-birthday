import { Sparkles, Heart } from 'lucide-react';

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
        className={`relative w-[19rem] h-48 sm:w-[22rem] sm:h-56 transition-transform duration-700 ${
          open ? 'scale-90 opacity-70' : 'hover:scale-105 cursor-pointer'
        }`}
        style={{ transformStyle: 'preserve-3d' }}
        onClick={() => !open && onOpen()}
        role="button"
        tabIndex={0}
        aria-label={open ? 'Letter opened' : 'Open the letter'}
        onKeyDown={(e) => {
          if (!open && (e.key === 'Enter' || e.key === ' ')) onOpen();
        }}
      >
        {/* Letter sliding up out of the envelope */}
        <div
          className={`absolute left-1/2 -translate-x-1/2 bottom-2 w-[88%] bg-cream-100 rounded-md shadow-lg px-6 py-6 text-center transition-all duration-1000 ease-out ${
            open ? '-translate-y-[115%] rotate-[1deg]' : 'translate-y-0'
          }`}
        >
          <p className="font-display italic text-2xl text-ink-800">For {name}</p>
          <p className="mt-2 text-[11px] uppercase tracking-widest2 text-gold-600">
            With love
          </p>
        </div>

        {/* Envelope back */}
        <div className="absolute inset-0 rounded-lg bg-emerald-900 shadow-xl shadow-emerald-950/40" />

        {/* Envelope front pockets */}
        <div
          className="absolute inset-0 rounded-lg"
          style={{
            background: 'linear-gradient(180deg, #1B4439 0%, #12332B 100%)',
            clipPath:
              'polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 22%, 50% 62%, 100% 22%, 100% 100%, 0 100%)',
          }}
        />

        {/* Flap */}
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

        {/* Wax seal */}
        {!open && (
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full flex items-center justify-center shadow-lg shadow-emerald-950/50 ring-2 ring-gold-400/40"
            style={{ background: 'radial-gradient(circle at 35% 35%, #A9843F, #7a5c28)' }}
          >
            <Heart className="w-5 h-5 text-cream-50" fill="currentColor" strokeWidth={0} />
          </div>
        )}
      </div>

      {!open && (
        <p className="mt-8 text-center text-xs uppercase tracking-widest2 text-gold-400 animate-pulse">
          Tap the envelope to open
        </p>
      )}

      {open && (
        <div className="mt-6 text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 text-gold-300">
            <Sparkles className="w-4 h-4" strokeWidth={1.5} />
            <span className="text-xs uppercase tracking-widest2">The celebration begins</span>
            <Sparkles className="w-4 h-4" strokeWidth={1.5} />
          </div>
        </div>
      )}
    </div>
  );
}
