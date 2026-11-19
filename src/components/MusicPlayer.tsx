import { useEffect, useState } from 'react';
import { Play, Pause } from 'lucide-react';
import { getAudio, toggleSong, track } from '@/lib/song';

function formatTime(seconds: number) {
  if (!isFinite(seconds) || seconds < 0) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

/** A single-song player. Its state follows the real <audio> element, so it can never drift out of sync. */
export default function MusicPlayer() {
  const audio = getAudio();
  const [playing, setPlaying] = useState(() => (audio ? !audio.paused : false));
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!audio) return;

    const sync = () => {
      setPlaying(!audio.paused);
      setProgress(audio.currentTime);
      setDuration(isFinite(audio.duration) ? audio.duration : 0);
    };
    const onError = () => setFailed(true);
    const onPlaying = () => setFailed(false);
    const events = ['play', 'pause', 'ended', 'timeupdate', 'seeked', 'loadedmetadata', 'durationchange'];

    events.forEach((name) => audio.addEventListener(name, sync));
    audio.addEventListener('error', onError);
    audio.addEventListener('playing', onPlaying);
    sync();

    return () => {
      events.forEach((name) => audio.removeEventListener(name, sync));
      audio.removeEventListener('error', onError);
      audio.removeEventListener('playing', onPlaying);
    };
  }, [audio]);

  if (!audio || !track) return null;

  const progressPct = duration > 0 ? Math.min((progress / duration) * 100, 100) : 0;

  function seekTo(seconds: number) {
    if (!audio || duration <= 0) return;
    audio.currentTime = Math.min(Math.max(seconds, 0), duration);
  }

  function seek(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    if (rect.width <= 0) return;
    const ratio = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    seekTo(ratio * duration);
  }

  return (
    <div className="mx-auto max-w-xl">
      <div className="overflow-hidden rounded-2xl border border-gold-500/25 bg-emerald-950 text-cream-50 shadow-xl shadow-emerald-950/20">
        <div className="px-6 pb-5 pt-8 text-center sm:px-8">
          <p className="text-[11px] uppercase tracking-widest2 text-gold-400">{track.artist}</p>
          <p className="mt-2 font-display text-2xl italic text-cream-100">{track.title}</p>
        </div>

        <div className="px-6 sm:px-8">
          <div
            className="group cursor-pointer py-3 focus-visible:outline focus-visible:outline-1 focus-visible:outline-gold-400"
            onClick={seek}
            role="slider"
            tabIndex={0}
            aria-label="Seek"
            aria-valuemin={0}
            aria-valuemax={Math.round(duration)}
            aria-valuenow={Math.round(progress)}
            aria-valuetext={`${formatTime(progress)} of ${formatTime(duration)}`}
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight') {
                e.preventDefault();
                seekTo(progress + 5);
              } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                seekTo(progress - 5);
              }
            }}
          >
            <div className="relative h-1 rounded-full bg-cream-50/15">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-gold-600 to-gold-300"
                style={{ width: `${progressPct}%` }}
              />
              <div
                className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-300"
                style={{ left: `${progressPct}%` }}
              />
            </div>
          </div>
          <div className="mt-1 flex justify-between text-[11px] tabular-nums text-cream-50/50">
            <span>{formatTime(progress)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 px-6 pb-8 pt-4">
          <button
            type="button"
            onClick={toggleSong}
            aria-label={playing ? 'Pause' : 'Play'}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-gold-600 text-emerald-950 shadow-lg shadow-gold-600/30 transition-transform active:scale-95 [@media(hover:hover)]:hover:scale-105"
          >
            {playing ? (
              <Pause className="ml-0.5 h-6 w-6" fill="currentColor" strokeWidth={0} />
            ) : (
              <Play className="ml-1 h-6 w-6" fill="currentColor" strokeWidth={0} />
            )}
          </button>
          {failed && (
            <p className="text-xs text-cream-100/60" role="status">
              The song couldn't be loaded. Please check your connection and try again.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
