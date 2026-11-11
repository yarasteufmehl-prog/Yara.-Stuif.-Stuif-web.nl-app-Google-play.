import React, { useState } from 'react';
import { Download, Smartphone, X, Check, Share2, Sparkles } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const PWAInstallModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const { isInstallable, isInstalled, isIOS, isAndroid, install } = usePWAInstall();
  const [installedSuccess, setInstalledSuccess] = useState(false);

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    if (isInstallable) {
      const ok = await install();
      if (ok) {
        setInstalledSuccess(true);
        setTimeout(() => onClose(), 2500);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-gradient-to-b from-purple-950 via-slate-900 to-fuchsia-950 border border-pink-500/50 rounded-3xl p-6 text-white shadow-2xl relative space-y-4"
        role="dialog"
        aria-label="App Installeren / APK downloaden"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Sluiten"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center shadow-lg shadow-pink-500/30 flex-shrink-0">
            <Smartphone className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-1.5">
              <span>App Installeren</span>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-pink-500/30 text-pink-300 border border-pink-400/30">
                Android & iOS
              </span>
            </h3>
            <p className="text-xs text-purple-200">
              Yara Stuif (stuifweb.nl) als app op je telefoon
            </p>
          </div>
        </div>

        {installedSuccess ? (
          <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/60 text-center space-y-2">
            <Check className="w-8 h-8 text-emerald-400 mx-auto" />
            <p className="text-sm font-bold text-emerald-200">Installatie gestart!</p>
            <p className="text-xs text-emerald-300">
              De app staat nu op je startscherm tussen al je apps.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-xs text-purple-200/90 leading-relaxed">
              Je kunt deze webapp direct installeren als native app op je Android of iPhone, zonder dat je een los APK-bestand handmatig hoeft te sideloaden. De app werkt offline, opent schermvullend en start direct vanaf je startscherm!
            </p>

            {/* Direct install button if prompt available */}
            {isInstallable && (
              <button
                onClick={handleInstallClick}
                className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-pink-600/30 transition-transform active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>Installeer direct op dit apparaat</span>
              </button>
            )}

            {/* Android instructions */}
            <div className="p-3.5 rounded-2xl bg-purple-900/40 border border-purple-800 text-xs space-y-2">
              <p className="font-bold text-pink-300 flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-emerald-400" />
                <span>Op Android (Chrome / Brave / Edge):</span>
              </p>
              <ol className="list-decimal list-inside space-y-1 text-purple-200 pl-1">
                <li>Tik rechtsboven op het menu met de <strong>drie puntjes (⋮)</strong>.</li>
                <li>Kies <strong>"App installeren"</strong> of <strong>"Toevoegen aan startscherm"</strong>.</li>
                <li>Bevestig met <strong>Installeren</strong>: het app-icoon verschijnt tussen je Android-apps!</li>
              </ol>
            </div>

            {/* iOS instructions */}
            <div className="p-3.5 rounded-2xl bg-purple-900/40 border border-purple-800 text-xs space-y-2">
              <p className="font-bold text-pink-300 flex items-center gap-1.5">
                <Share2 className="w-4 h-4 text-sky-400" />
                <span>Op iPhone / iPad (Safari):</span>
              </p>
              <ol className="list-decimal list-inside space-y-1 text-purple-200 pl-1">
                <li>Tik onderin op de <strong>Deel-knop</strong> (het vierkantje met het pijltje omhoog).</li>
                <li>Scroll naar beneden en kies <strong>"Zet op beginscherm"</strong>.</li>
                <li>Tik rechtsboven op <strong>Voeg toe</strong>.</li>
              </ol>
            </div>

            <div className="p-3 rounded-xl bg-pink-500/10 border border-pink-500/30 text-[11px] text-pink-200 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-pink-300 flex-shrink-0" />
              <span>
                Net als een APK werkt dit als een volwaardige app met eigen icoon, snelle laadtijd en zonder adresbalk.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
