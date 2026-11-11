import React from 'react';

interface VisualProps {
  type: string;
  className?: string;
  title?: string;
}

export const StuifArtworkVisual: React.FC<VisualProps> = ({ type, className = 'w-full h-full', title }) => {
  switch (type) {
    case 'portrait':
    case 'portret':
      return (
        <div className={`relative overflow-hidden bg-gradient-to-br from-pink-500 via-fuchsia-600 to-purple-800 flex items-center justify-center p-4 text-white ${className}`}>
          {/* Background decorative glow */}
          <div className="absolute -top-10 -right-10 w-44 h-44 bg-pink-400/40 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-purple-900/60 rounded-full blur-2xl pointer-events-none" />
          
          <svg viewBox="0 0 320 320" className="w-full h-full max-w-[280px] drop-shadow-xl" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="160" cy="160" r="140" fill="url(#port-grad)" opacity="0.3" />
            <defs>
              <linearGradient id="port-grad" x1="20" y1="20" x2="300" y2="300" gradientUnits="userSpaceOnUse">
                <stop stopColor="#f472b6" />
                <stop offset="0.5" stopColor="#c084fc" />
                <stop offset="1" stopColor="#7e22ce" />
              </linearGradient>
              <linearGradient id="hair-grad" x1="100" y1="40" x2="220" y2="200" gradientUnits="userSpaceOnUse">
                <stop stopColor="#ec4899" />
                <stop offset="1" stopColor="#a855f7" />
              </linearGradient>
            </defs>
            {/* Shoulder and jacket */}
            <path d="M70 280C70 230 110 210 160 210C210 210 250 230 250 280V300H70V280Z" fill="#581c87" />
            <path d="M110 215C130 235 190 235 210 215L195 280H125L110 215Z" fill="#db2777" opacity="0.8" />
            {/* Neck */}
            <rect x="145" y="170" width="30" height="45" rx="10" fill="#fed7aa" />
            {/* Face */}
            <ellipse cx="160" cy="140" rx="42" ry="50" fill="#ffedd5" />
            {/* Hair */}
            <path d="M115 130C110 90 130 65 160 65C190 65 210 90 205 130C215 145 220 180 215 210C205 215 195 180 195 170C185 175 135 175 125 170C125 180 115 215 105 210C100 180 105 145 115 130Z" fill="url(#hair-grad)" />
            {/* Bangs */}
            <path d="M125 105C140 100 170 100 195 115C185 100 170 90 150 92C135 94 125 105 125 105Z" fill="#db2777" />
            {/* Modern Glasses */}
            <rect x="126" y="130" width="28" height="18" rx="5" stroke="#f43f5e" strokeWidth="3.5" fill="#fbcfe8" fillOpacity="0.3" />
            <rect x="166" y="130" width="28" height="18" rx="5" stroke="#f43f5e" strokeWidth="3.5" fill="#fbcfe8" fillOpacity="0.3" />
            <path d="M154 138H166" stroke="#f43f5e" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M126 138H116" stroke="#f43f5e" strokeWidth="2.5" />
            <path d="M194 138H204" stroke="#f43f5e" strokeWidth="2.5" />
            {/* Eyes behind lenses */}
            <circle cx="140" cy="138" r="3" fill="#831843" />
            <circle cx="180" cy="138" r="3" fill="#831843" />
            {/* Gentle warm smile */}
            <path d="M148 165C154 172 166 172 172 165" stroke="#e11d48" strokeWidth="3" strokeLinecap="round" />
            {/* Cute cheeks */}
            <ellipse cx="134" cy="155" rx="6" ry="4" fill="#fda4af" opacity="0.6" />
            <ellipse cx="186" cy="155" rx="6" ry="4" fill="#fda4af" opacity="0.6" />
            {/* Sparkles */}
            <path d="M70 80L74 90L84 94L74 98L70 108L66 98L56 94L66 90L70 80Z" fill="#fdf2f8" opacity="0.9" />
            <path d="M250 110L253 118L261 121L253 124L250 132L247 124L239 121L247 118L250 110Z" fill="#fdf2f8" opacity="0.8" />
          </svg>
          <div className="absolute bottom-2 left-3 right-3 text-center">
            <span className="text-xs font-semibold tracking-wide uppercase px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30">
              Yara Stuif • Creator
            </span>
          </div>
        </div>
      );

    case 'award':
      return (
        <div className={`relative overflow-hidden bg-gradient-to-tr from-purple-900 via-fuchsia-900 to-pink-700 flex items-center justify-center p-4 ${className}`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(244,114,182,0.35)_0%,transparent_70%)]" />
          <svg viewBox="0 0 360 220" className="w-full h-full max-w-[320px] drop-shadow-2xl" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Stage spotlights */}
            <path d="M40 0L120 220H70L10 0H40Z" fill="white" opacity="0.1" />
            <path d="M320 0L240 220H290L350 0H320Z" fill="white" opacity="0.1" />
            {/* Confetti pieces */}
            <circle cx="80" cy="50" r="4" fill="#f43f5e" />
            <circle cx="280" cy="40" r="5" fill="#a855f7" />
            <rect x="130" y="30" width="8" height="8" rx="2" fill="#fbbf24" transform="rotate(25 130 30)" />
            <rect x="220" y="60" width="7" height="7" rx="2" fill="#ec4899" transform="rotate(-15 220 60)" />
            {/* Award pedestal */}
            <rect x="140" y="160" width="80" height="35" rx="6" fill="#4c1d95" stroke="#c084fc" strokeWidth="2" />
            <rect x="148" y="170" width="64" height="15" rx="3" fill="#1e1b4b" />
            <text x="180" y="181" fill="#fde047" fontSize="8" fontWeight="bold" textAnchor="middle" letterSpacing="0.5">BESTE YOUTUBER</text>
            {/* Golden Star Trophy */}
            <path d="M180 60L188 85L215 85L193 101L201 126L180 110L159 126L167 101L145 85L172 85L180 60Z" fill="url(#gold-grad)" stroke="#fef08a" strokeWidth="2" />
            <defs>
              <linearGradient id="gold-grad" x1="145" y1="60" x2="215" y2="126" gradientUnits="userSpaceOnUse">
                <stop stopColor="#fef08a" />
                <stop offset="0.5" stopColor="#f59e0b" />
                <stop offset="1" stopColor="#d97706" />
              </linearGradient>
            </defs>
            {/* Ribbon / banner */}
            <path d="M120 135C150 145 210 145 240 135L235 150C205 160 155 160 125 150L120 135Z" fill="#db2777" />
            <text x="180" y="146" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">SPECIAL MEDIA AWARDS</text>
          </svg>
        </div>
      );

    case 'zwolle':
      return (
        <div className={`relative overflow-hidden bg-gradient-to-b from-indigo-950 via-purple-900 to-pink-900 flex items-center justify-center p-3 ${className}`}>
          {/* Peperbus tower & Zwolle skyline in pink-purple neon */}
          <svg viewBox="0 0 300 300" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="150" cy="110" r="70" fill="url(#sun-grad)" opacity="0.8" />
            <defs>
              <linearGradient id="sun-grad" x1="150" y1="40" x2="150" y2="180" gradientUnits="userSpaceOnUse">
                <stop stopColor="#fb7185" />
                <stop offset="0.7" stopColor="#c026d3" />
                <stop offset="1" stopColor="#581c87" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Peperbus tower */}
            <rect x="135" y="80" width="30" height="150" fill="#3b0764" />
            <path d="M135 80L150 40L165 80H135Z" fill="#581c87" stroke="#ec4899" strokeWidth="2" />
            <circle cx="150" cy="55" r="4" fill="#fb7185" />
            <circle cx="150" cy="100" r="7" fill="#fbbf24" stroke="#4a044e" strokeWidth="2" />
            {/* City houses silhouette */}
            <path d="M20 230L50 200L80 230V260H20V230Z" fill="#2e1065" />
            <path d="M80 230L105 190L130 230V260H80V230Z" fill="#3b0764" />
            <path d="M170 230L195 195L220 230V260H170V230Z" fill="#3b0764" />
            <path d="M220 230L250 205L280 230V260H220V230Z" fill="#2e1065" />
            {/* Soundwaves over city */}
            <path d="M30 250C90 235 210 235 270 250" stroke="#f472b6" strokeWidth="3" strokeLinecap="round" />
            <path d="M40 262C100 248 200 248 260 262" stroke="#a855f7" strokeWidth="2.5" strokeLinecap="round" />
            {/* Title banner */}
            <rect x="40" y="258" width="220" height="30" rx="6" fill="#1e1b4b" stroke="#db2777" strokeWidth="1.5" />
            <text x="150" y="277" fill="#fdf2f8" fontSize="12" fontWeight="bold" textAnchor="middle" letterSpacing="0.8">ZWOLLE IS MIJN STAD</text>
          </svg>
        </div>
      );

    case 'podcast':
      return (
        <div className={`relative overflow-hidden bg-gradient-to-tr from-purple-950 via-fuchsia-900 to-pink-600 flex items-center justify-center p-3 ${className}`}>
          <svg viewBox="0 0 300 300" className="w-full h-full max-w-[260px]" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Audio sound waves concentric */}
            <circle cx="150" cy="130" r="110" stroke="#f472b6" strokeWidth="2" strokeDasharray="6 6" opacity="0.4" />
            <circle cx="150" cy="130" r="85" stroke="#c084fc" strokeWidth="2.5" strokeDasharray="5 5" opacity="0.6" />
            <circle cx="150" cy="130" r="60" stroke="#ffffff" strokeWidth="2" opacity="0.8" />
            {/* Studio microphone */}
            <rect x="132" y="80" width="36" height="65" rx="18" fill="#e2e8f0" stroke="#1e1b4b" strokeWidth="4" />
            <line x1="134" y1="100" x2="166" y2="100" stroke="#64748b" strokeWidth="2" />
            <line x1="134" y1="115" x2="166" y2="115" stroke="#64748b" strokeWidth="2" />
            {/* Mic clip & stand */}
            <path d="M120 115C120 155 180 155 180 115" stroke="#f43f5e" strokeWidth="5" strokeLinecap="round" fill="none" />
            <rect x="146" y="155" width="8" height="40" fill="#f43f5e" />
            <ellipse cx="150" cy="195" rx="35" ry="10" fill="#881337" stroke="#fb7185" strokeWidth="2" />
            {/* Podcast badge */}
            <rect x="35" y="225" width="230" height="38" rx="8" fill="#18181b" stroke="#f472b6" strokeWidth="2" />
            <text x="150" y="249" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle" letterSpacing="1">
              YARASTUIF PODCAST
            </text>
          </svg>
        </div>
      );

    case 'dance':
      return (
        <div className={`relative overflow-hidden bg-gradient-to-bl from-pink-600 via-purple-700 to-indigo-900 flex items-center justify-center p-3 ${className}`}>
          <svg viewBox="0 0 300 300" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Disco / dance circles */}
            <circle cx="150" cy="120" r="50" fill="#e11d48" opacity="0.8" />
            <circle cx="150" cy="120" r="40" fill="#a855f7" opacity="0.9" />
            <circle cx="150" cy="120" r="30" fill="#fdf2f8" />
            {/* Musical notes & swirls */}
            <path d="M70 120C70 80 120 50 170 60C220 70 240 120 220 160C200 200 130 200 90 170" stroke="#f472b6" strokeWidth="4" strokeLinecap="round" fill="none" />
            <circle cx="90" cy="170" r="8" fill="#fbbf24" />
            <circle cx="215" cy="70" r="8" fill="#38bdf8" />
            <text x="150" y="250" fill="#ffffff" fontSize="13" fontWeight="900" textAnchor="middle" letterSpacing="1">
              DANSEN ROND EN ROND
            </text>
          </svg>
        </div>
      );

    case 'tech':
      return (
        <div className={`relative overflow-hidden bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-3 ${className}`}>
          <svg viewBox="0 0 320 200" className="w-full h-full max-w-[280px]" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Laptop / Screen */}
            <rect x="70" y="40" width="180" height="110" rx="8" fill="#0f172a" stroke="#a855f7" strokeWidth="3" />
            <rect x="80" y="50" width="160" height="90" rx="4" fill="#1e1b4b" />
            {/* VoiceOver Sound Wave and Braille dots */}
            <circle cx="100" cy="75" r="4" fill="#f43f5e" />
            <circle cx="115" cy="75" r="4" fill="#ec4899" />
            <circle cx="100" cy="90" r="4" fill="#ec4899" />
            <circle cx="115" cy="90" r="4" fill="#f43f5e" />
            <circle cx="100" cy="105" r="4" fill="#ec4899" />
            {/* Waveform on screen */}
            <path d="M140 95L150 70L160 115L170 80L180 105L190 75L200 100L210 90L220 95" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            {/* Keyboard base */}
            <path d="M50 150L270 150L250 165L70 165L50 150Z" fill="#334155" stroke="#cbd5e1" strokeWidth="1.5" />
            <rect x="135" y="153" width="50" height="6" rx="2" fill="#cbd5e1" />
            <text x="160" y="185" fill="#f472b6" fontSize="10" fontWeight="bold" textAnchor="middle">STUIF TECH ACCESSIBILITY</text>
          </svg>
        </div>
      );

    case 'nachos':
      return (
        <div className={`relative overflow-hidden bg-gradient-to-br from-amber-600 via-pink-600 to-purple-800 flex items-center justify-center p-3 ${className}`}>
          <svg viewBox="0 0 300 240" className="w-full h-full max-w-[280px]" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="150" cy="150" rx="120" ry="50" fill="#450a0a" stroke="#f59e0b" strokeWidth="3" />
            <polygon points="120,130 150,90 180,135" fill="#f59e0b" stroke="#d97706" strokeWidth="2" />
            <polygon points="90,140 120,105 145,145" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
            <polygon points="160,140 190,100 215,145" fill="#fde68a" stroke="#d97706" strokeWidth="2" />
            <path d="M100 135 Q150 120 200 135 Q180 155 120 155 Z" fill="#ec4899" opacity="0.8" />
            <circle cx="150" cy="130" r="14" fill="#ffffff" />
            <text x="150" y="220" fill="#fde68a" fontSize="12" fontWeight="bold" textAnchor="middle">NACHO'S YARA STYLE</text>
          </svg>
        </div>
      );

    case 'kermis':
      return (
        <div className={`relative overflow-hidden bg-gradient-to-tr from-purple-900 via-pink-700 to-amber-500 flex items-center justify-center p-3 ${className}`}>
          <svg viewBox="0 0 300 240" className="w-full h-full max-w-[280px]" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="150" cy="100" r="60" stroke="#f472b6" strokeWidth="4" strokeDasharray="8 6" fill="none" />
            <line x1="150" y1="100" x2="150" y2="40" stroke="#fbcfe8" strokeWidth="2" />
            <line x1="150" y1="100" x2="200" y2="130" stroke="#fbcfe8" strokeWidth="2" />
            <line x1="150" y1="100" x2="100" y2="130" stroke="#fbcfe8" strokeWidth="2" />
            <polygon points="150,100 110,190 190,190" fill="#4a044e" stroke="#db2777" strokeWidth="2" />
            <circle cx="150" cy="40" r="8" fill="#f43f5e" />
            <circle cx="205" cy="135" r="8" fill="#a855f7" />
            <circle cx="95" cy="135" r="8" fill="#38bdf8" />
            <text x="150" y="215" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">KERMIS STADSHAGEN</text>
          </svg>
        </div>
      );

    default:
      return (
        <div className={`bg-gradient-to-br from-pink-500 to-purple-700 flex items-center justify-center text-white ${className}`}>
          <span className="font-bold">{title || 'Stuifweb'}</span>
        </div>
      );
  }
};
