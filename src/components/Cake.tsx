import { useState } from 'react';
import { RotateCcw } from 'lucide-react';

type CakeProps = {
  onAllOut?: () => void;
};

const CANDLE_POSITIONS = ['10%', '23.33%', '36.67%', '50%', '63.33%', '76.67%', '90%'];

type CandleProps = {
  lit: boolean;
  position: string;
  onToggle: () => void;
};

function Candle({ lit, position, onToggle }: CandleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={lit ? 'Blow out this candle' : 'Relight this candle'}
      className="group absolute bottom-0 flex h-[78px] flex-col items-center px-1 touch-manipulation"
      style={{ left: position, transform: 'translateX(-50%)' }}
    >
      <span className="relative flex h-6 w-4 items-end justify-center" aria-hidden="true">
        {lit ? (
          <span
            className="flame absolute bottom-0 left-1/2 h-5 w-3 -translate-x-1/2 rounded-full"
            style={{
              background: 'radial-gradient(circle at 50% 70%, #FFF6E0 0%, #F3DFC1 40%, #E7C58D 70%, #CDA667 100%)',
              boxShadow: '0 0 12px 3px rgba(231, 197, 141, 0.65)',
            }}
          />
        ) : (
          <span className="flame-off pointer-events-none absolute bottom-0 left-1/2 h-5 w-3 -translate-x-1/2 rounded-full" />
        )}
      </span>
      <span className="h-1.5 w-px bg-ink-900/70" />
      <span
        className="h-12 w-1.5 rounded-full transition-all duration-200 group-hover:h-14"
        style={{ background: 'repeating-linear-gradient(45deg, #FFF9F2 0 5px, #CDA667 5px 10px)' }}
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
    const willBlowOutLastCandle = lit[index] && lit.every((isLit, candleIndex) => candleIndex === index || !isLit);
    setLit((previous) => previous.map((isLit, candleIndex) => (candleIndex === index ? !isLit : isLit)));
    if (willBlowOutLastCandle) onAllOut?.();
  }

  return (
    <div className="mx-auto flex w-[min(24rem,84vw)] flex-col items-center">
      <div className="relative h-24 w-[72%]">
        {CANDLE_POSITIONS.map((position, index) => (
          <Candle key={position} lit={lit[index]} position={position} onToggle={() => blow(index)} />
        ))}
      </div>
      <div className="relative h-16 w-[72%] rounded-t-lg shadow-lg shadow-emerald-950/20 sm:h-20" style={{ background: 'linear-gradient(180deg, #FFF9F2 0%, #F0E1C8 100%)' }}>
        <div className="absolute inset-x-0 top-0 h-5 rounded-t-lg" style={{ background: 'linear-gradient(180deg, #FDFBF7 0%, #FFF9F2 60%)' }} />
        <div className="absolute inset-x-0 bottom-0 h-2" style={{ background: '#CDA66755' }} />
      </div>
      <div className="relative h-20 w-full rounded-b-lg shadow-xl shadow-emerald-950/25 sm:h-24" style={{ background: 'linear-gradient(180deg, #7A1727 0%, #2E0A12 100%)' }}>
        <div className="absolute inset-x-0 top-0 h-2" style={{ background: '#CDA66788' }} />
        <div className="pointer-events-none absolute inset-3 rounded border border-gold-400/20" />
      </div>
      <div className="mt-3 h-2.5 w-[106%] rounded-full bg-gold-500/40" />
      <div className="mt-8 flex w-[min(34rem,calc(100vw-3rem))] flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <p className="text-center font-display text-lg italic text-ink-800/70" aria-live="polite">
          {allOut ? 'Your wish is sealed. Happy birthday.' : `${litCount} candle${litCount === 1 ? '' : 's'} still flickering — tap to blow them out.`}
        </p>
        {litCount < total && (
          <button type="button" onClick={() => setLit(CANDLE_POSITIONS.map(() => true))} className="inline-flex items-center gap-2 rounded-full border border-gold-500/50 px-4 py-2 text-xs uppercase tracking-widest2 text-gold-600 transition-colors hover:bg-gold-500 hover:text-cream-50">
            <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.5} />Relight
          </button>
        )}
      </div>
    </div>
  );
}
