import React from 'react';
import { Home, BookOpen, PlaySquare, Menu as MenuIcon } from 'lucide-react';
import { NavTab } from '../types';

interface BottomNavProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  isMenuOpen: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
  isMenuOpen,
}) => {
  const tabs: { id: NavTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'blogs', label: 'Blogs', icon: BookOpen },
    { id: 'videos', label: 'Video’s', icon: PlaySquare },
    { id: 'menu', label: 'Menu', icon: MenuIcon },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-purple-950/95 backdrop-blur-md border-t border-purple-800 shadow-[0_-8px_25px_rgba(88,28,135,0.4)]"
      role="navigation"
      aria-label="Primaire navigatie onderin beeld"
    >
      <div className="max-w-md mx-auto px-2 py-1.5 flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = tab.id === 'menu' ? isMenuOpen : (activeTab === tab.id && !isMenuOpen);

          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex-1 py-1 px-2 flex flex-col items-center justify-center gap-1 rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 ${
                isActive
                  ? 'text-pink-300 font-bold scale-105'
                  : 'text-purple-300/80 hover:text-white hover:bg-purple-900/40 font-medium'
              }`}
              aria-label={tab.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <div
                className={`p-1.5 rounded-xl transition-all ${
                  isActive
                    ? 'bg-gradient-to-tr from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/30'
                    : 'bg-transparent'
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[11px] tracking-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
