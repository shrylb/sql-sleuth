import React from 'react';
import { CaseLevel } from '../types';
import { Lock, X, ArrowLeft, ShieldAlert } from 'lucide-react';

interface LevelLockedModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetLevel: CaseLevel | null;
  previousLevel: CaseLevel | null;
  onReturnToActive: () => void;
}

export const LevelLockedModal: React.FC<LevelLockedModalProps> = ({
  isOpen,
  onClose,
  targetLevel,
  previousLevel,
  onReturnToActive,
}) => {
  if (!isOpen || !targetLevel) return null;

  const targetCode = targetLevel.levelNumber === 0 ? 'ORIENTATION (L0)' : `CASE #00${targetLevel.levelNumber}`;
  const previousCode = previousLevel
    ? previousLevel.levelNumber === 0
      ? 'ORIENTATION (L0)'
      : `CASE #00${previousLevel.levelNumber}`
    : 'PREVIOUS CASE';
  const clearanceLevel = targetLevel.levelNumber;

  return (
    <div className="fixed inset-0 bg-stone-950/75 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div 
        className="rounded-[20px] max-w-md w-full p-6 sm:p-7 shadow-2xl relative overflow-hidden text-stone-100 animate-in fade-in zoom-in-95 duration-150"
        style={{
          backgroundColor: 'rgba(45, 66, 56, 0.96)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(217, 210, 197, 0.22)',
          boxShadow: '0 25px 60px -15px rgba(16, 30, 24, 0.75)',
        }}
      >
        {/* Subtle background glow */}
        <div className="absolute -top-20 -right-20 w-44 h-44 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          title="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Low-Poly Detective Silhouette & Geometric Padlock Graphic */}
        <div className="w-full flex justify-center mb-5">
          <div className="relative w-44 h-36 flex items-center justify-center">
            {/* Geometric Low-Poly Facet SVG Graphic */}
            <svg
              viewBox="0 0 180 140"
              className="w-full h-full drop-shadow-md"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Detective Low-Poly Silhouette on left */}
              {/* Fedora hat facets */}
              <polygon points="20,52 65,36 82,42 28,56" fill="#24362E" />
              <polygon points="36,44 56,22 72,28 65,42" fill="#2E443A" />
              <polygon points="56,22 72,28 80,44 65,42" fill="#3D5A4E" />
              <polygon points="40,38 52,24 64,28 62,39" fill="#D97043" opacity="0.9" />

              {/* Head & Collar facets */}
              <polygon points="48,46 64,44 70,62 50,65" fill="#1C2B24" />
              <polygon points="40,65 52,58 58,80 34,78" fill="#32493E" />
              <polygon points="58,80 50,65 74,68 82,88" fill="#263830" />
              <polygon points="34,78 58,80 62,110 22,115" fill="#203028" />
              <polygon points="58,80 82,88 94,115 62,110" fill="#18251F" />

              {/* Trenchcoat lapel accent */}
              <polygon points="48,65 60,78 52,90" fill="#C85A32" opacity="0.8" />

              {/* Connecting low-poly cyber grid lines */}
              <line x1="74" y1="68" x2="110" y2="60" stroke="#8BA898" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
              <line x1="82" y1="88" x2="115" y2="85" stroke="#D97043" strokeWidth="1.5" strokeDasharray="2 2" opacity="0.7" />

              {/* Geometric Faceted Padlock on right */}
              {/* Shackle facets */}
              <path
                d="M 120 54 C 120 35, 150 35, 150 54 L 150 68 L 140 68 L 140 54 C 140 43, 130 43, 130 54 L 130 68 L 120 68 Z"
                fill="#B5C4B9"
                opacity="0.85"
              />
              <polygon points="120,54 130,54 130,68 120,68" fill="#8BA898" />
              <polygon points="140,54 150,54 150,68 140,68" fill="#D9D2C5" />

              {/* Lock Body Facets (Terracotta & Sage) */}
              <polygon points="110,68 140,68 135,92 110,88" fill="#D97043" />
              <polygon points="140,68 162,68 162,92 135,92" fill="#C85A32" />
              <polygon points="110,88 135,92 130,118 110,112" fill="#E88255" />
              <polygon points="135,92 162,92 158,118 130,118" fill="#B34B26" />

              {/* Keyhole facets */}
              <circle cx="136" cy="88" r="4.5" fill="#1E2E28" />
              <polygon points="134,88 138,88 140,102 132,102" fill="#1E2E28" />
              <polygon points="134,92 136,88 138,92 136,98" fill="#F2C94C" opacity="0.8" />
            </svg>
          </div>
        </div>

        {/* Modal Text Content */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono text-[11px] font-bold uppercase tracking-wider">
            <Lock className="w-3.5 h-3.5" />
            <span>CASE FILE ENCRYPTED & LOCKED</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold text-white font-sans tracking-tight">
            Complete Previous Case First
          </h2>

          <p className="text-xs sm:text-sm text-stone-200/90 leading-relaxed max-w-sm mx-auto font-sans pt-1">
            Access to <strong className="text-amber-300 font-mono">{targetCode}</strong> requires{' '}
            <span className="text-white font-semibold">Clearance Level {clearanceLevel}</span>. Solve{' '}
            <strong className="text-amber-300 font-mono">{previousCode}</strong> to decrypt and examine these records.
          </p>
        </div>

        {/* Target Level Info Pill */}
        <div className="bg-stone-900/50 border border-white/10 rounded-xl p-3 mb-6 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
            <div className="text-left">
              <span className="text-stone-300 block text-[11px]">Classified Dossier</span>
              <span className="font-bold text-white truncate max-w-[200px] block">
                {targetLevel.title}
              </span>
            </div>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-800/80 text-amber-300 border border-amber-500/30 font-semibold">
            {targetLevel.difficulty}
          </span>
        </div>

        {/* Action Button: Return to Active Case */}
        <div className="flex flex-col gap-2.5">
          <button
            onClick={() => {
              onClose();
              onReturnToActive();
            }}
            className="w-full py-3 px-4 rounded-xl font-bold text-sm text-stone-950 flex items-center justify-center gap-2 shadow-lg transition-all hover:brightness-110 active:scale-95 tracking-wide"
            style={{
              backgroundColor: '#D97043',
              backgroundImage: 'linear-gradient(135deg, #E88255 0%, #D97043 50%, #C85A32 100%)',
              boxShadow: '0 6px 20px rgba(200, 90, 50, 0.45)',
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>RETURN TO ACTIVE CASE</span>
          </button>

          <button
            onClick={onClose}
            className="w-full py-2 text-xs font-semibold text-stone-400 hover:text-stone-200 transition-colors"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};
