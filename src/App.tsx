import { useEffect, useRef, useState } from 'react';
import { Sparkles, Star } from 'lucide-react';
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
import { preloadImages } from '@/lib/preload';
import { pauseSongWhenHidden, playSong, track } from '@/lib/song';

const wishes = [
  {
    title: 'May this year be gentle with you',
    body: 'May it bring fresh opportunities, joyful surprises, meaningful connections, and plenty of reasons to celebrate.',
  },
  {
    title: 'May you keep choosing yourself',
    body: 'Keep making room for the things that inspire you. Your creativity, confidence and kindness deserve to take up space.',
  },
  {
    title: 'May good things find you early',
    body: 'New places, new favorite songs, bold ideas and exciting beginnings. May the year ahead be full of possibility.',
  },
];

const showGallery = photos.length > 0 || import.meta.env.DEV;
const showMusic = track !== null || import.meta.env.DEV;

type Phase = 'countdown' | 'envelope' | 'opening' | 'open';
const OPENING_MS = 1600;

function initialPhase(): Phase {
  const skip = new URLSearchParams(window.location.search).has('skip');
  return skip || hasArrived() ? 'envelope' : 'countdown';
}

function Backdrop() {
  return (
    <>
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #F3DFC1 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />
      <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-[radial-gradient(closest-side,rgba(205,166,103,0.16),transparent)]" />
      <div className="absolute -bottom-32 -right-16 h-96 w-96 rounded-full bg-[radial-gradient(closest-side,rgba(205,166,103,0.16),transparent)]" />
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
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

  useEffect(() => pauseSongWhenHidden(), []);
  useEffect(() => preloadImages(), []);
  useEffect(() => () => window.clearTimeout(openTimer.current), []);

  function openEnvelope() {
    if (phase !== 'envelope') return;
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
                <div className="mt-6 flex justify-center"><span className="hairline w-40" /></div>
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
          <header className="relative overflow-hidden bg-emerald-950 text-cream-50">
            <Backdrop />
            <div className="relative mx-auto max-w-3xl px-6 pb-20 pt-16 text-center sm:pb-28 sm:pt-24">
              <div className="animate-fade-in flex items-center justify-center gap-3 text-gold-400">
                <span className="hairline w-14" />
                <Sparkles className="h-4 w-4" strokeWidth={1.5} />
                <span className="hairline w-14" />
              </div>
              {portrait ? <Portrait photo={portrait} name={name} /> : null}
              <p className="animate-fade-up mt-8 text-xs uppercase leading-relaxed tracking-[0.25em] text-gold-400 sm:tracking-widest2" style={{ animationDelay: '150ms' }}>
                A letter has arrived for a very special woman
              </p>
              <h1 className="animate-fade-up mt-6 font-display text-5xl leading-[1.05] sm:text-7xl md:text-8xl" style={{ animationDelay: '300ms' }}>
                Happy<br /><span className="gold-text italic">Birthday</span>
                {name ? <><br /><span className="text-cream-100">{name}</span></> : null}
              </h1>
              <p className="animate-fade-up mx-auto mt-8 max-w-md text-base leading-relaxed text-cream-100/75 sm:text-lg" style={{ animationDelay: '450ms' }}>
                A bright, stylish celebration created especially for you. Here&apos;s to fresh beginnings, joyful surprises and a year full of possibility.
              </p>
            </div>
          </header>

          <section id="celebration" className="mx-auto max-w-6xl scroll-mt-8 px-6 py-24">
            <Reveal className="mb-16 text-center">
              <p className="text-xs uppercase tracking-widest2 text-gold-600">Make a wish</p>
              <h2 className="mt-4 font-display text-4xl italic sm:text-5xl">Blow out the candles</h2>
              <div className="mt-6 flex justify-center"><span className="hairline w-40" /></div>
            </Reveal>
            <Reveal delay={120}><Cake onAllOut={() => setConfettiToken(Date.now())} /></Reveal>
          </section>

          {showGallery && (
            <section id="gallery" className="mx-auto max-w-6xl scroll-mt-8 px-6 pb-24">
              <Reveal className="mb-14 text-center">
                <p className="text-xs uppercase tracking-widest2 text-gold-600">Memories</p>
                <h2 className="mt-4 font-display text-4xl italic sm:text-5xl">Gallery</h2>
                <div className="mt-6 flex justify-center"><span className="hairline w-40" /></div>
              </Reveal>
              <Gallery />
            </section>
          )}

          <section className="relative overflow-hidden bg-emerald-950 text-cream-50">
            <div className="absolute left-1/2 top-0 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(205,166,103,0.08),transparent)]" />
            <div className="relative mx-auto max-w-5xl px-6 py-24">
              <Reveal className="mb-16 text-center">
                <p className="text-xs uppercase tracking-widest2 text-gold-400">Three wishes</p>
                <h2 className="mt-4 font-display text-4xl italic text-cream-100 sm:text-5xl">A toast to you</h2>
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

          {showMusic && (
            <section className="mx-auto max-w-6xl px-6 py-24">
              <Reveal className="mb-12 text-center">
                <p className="text-xs uppercase tracking-widest2 text-gold-600">The soundtrack</p>
                <h2 className="mt-4 font-display text-4xl italic sm:text-5xl">A soundtrack for the day</h2>
                <div className="mt-6 flex justify-center"><span className="hairline w-40" /></div>
              </Reveal>
              <Reveal delay={120}><MusicPlayer /></Reveal>
            </section>
          )}

          <footer className="bg-emerald-950 text-cream-50">
            <div className="mx-auto max-w-2xl px-6 py-20 text-center">
              <Reveal>
                <div className="flex items-center justify-center gap-3 text-gold-400">
                  <span className="hairline w-14" /><Star className="h-4 w-4" fill="currentColor" strokeWidth={0} /><span className="hairline w-14" />
                </div>
                <p className="mt-8 font-display text-3xl italic leading-snug text-cream-100 sm:text-4xl">Here&apos;s to fresh beginnings, bright moments and everything wonderful ahead.</p>
                <p className="mt-6 text-xs uppercase tracking-widest2 text-cream-100/50">With warmest wishes</p>
              </Reveal>
            </div>
          </footer>
        </>
      )}
    </main>
  );
}
