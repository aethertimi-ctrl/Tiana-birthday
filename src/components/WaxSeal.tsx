type WaxSealProps = {
  /** Letter pressed into the seal. */
  letter: string;
  className?: string;
  /** Used when the seal breaks in two on opening. */
  half?: 'left' | 'right';
};

/**
 * Hand-pressed look: an irregular, slightly wavy edge (a smooth closed curve
 * through 18 points that alternate between two radii, nudged by fixed amounts
 * so it never looks machine-perfect).
 */
const SEAL_PATH = (() => {
  const count = 18;
  const nudge = [0, 1.2, -0.6, 0.8, -1, 0.4, 1.1, -0.8, 0.2, -0.5, 1, -1.1, 0.6, 0, -0.7, 0.9, -0.3, 0.5];
  const pts = Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
    const r = (i % 2 === 0 ? 47.5 : 43) + nudge[i];
    return [50 + Math.cos(angle) * r, 50 + Math.sin(angle) * r] as const;
  });
  const mid = (a: readonly [number, number], b: readonly [number, number]) =>
    [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2] as const;
  const f = (n: number) => n.toFixed(2);
  const start = mid(pts[count - 1], pts[0]);
  let d = `M${f(start[0])} ${f(start[1])}`;
  for (let i = 0; i < count; i++) {
    const p = pts[i];
    const m = mid(p, pts[(i + 1) % count]);
    d += ` Q${f(p[0])} ${f(p[1])} ${f(m[0])} ${f(m[1])}`;
  }
  return `${d}Z`;
})();

// A jagged "crack" down the middle, shared by both halves so they fit together.
const CRACK = '52% 0, 47% 20%, 54% 40%, 46% 60%, 53% 80%, 49% 100%';
const CRACK_BACK = '49% 100%, 53% 80%, 46% 60%, 54% 40%, 47% 20%, 52% 0';
const CLIP = {
  left: `polygon(0 0, ${CRACK}, 0 100%)`,
  right: `polygon(${CRACK_BACK}, 100% 100%, 100% 0)`,
};

export default function WaxSeal({ letter, className = '', half }: WaxSealProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      style={half ? { clipPath: CLIP[half] } : undefined}
      aria-hidden
      focusable="false"
    >
      <defs>
        <radialGradient id="seal-body" cx="36%" cy="30%" r="85%">
          <stop offset="0" stopColor="#F8E9AE" />
          <stop offset="0.38" stopColor="#DDB85F" />
          <stop offset="0.75" stopColor="#B38A3A" />
          <stop offset="1" stopColor="#7C5C22" />
        </radialGradient>
        <radialGradient id="seal-disc" cx="62%" cy="68%" r="85%">
          <stop offset="0" stopColor="#F1D58A" />
          <stop offset="0.6" stopColor="#CDA650" />
          <stop offset="1" stopColor="#A9803A" />
        </radialGradient>
        <linearGradient id="seal-ring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFF3C4" />
          <stop offset="0.5" stopColor="#C9A45C" />
          <stop offset="1" stopColor="#6E4F1B" />
        </linearGradient>
        <linearGradient id="seal-letter" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FBEBB5" />
          <stop offset="1" stopColor="#C49A45" />
        </linearGradient>
        <linearGradient id="seal-glare" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <clipPath id="seal-clip">
          <path d={SEAL_PATH} />
        </clipPath>
      </defs>

      {/* Body and rim */}
      <path d={SEAL_PATH} fill="url(#seal-body)" />
      <path d={SEAL_PATH} fill="none" stroke="#6E4F1B" strokeOpacity="0.55" strokeWidth="1.2" />

      {/* Raised rim around a pressed-in centre */}
      <circle cx="50" cy="50" r="34" fill="none" stroke="url(#seal-ring)" strokeWidth="2.6" />
      <circle cx="50" cy="50" r="31" fill="url(#seal-disc)" />
      <circle cx="50" cy="50" r="31" fill="none" stroke="#7C5C22" strokeOpacity="0.35" strokeWidth="0.8" />
      <circle cx="50" cy="50" r="27.5" fill="none" stroke="#FFF3C4" strokeOpacity="0.45" strokeWidth="0.6" strokeDasharray="1.2 2.4" />

      {/* Embossed letter: shadow, highlight, then the face */}
      {[
        { dx: 0.9, dy: 1.1, fill: '#6E4F1B', op: 0.75 },
        { dx: -0.7, dy: -0.8, fill: '#FFF6D2', op: 0.9 },
        { dx: 0, dy: 0, fill: 'url(#seal-letter)', op: 1 },
      ].map((l, i) => (
        <text
          key={i}
          x={50 + l.dx}
          y={65 + l.dy}
          textAnchor="middle"
          fontSize="44"
          fontWeight="700"
          fontStyle="italic"
          fill={l.fill}
          fillOpacity={l.op}
          style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif" }}
        >
          {letter}
        </text>
      ))}

      {/* Soft highlight and a slow glare that sweeps across */}
      <ellipse cx="34" cy="28" rx="15" ry="7" transform="rotate(-35 34 28)" fill="#fff" fillOpacity="0.22" />
      <g clipPath="url(#seal-clip)">
        <g transform="rotate(20 50 50)">
          <rect className="seal-glare" x="-50" y="-20" width="26" height="140" fill="url(#seal-glare)" />
        </g>
      </g>
    </svg>
  );
}
