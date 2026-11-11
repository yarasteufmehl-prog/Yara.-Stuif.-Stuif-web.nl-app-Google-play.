import React, { useState } from 'react';
import { 
  PlaySquare, 
  Play, 
  Search, 
  Tag, 
  Eye, 
  Clock, 
  Filter,
  Sparkles 
} from 'lucide-react';
import { VideoItem, VideoCategory } from '../types';
import { VIDEO_CATEGORIES } from '../data/stuifwebData';

interface VideosTabProps {
  videos: VideoItem[];
  onPlayVideo: (video: VideoItem) => void;
  searchQuery?: string;
}

export const VideosTab: React.FC<VideosTabProps> = ({
  videos,
  onPlayVideo,
  searchQuery = '',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [localSearch, setLocalSearch] = useState<string>(searchQuery);

  const filteredVideos = videos.filter((video) => {
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
    const matchesSearch = 
      localSearch.trim() === '' ||
      video.title.toLowerCase().includes(localSearch.toLowerCase()) ||
      video.description.toLowerCase().includes(localSearch.toLowerCase()) ||
      video.tags.some((t) => t.toLowerCase().includes(localSearch.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-24">
      {/* Top Banner with Pink & Purple Gradient */}
      <div className="rounded-3xl bg-gradient-to-r from-pink-600 via-fuchsia-600 to-purple-800 text-white p-6 shadow-xl border border-pink-400/30">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider">
            <PlaySquare className="w-3.5 h-3.5" />
            <span>Alle Video’s & Vlogs</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Video Bibliotheek van Yara Stuif
          </h2>
          <p className="text-xs sm:text-sm text-pink-100 leading-relaxed">
            Bekijk alle YouTube vlogs (#906, #905, #889), officiële videoclips van Yarasteufmehl, podcasts en Stuif Tech afleveringen per categorie.
          </p>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="relative">
        <Search className="w-5 h-5 text-purple-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          placeholder="Zoek in video’s op titel, onderwerp of tag (bijv. Zwolle, Mac, dansen)..."
          className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-sm text-slate-900 dark:text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-sm"
        />
        {localSearch && (
          <button
            onClick={() => setLocalSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs px-2 py-1 rounded-md bg-purple-100 dark:bg-purple-800 text-purple-700 dark:text-purple-200"
          >
            Wissen
          </button>
        )}
      </div>

      {/* Category Buttons with Matching Colors (Strictly matching user requirement) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-900 dark:text-purple-300 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5" />
            Kies een categorie:
          </span>
          <span className="text-xs text-slate-500 dark:text-purple-400">
            {filteredVideos.length} video{filteredVideos.length === 1 ? '' : '’s'} gevonden
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {VIDEO_CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap shadow-sm active:scale-95 border ${
                  isSelected
                    ? `${category.colorClass} ${category.borderColor} shadow-md scale-105`
                    : 'bg-white dark:bg-purple-950/40 text-purple-900 dark:text-purple-200 hover:bg-pink-50 border-purple-200 dark:border-purple-800/80'
                }`}
              >
                <span>{category.label}</span>
                {isSelected && <Sparkles className="w-3 h-3 text-white" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Video Cards Grid */}
      {filteredVideos.length === 0 ? (
        <div className="text-center py-12 rounded-3xl bg-white dark:bg-purple-950/30 border border-purple-100 dark:border-purple-800 p-8 space-y-3">
          <p className="text-base font-bold text-slate-700 dark:text-purple-200">
            Geen video’s gevonden voor deze zoekopdracht
          </p>
          <p className="text-xs text-slate-500 dark:text-purple-400">
            Probeer een andere categorie of wis de zoekbalk.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setLocalSearch('');
            }}
            className="px-4 py-2 rounded-xl bg-pink-600 text-white text-xs font-bold"
          >
            Alle video’s tonen
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredVideos.map((video) => (
            <article
              key={video.id}
              className="rounded-3xl bg-white dark:bg-purple-950/40 border border-purple-100 dark:border-purple-800/80 overflow-hidden shadow-sm hover:shadow-lg hover:border-pink-400 transition-all flex flex-col justify-between group"
            >
              {/* Thumbnail Container */}
              <div
                onClick={() => onPlayVideo(video)}
                className="relative aspect-video bg-gradient-to-tr from-purple-900 via-fuchsia-950 to-pink-900 cursor-pointer overflow-hidden flex items-center justify-center"
              >
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />

                {/* Animated Play Circle with category-specific color */}
                <div
                  className={`w-14 h-14 rounded-full ${video.color.button} flex items-center justify-center text-white shadow-xl shadow-black/40 group-hover:scale-110 transition-transform`}
                >
                  <Play className="w-6 h-6 fill-white ml-0.5" />
                </div>

                {/* Category Badge on top-left in matching category style */}
                <span className="absolute top-3 left-3 text-[11px] font-bold px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20">
                  {video.categoryLabel}
                </span>

                {/* Duration Badge on bottom-right */}
                <span className="absolute bottom-3 right-3 text-[11px] font-bold px-2 py-0.5 rounded-md bg-black/80 text-pink-200 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {video.duration}
                </span>
              </div>

              {/* Video Content Info */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <h3
                    onClick={() => onPlayVideo(video)}
                    className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-pink-600 dark:group-hover:text-pink-400 cursor-pointer transition-colors leading-snug"
                  >
                    {video.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-purple-300 line-clamp-2 leading-relaxed">
                    {video.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  {video.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-100 dark:border-purple-800"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Card Action Button in MATCHING CATEGORY COLOR as requested */}
                <div className="pt-3 border-t border-slate-100 dark:border-purple-900/60 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-slate-400 dark:text-purple-400">
                    <Eye className="w-3.5 h-3.5" />
                    <span>{video.views}</span>
                  </div>

                  <button
                    onClick={() => onPlayVideo(video)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold ${video.color.button} transition-all shadow-md active:scale-95 flex items-center gap-1.5`}
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Bekijk video</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
