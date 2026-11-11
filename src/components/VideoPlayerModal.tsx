import React, { useState } from 'react';
import { X, Play, Pause, Volume2, Share2, ThumbsUp, Sparkles, ExternalLink, Tag } from 'lucide-react';
import { VideoItem } from '../types';

interface VideoPlayerModalProps {
  video: VideoItem | null;
  onClose: () => void;
  onSelectRelated?: (video: VideoItem) => void;
  allVideos: VideoItem[];
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  video,
  onClose,
  onSelectRelated,
  allVideos,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(342);

  if (!video) return null;

  const related = allVideos.filter((v) => v.id !== video.id).slice(0, 3);

  const toggleLike = () => {
    if (liked) {
      setLiked(false);
      setLikeCount((prev) => prev - 1);
    } else {
      setLiked(true);
      setLikeCount((prev) => prev + 1);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: video.title,
        text: `Bekijk "${video.title}" op de Yara Stuif App!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Videolink gekopieerd naar klembord!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div 
        className="w-full max-w-3xl bg-slate-900 border border-purple-800/80 rounded-3xl overflow-hidden shadow-2xl my-auto text-white"
        role="dialog"
        aria-label={`Video speler: ${video.title}`}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between p-3.5 sm:p-4 bg-gradient-to-r from-purple-950 via-fuchsia-950 to-pink-950 border-b border-purple-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-ping" />
            <span className="text-xs font-bold text-pink-300 uppercase tracking-wider">
              {video.categoryLabel}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
            aria-label="Sluit video speler"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Display */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden group">
          {/* Animated gradient visual backdrop */}
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-950 via-slate-950 to-pink-950 opacity-90" />

          {/* Video Scene Simulation */}
          <div className="relative z-10 text-center p-6 flex flex-col items-center max-w-lg">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-pink-500/40 mb-4 group-hover:scale-110 transition-transform">
              {isPlaying ? (
                <div className="flex items-center gap-1.5 h-7">
                  <span className="w-1.5 h-7 bg-white rounded-full animate-bounce [animation-delay:0ms]" />
                  <span className="w-1.5 h-7 bg-white rounded-full animate-bounce [animation-delay:150ms]" />
                  <span className="w-1.5 h-7 bg-white rounded-full animate-bounce [animation-delay:300ms]" />
                </div>
              ) : (
                <Play className="w-9 h-9 text-white fill-white ml-1" />
              )}
            </div>

            <p className="text-base sm:text-lg font-bold text-white mb-1 line-clamp-2">
              {video.title}
            </p>
            <p className="text-xs text-pink-200">
              Yaras Stuif • {video.duration} • {video.views} weergaven
            </p>

            {/* Play/Pause Button */}
            <div className="mt-4 flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-5 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-pink-600/30 transition-all active:scale-95"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                <span>{isPlaying ? 'Pauzeren' : 'Afspelen'}</span>
              </button>

              <a
                href="https://www.youtube.com/@YarasStuif"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-purple-900/80 hover:bg-purple-800 text-purple-200 hover:text-white font-medium text-xs flex items-center gap-1.5 border border-purple-700 transition-colors"
              >
                <span>Open YouTube</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Progress Timeline simulation */}
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent flex flex-col gap-1.5 z-20">
            <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-300 ${
                  isPlaying ? 'w-2/3 animate-pulse' : 'w-1/3'
                }`} 
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-purple-300">
              <span>{isPlaying ? '04:15' : '00:00'}</span>
              <span>{video.duration}</span>
            </div>
          </div>
        </div>

        {/* Video Info & Controls */}
        <div className="p-4 sm:p-6 space-y-4 max-h-[40vh] overflow-y-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                {video.title}
              </h3>
              <p className="text-xs text-purple-300 mt-0.5">
                Gepubliceerd op {video.date} · {video.views} weergaven
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleLike}
                className={`px-3.5 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  liked
                    ? 'bg-pink-600 border-pink-500 text-white shadow-md shadow-pink-600/30'
                    : 'bg-purple-950/60 border-purple-800 text-purple-200 hover:text-white hover:border-purple-600'
                }`}
              >
                <ThumbsUp className={`w-3.5 h-3.5 ${liked ? 'fill-white' : ''}`} />
                <span>{likeCount}</span>
              </button>

              <button
                onClick={handleShare}
                className="px-3.5 py-1.5 rounded-xl border bg-purple-950/60 border-purple-800 text-purple-200 hover:text-white hover:border-purple-600 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Delen</span>
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="p-3.5 rounded-2xl bg-purple-950/40 border border-purple-900/60 text-xs text-purple-200 leading-relaxed">
            <p>{video.description}</p>
          </div>

          {/* Tags */}
          <div className="flex items-center gap-2 flex-wrap">
            <Tag className="w-3.5 h-3.5 text-pink-400" />
            {video.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] px-2.5 py-0.5 rounded-lg bg-pink-950/50 text-pink-300 border border-pink-800/60"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Related Videos */}
          {related.length > 0 && onSelectRelated && (
            <div className="pt-3 border-t border-purple-900/60">
              <p className="text-xs font-bold uppercase tracking-wider text-purple-300 mb-2.5">
                Meer video’s van Yara
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {related.map((rel) => (
                  <button
                    key={rel.id}
                    onClick={() => onSelectRelated(rel)}
                    className="text-left p-2.5 rounded-xl bg-purple-950/30 hover:bg-purple-900/50 border border-purple-800/60 hover:border-pink-500/50 transition-all flex flex-col justify-between group"
                  >
                    <p className="text-xs font-semibold text-white group-hover:text-pink-300 line-clamp-2">
                      {rel.title}
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-purple-300 mt-2">
                      <span>{rel.categoryLabel}</span>
                      <span>{rel.duration}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
