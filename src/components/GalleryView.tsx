import React, { useState } from 'react';
import { Image as ImageIcon, X, ZoomIn, Share2, Sparkles, Heart } from 'lucide-react';
import { GalleryPhoto } from '../types';
import { StuifArtworkVisual } from './ArtworkVisuals';

interface GalleryViewProps {
  photos: GalleryPhoto[];
  onBack: () => void;
}

export const GalleryView: React.FC<GalleryViewProps> = ({ photos, onBack }) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

  const categories = [
    { id: 'all', label: 'Alle Afbeeldingen' },
    { id: 'portret', label: 'Portretten' },
    { id: 'award', label: 'Awards & Mijlpalen' },
    { id: 'muziek', label: 'Muziek & Covers' },
    { id: 'studio', label: 'Studio & Tech' },
  ];

  const filtered = activeFilter === 'all'
    ? photos
    : photos.filter((p) => p.category === activeFilter);

  return (
    <div className="space-y-6 pb-24">
      {/* Top Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-pink-600 via-fuchsia-600 to-purple-800 text-white p-6 sm:p-8 shadow-xl border border-pink-400/30">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Stuifweb Fotogalerij</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Afbeeldingen & Visuals van Stuifweb
          </h2>
          <p className="text-xs sm:text-sm text-pink-100 leading-relaxed">
            Bekijk alle foto’s en artwork van de site: studio portretten, het winnen van de Special Media Award, single artwork voor Zwolle is mijn stad en studio apparatuur.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveFilter(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeFilter === cat.id
                ? 'bg-pink-600 text-white shadow-md shadow-pink-600/30'
                : 'bg-white dark:bg-purple-950/40 text-purple-900 dark:text-purple-200 hover:bg-pink-50 border border-purple-100 dark:border-purple-800/60'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Photos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((photo) => (
          <div
            key={photo.id}
            onClick={() => setSelectedPhoto(photo)}
            className="rounded-3xl bg-white dark:bg-purple-950/40 border border-purple-100 dark:border-purple-800/80 overflow-hidden shadow-sm hover:shadow-lg hover:border-pink-400 transition-all cursor-pointer flex flex-col group"
          >
            <div className="relative aspect-square overflow-hidden bg-slate-900">
              <StuifArtworkVisual type={photo.svgType} title={photo.title} />
              
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white">
                <div className="p-3 rounded-full bg-white/20 backdrop-blur-md">
                  <ZoomIn className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>

            <div className="p-4 space-y-1">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                {photo.title}
              </h4>
              <p className="text-xs text-slate-500 dark:text-purple-300">
                {photo.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedPhoto(null)}
        >
          <div 
            className="w-full max-w-2xl bg-purple-950 border border-pink-500/50 rounded-3xl overflow-hidden shadow-2xl text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-purple-800">
              <h3 className="text-sm sm:text-base font-bold text-white">
                {selectedPhoto.title}
              </h3>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white"
                aria-label="Sluit foto"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="w-full aspect-video sm:aspect-[4/3] bg-black overflow-hidden flex items-center justify-center">
              <StuifArtworkVisual type={selectedPhoto.svgType} title={selectedPhoto.title} />
            </div>

            <div className="p-5 space-y-3 bg-purple-900/60">
              <p className="text-sm text-purple-200 leading-relaxed">
                {selectedPhoto.caption}
              </p>
              <div className="flex items-center justify-between text-xs text-pink-300 pt-2 border-t border-purple-800">
                <span>{selectedPhoto.subtitle}</span>
                <span className="font-semibold uppercase tracking-wider">Stuifweb Collectie</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
