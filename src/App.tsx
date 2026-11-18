import { useState } from 'react';
import { Sparkles, Heart } from 'lucide-react';
import Envelope from '@/components/Envelope';
import Confetti from '@/components/Confetti';
import Countdown from '@/components/Countdown';
import Cake from '@/components/Cake';
import Gallery from '@/components/Gallery';
import MusicPlayer from '@/components/MusicPlayer';
import Reveal from '@/components/Reveal';
import { recipient, birthday } from '@/data/celebration';

const wishes = [
  {
    title: 'May this year be gentle with you',
    body: 'May it hand you slow mornings, long lunches and the kind of laughter that makes your cheeks ache, beautiful girl.',
  },
  {
    title: 'May you keep choosing yourself',
    body: 'You have grown into a woman of quiet strength and unmistakable grace. Never shrink to fit a room you have outgrown.',
  },
  {
    title: 'May good things find you early',
    body: 'New cities, new favorite songs, new reasons to celebrate. This year already looks beautiful on you, darling.',
  },
];

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export default function App() {
  const [opened, setOpened] = useState(false);
  const [confettiToken, setConfettiToken] = useState(0);
  const name = recipient.name.trim();

  const her = name ? name : 'beautiful';

  function openEnvelope() {
    setOpened(true);
    setConfettiToken(Date.now());
    window.setTimeout(() => {
      document.getElementById('celebration')?.scrollIntoView({ behavior: 'smooth' });
    }, 900);
  }

  return (
    <main className="min-h-screen bg-cream-50 text-ink-900 overflow-x-hidden">
      <Confetti token={confettiToken} />

      {/* Hero with envelope */}
      <header className="relative bg-emerald-950 text-cream-50 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, #E9D9AE 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-gold-500/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-16 w-96 h-96 rounded-full bg-gold-500/10 blur-3xl" />

        <div className="relative max-w-3xl mx-auto px-6 pt-20 pb-24 sm:pt-28 sm:pb-32 text-center">
          <div className="animate-fade-in flex items-center justify-center gap-3 text-gold-400">
            <span className="hairline w-14" />
            <Sparkles className="w-4 h-4" strokeWidth={1.5} />
            <span className="hairline w-14" />
          </div>

          <p
            className="animate-fade-up mt-8 text-xs uppercase tracking-widest2 text-gold-400"
            style={{ animationDelay: '150ms' }}
          >
            A letter has arrived for a very special woman
          </p>

          <h1
            className="animate-fade-up mt-6 font-display text-5xl sm:text-7xl md:text-8xl leading-[1.05]"
            style={{ animationDelay: '300ms' }}
          >
            Happy
            <br />
            <span className="italic gold-text">Birthday</span>
            {name ? (
              <>
                <br />
                <span className="text-cream-100">{name}</span>
              </>
            ) : null}
          </h1>

          <p
            className="animate-fade-up mx-auto mt-8 max-w-md text-cream-100/75 text-base sm:text-lg leading-relaxed"
            style={{ animationDelay: '450ms' }}
          >
            To the woman whose grace fills every room she walks into. This little corner of the
            internet was made for one reason only — you.
          </p>

          <div className="mt-14">
            <Envelope name={her} open={opened} onOpen={openEnvelope} />
          </div>
        </div>

        {/* Floating ornaments */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <Sparkles className="animate-float-slow absolute left-[12%] top-[30%] w-4 h-4 text-gold-400/50" strokeWidth={1.5} />
          <Sparkles
            className="animate-float-slow absolute right-[18%] top-[22%] w-5 h-5 text-gold-300/40"
            style={{ animationDelay: '2.5s' }}
            strokeWidth={1.5}
          />
          <Sparkles
            className="animate-float-slow absolute left-[24%] bottom-[18%] w-3 h-3 text-gold-400/40"
            style={{ animationDelay: '4s' }}
            strokeWidth={1.5}
          />
        </div>
      </header>

      {/* Celebration — countdown + cake, revealed after the envelope opens */}
      <section
        id="celebration"
        className={`max-w-6xl mx-auto px-6 py-24 scroll-mt-8 transition-opacity duration-1000 ${
          opened ? 'opacity-100' : 'opacity-100'
        }`}
      >
        <Reveal className="text-center mb-16">
          <p className="text-xs uppercase tracking-widest2 text-gold-600">Until the big day</p>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl italic">
            {MONTHS[birthday.month - 1]} {birthday.day} is coming
          </h2>
          <div className="mt-6 flex justify-center">
            <span className="hairline w-40" />
          </div>
        </Reveal>

        <Reveal delay={120} className="mb-24">
          <Countdown />
        </Reveal>

        <Reveal className="text-center mb-16">
          <p className="text-xs uppercase tracking-widest2 text-gold-600">Make a wish</p>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl italic">Blow out her candles</h2>
          <div className="mt-6 flex justify-center">
            <span className="hairline w-40" />
          </div>
        </Reveal>

        <Reveal delay={120}>
          <Cake
            onAllOut={() => setConfettiToken(Date.now())}
          />
        </Reveal>
      </section>

      {/* Gallery */}
      <section id="gallery" className="max-w-6xl mx-auto px-6 pb-24 scroll-mt-8">
        <Reveal className="text-center mb-14">
          <p className="text-xs uppercase tracking-widest2 text-gold-600">The gallery</p>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl italic">Moments of her</h2>
          <div className="mt-6 flex justify-center">
            <span className="hairline w-40" />
          </div>
        </Reveal>
        <Gallery />
      </section>

      {/* Wishes */}
      <section className="bg-emerald-950 text-cream-50 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[42rem] h-[42rem] rounded-full bg-gold-500/5 blur-3xl" />
        <div className="relative max-w-5xl mx-auto px-6 py-24">
          <Reveal className="text-center mb-16">
            <p className="text-xs uppercase tracking-widest2 text-gold-400">Three wishes</p>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl italic text-cream-100">
              For the woman of the hour
            </h2>
          </Reveal>

          <div className="grid gap-12 md:grid-cols-3 md:gap-8">
            {wishes.map((wish, i) => (
              <Reveal key={wish.title} delay={i * 150}>
                <div className="wish-card text-center md:text-left rounded-2xl p-6 md:p-0 md:rounded-none hover:bg-cream-50/5">
                  <p className="font-display text-5xl text-gold-500/40 leading-none">0{i + 1}</p>
                  <h3 className="mt-4 font-display text-2xl italic text-gold-300">{wish.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-cream-100/70">{wish.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Music */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <Reveal className="text-center mb-12">
          <p className="text-xs uppercase tracking-widest2 text-gold-600">The soundtrack</p>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl italic">Her songs</h2>
          <div className="mt-6 flex justify-center">
            <span className="hairline w-40" />
          </div>
        </Reveal>
        <Reveal delay={120}>
          <MusicPlayer autoPlayToken={opened ? 1 : 0} />
        </Reveal>
      </section>

      {/* Closing */}
      <footer className="bg-emerald-950 text-cream-50">
        <div className="max-w-2xl mx-auto px-6 py-20 text-center">
          <Reveal>
            <div className="flex items-center justify-center gap-3 text-gold-400">
              <span className="hairline w-14" />
              <Heart className="w-4 h-4" fill="currentColor" strokeWidth={0} />
              <span className="hairline w-14" />
            </div>
            <p className="mt-8 font-display text-3xl sm:text-4xl italic text-cream-100 leading-snug">
              Here's to you, and every year you make lovelier.
            </p>
            <p className="mt-6 text-xs uppercase tracking-widest2 text-cream-100/50">
              With all our love
            </p>
          </Reveal>
        </div>
      </footer>
    </main>
  );
}
