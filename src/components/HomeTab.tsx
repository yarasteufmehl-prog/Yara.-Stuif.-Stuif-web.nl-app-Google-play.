import React from 'react';
import { 
  Play, 
  Sparkles, 
  Music, 
  Mic, 
  BookOpen, 
  Award, 
  ArrowRight, 
  Heart,
  Volume2,
  ExternalLink,
  Laptop
} from 'lucide-react';
import { VideoItem, BlogPost, MusicTrack, SubView, NavTab } from '../types';
import { StuifArtworkVisual } from './ArtworkVisuals';
import { VIDEO_CATEGORIES } from '../data/stuifwebData';

interface HomeTabProps {
  onNavigateTab: (tab: NavTab) => void;
  onNavigateSub: (sub: SubView) => void;
  onPlayVideo: (video: VideoItem) => void;
  onPlayTrack: (track: MusicTrack) => void;
  latestVideo: VideoItem;
  featuredTrack: MusicTrack;
  latestBlog: BlogPost;
  allVideos: VideoItem[];
}

export const HomeTab: React.FC<HomeTabProps> = ({
  onNavigateTab,
  onNavigateSub,
  onPlayVideo,
  onPlayTrack,
  latestVideo,
  featuredTrack,
  latestBlog,
  allVideos,
}) => {
  return (
    <div className="space-y-6 pb-24">
      {/* Hero Welcome Card in Roze & Paars Verloop */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-pink-600 via-fuchsia-600 to-purple-800 text-white p-6 sm:p-8 shadow-xl border border-pink-400/30">
        {/* Ambient background circles */}
        <div className="absolute -top-12 -right-12 w-56 h-56 bg-pink-400/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-56 h-56 bg-purple-950/40 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 justify-between">
          <div className="max-w-xl text-center md:text-left space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider text-white border border-white/30">
              <Sparkles className="w-3.5 h-3.5 text-pink-200" />
              <span>Yara Stuif • YouTuber & Artiest</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
              Creëren met passie & zonder grenzen!
            </h2>

            <p className="text-sm sm:text-base text-pink-100 leading-relaxed">
              Welkom op mijn app! Hier vind je al mijn YouTube vlogs, openhartige podcasts, mijn muziek als <span className="font-bold underline decoration-pink-300">Yarasteufmehl</span> en verhalen over het leven met een visuele beperking en als trotse transgender vrouw.
            </p>

            {/* Quick Hero Actions */}
            <div className="pt-2 flex flex-wrap gap-2.5 justify-center md:justify-start">
              <button
                onClick={() => onPlayVideo(latestVideo)}
                className="px-5 py-2.5 rounded-xl bg-white text-purple-900 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg hover:bg-pink-50 transition-all active:scale-95"
              >
                <Play className="w-4 h-4 fill-purple-900" />
                <span>Nieuwste video bekijken</span>
              </button>

              <button
                onClick={() => onPlayTrack(featuredTrack)}
                className="px-5 py-2.5 rounded-xl bg-purple-950/60 hover:bg-purple-900/80 text-white font-bold text-xs sm:text-sm flex items-center gap-2 border border-white/30 transition-all active:scale-95"
              >
                <Music className="w-4 h-4 text-pink-300" />
                <span>Luister: {featuredTrack.title}</span>
              </button>
            </div>
          </div>

          {/* Portrait Illustration Artwork */}
          <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/40 flex-shrink-0">
            <StuifArtworkVisual type="portrait" />
          </div>
        </div>
      </section>

      {/* Special Media Award Banner */}
      <section 
        onClick={() => onNavigateSub('about')}
        className="cursor-pointer rounded-2xl bg-gradient-to-r from-purple-900 via-fuchsia-900 to-pink-800 text-white p-4 sm:p-5 border border-pink-500/40 shadow-md flex items-center justify-between gap-4 hover:border-pink-400 transition-all group"
      >
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-yellow-400 to-amber-600 flex items-center justify-center text-purple-950 font-black shadow-lg flex-shrink-0 group-hover:scale-105 transition-transform">
            <Award className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-yellow-300">
                Winnaar Special Media Award
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-pink-200 transition-colors">
              Beste YouTuber van Nederland
            </h3>
            <p className="text-xs text-purple-200">
              Bekroond voor inspirerende en openhartige contentmakerschap
            </p>
          </div>
        </div>
        <ArrowRight className="w-5 h-5 text-pink-300 group-hover:translate-x-1 transition-transform flex-shrink-0" />
      </section>

      {/* Video Categories Navigation (As requested: "in categorieën met bijpassende kleuren en bijpassende knoppen in de kleuren van de website") */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-black text-purple-950 dark:text-purple-100 flex items-center gap-2">
            <span>Video Categorieën</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-pink-100 dark:bg-pink-900/50 text-pink-700 dark:text-pink-300">
              Alle genres
            </span>
          </h3>
          <button
            onClick={() => onNavigateTab('videos')}
            className="text-xs font-bold text-pink-600 hover:text-pink-700 dark:text-pink-400 flex items-center gap-1"
          >
            <span>Bekijk alle video’s</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
          {VIDEO_CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
            <button
              key={cat.id}
              onClick={() => onNavigateTab('videos')}
              className={`p-3.5 rounded-2xl ${cat.colorClass} shadow-md hover:scale-[1.02] active:scale-95 transition-all text-left flex flex-col justify-between h-24 border ${cat.borderColor}`}
            >
              <span className="text-xs font-bold leading-tight line-clamp-2">
                {cat.label}
              </span>
              <span className="text-[10px] font-medium opacity-90 flex items-center justify-between">
                <span>Ontdekken</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Videos Grid */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-black text-purple-950 dark:text-purple-100">
            Nieuwste Video’s van Stuifweb
          </h3>
          <button
            onClick={() => onNavigateTab('videos')}
            className="text-xs font-bold text-pink-600 hover:text-pink-700 dark:text-pink-400"
          >
            Alles ({allVideos.length})
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {allVideos.slice(0, 3).map((video) => (
            <article
              key={video.id}
              className="rounded-2xl bg-white dark:bg-purple-950/30 border border-purple-100 dark:border-purple-800/60 overflow-hidden shadow-sm hover:shadow-md hover:border-pink-300 transition-all flex flex-col"
            >
              {/* Video Thumbnail with Play Button in matching category color */}
              <div 
                onClick={() => onPlayVideo(video)}
                className="relative aspect-video bg-gradient-to-tr from-purple-900 to-pink-700 cursor-pointer overflow-hidden flex items-center justify-center group"
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className={`w-12 h-12 rounded-full ${video.color.button} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                  <Play className="w-5 h-5 fill-white ml-0.5" />
                </div>
                <span className="absolute bottom-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded bg-black/70 text-white">
                  {video.duration}
                </span>
                <span className="absolute top-2 left-2 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white/90 text-purple-900 shadow">
                  {video.categoryLabel}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <h4 
                    onClick={() => onPlayVideo(video)}
                    className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2 hover:text-pink-600 cursor-pointer"
                  >
                    {video.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-purple-300/80 mt-1 line-clamp-2">
                    {video.description}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-slate-400 dark:text-purple-400 border-t border-slate-100 dark:border-purple-900/60">
                  <span>{video.views} weergaven</span>
                  <button
                    onClick={() => onPlayVideo(video)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold ${video.color.button} transition-colors`}
                  >
                    Bekijk video
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Two Column Section: Yarastuif Podcast & Yarasteufmehl Music */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Podcast Card */}
        <div className="p-5 rounded-3xl bg-gradient-to-br from-fuchsia-900 via-purple-900 to-pink-900 text-white border border-pink-500/30 shadow-lg flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-pink-500/30 text-pink-200 text-xs font-bold border border-pink-400/30 flex items-center gap-1.5">
                <Mic className="w-3.5 h-3.5 text-pink-300" />
                Yarastuif Podcast
              </span>
              <span className="text-xs text-pink-200">Wekelijks</span>
            </div>
            <h4 className="text-lg font-bold text-white">
              Herfstpraat, vlogs en gezellige updates
            </h4>
            <p className="text-xs text-purple-200 leading-relaxed">
              Luister naar de nieuwste aflevering over regenachtige herfstdagen, nieuwe projecten en verhalen uit Zwolle.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigateSub('podcast')}
              className="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all active:scale-95"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Podcast Speler openen</span>
            </button>
            <span className="text-xs text-purple-300">22:40 min</span>
          </div>
        </div>

        {/* Music Card */}
        <div className="p-5 rounded-3xl bg-gradient-to-br from-purple-950 via-indigo-900 to-pink-900 text-white border border-purple-500/30 shadow-lg flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-purple-500/30 text-purple-200 text-xs font-bold border border-purple-400/30 flex items-center gap-1.5">
                <Music className="w-3.5 h-3.5 text-purple-300" />
                Yarasteufmehl Muziek
              </span>
              <span className="text-xs text-pink-200">Spotify & Apple Music</span>
            </div>
            <h4 className="text-lg font-bold text-white">
              Zwolle is mijn stad de plek waar ik wil zijn
            </h4>
            <p className="text-xs text-purple-200 leading-relaxed">
              Vrolijke Nederlandse pop & dance met een aanstekelijke melodie over Zwolle en dansen in het leven.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onPlayTrack(featuredTrack)}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all active:scale-95"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Speel nummer af</span>
            </button>
            <button
              onClick={() => onNavigateSub('music')}
              className="text-xs text-pink-300 hover:text-white underline underline-offset-2 font-medium"
            >
              Alle 8 nummers
            </button>
          </div>
        </div>
      </section>

      {/* Featured Blog Highlight */}
      <section className="rounded-3xl bg-white dark:bg-purple-950/40 border border-purple-100 dark:border-purple-800/70 p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row items-center gap-5 justify-between">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-pink-600 dark:text-pink-400 uppercase tracking-wider">
              Laatste Blogbericht
            </span>
            <span className="text-xs text-slate-400 dark:text-purple-400">· {latestBlog.date}</span>
          </div>
          <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            {latestBlog.title}
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-purple-200/90 leading-relaxed">
            {latestBlog.summary}
          </p>
        </div>

        <button
          onClick={() => onNavigateTab('blogs')}
          className="px-5 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-pink-600/30 flex-shrink-0 transition-transform active:scale-95"
        >
          <BookOpen className="w-4 h-4" />
          <span>Lees dit blog</span>
        </button>
      </section>

      {/* Quick Visuals & Artwork Gallery Preview */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-black text-purple-950 dark:text-purple-100">
            Foto’s & Artwork van Stuifweb
          </h3>
          <button
            onClick={() => onNavigateSub('gallery')}
            className="text-xs font-bold text-pink-600 dark:text-pink-400 flex items-center gap-1"
          >
            <span>Bekijk galerij</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div 
            onClick={() => onNavigateSub('gallery')}
            className="aspect-square rounded-2xl overflow-hidden shadow-md cursor-pointer hover:scale-105 transition-transform"
          >
            <StuifArtworkVisual type="portrait" />
          </div>
          <div 
            onClick={() => onNavigateSub('gallery')}
            className="aspect-square rounded-2xl overflow-hidden shadow-md cursor-pointer hover:scale-105 transition-transform"
          >
            <StuifArtworkVisual type="award" />
          </div>
          <div 
            onClick={() => onNavigateSub('gallery')}
            className="aspect-square rounded-2xl overflow-hidden shadow-md cursor-pointer hover:scale-105 transition-transform"
          >
            <StuifArtworkVisual type="zwolle" />
          </div>
          <div 
            onClick={() => onNavigateSub('gallery')}
            className="aspect-square rounded-2xl overflow-hidden shadow-md cursor-pointer hover:scale-105 transition-transform"
          >
            <StuifArtworkVisual type="podcast" />
          </div>
        </div>
      </section>
    </div>
  );
};
