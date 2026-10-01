import React from 'react';
import { AlertTriangle, X, Trash2, ArrowLeft, RotateCcw } from 'lucide-react';

interface ResetConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmReset: () => void;
}

export const ResetConfirmModal: React.FC<ResetConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirmReset,
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-md w-full rounded-3xl p-6 sm:p-7 shadow-2xl text-stone-100 flex flex-col gap-5 border"
        style={{
          backgroundColor: 'rgba(45, 66, 56, 0.95)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderColor: 'rgba(217, 112, 67, 0.55)', // Terracotta accent border
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 30px rgba(184, 74, 57, 0.25)',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-xl bg-stone-900/60 hover:bg-stone-900 text-stone-400 hover:text-white border border-white/10 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Low-Poly Faceted Hazard / Reset Badge Graphic */}
        <div className="flex flex-col items-center text-center gap-3">
          <div className="relative w-20 h-20 flex items-center justify-center filter drop-shadow-lg">
            <div className="absolute inset-0 bg-rose-500/20 rounded-full blur-xl animate-pulse" />
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full relative z-10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Low-poly Warning Shield / Hexagon */}
              <polygon points="50,10 88,25 80,72 50,92 20,72 12,25" fill="#3A1C18" />
              <polygon points="50,10 88,25 50,55" fill="#B84A39" />
              <polygon points="50,10 12,25 50,55" fill="#D97043" />
              <polygon points="12,25 20,72 50,55" fill="#8C3527" />
              <polygon points="88,25 80,72 50,55" fill="#9E3C2C" />
              <polygon points="20,72 50,92 50,55" fill="#66251B" />
              <polygon points="80,72 50,92 50,55" fill="#752B20" />
              
              {/* Inner Low-poly Warning Exclamation */}
              <polygon points="46,30 54,30 52,60 48,60" fill="#FFF1D0" />
              <polygon points="47,66 53,66 53,72 47,72" fill="#FFF1D0" />
            </svg>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-rose-300 font-bold px-2.5 py-0.5 rounded-full bg-rose-950/60 border border-rose-500/30">
              IRREVERSIBLE FORENSIC PURGE
            </span>
            <h2 className="text-xl font-extrabold text-white tracking-wide uppercase font-sans pt-1">
              WIPE CASE PROGRESS & INVESTIGATION DATA?
            </h2>
          </div>
        </div>

        {/* Warning Body Description */}
        <p className="text-xs sm:text-sm text-stone-200/90 text-center leading-relaxed font-sans px-1">
          Are you sure you want to reset all game data? This action will permanently zero out your score, re-lock Cases 1 through 9, and reset your terminal state back to <strong className="text-amber-300 font-mono">Case File #000</strong>.
        </p>

        {/* Purge Impact Details */}
        <div className="bg-stone-900/60 rounded-2xl p-3 border border-white/10 space-y-2 text-xs font-mono text-stone-300">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
            <span>Detective Score reset to <strong className="text-rose-300">0 PTS</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
            <span>Cases 1 through 9 re-locked</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
            <span>In-memory SQLite database restored to initial seed</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
            <span>Firebase leaderboard record updated to Apprentice</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-1">
          {/* Cancel Button */}
          <button
            onClick={onClose}
            className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-stone-900/70 hover:bg-stone-800 text-stone-200 hover:text-white border border-white/15 text-xs font-bold transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-stone-400" />
            <span>CANCEL</span>
          </button>

          {/* Wipe & Restart Button */}
          <button
            onClick={onConfirmReset}
            className="w-full sm:flex-1 py-2.5 px-4 rounded-xl text-white text-xs font-extrabold transition-all shadow-lg flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
            style={{
              backgroundColor: '#B84A39',
              backgroundImage: 'linear-gradient(135deg, #D97043 0%, #B84A39 50%, #9E3C2C 100%)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              boxShadow: '0 4px 15px rgba(184, 74, 57, 0.4)',
            }}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>WIPE DATA & RESTART</span>
          </button>
        </div>
      </div>
    </div>
  );
};
