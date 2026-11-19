import { useEffect, useRef, useState } from 'react';
import { Sparkles, Heart } from 'lucide-react';
import Envelope from '@/components/Envelope';
import Confetti from '@/components/Confetti';
import Countdown from '@/components/Countdown';
import Cake from '@/components/Cake';
import Gallery from '@/components/Gallery';
import MusicPlayer from '@/components/MusicPlayer';
import Portrait from '@/components/Portrait';
import Reveal from '@/components/Reveal';
import { recipient } from '@/data/celebration';
import { photos, portrait } from '@/data/gallery';
import { birthdayLabel, birthdayStart, hasArrived } from '@/lib/birthday';
import { pauseSongWhenHidden, playSong, track } from '@/lib/song';

const wishes = [
  {
    title: 'Let this year be kind to you',
    body: 'You deserve a year that feels gentle and full.',
  },
  {
    title: 'May you keep choosing yourself',
    body: 'You have grown into a woman of quiet strength and unmistakable grace. Never shrink to fit a room you have outgrown.',
  },
  {
    title: 'May good things find you early',
    body: 'Never doubt that you are worthy of every beautiful thing coming your way',
  },
];

// A section with nothing in it would show setup hints to the birthday girl, so
// on the published site it simply stays out until photos / a song are added.
// While developing (`npm run dev`) both always show, so the layout can be seen.
const showGallery = photos.length > 0 || import.meta.env.DEV;
const showMusic = track !== null || import.meta.env.DEV;

/**
 * 1. countdown  - only the countdown, until the birthday begins
 * 2. envelope   - the sealed envelope, "tap to open"
 * 3. opening    - the flap opens (about 1.6s)
 * 4. open       - the hero and the rest of the page
 */
type Phase = 'countdown' | 'envelope' | 'opening' | 'open';

const OPENING_MS = 1600;

function initialPhase(): Phase {
  // Add ?skip to the address to preview the envelope before the birthday.
  const skip = new URLSearchParams(window.location.search).has('skip');
  return skip || hasArrived() ? 'envelope' : 'countdown';
}

function Backdrop() {
  return (
    <>
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #E9D9AE 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />
      <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl" />
      <div className="absolute -bottom-32 -right-16 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl" />
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Sparkles className="animate-float-slow absolute left-[12%] top-[30%] h-4 w-4 text-gold-400/50" strokeWidth={1.5} />
        <Sparkles
          className="animate-float-slow absolute right-[18%] top-[22%] h-5 w-5 text-gold-300/40"
          style={{ animationDelay: '2.5s' }}
          strokeWidth={1.5}
        />
        <Sparkles
          className="animate-float-slow absolute bottom-[18%] left-[24%] h-3 w-3 text-gold-400/40"
          style={{ animationDelay: '4s' }}
          strokeWidth={1.5}
        />
      </div>
    </>
  );
}

