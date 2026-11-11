import React from 'react';
import { Mic, Play, Pause, Clock, Calendar, Radio, Share2, Sparkles, Volume2 } from 'lucide-react';
import { PodcastEpisode } from '../types';
import { StuifArtworkVisual } from './ArtworkVisuals';

interface PodcastViewProps {
  episodes: PodcastEpisode[];
  currentTrackId: string | null;
  isPlaying: boolean;
  onPlayEpisode: (episode: PodcastEpisode) => void;
  onBack: () => void;
}

export const PodcastView: React.FC<PodcastViewProps> = ({
  episodes,
  currentTrackId,
  isPlaying,
  onPlayEpisode,
  onBack,
}) => {
  return (
    <div className="space-y-6 pb-24">
      {/* Top Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-fuchsia-600 via-purple-700 to-pink-600 text-white p-6 sm:p-8 shadow-xl border border-pink-400/30">
        <div className="flex flex-col md:flex-row items-center gap-6 justify-between">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider">
              <Radio className="w-3.5 h-3.5 text-pink-200" />
              <span>Yarastuif Podcast</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
              Gezellige gesprekken, verhalen & updates
            </h2>
            <p className="text-xs sm:text-sm text-pink-100 leading-relaxed">
              In de Yarastuif Podcast praat Yara over het leven in Zwolle, ervaringen met visuele beperking, achter de schermen bij YouTube vlogs, awards en muziek maken.
            </p>
          </div>

          <div className="w-40 h-40 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/40 flex-shrink-0">
            <StuifArtworkVisual type="podcast" />
          </div>
        </div>
      </div>

      {/* Episode List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-black text-purple-950 dark:text-purple-100 flex items-center gap-2">
            <span>Alle Afleveringen</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-pink-100 dark:bg-pink-900/40 text-pink-700 dark:text-pink-300">
              {episodes.length} episodes
            </span>
          </h3>
        </div>

        <div className="space-y-3">
          {episodes.map((ep) => {
            const isThisPlaying = currentTrackId === ep.id && isPlaying;

            return (
              <div
                key={ep.id}
                className={`p-4 sm:p-5 rounded-3xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                  isThisPlaying
                    ? 'bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-fuchsia-500/10 border-pink-400 shadow-md'
                    : 'bg-white dark:bg-purple-950/40 border-purple-100 dark:border-purple-800/80 hover:border-pink-300'
                }`}
              >
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => onPlayEpisode(ep)}
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform active:scale-95 shadow-md ${
                      isThisPlaying
                        ? 'bg-pink-600 text-white ring-4 ring-pink-300'
                        : 'bg-gradient-to-tr from-fuchsia-600 to-purple-700 text-white hover:scale-105'
                    }`}
                    aria-label={isThisPlaying ? 'Pauzeer aflevering' : 'Speel aflevering'}
                  >
                    {isThisPlaying ? (
                      <Pause className="w-5 h-5 fill-white" />
                    ) : (
                      <Play className="w-5 h-5 fill-white ml-0.5" />
                    )}
                  </button>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-purple-400">
                      <span className="font-bold text-pink-600 dark:text-pink-400 uppercase tracking-wider">
                        Afl. #{ep.episodeNumber}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {ep.date}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {ep.duration}
                      </span>
                    </div>

                    <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug">
                      {ep.title}
                    </h4>

                    <p className="text-xs text-slate-600 dark:text-purple-300/80 leading-relaxed max-w-2xl">
                      {ep.description}
                    </p>

                    <div className="flex items-center gap-1.5 pt-1 flex-wrap">
                      {ep.topics.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-purple-50 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center gap-2 sm:self-center flex-shrink-0 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-0 border-purple-100 dark:border-purple-900/60">
                  <button
                    onClick={() => onPlayEpisode(ep)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                      isThisPlaying
                        ? 'bg-pink-600 text-white'
                        : 'bg-purple-900 hover:bg-purple-800 text-white'
                    }`}
                  >
                    {isThisPlaying ? 'Aan het afspelen...' : 'Beluister aflevering'}
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
