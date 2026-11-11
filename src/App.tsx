import React, { useState } from 'react';
import { NavTab, SubView, VideoItem, MusicTrack, PodcastEpisode } from './types';
import { 
  STUIF_VIDEOS, 
  STUIF_BLOGS, 
  STUIF_TRACKS, 
  STUIF_PODCAST_EPISODES, 
  STUIF_GALLERY 
} from './data/stuifwebData';
import { musicPlayer } from './utils/audioSynth';

import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { MenuDrawer } from './components/MenuDrawer';
import { AudioPlayerDock } from './components/AudioPlayerDock';
import { VideoPlayerModal } from './components/VideoPlayerModal';

import { HomeTab } from './components/HomeTab';
import { BlogsTab } from './components/BlogsTab';
import { VideosTab } from './components/VideosTab';
import { PodcastView } from './components/PodcastView';
import { MusicView } from './components/MusicView';
import { AboutView } from './components/AboutView';
import { GalleryView } from './components/GalleryView';
import { TechView } from './components/TechView';
import { PWAInstallModal } from './components/PWAInstallModal';
import './firebase';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [activeSubView, setActiveSubView] = useState<SubView>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Video Modal State
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  // Audio Playback State (for Music & Podcast)
  const [currentAudio, setCurrentAudio] = useState<{
    id: string;
    title: string;
    subtitle: string;
    duration: string;
    durationSeconds: number;
    bpm: number;
  } | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(180);

  // Accessibility State
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xl'>('normal');

  // Search State
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Install Modal State
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);
  const handleSelectTab = (tab: NavTab) => {
    if (tab === 'menu') {
      setIsMenuOpen(!isMenuOpen);
    } else {
      setActiveTab(tab);
      setActiveSubView(null);
      setIsMenuOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // SubView Selection from Menu
  const handleSelectSubView = (subView: SubView) => {
    if (subView === 'all-videos') {
      setActiveTab('videos');
      setActiveSubView(null);
    } else {
      setActiveSubView(subView);
    }
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Audio Handlers
  const handlePlayTrack = (track: MusicTrack) => {
    if (currentAudio?.id === track.id && isAudioPlaying) {
      musicPlayer.pause();
      setIsAudioPlaying(false);
      return;
    }

    setCurrentAudio({
      id: track.id,
      title: track.title,
      subtitle: `${track.artist} • ${track.album}`,
      duration: track.duration,
      durationSeconds: track.durationSeconds,
      bpm: track.bpm,
    });
    setAudioDuration(track.durationSeconds);
    setIsAudioPlaying(true);

    musicPlayer.playTrack(
      track.id,
      track.bpm,
      track.durationSeconds,
      (time) => setAudioCurrentTime(time),
      () => setIsAudioPlaying(false)
    );
  };

  const handlePlayPodcast = (episode: PodcastEpisode) => {
    if (currentAudio?.id === episode.id && isAudioPlaying) {
      musicPlayer.pause();
      setIsAudioPlaying(false);
      return;
    }

    setCurrentAudio({
      id: episode.id,
      title: episode.title,
      subtitle: `Yarastuif Podcast #${episode.episodeNumber}`,
      duration: episode.duration,
      durationSeconds: episode.audioDurationSeconds,
      bpm: 100,
    });
    setAudioDuration(episode.audioDurationSeconds);
    setIsAudioPlaying(true);

    musicPlayer.playTrack(
      episode.id,
      100,
      episode.audioDurationSeconds,
      (time) => setAudioCurrentTime(time),
      () => setIsAudioPlaying(false)
    );
  };

  const handleToggleAudioPlay = () => {
    if (!currentAudio) return;
    if (isAudioPlaying) {
      musicPlayer.pause();
      setIsAudioPlaying(false);
    } else {
      musicPlayer.resume();
      setIsAudioPlaying(true);
    }
  };

  const handleNextTrack = () => {
    const currentIndex = STUIF_TRACKS.findIndex((t) => t.id === currentAudio?.id);
    const nextIndex = (currentIndex + 1) % STUIF_TRACKS.length;
    handlePlayTrack(STUIF_TRACKS[nextIndex]);
  };

  const handleCloseAudio = () => {
    musicPlayer.stop();
    setIsAudioPlaying(false);
    setCurrentAudio(null);
  };

  // Font size toggle
  const handleChangeFontSize = () => {
    if (fontSize === 'normal') setFontSize('large');
    else if (fontSize === 'large') setFontSize('xl');
    else setFontSize('normal');
  };

  // Font size multiplier class
  const fontSizeClass = 
    fontSize === 'xl' ? 'text-lg leading-relaxed' :
    fontSize === 'large' ? 'text-base leading-normal' :
    'text-sm';

  return (
    <div 
      className={`min-h-screen flex flex-col transition-colors duration-200 ${
        highContrast 
          ? 'bg-black text-yellow-300 font-medium' 
          : 'bg-gradient-to-b from-purple-50 via-pink-50/40 to-purple-100 text-slate-800 dark:from-purple-950 dark:via-fuchsia-950/70 dark:to-slate-950 dark:text-purple-100'
      } ${fontSizeClass}`}
    >
      {/* Header with App Title & Required Pink Banner */}
      <Header
        activeTab={activeTab}
        activeSubView={activeSubView}
        onNavigateTab={handleSelectTab}
        onNavigateSub={handleSelectSubView}
        highContrast={highContrast}
        onToggleHighContrast={() => setHighContrast(!highContrast)}
        fontSize={fontSize}
        onChangeFontSize={handleChangeFontSize}
        searchOpen={searchOpen}
        onToggleSearch={() => setSearchOpen(!searchOpen)}
        onOpenInstall={() => setIsInstallModalOpen(true)}
      />

      {/* Global Quick Search Dropdown Bar */}
      {searchOpen && (
        <div className="bg-purple-900 border-b border-pink-500/40 p-3 sm:px-6 shadow-lg animate-in slide-in-from-top duration-200 z-20">
          <div className="max-w-5xl mx-auto flex items-center gap-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Zoek in video’s, blogs, podcast en muziek..."
              className="flex-1 px-4 py-2 rounded-xl bg-purple-950 text-white placeholder-purple-300 border border-purple-700 focus:outline-none focus:ring-2 focus:ring-pink-400 text-xs sm:text-sm"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setActiveTab('videos');
                  setActiveSubView(null);
                }}
                className="px-3.5 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs whitespace-nowrap transition-colors"
              >
                Zoek in Video’s
              </button>
            )}
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 pt-5">
        {/* Render SubView if active (e.g. from Menu), otherwise render active Tab */}
        {activeSubView === 'podcast' && (
          <PodcastView
            episodes={STUIF_PODCAST_EPISODES}
            currentTrackId={currentAudio?.id || null}
            isPlaying={isAudioPlaying}
            onPlayEpisode={handlePlayPodcast}
            onBack={() => setActiveSubView(null)}
          />
        )}

        {activeSubView === 'music' && (
          <MusicView
            tracks={STUIF_TRACKS}
            currentTrackId={currentAudio?.id || null}
            isPlaying={isAudioPlaying}
            onPlayTrack={handlePlayTrack}
            onBack={() => setActiveSubView(null)}
          />
        )}

        {activeSubView === 'about' && (
          <AboutView onBack={() => setActiveSubView(null)} />
        )}

        {activeSubView === 'contact' && (
          <AboutView onBack={() => setActiveSubView(null)} />
        )}

        {activeSubView === 'gallery' && (
          <GalleryView
            photos={STUIF_GALLERY}
            onBack={() => setActiveSubView(null)}
          />
        )}

        {activeSubView === 'tech' && (
          <TechView onBack={() => setActiveSubView(null)} />
        )}

        {/* Normal Tabs (when no subview is open) */}
        {!activeSubView && activeTab === 'home' && (
          <HomeTab
            onNavigateTab={handleSelectTab}
            onNavigateSub={handleSelectSubView}
            onPlayVideo={(video) => setActiveVideo(video)}
            onPlayTrack={handlePlayTrack}
            latestVideo={STUIF_VIDEOS[0]}
            featuredTrack={STUIF_TRACKS[0]}
            latestBlog={STUIF_BLOGS[0]}
            allVideos={STUIF_VIDEOS}
          />
        )}

        {!activeSubView && activeTab === 'blogs' && (
          <BlogsTab blogs={STUIF_BLOGS} />
        )}

        {!activeSubView && activeTab === 'videos' && (
          <VideosTab
            videos={STUIF_VIDEOS}
            onPlayVideo={(video) => setActiveVideo(video)}
            searchQuery={searchQuery}
          />
        )}
      </main>

      {/* Menu Drawer Modal (opens when clicking the "Menu" tab) */}
      <MenuDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onSelectOption={handleSelectSubView}
        currentSubView={activeSubView}
        onOpenInstall={() => setIsInstallModalOpen(true)}
      />

      {/* PWA Install Modal / APK Alternative */}
      <PWAInstallModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
      />

      {/* Floating Audio Player Dock (when playing track or podcast) */}
      <AudioPlayerDock
        currentTrack={currentAudio}
        isPlaying={isAudioPlaying}
        onTogglePlay={handleToggleAudioPlay}
        onClose={handleCloseAudio}
        onNext={handleNextTrack}
        currentTime={audioCurrentTime}
        duration={audioDuration}
      />

      {/* Video Player Modal */}
      <VideoPlayerModal
        video={activeVideo}
        onClose={() => setActiveVideo(null)}
        onSelectRelated={(v) => setActiveVideo(v)}
        allVideos={STUIF_VIDEOS}
      />

      {/* Bottom Navigation Bar in Purple with Home, Blogs, Video’s, and Menu */}
      <BottomNav
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        isMenuOpen={isMenuOpen}
      />
    </div>
  );
}
