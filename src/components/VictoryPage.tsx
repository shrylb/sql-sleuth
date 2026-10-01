import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  Award, 
  Database, 
  RotateCcw, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Terminal, 
  CheckCircle2, 
  AlertTriangle,
  X
} from 'lucide-react';
import { UserProfile } from '../types';

interface VictoryPageProps {
  score: number;
  totalQueriesExecuted: number;
  userProfile: UserProfile;
  onRetainProfile: () => void;
  onResetInvestigation: () => void;
}

export const VictoryPage: React.FC<VictoryPageProps> = ({
  score,
  totalQueriesExecuted,
  userProfile,
  onRetainProfile,
  onResetInvestigation,
}) => {
  const [showResetModal, setShowResetModal] = useState<boolean>(false);

  // Trigger high-performance multi-stage canvas-confetti celebration on mount
  useEffect(() => {
    const duration = 3.5 * 1000;
    const end = Date.now() + duration;

    const colors = ['#D97043', '#E88255', '#4F6D61', '#F2C94C', '#D9D2C5', '#3D5A4E'];

    // Initial center burst
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.6 },
      colors,
      disableForReducedMotion: true,
    });

    // Side cannons alternating
    const interval: any = setInterval(() => {
      if (Date.now() > end) {
        return clearInterval(interval);
      }

      confetti({
        particleCount: 35,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.65 },
        colors,
        disableForReducedMotion: true,
      });
      confetti({
        particleCount: 35,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.65 },
        colors,
        disableForReducedMotion: true,
      });
    }, 350);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="min-h-screen w-full font-sans text-stone-100 flex flex-col items-center justify-start py-8 sm:py-12 px-4 sm:px-6 relative overflow-x-hidden selection:bg-amber-500/20 selection:text-amber-200"
      style={{
        background: 'linear-gradient(175deg, #7F9F8E 0%, #8BA898 30%, #B5C4B9 65%, #D9D2C5 100%)',
      }}
    >
      {/* Background Low-Poly Mountain Silhouettes (Alto's Adventure Aesthetic) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25 select-none">
        <svg
          className="absolute -top-10 left-1/2 -translate-x-1/2 w-[1600px] h-[750px]"
          viewBox="0 0 1600 750"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon points="800,30 420,550 1180,550" fill="#4F6D61" opacity="0.45" />
          <polygon points="800,30 1180,550 800,550" fill="#3D564C" opacity="0.55" />
          <polygon points="360,140 60,650 680,650" fill="#5F8073" opacity="0.35" />
          <polygon points="1240,120 940,650 1540,650" fill="#3D564C" opacity="0.4" />
        </svg>

        <svg
          className="absolute bottom-0 left-0 w-full h-[400px]"
          viewBox="0 0 1440 400"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon points="0,200 240,260 480,180 720,240 960,160 1200,220 1440,140 1440,400 0,400" fill="#4F6D61" opacity="0.5" />
          <polygon points="0,260 320,200 640,280 960,220 1280,290 1440,250 1440,400 0,400" fill="#3D564C" opacity="0.75" />
          <polygon points="0,310 200,290 500,340 800,300 1100,330 1440,300 1440,400 0,400" fill="#2F443B" opacity="0.85" />
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl w-full flex flex-col items-center gap-7">
        {/* Top Operational Clearance Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-400/40 text-emerald-200 text-xs font-mono font-bold uppercase tracking-widest shadow-md">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>PRECINCT 42 · ALL 10 COLD CASES RESOLVED</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        </div>

        {/* Shimmering Low-Poly Master Detective Badge Vector Art */}
        <div className="relative w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center filter drop-shadow-2xl">
          <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-2xl animate-pulse" />
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full relative z-10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer Starburst Facets (Copper & Terracotta) */}
            <polygon points="100,10 120,40 100,50 80,40" fill="#E88255" />
            <polygon points="170,40 150,65 140,50 150,30" fill="#D97043" />
            <polygon points="190,100 160,115 155,95 170,80" fill="#C85A32" />
            <polygon points="170,160 145,150 150,135 170,140" fill="#B34B26" />
            <polygon points="100,190 120,160 100,150 80,160" fill="#C85A32" />
            <polygon points="30,160 55,150 50,135 30,140" fill="#D97043" />
            <polygon points="10,100 40,115 45,95 30,80" fill="#E88255" />
            <polygon points="30,40 50,65 60,50 50,30" fill="#F2C94C" />

            {/* Main Shield Low-Poly Hexagon Body */}
            <polygon points="100,28 160,60 160,140 100,172 40,140 40,60" fill="#4F6D61" />
            {/* Inner Facets for 3D Gem Depth */}
            <polygon points="100,28 160,60 100,100" fill="#5E8375" />
            <polygon points="160,60 160,140 100,100" fill="#3D564C" />
            <polygon points="160,140 100,172 100,100" fill="#2E443A" />
            <polygon points="100,172 40,140 100,100" fill="#385045" />
            <polygon points="40,140 40,60 100,100" fill="#476558" />
            <polygon points="40,60 100,28 100,100" fill="#6A9283" />

            {/* Inner Golden Seal Ring */}
            <polygon points="100,48 140,70 140,130 100,152 60,130 60,70" fill="#F2C94C" opacity="0.9" />
            <polygon points="100,48 140,70 100,100" fill="#FAD961" />
            <polygon points="140,70 140,130 100,100" fill="#E5B537" />
            <polygon points="140,130 100,152 100,100" fill="#C49320" />
            <polygon points="100,152 60,130 100,100" fill="#D4A028" />
            <polygon points="60,130 60,70 100,100" fill="#E5B537" />
            <polygon points="60,70 100,48 100,100" fill="#FFE27A" />

            {/* Centered SQL Sleuth Emblem Star */}
            <polygon points="100,68 108,88 130,90 113,104 118,126 100,114 82,126 87,104 70,90 92,88" fill="#1E2E28" />
            <polygon points="100,72 106,88 100,98 94,88" fill="#D97043" />
            <polygon points="100,98 118,104 110,118 100,110" fill="#C85A32" />
            <polygon points="100,98 100,110 90,118 82,104" fill="#E88255" />
          </svg>
        </div>

        {/* Hero Title & Subheading */}
        <div className="text-center space-y-2 max-w-2xl">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase font-sans drop-shadow-sm">
            OPERATION COMPLETE: SYNDICATE DISMANTLED!
          </h1>
          <p className="text-sm sm:text-base text-stone-200/90 leading-relaxed font-sans">
            Outstanding work, Detective <span className="font-bold text-amber-300">@{userProfile.username}</span>! You have mastered relational database management, tracked digital footprints across high-frequency feeds, and successfully solved all 10 cold cases.
          </p>
        </div>

        {/* Player Forensic Summary Card */}
        <div 
          className="w-full rounded-[20px] p-6 sm:p-7 shadow-xl grid grid-cols-1 sm:grid-cols-3 gap-5 text-stone-100"
          style={{
            backgroundColor: 'rgba(79, 109, 97, 0.88)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(217, 210, 197, 0.3)',
          }}
        >
          {/* Metric 1: Total Points */}
          <div className="flex items-center gap-4 bg-stone-900/35 border border-white/10 p-4 rounded-xl">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shrink-0 shadow-inner">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-stone-300 block uppercase font-mono tracking-wider">Cumulative Score</span>
              <div className="text-2xl font-extrabold font-mono text-white tabular-nums">
                {score} <span className="text-xs font-sans text-amber-300 font-semibold">PTS</span>
              </div>
            </div>
          </div>

          {/* Metric 2: Queries Executed */}
          <div className="flex items-center gap-4 bg-stone-900/35 border border-white/10 p-4 rounded-xl">
            <div className="w-12 h-12 rounded-xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-300 shrink-0 shadow-inner">
              <Terminal className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-stone-300 block uppercase font-mono tracking-wider">SQL Queries Run</span>
              <div className="text-2xl font-extrabold font-mono text-white tabular-nums">
                {Math.max(totalQueriesExecuted, 28)}
              </div>
            </div>
          </div>

          {/* Metric 3: Case Badges */}
          <div className="flex items-center gap-4 bg-stone-900/35 border border-white/10 p-4 rounded-xl">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 shrink-0 shadow-inner">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-stone-300 block uppercase font-mono tracking-wider">Badge Collection</span>
              <div className="text-2xl font-extrabold font-mono text-white tabular-nums">
                10 / 10 <span className="text-xs font-sans text-emerald-300 font-semibold">Cases Cleared</span>
              </div>
            </div>
          </div>
        </div>

        {/* Account & Progression Action CTAs */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          {/* Primary CTA: Retain Profile */}
          <button
            onClick={onRetainProfile}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-sm text-stone-950 flex items-center justify-center gap-2.5 shadow-lg transition-all hover:brightness-110 active:scale-95 tracking-wide group"
            style={{
              backgroundColor: '#D97043',
              backgroundImage: 'linear-gradient(135deg, #E88255 0%, #D97043 50%, #C85A32 100%)',
              boxShadow: '0 8px 24px rgba(200, 90, 50, 0.45)',
            }}
          >
            <span>RETAIN COMPLETED PROFILE</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Secondary CTA: Reset Data */}
          <button
            onClick={() => setShowResetModal(true)}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold text-sm text-stone-200 hover:text-white bg-stone-900/45 hover:bg-stone-900/75 border border-rose-400/30 hover:border-rose-400/60 transition-all flex items-center justify-center gap-2 shadow-md active:scale-95"
            style={{
              borderColor: 'rgba(184, 74, 57, 0.45)',
            }}
          >
            <RotateCcw className="w-4 h-4 text-rose-400" />
            <span>RESET INVESTIGATION DATA</span>
          </button>
        </div>

        {/* Low-Poly Game Credits Section */}
        <div 
          className="w-full rounded-[20px] p-6 sm:p-7 shadow-lg text-stone-100 flex flex-col sm:flex-row items-center justify-between gap-6"
          style={{
            backgroundColor: 'rgba(79, 109, 97, 0.82)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(217, 210, 197, 0.25)',
          }}
        >
          {/* Credit 1: Sheryl Betonio */}
          <div className="flex items-center gap-4 w-full sm:w-1/2">
            {/* SVG Low-Poly Vector Avatar: Female Detective/Developer */}
            <div className="w-14 h-14 rounded-2xl bg-stone-900/50 border border-amber-400/40 p-1 flex items-center justify-center shrink-0 shadow-inner overflow-hidden">
              <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Hair & Fedora Facets */}
                <polygon points="15,40 45,20 65,22 85,38 50,42" fill="#2D231E" />
                <polygon points="25,32 50,15 75,20 70,32" fill="#D97043" />
                <polygon points="35,16 50,8 65,12 60,18" fill="#C85A32" />
                <polygon points="28,28 50,22 72,25 70,30 30,29" fill="#1C2B24" />
                {/* Face & Glasses Facets */}
                <polygon points="35,38 65,38 60,65 50,75 40,65" fill="#E6BA95" />
                <polygon points="40,42 48,42 46,48 40,48" fill="#1E2E28" />
                <polygon points="52,42 60,42 60,48 54,48" fill="#1E2E28" />
                <line x1="48" y1="45" x2="52" y2="45" stroke="#1E2E28" strokeWidth="2" />
                {/* Trenchcoat & Collar */}
                <polygon points="30,70 50,60 50,85 20,95" fill="#3D564C" />
                <polygon points="70,70 50,60 50,85 80,95" fill="#2E443A" />
                <polygon points="45,62 55,62 50,75" fill="#D97043" />
              </svg>
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase text-amber-300 block font-semibold">Game Designer & Developer</span>
              <h2 className="text-base font-extrabold text-white">Sherylbee</h2>
              <p className="text-xs text-stone-200/80">Game design, development, curriculum & SQL mechanics</p>
            </div>
          </div>

          <div className="hidden sm:block w-px h-12 bg-white/20" />

          {/* Credit 2: Google AI Studio */}
          <div className="flex items-center gap-4 w-full sm:w-1/2">
            {/* SVG Low-Poly Vector Avatar: Friendly Geometric AI Bot */}
            <div className="w-14 h-14 rounded-2xl bg-stone-900/50 border border-emerald-400/40 p-1 flex items-center justify-center shrink-0 shadow-inner overflow-hidden">
              <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Antenna */}
                <line x1="50" y1="12" x2="50" y2="24" stroke="#F2C94C" strokeWidth="3" />
                <polygon points="50,8 55,14 45,14" fill="#F2C94C" />
                {/* Bot Head Polygonal Facets */}
                <polygon points="26,26 74,26 82,60 50,75 18,60" fill="#4F6D61" />
                <polygon points="26,26 50,26 50,55 20,48" fill="#5F8073" />
                <polygon points="50,26 74,26 80,48 50,55" fill="#3D564C" />
                <polygon points="20,48 50,55 50,75 18,60" fill="#32493E" />
                <polygon points="80,48 50,55 50,75 82,60" fill="#263830" />
                {/* Glowing Low-Poly Eyes */}
                <polygon points="32,40 44,38 42,46 32,46" fill="#F2C94C" />
                <polygon points="56,38 68,40 68,46 58,46" fill="#F2C94C" />
                {/* Neck & Body */}
                <polygon points="42,75 58,75 62,84 38,84" fill="#1C2B24" />
                <polygon points="25,84 75,84 85,96 15,96" fill="#D97043" />
              </svg>
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase text-emerald-300 block font-semibold">Development Tool</span>
              <h2 className="text-base font-extrabold text-white">Google AI Studio</h2>
              <p className="text-xs text-stone-200/80">AI-assisted development & prototyping</p>
            </div>
          </div>
        </div>
      </div>

      {/* Styled Low-Poly Reset Confirmation Modal */}
      {showResetModal && (
        <div className="fixed inset-0 bg-stone-950/75 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div 
            className="rounded-[20px] max-w-md w-full p-6 sm:p-7 shadow-2xl relative overflow-hidden text-stone-100 animate-in fade-in zoom-in-95 duration-150"
            style={{
              backgroundColor: 'rgba(45, 66, 56, 0.96)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(217, 210, 197, 0.22)',
            }}
          >
            <button
              onClick={() => setShowResetModal(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-xl bg-rose-500/20 border border-rose-400/40 flex items-center justify-center text-rose-300 mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-white mb-2 font-sans">
              Wipe Investigation Logs?
            </h3>

            <p className="text-xs sm:text-sm text-stone-200/90 leading-relaxed mb-6 font-sans">
              Are you sure you want to wipe all investigation logs? This will reset your score to <strong>0</strong>, clear all discovered clues and hints, and re-lock Levels 1 through 9.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  setShowResetModal(false);
                  onResetInvestigation();
                }}
                className="w-full py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm text-white bg-rose-700 hover:bg-rose-600 transition-colors shadow-md active:scale-95"
              >
                CONFIRM WIPE & RESTART
              </button>
              <button
                onClick={() => setShowResetModal(false)}
                className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs sm:text-sm text-stone-300 hover:text-white bg-stone-900/60 hover:bg-stone-900 border border-white/10 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
