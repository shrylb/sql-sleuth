import React, { useState } from 'react';
import { CaseLevel } from '../types';
import { 
  CheckCircle2, 
  Lock, 
  Play, 
  RotateCcw, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  BookOpen, 
  Calendar, 
  MapPin, 
  Target 
} from 'lucide-react';

interface LevelSelectorAccordionProps {
  levels: CaseLevel[];
  currentLevelIndex: number;
  solvedTasks: Record<string, boolean>;
  onSelectLevelToPlay: (levelIndex: number) => void;
}

export const LevelSelectorAccordion: React.FC<LevelSelectorAccordionProps> = ({
  levels,
  currentLevelIndex,
  solvedTasks,
  onSelectLevelToPlay,
}) => {
  const [expandedLevelId, setExpandedLevelId] = useState<number | null>(currentLevelIndex);

  // Determine state of each level sequentially:
  // Level 0 is always unlocked.
  // Level N is unlocked IF AND ONLY IF Level N-1 is completed (all tasks in N-1 solved).
  const getLevelStatus = (levelIdx: number) => {
    const level = levels[levelIdx];
    const isCompleted = level.tasks.every(t => solvedTasks[t.id]);

    if (levelIdx === 0) {
      if (isCompleted) return 'completed';
      return 'current';
    }

    // Check if ALL previous levels are completed
    let allPreviousCompleted = true;
    for (let i = 0; i < levelIdx; i++) {
      if (!levels[i].tasks.every(t => solvedTasks[t.id])) {
        allPreviousCompleted = false;
        break;
      }
    }

    if (!allPreviousCompleted) {
      return 'locked';
    }

    if (isCompleted) {
      return 'completed';
    }

    return 'current';
  };

  const toggleExpand = (levelIdx: number, isLocked: boolean) => {
    if (isLocked) return;
    setExpandedLevelId(prev => (prev === levelIdx ? null : levelIdx));
  };

  return (
    <div className="space-y-3.5">
      {levels.map((level, idx) => {
        const status = getLevelStatus(idx);
        const isLocked = status === 'locked';
        const isCompleted = status === 'completed';
        const isCurrent = status === 'current';
        const isExpanded = expandedLevelId === idx && !isLocked;

        const tasksCompletedCount = level.tasks.filter(t => solvedTasks[t.id]).length;
        const totalTasks = level.tasks.length;

        // Extract key concepts taught in this level
        const uniqueConcepts = Array.from(new Set(level.tasks.map(t => t.conceptFocus)));

        return (
          <div
            key={level.id}
            className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
              isLocked
                ? 'bg-stone-900/40 border-stone-800/40 opacity-55 cursor-not-allowed'
                : isCurrent
                ? 'bg-[#3D564C]/90 border-amber-500/60 shadow-xl shadow-emerald-950/40 ring-1 ring-amber-500/30'
                : 'bg-[#4F6D61]/80 hover:bg-[#4F6D61]/95 border-emerald-700/50 shadow-md'
            }`}
            style={{
              backdropFilter: 'blur(12px)',
            }}
          >
            {/* Header / Summary Bar */}
            <div
              onClick={() => toggleExpand(idx, isLocked)}
              className={`p-4 sm:p-5 flex items-center justify-between select-none ${
                !isLocked ? 'cursor-pointer' : ''
              }`}
            >
              <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                {/* State Badge Icon */}
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border ${
                    isCompleted
                      ? 'bg-emerald-500/20 border-emerald-400/50 text-emerald-300'
                      : isCurrent
                      ? 'bg-amber-500/20 border-amber-400/60 text-amber-300 shadow-sm'
                      : 'bg-stone-800/60 border-stone-700/50 text-stone-500'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  ) : isLocked ? (
                    <Lock className="w-5 h-5 text-stone-400" />
                  ) : (
                    <span className="font-mono font-bold text-sm text-amber-300">
                      L{level.levelNumber}
                    </span>
                  )}
                </div>

                {/* Level Title & Meta */}
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span
                      className={`text-[11px] font-mono uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border ${
                        isCompleted
                          ? 'bg-emerald-900/40 text-emerald-300 border-emerald-700/50'
                          : isCurrent
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : 'bg-stone-800 text-stone-400 border-stone-700'
                      }`}
                    >
                      {level.levelNumber === 0 ? 'Orientation' : `Case #${level.levelNumber + 100}`}
                    </span>
                    <span className="text-[11px] font-mono text-emerald-200/60 hidden sm:inline">
                      • {level.category}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-stone-100 truncate tracking-tight font-sans">
                    {level.title}
                  </h3>
                  <p className="text-xs text-stone-300/80 truncate">
                    {level.subtitle}
                  </p>
                </div>
              </div>

              {/* Right Side Status & Actions */}
              <div className="flex items-center gap-3 shrink-0 ml-3">
                {/* Progress counter */}
                <div className="text-right hidden sm:block">
                  <div className="text-xs font-mono font-semibold text-stone-200">
                    {tasksCompletedCount} / {totalTasks} Directives
                  </div>
                  <div className="text-[10px] text-emerald-200/60 font-mono">
                    {isCompleted ? '100% Cleared' : isLocked ? 'Locked Case' : 'In Progress'}
                  </div>
                </div>

                {/* Quick Action Button for current level */}
                {isCurrent && !isExpanded && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectLevelToPlay(idx);
                    }}
                    className="px-3.5 py-1.5 rounded-xl font-bold text-xs text-stone-950 flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
                    style={{
                      backgroundColor: '#D97043',
                      backgroundImage: 'linear-gradient(to bottom, #E88255, #C85A32)',
                    }}
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>PLAY</span>
                  </button>
                )}

                {/* Expand/Collapse Chevron */}
                {!isLocked && (
                  <div className="p-1 rounded-lg text-stone-300/70 hover:text-stone-100 hover:bg-emerald-900/30 transition-colors">
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Accordion Expansion Details */}
            {isExpanded && (
              <div className="px-5 pb-5 pt-1 border-t border-emerald-800/40 space-y-4 bg-stone-950/20 text-stone-200">
                {/* Case Narrative Brief */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-amber-300 font-bold flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    Narrative Story Brief
                  </span>
                  <p className="text-xs text-stone-200 leading-relaxed bg-stone-950/40 p-3 rounded-xl border border-emerald-800/30 font-sans">
                    {level.briefing.dossier}
                  </p>
                </div>

                {/* Incident Coordinates metadata */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-stone-300">
                  <div className="flex items-center gap-2 bg-stone-900/30 px-3 py-1.5 rounded-lg border border-emerald-800/30">
                    <Calendar className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate">{level.briefing.incidentDate}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-stone-900/30 px-3 py-1.5 rounded-lg border border-emerald-800/30">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate">{level.briefing.location}</span>
                  </div>
                </div>

                {/* Key SQL Concepts Taught */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-300 font-bold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    SQL Concepts Covered
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {uniqueConcepts.map((concept, cIdx) => (
                      <span
                        key={cIdx}
                        className="px-2.5 py-1 rounded-lg bg-stone-900/60 border border-emerald-700/40 text-[11px] font-mono text-emerald-200 font-medium"
                      >
                        {concept}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Launch CTA Button */}
                <div className="pt-2 flex items-center justify-between">
                  <div className="text-xs text-stone-300 font-mono">
                    {level.tables.length} Tables • {totalTasks} Investigative Directives
                  </div>

                  <button
                    onClick={() => onSelectLevelToPlay(idx)}
                    className="px-5 py-2.5 rounded-xl font-bold text-xs text-stone-950 flex items-center gap-2 shadow-lg active:scale-95 transition-all"
                    style={{
                      backgroundColor: '#D97043',
                      backgroundImage: 'linear-gradient(to bottom, #E88255, #C85A32)',
                    }}
                  >
                    {isCompleted ? (
                      <>
                        <RotateCcw className="w-4 h-4" />
                        <span>REPLAY CASE</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 fill-current" />
                        <span>INVESTIGATE NOW</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
