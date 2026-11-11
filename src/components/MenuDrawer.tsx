import React from 'react';
import { 
  X, 
  Mic, 
  Music, 
  Film, 
  User, 
  Image as ImageIcon, 
  Laptop, 
  ExternalLink, 
  ChevronRight,
  Heart,
  HelpCircle,
  Sparkles,
  Radio,
  Award
} from 'lucide-react';
import { SubView } from '../types';

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectOption: (option: SubView) => void;
  currentSubView: SubView;
}

export const MenuDrawer: React.FC<MenuDrawerProps> = ({
  isOpen,
  onClose,
  onSelectOption,
  currentSubView,
}) => {
  if (!isOpen) return null;

  const menuItems: {
    id: SubView;
    title: string;
    subtitle: string;
    icon: React.FC<{ className?: string }>;
    colorClass: string;
    badge?: string;
  }[] = [
    {
      id: 'podcast',
      title: 'Mijn Podcast',
      subtitle: 'Yarastuif Podcast met wekelijkse gesprekken & vlogs',
      icon: Mic,
      colorClass: 'from-pink-500 to-fuchsia-600',
      badge: 'Nieuw',
    },
    {
      id: 'music',
      title: 'Mijn Muziek',
      subtitle: 'Tracks van Yarasteufmehl op Spotify & Apple Music',
      icon: Music,
      colorClass: 'from-purple-600 to-indigo-600',
      badge: '8 Tracks',
    },
    {
      id: 'all-videos',
      title: 'Alle Video’s',
      subtitle: 'Complete collectie video’s gesorteerd op categorie',
      icon: Film,
      colorClass: 'from-rose-500 to-pink-600',
    },
    {
      id: 'about',
      title: 'Over Mij',
      subtitle: 'Het verhaal van Yara Stuif, YouTube award & missie',
      icon: User,
      colorClass: 'from-fuchsia-600 to-purple-700',
      badge: 'Special Media Award',
    },
    {
      id: 'gallery',
      title: 'Alle Afbeeldingen',
      subtitle: 'Foto’s, studio opstelling, awards en albumcovers',
      icon: ImageIcon,
      colorClass: 'from-pink-600 to-purple-600',
      badge: 'Galerij',
    },
    {
      id: 'tech',
      title: 'Stuif Tech & Toegankelijkheid',
      subtitle: 'Tips over Apple VoiceOver, hulpmiddelen & apps',
      icon: Laptop,
      colorClass: 'from-indigo-600 to-violet-700',
    },
    {
      id: 'contact',
      title: 'Vragen & Contact',
      subtitle: 'Veelgestelde vragen en contactgegevens',
      icon: HelpCircle,
      colorClass: 'from-pink-500 to-purple-600',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-sm transition-all duration-300">
      {/* Backdrop click to close */}
      <div className="flex-1" onClick={onClose} aria-label="Sluit menu" />

      {/* Drawer content */}
      <div 
        className="w-full max-h-[88vh] bg-gradient-to-b from-purple-950 via-purple-900 to-fuchsia-950 text-white rounded-t-3xl shadow-2xl border-t-2 border-pink-500/50 flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300"
        role="dialog"
        aria-label="App Menu met alle opties"
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-purple-800/80 flex items-center justify-between bg-purple-950/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center shadow-lg shadow-pink-500/30">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                Menu Opties
                <span className="text-xs px-2 py-0.5 rounded-full bg-pink-500/30 text-pink-300 border border-pink-500/40 font-medium">
                  Stuifweb
                </span>
              </h2>
              <p className="text-xs text-purple-200">
                Alles van Yara Stuif op één plek
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
            aria-label="Sluit menu venster"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Menu Items */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-2.5 pb-24">
          <p className="text-xs font-semibold uppercase tracking-wider text-purple-300 px-1">
            Belangrijkste secties
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isSelected = currentSubView === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectOption(item.id);
                    onClose();
                  }}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-200 flex items-center gap-3.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 ${
                    isSelected
                      ? 'bg-pink-600/30 border-pink-400 shadow-lg shadow-pink-500/20'
                      : 'bg-purple-900/40 hover:bg-purple-800/60 border-purple-800/80 hover:border-pink-500/50'
                  }`}
                >
                  <div
                    className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.colorClass} flex items-center justify-center text-white shadow-md flex-shrink-0 group-hover:scale-105 transition-transform`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-bold text-sm text-white group-hover:text-pink-200 transition-colors">
                        {item.title}
                      </span>
                      {item.badge && (
                        <span className="text-[10px] font-semibold px-2 py-0.2 rounded-full bg-pink-500/30 text-pink-200 border border-pink-400/30">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-purple-200/80 truncate">
                      {item.subtitle}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-purple-400 group-hover:text-pink-300 group-hover:translate-x-0.5 transition-all" />
                </button>
              );
            })}
          </div>

          {/* Stuifweb Official Website Banner & Socials */}
          <div className="mt-4 pt-4 border-t border-purple-800/80 space-y-3">
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-pink-600/20 via-purple-600/20 to-fuchsia-600/20 border border-pink-500/30 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-pink-200 flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
                  Officiële website
                </p>
                <p className="text-sm font-black text-white">www.stuifweb.nl</p>
              </div>
              <a
                href="https://www.stuifweb.nl/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-pink-600/30 transition-colors"
              >
                <span>Bezoek site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Social Quick Links */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <a
                href="https://www.youtube.com/@YarasStuif"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-purple-900/50 hover:bg-purple-800 text-center text-xs font-semibold text-purple-200 hover:text-white border border-purple-700/60 flex items-center justify-center gap-1.5 transition-colors"
              >
                <Film className="w-3.5 h-3.5 text-rose-400" />
                <span>YouTube</span>
              </a>
              <a
                href="https://open.spotify.com/artist/yarasteufmehl"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-purple-900/50 hover:bg-purple-800 text-center text-xs font-semibold text-purple-200 hover:text-white border border-purple-700/60 flex items-center justify-center gap-1.5 transition-colors"
              >
                <Music className="w-3.5 h-3.5 text-emerald-400" />
                <span>Spotify</span>
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-purple-900/50 hover:bg-purple-800 text-center text-xs font-semibold text-purple-200 hover:text-white border border-purple-700/60 flex items-center justify-center gap-1.5 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                <span>Instagram</span>
              </a>
              <a
                href="https://www.tiktok.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-purple-900/50 hover:bg-purple-800 text-center text-xs font-semibold text-purple-200 hover:text-white border border-purple-700/60 flex items-center justify-center gap-1.5 transition-colors"
              >
                <Radio className="w-3.5 h-3.5 text-cyan-400" />
                <span>TikTok</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
