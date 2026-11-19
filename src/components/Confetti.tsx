import { useMemo } from 'react';

const COLORS = ['#CDA667', '#F3DFC1', '#741421', '#E7C58D', '#FFFDF9', '#9D1C2D'];

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
    [token],
  );

  if (!token) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden>
      {pieces.map((piece) => (
        <span
          key={piece.id}
          className="confetti-piece absolute top-0"
          style={
            {
              left: `${piece.left}%`,
              width: piece.size,
              height: piece.round ? piece.size : piece.size * 0.45,
              backgroundColor: piece.color,
              borderRadius: piece.round ? '9999px' : '1px',
              '--delay': `${piece.delay}s`,
              '--dur': `${piece.dur}s`,
              '--drift': `${piece.drift}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
