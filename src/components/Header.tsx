import React from 'react';
import { BookOpen, RotateCcw, Award, ChevronLeft, Database, Lock, CheckCircle2 } from 'lucide-react';
import { CaseLevel } from '../types';
import { LevelCarouselSelector } from './LevelCarouselSelector';

export function isLevelUnlocked(
  levelIdx: number,
  levels: CaseLevel[],
  solvedTasks: Record<string, boolean>
): boolean {
  if (levelIdx === 0) return true; // L0 (Orientation) is unlocked by default
  const prevLevel = levels[levelIdx - 1];
  if (!prevLevel) return false;
  return prevLevel.tasks.every(t => Boolean(solvedTasks[t.id]));
}

export function isLevelCompleted(
  levelIdx: number,
  levels: CaseLevel[],
  solvedTasks: Record<string, boolean>
): boolean {
  const level = levels[levelIdx];
  if (!level) return false;
  return level.tasks.every(t => Boolean(solvedTasks[t.id]));
}

interface HeaderProps {
  levels: CaseLevel[];
  currentLevelIndex: number;
  onSelectLevel: (index: number) => void;
  solvedTasks?: Record<string, boolean>;
  onLockedLevelClick?: (levelIndex: number) => void;
  score: number;
  solvedTasksCount: number;
  totalTasksCount: number;
  onOpenJournal: () => void;
  onResetProgress: () => void;
  hasUnreadJournal: boolean;
  onNavigateToDashboard?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  levels,
  currentLevelIndex,
  onSelectLevel,
  solvedTasks = {},
  onLockedLevelClick,
  score,
  solvedTasksCount,
  totalTasksCount,
  onOpenJournal,
  onResetProgress,
  hasUnreadJournal,
  onNavigateToDashboard,
}) => {
  return (
    <header className="h-15 w-full bg-stone-950/25 backdrop-blur-md border-b border-white/15 px-4 sm:px-6 flex items-center justify-between select-none relative z-30 text-stone-100 gap-3">
      {/* Zone 1: Brand & Translucent Back to Dashboard Chip (flex-shrink-0) */}
      <div className="flex items-center gap-3 shrink-0">
        {onNavigateToDashboard && (
          <button
            onClick={onNavigateToDashboard}
            className="px-3 py-1.5 rounded-xl text-xs font-bold text-stone-100 bg-stone-900/45 hover:bg-stone-900/70 border border-white/20 transition-all flex items-center gap-1.5 shadow-sm active:scale-95 group shrink-0"
            title="Return to Case Files & Title Dashboard"
          >
            <ChevronLeft className="w-4 h-4 text-amber-300 group-hover:-translate-x-0.5 transition-transform" />
            <span className="hidden sm:inline">Dashboard</span>
          </button>
        )}

        <div 
          onClick={onNavigateToDashboard}
          className={`flex items-center gap-2.5 ${onNavigateToDashboard ? 'cursor-pointer hover:opacity-90 transition-opacity' : ''}`}
        >
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-inner shrink-0">
            <Database className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm sm:text-base tracking-wide text-white uppercase font-sans whitespace-nowrap">
                SQL SLEUTH
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-stone-900/50 text-amber-300 border border-amber-500/30 font-semibold hidden md:inline">
                CONSOLE
              </span>
            </div>
            <p className="text-[10px] text-stone-300/80 font-mono tracking-wide hidden lg:block whitespace-nowrap">
              Precinct Forensics Terminal
            </p>
          </div>
        </div>
      </div>

      {/* Zone 2: Centered 5-Level Paginated Carousel Container */}
      <div className="hidden md:flex flex-1 justify-center px-2 max-w-[480px]">
        <LevelCarouselSelector
          levels={levels}
          currentLevelIndex={currentLevelIndex}
          onSelectLevel={onSelectLevel}
          solvedTasks={solvedTasks}
          onLockedLevelClick={onLockedLevelClick}
        />
      </div>

      {/* Zone 3: Metrics & Actions (flex-shrink-0) */}
      <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
        {/* Score & Progress Badge */}
        <div className="flex items-center gap-2.5 bg-stone-900/40 border border-white/15 px-3 py-1.5 rounded-xl text-xs shadow-sm">
          <div className="flex items-center gap-1.5 text-amber-300 font-bold">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-mono tabular-nums">{score}</span>
            <span className="text-[10px] text-stone-300 font-medium uppercase tracking-wider">PTS</span>
          </div>
          <span className="text-stone-400/50" aria-hidden="true">|</span>
          <div className="text-stone-200 font-mono text-[11px] tabular-nums whitespace-nowrap">
            {solvedTasksCount}/{totalTasksCount} <span className="text-stone-300/80 hidden sm:inline">Solved</span>
          </div>
        </div>

        {/* Detective's Journal Button */}
        <button
          onClick={onOpenJournal}
          className="relative px-3 py-1.5 bg-stone-900/45 hover:bg-stone-900/70 border border-white/20 rounded-xl text-xs font-semibold text-stone-100 transition-all flex items-center gap-1.5 shadow-sm active:scale-95 shrink-0"
          title="Open Field Journal & RDBMS Reference"
        >
          <BookOpen className="w-3.5 h-3.5 text-emerald-300" />
          <span className="hidden sm:inline">Field Journal</span>
          {hasUnreadJournal && (
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          )}
        </button>

        {/* Header Reset Button */}
        <button 
          onClick={onResetProgress}
          className="p-2 rounded-xl bg-stone-900/60 hover:bg-[#D97043]/20 border border-[#D9D2C5]/20 text-stone-300 hover:text-rose-300 transition-all duration-200 cursor-pointer flex items-center justify-center shrink-0 active:scale-95"
          title="Reset Investigation Data"
          aria-label="Reset Progress"
        >
          <RotateCcw className="w-4 h-4 pointer-events-none" />
        </button>
      </div>
    </header>
  );
};
