import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Lock, CheckCircle2 } from 'lucide-react';
import { CaseLevel } from '../types';
import { isLevelUnlocked, isLevelCompleted } from './Header';

interface LevelCarouselSelectorProps {
  levels: CaseLevel[];
  currentLevelIndex: number;
  onSelectLevel: (index: number) => void;
  solvedTasks?: Record<string, boolean>;
  onLockedLevelClick?: (levelIndex: number) => void;
}

const WINDOW_SIZE = 5;

export const LevelCarouselSelector: React.FC<LevelCarouselSelectorProps> = ({
  levels,
  currentLevelIndex,
  onSelectLevel,
  solvedTasks = {},
  onLockedLevelClick,
}) => {
  const totalLevels = levels.length;
  const maxStartIndex = Math.max(0, totalLevels - WINDOW_SIZE);

  // Initialize startIndex centered around currentLevelIndex
  const [startIndex, setStartIndex] = useState<number>(() => {
    const ideal = currentLevelIndex - Math.floor(WINDOW_SIZE / 2);
    return Math.max(0, Math.min(maxStartIndex, ideal));
  });

  // Step 1: Auto-centering effect around active level
  useEffect(() => {
    // If active level is out of the current 5-level window, slide window to bring it into view
    if (currentLevelIndex < startIndex) {
      setStartIndex(currentLevelIndex);
    } else if (currentLevelIndex >= startIndex + WINDOW_SIZE) {
      setStartIndex(Math.min(maxStartIndex, currentLevelIndex - WINDOW_SIZE + 1));
    }
  }, [currentLevelIndex, maxStartIndex]);

  // Pagination navigation handlers
  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setStartIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setStartIndex((prev) => Math.min(maxStartIndex, prev + 1));
  };

  // Slice exactly 5 visible levels
  const visibleLevels = levels.slice(startIndex, startIndex + WINDOW_SIZE);

  return (
    <div className="flex items-center gap-1.5 bg-stone-900/50 backdrop-blur-md border border-white/15 p-1 rounded-2xl shadow-inner max-w-[480px] w-full justify-between select-none">
      {/* Left Pagination Chevron Button */}
      <button
        onClick={handlePrev}
        disabled={startIndex === 0}
        aria-label="Previous levels"
        title={startIndex === 0 ? 'At start of case roster' : 'Scroll left (earlier cases)'}
        className="w-7 h-7 rounded-xl flex items-center justify-center bg-stone-900/70 hover:bg-stone-800 text-stone-300 hover:text-white border border-white/10 disabled:opacity-25 disabled:cursor-not-allowed transition-all shrink-0 active:scale-90"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* 5-Level Carousel Window Container */}
      <div className="flex items-center justify-center gap-1 flex-1 overflow-hidden">
        {visibleLevels.map((lvl) => {
          // Absolute index in total levels list
          const absoluteIndex = levels.findIndex((l) => l.id === lvl.id);
          const isActive = absoluteIndex === currentLevelIndex;
          const unlocked = isLevelUnlocked(absoluteIndex, levels, solvedTasks);
          const completed = isLevelCompleted(absoluteIndex, levels, solvedTasks);
          const label = lvl.levelNumber === 0 ? 'L0' : `C#00${lvl.levelNumber}`;

          // CASE 1: Active Level - Bold Terracotta Orange Pill
          if (isActive) {
            return (
              <button
                key={lvl.id}
                onClick={() => onSelectLevel(absoluteIndex)}
                className="flex-1 min-w-0 px-2.5 py-1 text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center justify-center gap-1 text-stone-950 shadow-md shadow-orange-950/40"
                style={{
                  backgroundColor: '#D97043',
                  backgroundImage: 'linear-gradient(135deg, #E88255 0%, #D97043 50%, #C85A32 100%)',
                }}
                title={`Active: ${lvl.title}`}
              >
                <span className="font-mono text-[11px] font-extrabold">{label}</span>
                {completed && (
                  <CheckCircle2 className="w-3 h-3 text-stone-950 shrink-0" />
                )}
              </button>
            );
          }

          // CASE 2: Locked Level - Dimmed Translucent Chip with Lock Icon
          if (!unlocked) {
            return (
              <button
                key={lvl.id}
                onClick={() => onLockedLevelClick && onLockedLevelClick(absoluteIndex)}
                className="flex-1 min-w-0 px-2 py-1 text-xs font-medium rounded-xl transition-all whitespace-nowrap flex items-center justify-center gap-1 text-stone-400/80 hover:text-stone-300 hover:bg-stone-900/70 bg-stone-950/40 border border-white/5 opacity-50 hover:opacity-80 cursor-pointer"
                title={`Locked: ${lvl.title}. Clear previous case first.`}
              >
                <Lock className="w-3 h-3 text-stone-400 shrink-0" />
                <span className="font-mono text-[11px]">{label}</span>
              </button>
            );
          }

          // CASE 3: Completed Level - Sage Green Pill with Checkmark
          if (completed) {
            return (
              <button
                key={lvl.id}
                onClick={() => onSelectLevel(absoluteIndex)}
                className="flex-1 min-w-0 px-2 py-1 text-xs font-semibold rounded-xl transition-all whitespace-nowrap flex items-center justify-center gap-1 bg-[#4F6D61]/70 hover:bg-[#4F6D61] text-stone-100 border border-emerald-400/30 shadow-xs"
                title={`Completed: ${lvl.title} (Click to replay)`}
              >
                <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                <span className="font-mono text-[11px]">{label}</span>
              </button>
            );
          }

          // CASE 4: Unlocked & In Progress / Ready
          return (
            <button
              key={lvl.id}
              onClick={() => onSelectLevel(absoluteIndex)}
              className="flex-1 min-w-0 px-2 py-1 text-xs font-semibold rounded-xl transition-all whitespace-nowrap flex items-center justify-center gap-1 text-stone-200 hover:text-white hover:bg-white/10 border border-white/10"
              title={`Unlocked: ${lvl.title}`}
            >
              <span className="font-mono text-[11px] opacity-80">{label}</span>
            </button>
          );
        })}
      </div>

      {/* Right Pagination Chevron Button */}
      <button
        onClick={handleNext}
        disabled={startIndex >= maxStartIndex}
        aria-label="Next levels"
        title={startIndex >= maxStartIndex ? 'At end of case roster' : 'Scroll right (later cases)'}
        className="w-7 h-7 rounded-xl flex items-center justify-center bg-stone-900/70 hover:bg-stone-800 text-stone-300 hover:text-white border border-white/10 disabled:opacity-25 disabled:cursor-not-allowed transition-all shrink-0 active:scale-90"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};
