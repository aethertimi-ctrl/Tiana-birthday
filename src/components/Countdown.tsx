import { useEffect, useState } from 'react';

import { birthday } from '@/data/celebration';

function nextBirthday(): Date {
  const now = new Date();
  let target = new Date(now.getFullYear(), birthday.month - 1, birthday.day, 0, 0, 0);
  // If today IS the big day, count toward midnight so the page still counts down.
  if (
    now.getMonth() === target.getMonth() &&
    now.getDate() === target.getDate() &&
    now.getHours() === 0
  ) {
    return target;
  }
  if (target.getTime() <= now.getTime()) {
    target = new Date(now.getFullYear() + 1, birthday.month - 1, birthday.day, 0, 0, 0);
  }
  return target;
}

type Parts = { days: number; hours: number; minutes: number; seconds: number };

function diffParts(target: Date): Parts {
  const ms = Math.max(target.getTime() - Date.now(), 0);
  return {
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor((ms / 3_600_000) % 24),
    minutes: Math.floor((ms / 60_000) % 60),
    seconds: Math.floor((ms / 1_000) % 60),
  };
}

const pad = (n: number) => n.toString().padStart(2, '0');

export default function Countdown() {
  const [target] = useState(nextBirthday);
  const [parts, setParts] = useState<Parts>(() => diffParts(target));

  useEffect(() => {
    const id = setInterval(() => setParts(diffParts(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const cells: Array<[string, string]> = [
    [pad(parts.days), 'Days'],
    [pad(parts.hours), 'Hours'],
    [pad(parts.minutes), 'Minutes'],
    [pad(parts.seconds), 'Seconds'],
  ];

  return (
    <div className="flex justify-center gap-3 sm:gap-5">
      {cells.map(([value, label]) => (
        <div
          key={label}
          className="w-20 sm:w-24 rounded-xl border border-gold-500/30 bg-cream-100 px-2 py-4 text-center shadow-sm"
        >
          <p className="font-display text-4xl sm:text-5xl text-emerald-900 tabular-nums leading-none">
            {value}
          </p>
          <p className="mt-2 text-[10px] uppercase tracking-widest2 text-gold-600">{label}</p>
        </div>
      ))}
    </div>
  );
}
