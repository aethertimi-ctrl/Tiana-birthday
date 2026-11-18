import { useEffect, useMemo, useRef, useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Music2 } from 'lucide-react';
import { tracks } from '@/data/music';

type MusicPlayerProps = {
  /** Increment to start playback (e.g. after the envelope opens). */
  autoPlayToken?: number;
};

function formatTime(seconds: number) {
  if (!isFinite(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function MusicPlayer({ autoPlayToken = 0 }: MusicPlayerProps) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const audioRef = useRef<HTMLAudioElement>(null);

  const track = tracks[index];
  const canPlay = tracks.length > 0 && Boolean(track?.src);

  useEffect(() => {
    if (autoPlayToken > 0) setPlaying(true);
  }, [autoPlayToken]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !canPlay || !playing) return;

    audio.play().catch(() => setPlaying(false));
  }, [index, playing, canPlay]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const progressPct = useMemo(
    () => (duration > 0 ? (progress / duration) * 100 : 0),
    [progress, duration]
  );

  function toggle() {
    const audio = audioRef.current;
    if (!audio || !canPlay) return;
    setPlaying((isPlaying) => !isPlaying);
  }

  function skip(delta: number) {
    if (!canPlay) return;
    setIndex((i) => (i + delta + tracks.length) % tracks.length);
    setProgress(0);
  }

  function seek(e: React.MouseEvent<HTMLDivElement>) {
    const audio = audioRef.current;
    if (!audio || duration <= 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    audio.currentTime = ratio * duration;
    setProgress(audio.currentTime);
  }

  if (!canPlay) {
    return (
      <div className="max-w-xl mx-auto rounded-2xl border border-gold-500/25 bg-emerald-900/5 px-8 py-10 text-center">
        <Music2 className="w-6 h-6 mx-auto text-gold-500" strokeWidth={1.5} />
        <p className="mt-4 font-display text-xl text-ink-800 italic">The playlist is waiting to be filled.</p>
        <p className="mt-2 text-sm text-ink-800/60 leading-relaxed">
          Add music files to the music folder in the project and they will play here.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto">
      <div className="rounded-2xl border border-gold-500/25 bg-emerald-950 text-cream-50 shadow-xl shadow-emerald-950/20 overflow-hidden">
        <audio
          ref={audioRef}
          src={track.src}
          onTimeUpdate={(e) => setProgress(e.currentTarget.currentTime)}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          onEnded={() => {
            if (tracks.length > 1) skip(1);
            else setPlaying(false);
          }}
        />
        <div className="px-8 pt-8 pb-6 text-center">
          <p className="text-[11px] uppercase tracking-widest2 text-gold-400">{track.artist}</p>
          <p className="mt-2 font-display text-2xl italic text-cream-100">{track.title}</p>
        </div>

        <div className="px-8" onClick={seek}>
          <div className="relative h-1 rounded-full bg-cream-50/15 cursor-pointer group">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-gold-600 to-gold-300"
              style={{ width: `${progressPct}%` }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gold-300 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ left: `${progressPct}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-[11px] text-cream-50/50 tabular-nums">
            <span>{formatTime(progress)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-8 px-8 py-6">
          <button
            onClick={() => skip(-1)}
            aria-label="Previous song"
            className="text-cream-50/60 hover:text-gold-300 transition-colors"
          >
            <SkipBack className="w-5 h-5" strokeWidth={1.5} />
          </button>
          <button
            onClick={toggle}
            aria-label={playing ? 'Pause' : 'Play'}
            className="w-14 h-14 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 text-emerald-950 flex items-center justify-center shadow-lg shadow-gold-600/30 hover:scale-105 active:scale-95 transition-transform"
          >
            {playing ? (
              <Pause className="w-6 h-6 ml-0.5" fill="currentColor" strokeWidth={0} />
            ) : (
              <Play className="w-6 h-6 ml-1" fill="currentColor" strokeWidth={0} />
            )}
          </button>
          <button
            onClick={() => skip(1)}
            aria-label="Next song"
            className="text-cream-50/60 hover:text-gold-300 transition-colors"
          >
            <SkipForward className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex items-center justify-center gap-3 pb-6 text-cream-50/60">
          <Volume2 className="w-4 h-4" strokeWidth={1.5} />
          <input
            type="range"
            className="vol w-28"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            aria-label="Volume"
            onChange={(e) => {
              const v = Number(e.target.value);
              setVolume(v);
              if (audioRef.current) audioRef.current.volume = v;
            }}
          />
        </div>
      </div>
    </div>
  );
}
