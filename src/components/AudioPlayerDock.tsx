import React from 'react';
import { Play, Pause, X, Music, Volume2, SkipForward } from 'lucide-react';
import { musicPlayer } from '../utils/audioSynth';

interface AudioPlayerDockProps {
  currentTrack: {
    id: string;
    title: string;
    subtitle: string;
    duration: string;
  } | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onClose: () => void;
  onNext?: () => void;
  currentTime: number;
  duration: number;
}

export const AudioPlayerDock: React.FC<AudioPlayerDockProps> = ({
  currentTrack,
  isPlaying,
  onTogglePlay,
  onClose,
  onNext,
  currentTime,
  duration,
}) => {
  if (!currentTrack) return null;

  const progressPercent = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <aside
      className="fixed bottom-16 sm:bottom-16 left-3 right-3 sm:left-auto sm:right-6 sm:w-96 z-30 bg-gradient-to-r from-purple-950/95 via-fuchsia-950/95 to-pink-950/95 border border-pink-500/40 rounded-2xl p-3 shadow-2xl backdrop-blur-md animate-in slide-in-from-bottom duration-300 text-white"
      role="region"
      aria-label="Audiospeler widget"
    >
      {/* Tiny progress line on top */}
      <div className="w-full h-1 bg-purple-900/80 rounded-full overflow-hidden mb-2">
        <div 
          className="h-full bg-gradient-to-r from-pink-500 to-purple-400 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="flex items-center justify-between gap-3">
        {/* Track Icon & Info */}
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-md">
            {isPlaying ? (
              <div className="flex items-center gap-0.5 h-4">
                <span className="w-1 h-3 bg-white rounded-full animate-bounce [animation-delay:0ms]" />
                <span className="w-1 h-4 bg-white rounded-full animate-bounce [animation-delay:150ms]" />
                <span className="w-1 h-2 bg-white rounded-full animate-bounce [animation-delay:300ms]" />
              </div>
            ) : (
              <Music className="w-5 h-5 text-white" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-white truncate leading-tight">
              {currentTrack.title}
            </p>
            <p className="text-[11px] text-pink-300 truncate">
              {currentTrack.subtitle} • {formatSeconds(currentTime)} / {currentTrack.duration}
            </p>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button
            onClick={onTogglePlay}
            className="w-9 h-9 rounded-full bg-pink-600 hover:bg-pink-500 text-white flex items-center justify-center shadow-md transition-transform active:scale-95"
            aria-label={isPlaying ? 'Pauzeer audio' : 'Start audio'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
          </button>

          {onNext && (
            <button
              onClick={onNext}
              className="p-2 rounded-full hover:bg-white/10 text-purple-300 hover:text-white transition-colors"
              title="Volgend nummer"
              aria-label="Volgend nummer"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-purple-300 hover:text-white transition-colors"
            title="Speler sluiten"
            aria-label="Sluit audiospeler"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
