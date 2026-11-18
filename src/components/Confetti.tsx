import { useMemo } from 'react';

const COLORS = ['#CE7897', '#F2C8D4', '#49304F', '#E7A9BD', '#FFF9F6', '#A94F73'];

export default function Confetti({ token }: { token: number }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: 90 }, (_, i) => ({
        id: `${token}-${i}`,
        left: Math.random() * 100,
        delay: Math.random() * 1.2,
        dur: 2.6 + Math.random() * 2.4,
        drift: (Math.random() - 0.5) * 240,
        size: 6 + Math.random() * 8,
        color: COLORS[i % COLORS.length],
        round: Math.random() > 0.6,
      })),
    [token]
  );

  if (!token) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden>
      {pieces.map((p) => (
        <span
          key={p.id}
          className="confetti-piece absolute top-0"
          style={
            {
              left: `${p.left}%`,
              width: p.size,
              height: p.round ? p.size : p.size * 0.45,
              backgroundColor: p.color,
              borderRadius: p.round ? '9999px' : '1px',
              '--delay': `${p.delay}s`,
              '--dur': `${p.dur}s`,
              '--drift': `${p.drift}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
