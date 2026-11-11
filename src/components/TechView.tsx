import React from 'react';
import { Laptop, Smartphone, Volume2, ShieldCheck, Check, Sparkles, ExternalLink } from 'lucide-react';
import { StuifArtworkVisual } from './ArtworkVisuals';

interface TechViewProps {
  onBack: () => void;
}

export const TechView: React.FC<TechViewProps> = ({ onBack }) => {
  return (
    <div className="space-y-6 pb-24">
      {/* Top Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 text-white p-6 sm:p-8 shadow-xl border border-pink-400/30">
        <div className="flex flex-col md:flex-row items-center gap-6 justify-between">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider">
              <Laptop className="w-3.5 h-3.5 text-pink-200" />
              <span>Stuif Tech</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
              Toegankelijke Technologie & Apple Tips
            </h2>
            <p className="text-xs sm:text-sm text-pink-100 leading-relaxed">
              Hoe maak je technologie bruikbaar voor iedereen? In Stuif Tech test Yara nieuwe apparaten, software en apps zoals VoiceOver, schermvergroting en slimme assistenten.
            </p>
          </div>

          <div className="w-40 h-40 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/40 flex-shrink-0">
            <StuifArtworkVisual type="tech" />
          </div>
        </div>
      </div>

      {/* Tech Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-purple-950/40 border border-purple-100 dark:border-purple-800/80 shadow-sm space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-300 flex items-center justify-center font-bold">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Apple VoiceOver op iPhone & iPad
              </h3>
              <p className="text-xs text-slate-500 dark:text-purple-300">
                Gebaarbediening & snelle navigatie
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-600 dark:text-purple-200 leading-relaxed">
            Met VoiceOver vertelt je iPhone precies wat er op het scherm gebeurt. Met twee vingers tikken om een video te pauzeren, of met de rotor snel wisselen tussen koppen en knoppen.
          </p>
          <ul className="text-xs space-y-1.5 text-slate-600 dark:text-purple-300">
            <li className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              <span>Activeer via driemaal zijknop indrukken</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              <span>Slimme afbeeldingsherkenning beschrijft foto’s</span>
            </li>
          </ul>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-purple-950/40 border border-purple-100 dark:border-purple-800/80 shadow-sm space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300 flex items-center justify-center font-bold">
              <Laptop className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Audio Editen & Muziek Produceren
              </h3>
              <p className="text-xs text-slate-500 dark:text-purple-300">
                Creativiteit zonder muis
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-600 dark:text-purple-200 leading-relaxed">
            Als Yarasteufmehl produceer ik muziek met Logic Pro en schermlezerondersteuning. Toetscombinaties en audiosignalen vervangen het visuele scherm.
          </p>
          <ul className="text-xs space-y-1.5 text-slate-600 dark:text-purple-300">
            <li className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              <span>Logic Pro toegankelijkheid met VoiceOver</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              <span>Directe MIDI-keyboard integratie</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
