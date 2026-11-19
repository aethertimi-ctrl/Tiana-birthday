import { useEffect, useRef, useState } from 'react';

type Parts = { days: number; hours: number; minutes: number; seconds: number };

function diffParts(target: Date): Parts {
  const totalSeconds = Math.max(Math.ceil((target.getTime() - Date.now()) / 1000), 0);
  return {
    days: Math.floor(totalSeconds / 86_400),
    hours: Math.floor((totalSeconds % 86_400) / 3_600),
    minutes: Math.floor((totalSeconds % 3_600) / 60),
    seconds: totalSeconds % 60,
  };
}

const pad = (n: number) => n.toString().padStart(2, '0');

type CountdownProps = {
  target: Date;
  /** Called once, the moment the countdown reaches zero. */
  onElapsed: () => void;
};

export default function Countdown({ target, onElapsed }: CountdownProps) {
  const [parts, setParts] = useState<Parts>(() => diffParts(target));
  const elapsedRef = useRef(false);
  const callbackRef = useRef(onElapsed);

  useEffect(() => {
    callbackRef.current = onElapsed;
  }, [onElapsed]);

  useEffect(() => {
    function tick() {
      setParts(diffParts(target));
      if (!elapsedRef.current && target.getTime() <= Date.now()) {
        elapsedRef.current = true;
        callbackRef.current();
      }
    }

    tick();
    const id = window.setInterval(tick, 1000);
    // Browsers slow timers in background tabs; catch up the instant she comes back.
    document.addEventListener('visibilitychange', tick);
    return () => {
      window.clearInterval(id);
      document.removeEventListener('visibilitychange', tick);
    };
  }, [target]);

  const cells: Array<[string, string]> = [
    [pad(parts.days), 'Days'],
    [pad(parts.hours), 'Hours'],
    [pad(parts.minutes), 'Minutes'],
    [pad(parts.seconds), 'Seconds'],
  ];

  const dateText = target.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div
      className="mx-auto grid max-w-md grid-cols-4 gap-2 sm:max-w-xl sm:gap-5"
      role="timer"
      aria-label={`Time remaining until ${dateText}`}
    >
      {cells.map(([value, label]) => (
        <div
          key={label}
          className="min-w-0 rounded-xl border border-gold-500/30 bg-cream-100 px-1 py-3 text-center shadow-sm sm:px-2 sm:py-4"
        >
          <p className="font-display text-3xl leading-none text-emerald-900 tabular-nums sm:text-5xl">
            {value}
          </p>
          <p className="mt-2 truncate text-[9px] uppercase tracking-[0.2em] text-gold-600 sm:text-[10px] sm:tracking-widest2">
            {label}
          </p>
        </div>
      ))}
    </div>
  );
}
