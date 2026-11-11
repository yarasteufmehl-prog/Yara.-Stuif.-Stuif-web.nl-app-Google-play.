import React from 'react';
import { Sparkles, Volume2, Type, Search, Eye, Share2 } from 'lucide-react';
import { NavTab, SubView } from '../types';

interface HeaderProps {
  activeTab: NavTab;
  activeSubView: SubView;
  onNavigateTab: (tab: NavTab) => void;
  onNavigateSub: (view: SubView) => void;
  highContrast: boolean;
  onToggleHighContrast: () => void;
  fontSize: 'normal' | 'large' | 'xl';
  onChangeFontSize: () => void;
  searchOpen: boolean;
  onToggleSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  activeSubView,
  onNavigateTab,
  onNavigateSub,
  highContrast,
  onToggleHighContrast,
  fontSize,
  onChangeFontSize,
  searchOpen,
  onToggleSearch,
}) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Yara Stuif - Stuifweb App',
          text: 'Bekijk de officiële app van Yara Stuif met video’s, blogs, podcast en muziek!',
          url: window.location.href,
        });
      } catch {
        // Ignored if user dismissed
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link gekopieerd naar klembord!');
    }
  };

  return (
    <header className="sticky top-0 z-30 w-full shadow-lg">
      {/* Top Main App Bar with Pink & Purple Gradient */}
      <div className="bg-gradient-to-r from-pink-500 via-fuchsia-600 to-purple-800 text-white px-4 py-3 sm:px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
          {/* Brand & Logo */}
          <button
            onClick={() => {
              onNavigateTab('home');
              onNavigateSub(null);
            }}
            className="flex items-center gap-2.5 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-lg p-1 transition-transform active:scale-95"
            aria-label="Ga naar home"
          >
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center shadow-inner group-hover:bg-white/30 transition-colors">
              <span className="font-black text-xl text-white tracking-tighter drop-shadow-sm">YS</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white drop-shadow-md">
                  Yara Stuif
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-semibold bg-white/25 rounded-md backdrop-blur-sm border border-white/20">
                  stuifweb.nl
                </span>
              </div>
              <p className="text-xs text-pink-100 font-medium tracking-wide flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-pink-200 inline" />
                Vlogs · Podcasts · Muziek · Blogs
              </p>
            </div>
          </button>

          {/* Accessibility & Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Search Toggle */}
            <button
              onClick={onToggleSearch}
              className={`p-2 rounded-lg text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                searchOpen ? 'bg-white/30' : 'bg-white/15 hover:bg-white/25'
              }`}
              title="Zoeken in video's, blogs en muziek"
              aria-label="Zoeken"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Font Size Adjuster for Accessibility */}
            <button
              onClick={onChangeFontSize}
              className="p-2 rounded-lg bg-white/15 hover:bg-white/25 text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white flex items-center gap-1"
              title="Tekstgrootte aanpassen (toegankelijkheid)"
              aria-label={`Tekstgrootte: ${fontSize}`}
            >
              <Type className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-[10px] font-bold uppercase tracking-wider">{fontSize}</span>
            </button>

            {/* High Contrast Toggle */}
            <button
              onClick={onToggleHighContrast}
              className={`p-2 rounded-lg text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                highContrast ? 'bg-yellow-400 text-purple-950 font-bold' : 'bg-white/15 hover:bg-white/25'
              }`}
              title="Hoog contrast modus aan/uit"
              aria-label="Hoog contrast schakelen"
            >
              <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Share */}
            <button
              onClick={handleShare}
              className="p-2 rounded-lg bg-white/15 hover:bg-white/25 text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white hidden sm:flex"
              title="Deel de Yara Stuif App"
              aria-label="Deel app"
            >
              <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* PROMINENT PINK BANNER DIRECTLY UNDER TITLE AS REQUESTED:
          "er moet een roze banner onder de titel van de app komen in de kleur roze met witte tekst. Welkom bij de app van Yara Stuif" */}
      <div className="bg-pink-600 border-b border-pink-700/80 text-white py-2.5 px-4 shadow-inner">
        <div className="max-w-5xl mx-auto flex items-center justify-center gap-2 text-center">
          <span className="inline-block w-2 h-2 rounded-full bg-white animate-pulse" />
          <h2 className="text-sm sm:text-base font-bold tracking-wide text-white drop-shadow-sm">
            Welkom bij de app van Yara Stuif
          </h2>
          <span className="inline-block w-2 h-2 rounded-full bg-white animate-pulse" />
        </div>
      </div>
    </header>
  );
};