export default function App() {
  const [phase, setPhase] = useState<Phase>(initialPhase);
  const [confettiToken, setConfettiToken] = useState(0);
  const [target] = useState(birthdayStart);
  const openTimer = useRef<number | undefined>(undefined);
  const name = recipient.name.trim();
  const her = name || 'beautiful';

  // Stop the song when the tab is hidden, the phone is locked or the page closes.
  useEffect(() => pauseSongWhenHidden(), []);
  useEffect(() => () => window.clearTimeout(openTimer.current), []);

  function openEnvelope() {
    if (phase !== 'envelope') return;
    // Start the song right here, inside the tap, so phones allow the sound.
    playSong();
    setConfettiToken(Date.now());
    setPhase('opening');
    openTimer.current = window.setTimeout(() => {
      setPhase('open');
      window.scrollTo(0, 0);
    }, OPENING_MS);
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-cream-50 text-ink-900">
      <Confetti token={confettiToken} />

      {phase !== 'open' && (
        <section className="stage relative flex items-center justify-center overflow-hidden bg-emerald-950 px-6 py-12 text-center text-cream-50">
          <Backdrop />
          <div className="relative w-full max-w-2xl">
            {phase === 'countdown' ? (
              <div key="countdown" className="animate-fade-in">
                <h1 className="font-display text-4xl italic leading-tight sm:text-6xl">
                  {birthdayLabel} is coming
                </h1>
                <div className="mt-6 flex justify-center">
                  <span className="hairline w-40" />
                </div>
                <div className="mt-10">
                  <Countdown target={target} onElapsed={() => setPhase('envelope')} />
                </div>
              </div>
            ) : (
              <div key="envelope" className="animate-fade-in">
                <h1 className="sr-only">A letter for {her}</h1>
                <Envelope name={her} open={phase === 'opening'} onOpen={openEnvelope} />
              </div>
            )}
          </div>
        </section>
      )}

      {phase === 'open' && (
        <>
          {/* Hero */}
          <header className="relative overflow-hidden bg-emerald-950 text-cream-50">
            <Backdrop />
            <div className="relative mx-auto max-w-3xl px-6 pb-20 pt-16 text-center sm:pb-28 sm:pt-24">
              <div className="animate-fade-in flex items-center justify-center gap-3 text-gold-400">
                <span className="hairline w-14" />
                <Sparkles className="h-4 w-4" strokeWidth={1.5} />
                <span className="hairline w-14" />
              </div>

              {portrait ? <Portrait photo={portrait} name={name} /> : null}

              <p
                className="animate-fade-up mt-8 text-xs uppercase leading-relaxed tracking-[0.25em] text-gold-400 sm:tracking-widest2"
                style={{ animationDelay: '150ms' }}
              >
                A letter has arrived for a very special woman
              </p>

              <h1
                className="animate-fade-up mt-6 font-display text-5xl leading-[1.05] sm:text-7xl md:text-8xl"
                style={{ animationDelay: '300ms' }}
              >
                Happy
                <br />
                <span className="gold-text italic">Birthday</span>
                {name ? (
                  <>
                    <br />
                    <span className="text-cream-100">{name}</span>
                  </>
                ) : null}
              </h1>

              <p
                className="animate-fade-up mx-auto mt-8 max-w-md text-base leading-relaxed text-cream-100/75 sm:text-lg"
                style={{ animationDelay: '450ms' }}
              >
                To the woman whose grace fills every room she walks into. This little corner of the
                internet was made for one reason only — you.
              </p>
            </div>
          </header>

          {/* Cake */}
          <section id="celebration" className="mx-auto max-w-6xl scroll-mt-8 px-6 py-24">
            <Reveal className="mb-16 text-center">
              <p className="text-xs uppercase tracking-widest2 text-gold-600">Make a wish</p>
              <h2 className="mt-4 font-display text-4xl italic sm:text-5xl">Blow out her candles</h2>
              <div className="mt-6 flex justify-center">
                <span className="hairline w-40" />
              </div>
            </Reveal>

            <Reveal delay={120}>
              <Cake onAllOut={() => setConfettiToken(Date.now())} />
            </Reveal>
          </section>

          {/* Gallery */}
          {showGallery && (
            <section id="gallery" className="mx-auto max-w-6xl scroll-mt-8 px-6 pb-24">
              <Reveal className="mb-14 text-center">
                <p className="text-xs uppercase tracking-widest2 text-gold-600">Memories</p>
                <h2 className="mt-4 font-display text-4xl italic sm:text-5xl">Gallery</h2>
                <div className="mt-6 flex justify-center">
                  <span className="hairline w-40" />
                </div>
              </Reveal>
              <Gallery />
            </section>
          )}

          {/* Wishes */}
          <section className="relative overflow-hidden bg-emerald-950 text-cream-50">
            <div className="absolute left-1/2 top-0 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-gold-500/5 blur-3xl" />
            <div className="relative mx-auto max-w-5xl px-6 py-24">
              <Reveal className="mb-16 text-center">
                <p className="text-xs uppercase tracking-widest2 text-gold-400">Three wishes</p>
                <h2 className="mt-4 font-display text-4xl italic text-cream-100 sm:text-5xl">
                  For the woman of the hour
                </h2>
              </Reveal>

              <div className="grid gap-12 md:grid-cols-3 md:gap-8">
                {wishes.map((wish, i) => (
                  <Reveal key={wish.title} delay={i * 150}>
                    <div className="wish-card rounded-2xl p-6 text-center hover:bg-cream-50/5 md:rounded-none md:p-0 md:text-left">
                      <p className="font-display text-5xl leading-none text-gold-500/40">{i + 1}</p>
                      <h3 className="mt-4 font-display text-2xl italic text-gold-300">{wish.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-cream-100/70">{wish.body}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* Music */}
          {showMusic && (
            <section className="mx-auto max-w-6xl px-6 py-24">
              <Reveal className="mb-12 text-center">
                <p className="text-xs uppercase tracking-widest2 text-gold-600">The soundtrack</p>
                <h2 className="mt-4 font-display text-4xl italic sm:text-5xl">Her song</h2>
                <div className="mt-6 flex justify-center">
                  <span className="hairline w-40" />
                </div>
              </Reveal>
              <Reveal delay={120}>
                <MusicPlayer />
              </Reveal>
            </section>
          )}

          {/* Closing */}
          <footer className="bg-emerald-950 text-cream-50">
            <div className="mx-auto max-w-2xl px-6 py-20 text-center">
              <Reveal>
                <div className="flex items-center justify-center gap-3 text-gold-400">
                  <span className="hairline w-14" />
                  <Heart className="h-4 w-4" fill="currentColor" strokeWidth={0} />
                  <span className="hairline w-14" />
                </div>
                <p className="mt-8 font-display text-3xl italic leading-snug text-cream-100 sm:text-4xl">
                  Here's to you, and every year you make lovelier.
                </p>
              </Reveal>
            </div>
          </footer>
        </>
      )}
    </main>
  );
}
