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
          <p className="font-display italic text-2xl text-ink-800">For {name}</p>
          <p className="mt-2 text-[11px] uppercase tracking-widest2 text-gold-600">With love</p>
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
            className="wax-seal absolute left-1/2 top-1/2 z-30 flex h-[4.5rem] w-[4.5rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-cream-50 shadow-xl shadow-emerald-950/50"
            style={{
              background:
                'radial-gradient(circle at 35% 25%, #f07b85 0%, #bd3447 22%, #8f1429 58%, #5d0b1c 100%)',
              border: '2px solid #d56a73',
              boxShadow:
                '0 7px 14px #22070c99, inset 0 2px 3px #ffd0c466, inset 0 -4px 7px #3b0618aa',
            }}
            aria-hidden="true"
          >
            <span
              className="absolute inset-[5px] rounded-full border border-rose-200/50"
              style={{ boxShadow: 'inset 0 1px 2px #ffd0c455, 0 1px 1px #510916' }}
            />
            <svg
              className="absolute inset-[10px] h-[calc(100%-20px)] w-[calc(100%-20px)]"
              viewBox="0 0 64 64"
              fill="none"
            >
              <path
                d="M22 48C12 41 11 28 17 17c5 4 9 10 10 17M42 48c10-7 11-20 5-31-5 4-9 10-10 17"
                stroke="#f2bdba"
                strokeOpacity=".8"
                strokeWidth="1.5"
              />
              <path
                d="M23 43l-8-1m10-4-9-3m11-2-7-6m22 16 8-1m-10-4 9-3m-11-2 7-6"
                stroke="#f2bdba"
                strokeOpacity=".75"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle cx="32" cy="32" r="24" stroke="#f2bdba" strokeOpacity=".28" />
            </svg>
            <span className="relative z-10 -mt-0.5 font-display text-[2rem] font-semibold italic leading-none text-rose-50 drop-shadow-[0_1px_2px_rgba(54,4,16,0.8)]">
              T
            </span>
            <span
              className="pointer-events-none absolute left-2 top-1 h-3 w-7 rotate-[-28deg] rounded-full opacity-50 blur-[2px]"
              style={{ background: 'linear-gradient(90deg, #ffe1d8, transparent)' }}
            />
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
