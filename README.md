# Tiana Birthday

A personalised, animated birthday experience built with React, TypeScript, Vite, and Tailwind CSS.

The page opens with a celebration countdown, then reveals a sealed envelope. Opening the envelope starts the music and introduces the birthday letter, cake, photo gallery, wishes, and closing message.

**Live site:** https://tiana-template.vercel.app/

## Features

- Birthday countdown based on the visitor's local time zone
- Animated, interactive envelope opening
- Birthday letter and wishes
- Candle-blowing cake interaction
- Responsive photo gallery with full-screen viewing
- Optional music player
- GitHub Pages and Vercel-compatible deployment paths
- Responsive, mobile-friendly design

## Preview locally

### Requirements

- Node.js 22 or newer
- npm

### Setup

```bash
npm ci
npm run dev
```

Vite will print the local development URL in the terminal.

To skip the countdown and preview the envelope immediately, add `?skip` to the local URL.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run typecheck` | Run the TypeScript compiler checks |
| `npm run lint` | Run ESLint |

## Customising the page

| Content | Location |
| --- | --- |
| Name, birthday date, and celebration settings | `src/data/celebration.ts` |
| Gallery photos and captions | `src/assets/gallery/` and `src/data/gallery.ts` |
| Music tracks | `src/assets/music/` and `src/data/music.ts` |
| Page copy and wishes | `src/App.tsx` |
| Colours and fonts | `tailwind.config.js` and `index.html` |

### Gallery photos

- `portrait.jpg` is used as the arched hero portrait.
- Additional images named `1.jpg`, `2.jpg`, and so on appear in the gallery in filename order.
- Recommended image size is approximately 1600px wide.
- Supported formats include JPG, PNG, WebP, and AVIF.
- Tap or click a gallery image to open the full-screen viewer; use the arrow keys or swipe to navigate.
- Convert iPhone `.HEIC` files to JPG before adding them.

### Music

Place an audio file in `src/assets/music/` and add it to `src/data/music.ts`. The first music entry is used as the page soundtrack. Audio begins only after the envelope is opened.

## Deployment

### Vercel

The live project is configured to be hosted at the domain root. Vercel can deploy this repository by using:

- **Framework preset:** Vite
- **Build command:** `npm run build`
- **Output directory:** `dist`

### GitHub Pages

Pushing to `main` runs `.github/workflows/static.yml`, which builds and deploys the site to GitHub Pages.

The base path is selected automatically in `vite.config.ts`:

- GitHub Actions builds use `/Tiana-template/`
- Vercel and local builds use `/`

If the GitHub repository name changes, update the GitHub Actions base path in `vite.config.ts` and the GitHub Pages URL below.

**GitHub Pages URL:** https://aethertimi-ctrl.github.io/Tiana-birthday/
