import { useState } from 'react';
import { RotateCcw } from 'lucide-react';

type CakeProps = {
  onAllOut?: () => void;
};

const CANDLE_POSITIONS = [
  '12%',
  '24%',
  '36%',
  '48%',
  '60%',
  '72%',
  '84%',
];

type CandleProps = {
  lit: boolean;
  position: string;
  onToggle: () => void;
};

function Candle({ lit, position, onToggle }: CandleProps) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      aria-label={lit ? 'Blow out this candle' : 'Relight this candle'}
      className="absolute bottom-0 flex flex-col items-center group"
      style={{ left: position, transform: 'translateX(-50%)' }}
    >
      {/* Flame */}
      <span className="relative h-6 w-4 flex items-end justify-center">
        {lit ? (
          <span
            className="flame absolute bottom-0 w-3 h-5 rounded-full"
            style={{
              background: 'radial-gradient(circle at 50% 70%, #FFF3C4 0%, #E9D9AE 40%, #DDBE7E 70%, #C9A45C 100%)',
              boxShadow: '0 0 12px 3px rgba(221, 190, 126, 0.65)',
            }}
          />
        ) : (
          <span className="flame-off absolute bottom-0 w-3 h-5 rounded-full pointer-events-none" />
        )}
      </span>
      {/* Wick */}
      <span className="w-px h-1.5 bg-ink-900/70" />
      {/* Stick */}
      <span
        className="w-1.5 h-12 rounded-full group-hover:h-14 transition-all duration-200"
        style={{
          background: 'repeating-linear-gradient(45deg, #F6F1E8 0 5px, #C9A45C 5px 10px)',
        }}
      />
    </button>
  );
}

export default function Cake({ onAllOut }: CakeProps) {
  const total = CANDLE_POSITIONS.length;
  const [lit, setLit] = useState<boolean[]>(() => CANDLE_POSITIONS.map(() => true));

  const litCount = lit.filter(Boolean).length;
  const allOut = litCount === 0;

  function blow(index: number) {
    const willBlowOutLastCandle =
      lit[index] && lit.every((isLit, candleIndex) => candleIndex === index || !isLit);

    setLit((prev) => prev.map((isLit, candleIndex) =>
      candleIndex === index ? !isLit : isLit
    ));

    // Keep side effects outside the state updater (React StrictMode may replay it).
    if (willBlowOutLastCandle) onAllOut?.();
  }

  return (
    <div className="flex flex-col items-center">
      {/*
        The candle row must be exactly as wide as the top tier. Without an
        explicit width it collapses to 0px (all children are absolute), which
        stacked every candle on one spot, and the old `bottom-full` anchoring
        floated them above the cake instead of standing on it.
      */}
      <div className="relative h-24 w-64 sm:w-72">
        {CANDLE_POSITIONS.map((pos, i) => (
          <Candle key={i} lit={lit[i]} position={pos} onToggle={() => blow(i)} />
        ))}
      </div>

      {/* Top tier */}
      <div
        className="w-64 h-16 sm:w-72 sm:h-20 rounded-t-lg relative shadow-lg shadow-emerald-950/20"
        style={{
          background: 'linear-gradient(180deg, #F6F1E8 0%, #EDE4D4 100%)',
        }}
      >
        <div
          className="absolute inset-x-0 top-0 h-5 rounded-t-lg"
          style={{
            background: 'linear-gradient(180deg, #FDFBF7 0%, #F6F1E8 60%)',
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-2" style={{ background: '#C9A45C55' }} />
      </div>

      {/* Bottom tier */}
      <div
        className="w-80 h-20 sm:w-96 sm:h-24 rounded-b-lg relative shadow-xl shadow-emerald-950/25"
        style={{
          background: 'linear-gradient(180deg, #1B4439 0%, #0E2620 100%)',
        }}
      >
        <div className="absolute inset-x-0 top-0 h-2" style={{ background: '#C9A45C88' }} />
        <div className="absolute inset-3 border border-gold-400/20 rounded pointer-events-none" />
      </div>

      {/* Plate */}
      <div className="mt-3 w-[22rem] sm:w-[26rem] h-2.5 rounded-full bg-gold-500/40" />

      <div className="mt-8 flex items-center gap-4">
        <p className="text-sm text-ink-800/70 italic font-display text-lg">
          {allOut
            ? 'Your wish is sealed. Happy birthday.'
            : `${litCount} candle${litCount === 1 ? '' : 's'} still flickering — tap to blow them out.`}
        </p>
        {litCount < total && (
          <button
            onClick={() => setLit(CANDLE_POSITIONS.map(() => true))}
            className="inline-flex items-center gap-2 rounded-full border border-gold-500/50 px-4 py-2 text-xs uppercase tracking-widest2 text-gold-600 hover:bg-gold-500 hover:text-cream-50 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" strokeWidth={1.5} />
            Relight
          </button>
        )}
      </div>
    </div>
  );
}
