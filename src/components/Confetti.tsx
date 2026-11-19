import { useEffect, useMemo, useState } from 'react';

const COLORS = ['#CE7897', '#F2C8D4', '#49304F', '#E7A9BD', '#FFF9F6', '#A94F73'];
const COLORS = ['#CDA667', '#F3DFC1', '#741421', '#E7C58D', '#FFFDF9', '#9D1C2D'];
const LOVE_LABELS = ['love', '♡', 'love', '♥'];

export default function Confetti({ token }: { token: number }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!token) {
      setVisible(false);
      return;
    }

    setVisible(true);
    const timeout = window.setTimeout(() => setVisible(false), 6000);
    return () => window.clearTimeout(timeout);
  }, [token]);

  const pieces = useMemo(
    () =>
      Array.from({ length: 90 }, (_, i) => ({
        id: `${token}-${i}`,
        left: Math.random() * 100,
        delay: Math.random() * 0.8,
        dur: 3 + Math.random() * 1.2,
        drift: (Math.random() - 0.5) * 240,
        size: 6 + Math.random() * 8,
        color: COLORS[i % COLORS.length],
        round: Math.random() > 0.6,
        love: i % 6 === 0,
        loveLabel: LOVE_LABELS[i % LOVE_LABELS.length],
      })),
    [token],
  );

  if (!token || !visible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden>
      {pieces.map((piece) => (
        <span
          key={piece.id}
          className={`confetti-piece absolute top-0 ${piece.love ? 'confetti-love' : ''}`}
          style={
            {
              left: `${piece.left}%`,
              width: piece.love ? 'auto' : piece.size,
              height: piece.love ? 'auto' : piece.round ? piece.size : piece.size * 0.45,
              backgroundColor: piece.love ? 'transparent' : piece.color,
              color: piece.color,
              borderRadius: piece.round ? '9999px' : '1px',
              '--delay': `${piece.delay}s`,
              '--dur': `${piece.dur}s`,
              '--drift': `${piece.drift}px`,
            } as React.CSSProperties
          }
        >
          {piece.love ? piece.loveLabel : null}
        </span>
      ))}
    </div>
  );
}
