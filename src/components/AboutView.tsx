import React from 'react';
import { Award, Heart, Sparkles, Youtube, CheckCircle2, HelpCircle, MapPin, Laptop, ShieldCheck } from 'lucide-react';
import { StuifArtworkVisual } from './ArtworkVisuals';
import { STUIF_FAQ } from '../data/stuifwebData';

interface AboutViewProps {
  onBack: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onBack }) => {
  return (
    <div className="space-y-6 pb-24">
      {/* Bio Hero Card */}
      <div className="rounded-3xl bg-gradient-to-r from-pink-600 via-fuchsia-600 to-purple-800 text-white p-6 sm:p-8 shadow-xl border border-pink-400/30">
        <div className="flex flex-col md:flex-row items-center gap-6 justify-between">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-pink-200" />
              <span>Over Yara Stuif (Stuifweb)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
              Hoi, ik ben Yara!
            </h2>
            <p className="text-xs sm:text-sm text-pink-100 leading-relaxed">
              Al sinds 2015 deel ik mijn leven online. Ik ben visueel beperkt en transgender vrouw, en met mijn video’s, muziek en blogs wil ik laten zien dat een beperking je nooit hoeft te weerhouden om te schitteren en je dromen waar te maken.
            </p>

            <div className="flex items-center gap-3 pt-2 justify-center md:justify-start text-xs text-pink-200">
              <span className="flex items-center gap-1 font-semibold">
                <MapPin className="w-4 h-4 text-pink-300" />
                Zwolle, Nederland
              </span>
              <span>·</span>
              <span className="flex items-center gap-1 font-semibold">
                <Award className="w-4 h-4 text-yellow-300" />
                Special Media Award Winnaar
              </span>
            </div>
          </div>

          <div className="w-44 h-44 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/40 flex-shrink-0">
            <StuifArtworkVisual type="portrait" />
          </div>
        </div>
      </div>

      {/* Special Media Award Highlight */}
      <div className="rounded-3xl bg-gradient-to-r from-purple-900 via-fuchsia-950 to-pink-900 text-white p-6 border border-pink-500/40 shadow-lg space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-yellow-400 to-amber-600 flex items-center justify-center text-purple-950 font-black shadow-lg">
            <Award className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-yellow-300">
              Mijlpaal
            </span>
            <h3 className="text-lg font-bold text-white">
              Beste YouTuber van Nederland bij de Special Media Awards
            </h3>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-purple-200 leading-relaxed">
          De Special Media Awards zetten mediamakers met een beperking in het zonnetje. Het winnen van deze prestigieuze award in Beeld & Geluid in Hilversum was een onvergetelijke mijlpaal in mijn carrière. Het bewijst dat authenticiteit, positiviteit en doorzettingsvermogen harten veroveren!
        </p>
      </div>

      {/* Core Values */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className="p-4 rounded-2xl bg-white dark:bg-purple-950/40 border border-purple-100 dark:border-purple-800/70 shadow-sm space-y-2">
          <div className="w-9 h-9 rounded-xl bg-pink-100 dark:bg-pink-900/50 text-pink-600 dark:text-pink-300 flex items-center justify-center">
            <Heart className="w-5 h-5 fill-current" />
          </div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
            Zelfacceptatie & Pride
          </h4>
          <p className="text-xs text-slate-600 dark:text-purple-300/80 leading-relaxed">
            Als trotse transgender vrouw deel ik mijn transitie en zoektocht om anderen te inspireren zichzelf te omarmen.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-purple-950/40 border border-purple-100 dark:border-purple-800/70 shadow-sm space-y-2">
          <div className="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 flex items-center justify-center">
            <Laptop className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
            Toegankelijke Technologie
          </h4>
          <p className="text-xs text-slate-600 dark:text-purple-300/80 leading-relaxed">
            Met VoiceOver en slimme hulpmiddelen laat ik zien hoe technologie barrières wegneemt voor slechtzienden.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-purple-950/40 border border-purple-100 dark:border-purple-800/70 shadow-sm space-y-2">
          <div className="w-9 h-9 rounded-xl bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-300 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
            Muziek & Creativiteit
          </h4>
          <p className="text-xs text-slate-600 dark:text-purple-300/80 leading-relaxed">
            Als Yarasteufmehl schrijf en produceer ik opzwepende pop- en dancemuziek, waaronder de ode aan Zwolle.
          </p>
        </div>
      </div>

      {/* Vragen & Antwoorden (FAQ) from stuifweb.nl */}
      <div className="space-y-3 pt-2">
        <h3 className="text-lg font-black text-purple-950 dark:text-purple-100 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-pink-600" />
          <span>Veelgestelde Vragen (Stuifweb Q&A)</span>
        </h3>

        <div className="space-y-2.5">
          {STUIF_FAQ.map((faq, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white dark:bg-purple-950/40 border border-purple-100 dark:border-purple-800/70 space-y-1.5"
            >
              <h4 className="text-sm font-bold text-pink-600 dark:text-pink-400">
                {faq.q}
              </h4>
              <p className="text-xs text-slate-600 dark:text-purple-200/90 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
