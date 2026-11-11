import React from 'react';
import { Music, Play, Pause, ExternalLink, Heart, Radio, Disc3, Sparkles } from 'lucide-react';
import { MusicTrack } from '../types';
import { StuifArtworkVisual } from './ArtworkVisuals';

interface MusicViewProps {
  tracks: MusicTrack[];
  currentTrackId: string | null;
  isPlaying: boolean;
  onPlayTrack: (track: MusicTrack) => void;
  onBack: () => void;
}

export const MusicView: React.FC<MusicViewProps> = ({
  tracks,
  currentTrackId,
  isPlaying,
  onPlayTrack,
  onBack,
}) => {
  return (
    <div className="space-y-6 pb-24">
      {/* Top Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-purple-800 via-fuchsia-700 to-pink-600 text-white p-6 sm:p-8 shadow-xl border border-pink-400/30">
        <div className="flex flex-col md:flex-row items-center gap-6 justify-between">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider">
              <Disc3 className="w-3.5 h-3.5 text-pink-200 animate-spin" />
              <span>Yarasteufmehl Discografie</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
              Mijn Muziek & Releases
            </h2>
            <p className="text-xs sm:text-sm text-pink-100 leading-relaxed">
              Vrolijke Nederlandse pop, energieke dance en dromerige synthwave tracks gemaakt door Yara onder haar artiestennaam <span className="font-bold">Yarasteufmehl</span>. Beschikbaar op Spotify en Apple Music!
            </p>

            <div className="flex items-center gap-3 pt-2 justify-center md:justify-start">
              <a
                href="https://open.spotify.com/artist/yarasteufmehl"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-colors"
              >
                <span>Spotify Artiest Pagina</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://music.apple.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold flex items-center gap-2 border border-white/30 transition-colors"
              >
                <span>Apple Music</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="w-40 h-40 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/40 flex-shrink-0">
            <StuifArtworkVisual type="zwolle" />
          </div>
        </div>
      </div>

      {/* Tracklist */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-black text-purple-950 dark:text-purple-100 flex items-center gap-2">
            <span>Nummers van Yarasteufmehl</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-pink-100 dark:bg-pink-900/40 text-pink-700 dark:text-pink-300">
              {tracks.length} nummers
            </span>
          </h3>
        </div>

        <div className="space-y-2.5">
          {tracks.map((track, idx) => {
            const isThisPlaying = currentTrackId === track.id && isPlaying;

            return (
              <div
                key={track.id}
                className={`p-3.5 sm:p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 group ${
                  isThisPlaying
                    ? 'bg-gradient-to-r from-pink-500/15 to-purple-500/15 border-pink-400 shadow-md'
                    : 'bg-white dark:bg-purple-950/40 border-purple-100 dark:border-purple-800/80 hover:border-pink-300'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  {/* Track Number / Play button */}
                  <button
                    onClick={() => onPlayTrack(track)}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform active:scale-95 shadow-sm ${
                      isThisPlaying
                        ? 'bg-pink-600 text-white ring-2 ring-pink-400'
                        : 'bg-purple-100 dark:bg-purple-900/60 text-purple-900 dark:text-purple-200 group-hover:bg-pink-600 group-hover:text-white'
                    }`}
                    aria-label={isThisPlaying ? `Pauzeer ${track.title}` : `Speel ${track.title}`}
                  >
                    {isThisPlaying ? (
                      <Pause className="w-4 h-4 fill-white" />
                    ) : (
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    )}
                  </button>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                        {track.title}
                      </h4>
                      {idx === 0 && (
                        <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300">
                          Hit Single
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-purple-300 truncate">
                      {track.artist} • {track.genre} • {track.album}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-xs font-mono text-slate-400 dark:text-purple-400">
                    {track.duration}
                  </span>

                  <button
                    onClick={() => onPlayTrack(track)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      isThisPlaying
                        ? 'bg-pink-600 text-white shadow-sm'
                        : 'bg-purple-900/80 hover:bg-pink-600 text-white'
                    }`}
                  >
                    {isThisPlaying ? 'Speelt' : 'Afspelen'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
