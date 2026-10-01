import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CaseLevel } from '../types';
import { 
  Trophy, 
  Sparkles, 
  BookOpen, 
  ArrowRight, 
  CheckCircle2, 
  X,
  Award,
  ChevronLeft
} from 'lucide-react';

interface CaseVictoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseLevel: CaseLevel;
  totalScore: number;
  pointsEarnedInCase: number;
  onProceedNextCase: () => void;
  onOpenJournal: () => void;
  hasNextCase: boolean;
  onNavigateToDashboard?: () => void;
  onOpenGrandVictory?: () => void;
}

export const CaseVictoryModal: React.FC<CaseVictoryModalProps> = ({
  isOpen,
  onClose,
  caseLevel,
  totalScore,
  pointsEarnedInCase,
  onProceedNextCase,
  onOpenJournal,
  hasNextCase,
  onNavigateToDashboard,
  onOpenGrandVictory,
}) => {
  useEffect(() => {
    if (isOpen) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D97043', '#10b981', '#38bdf8', '#fbbf24', '#8BA898']
        });
      } catch (e) {
        // graceful fallback if canvas-confetti is not loaded
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-stone-950/75 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div 
        className="rounded-3xl border border-white/20 max-w-lg w-full p-6 sm:p-7 shadow-2xl relative overflow-hidden text-stone-100"
        style={{
          backgroundColor: 'rgba(47, 68, 59, 0.95)',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.45)',
        }}
      >
        {/* Subtle accent glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-3 mb-6">
          <div className="w-16 h-16 bg-amber-500/20 border border-amber-400/40 rounded-2xl flex items-center justify-center mx-auto text-amber-300 shadow-inner">
            <Trophy className="w-8 h-8 text-amber-400" />
          </div>

          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-amber-300 font-bold bg-stone-900/40 px-3 py-1 rounded-full border border-amber-500/30">
              {caseLevel.levelNumber === 0 ? 'ORIENTATION' : `CASE FILE #00${caseLevel.levelNumber}`} SOLVED
            </span>
            <h2 className="text-2xl font-extrabold text-white mt-2 font-sans">
              {caseLevel.title} Closed!
            </h2>
            <p className="text-xs text-stone-200/90 mt-1 max-w-sm mx-auto leading-relaxed font-sans">
              Your SQL investigative queries successfully pierced through the digital veil and cracked the case.
            </p>
          </div>
        </div>

        {/* Case Metrics Card */}
        <div className="bg-stone-900/50 border border-white/10 rounded-2xl p-4 space-y-2.5 mb-5 shadow-sm">
          <div className="flex items-center justify-between text-xs">
            <span className="text-stone-300">Case Clearance Status</span>
            <span className="text-emerald-400 font-mono font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#4CAF50]" />
              100% Solved
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-stone-300">Forensic Records Acquired</span>
            <span className="text-stone-100 font-mono font-bold">
              {caseLevel.tasks.length} Verified Directives
            </span>
          </div>
          <div className="flex items-center justify-between text-xs pt-1.5 border-t border-white/10">
            <span className="text-stone-300">Total Detective Score</span>
            <span className="text-amber-300 font-mono font-bold text-sm tabular-nums">
              {totalScore} PTS
            </span>
          </div>
        </div>

        {/* Unlocked Journal Notification */}
        <div className="bg-amber-950/30 border border-amber-500/40 rounded-2xl p-3.5 mb-6 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-4 h-4 text-amber-400 shrink-0" />
            <div className="text-left">
              <div className="text-xs font-bold text-amber-300">
                New Journal Entry Unlocked
              </div>
              <div className="text-[11px] text-stone-300">
                Field manual reference added to your dossier notebook.
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              onClose();
              onOpenJournal();
            }}
            className="px-3 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-xl text-[11px] font-mono font-semibold transition-colors"
          >
            Read
          </button>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2.5 bg-stone-900/50 hover:bg-stone-900 text-stone-300 text-xs font-semibold rounded-xl border border-white/15 transition-colors"
          >
            Review Case Terminal
          </button>

          {hasNextCase ? (
            <button
              onClick={() => {
                onClose();
                onProceedNextCase();
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs text-stone-950 transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-95"
              style={{
                backgroundColor: '#D97043',
                backgroundImage: 'linear-gradient(135deg, #E88255 0%, #D97043 50%, #C85A32 100%)',
              }}
            >
              <span>Next Crime Case</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => {
                onClose();
                if (onOpenGrandVictory) {
                  onOpenGrandVictory();
                } else {
                  onOpenJournal();
                }
              }}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-xs text-stone-950 transition-all flex items-center justify-center gap-2 shadow-lg hover:brightness-110 active:scale-95"
              style={{
                backgroundColor: '#D97043',
                backgroundImage: 'linear-gradient(135deg, #E88255 0%, #D97043 50%, #C85A32 100%)',
                boxShadow: '0 4px 16px rgba(200, 90, 50, 0.4)',
              }}
            >
              <Trophy className="w-4 h-4" />
              <span>PROCEED TO VICTORY CEREMONY</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
