# Tiana-template

An animated birthday page: a sealed envelope that opens onto a countdown, a cake
with candles to blow out, a photo gallery, three wishes and a music player.
Built with Vite, React, TypeScript and Tailwind CSS.

## Personalise it

| What | Where |
| --- | --- |
| Her name and the birthday date | `src/data/celebration.ts` |
| Photos and captions | drop files in `src/assets/gallery/`, captions in `src/data/gallery.ts` |
| Songs | drop files in `src/assets/music/`, list them in `src/data/music.ts` |
| The three wishes and page copy | `src/App.tsx` |
| Colours and fonts | `tailwind.config.js`, `index.html` |

### Photos

- `portrait.jpg` becomes the arched hero photo at the top.
- Every other image (`1.jpg`, `2.jpg`, …) appears in the gallery in filename order. Tap one to view it full screen, with swipe / arrow-key browsing.
- Use jpg, png, webp or avif at roughly 1600px wide. Convert iPhone `.HEIC` files to `.jpg` first.
- The gallery and music sections stay hidden on the published site until you add something to them (they always show under `npm run dev` so you can see the layout).

## Develop

```bash
npm ci
npm run dev        # local preview
npm run typecheck
npm run lint
npm run build
```

## Deploy

Pushing to `main` publishes to GitHub Pages through `.github/workflows/static.yml`.
`vite.config.ts` sets `base: '/Tiana-template/'`; change it if the repository is renamed.
