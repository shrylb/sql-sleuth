import React, { useState } from 'react';
import { CaseLevel, MissionTask } from '../types';
import { 
  FileText, 
  MapPin, 
  Calendar, 
  Target, 
  HelpCircle, 
  CheckCircle2, 
  ChevronRight,
  Lightbulb,
  AlertTriangle,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

interface LeftPanelProps {
  currentLevel: CaseLevel;
  currentTask: MissionTask;
  currentTaskIndex: number;
  onSelectTask: (index: number) => void;
  solvedTasks: Record<string, boolean>;
  hintsUsed: Record<string, boolean>;
  onUseHint: (taskId: string, cost: number) => void;
  score: number;
  cluesDiscovered: string[];
}

export const LeftPanel: React.FC<LeftPanelProps> = ({
  currentLevel,
  currentTask,
  currentTaskIndex,
  onSelectTask,
  solvedTasks,
  hintsUsed,
  onUseHint,
  score,
  cluesDiscovered,
}) => {
  const [showConfirmHint, setShowConfirmHint] = useState(false);
  const isHintUsed = Boolean(hintsUsed[currentTask.id]);
  const isCurrentTaskSolved = Boolean(solvedTasks[currentTask.id]);

  const handleRevealHintClick = () => {
    if (isHintUsed) return;
    if (score < currentTask.hintCost) {
      alert(`Insufficient points! This hint costs ${currentTask.hintCost} pts, but you currently have ${score} pts.`);
      return;
    }
    setShowConfirmHint(true);
  };

  const handleConfirmHint = () => {
    onUseHint(currentTask.id, currentTask.hintCost);
    setShowConfirmHint(false);
  };

  const completedCount = currentLevel.tasks.filter(t => solvedTasks[t.id]).length;

  return (
    <div 
      className="h-full flex flex-col rounded-2xl border border-white/20 shadow-xl overflow-hidden text-stone-100"
      style={{
        backgroundColor: 'rgba(79, 109, 97, 0.88)',
        backdropFilter: 'blur(16px)',
      }}
    >
      {/* Scrollable Container */}
      <div className="flex-1 overflow-y-auto divide-y divide-white/10">
        
        {/* 1. Case Header & Narrative Brief */}
        <div className="p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-amber-300 font-bold flex items-center gap-1.5 bg-stone-900/40 px-2.5 py-0.5 rounded-full border border-amber-500/30">
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              {currentLevel.levelNumber === 0 ? 'ORIENTATION' : `CASE FILE #00${currentLevel.levelNumber}`}
            </span>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-stone-900/40 text-stone-300 border border-white/10">
              {currentLevel.difficulty}
            </span>
          </div>

          <div>
            <h1 className="text-base sm:text-lg font-extrabold text-white tracking-tight font-sans">
              {currentLevel.title}
            </h1>
            <p className="text-xs text-stone-200/90 font-medium mt-0.5">
              {currentLevel.subtitle}
            </p>
          </div>

          {/* Incident Metadata Box */}
          <div className="space-y-1.5 bg-stone-900/40 rounded-xl p-3 border border-white/10 text-xs text-stone-300">
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-amber-300/80 shrink-0" />
              <span className="truncate">{currentLevel.briefing.incidentDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-emerald-300/80 shrink-0" />
              <span className="truncate">{currentLevel.briefing.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-3.5 h-3.5 text-orange-400 shrink-0" />
              <span className="text-stone-200 truncate font-semibold">
                Target: {currentLevel.briefing.suspectTarget}
              </span>
            </div>
          </div>

          {/* Dossier Text */}
          <div className="text-xs text-stone-200/85 leading-relaxed bg-stone-900/25 p-3 rounded-xl border border-white/10 font-normal">
            {currentLevel.briefing.dossier}
          </div>
        </div>

        {/* 2. Interactive Mission Checklist */}
        <div className="p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              <span>Mission Directives</span>
            </h2>
            <span className="text-[11px] font-mono text-amber-300 font-bold bg-stone-900/40 px-2 py-0.5 rounded-full border border-white/10">
              {completedCount} / {currentLevel.tasks.length} Cleared
            </span>
          </div>

          <div className="space-y-2">
            {currentLevel.tasks.map((task, idx) => {
              const isSolved = Boolean(solvedTasks[task.id]);
              const isSelected = idx === currentTaskIndex;

              return (
                <button
                  key={task.id}
                  onClick={() => onSelectTask(idx)}
                  className={`w-full text-left p-2.5 rounded-xl text-xs transition-all flex items-center justify-between border ${
                    isSelected
                      ? 'bg-stone-900/60 border-amber-400 text-white shadow-md ring-1 ring-amber-400/40'
                      : isSolved
                      ? 'bg-emerald-950/30 border-emerald-500/40 text-stone-200 hover:bg-emerald-900/30'
                      : 'bg-stone-900/30 border-white/10 text-stone-300 hover:bg-stone-900/50'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    {isSolved ? (
                      <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400/50 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#4CAF50]" />
                      </div>
                    ) : (
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-mono shrink-0 ${
                        isSelected 
                          ? 'border-amber-400 text-amber-300 bg-amber-500/20 font-bold' 
                          : 'border-stone-500 text-stone-400 bg-stone-900/40'
                      }`}>
                        {idx + 1}
                      </div>
                    )}
                    <span className="truncate font-semibold">{task.title}</span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 text-[11px] font-mono">
                    <span className={isSolved ? 'text-emerald-400 font-bold' : 'text-amber-300'}>
                      +{task.points} pts
                    </span>
                    <ChevronRight className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-400' : 'opacity-40'}`} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Active Mission Directive Details & Clue Card */}
        <div className="p-4 sm:p-5 space-y-3.5 bg-stone-950/20">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-300 font-bold">
              Current Active Directive
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-stone-900/40 text-stone-300 border border-white/10">
              {currentTask.conceptFocus}
            </span>
          </div>

          <div className="bg-stone-900/40 rounded-xl p-3.5 border border-white/15 space-y-2">
            <h3 className="text-xs sm:text-sm font-bold text-white">
              {currentTask.title}
            </h3>
            <p className="text-xs text-stone-200/90 leading-relaxed font-sans">
              {currentTask.instruction}
            </p>
          </div>

          {/* Forensic Hint Drawer */}
          <div className="pt-1">
            {isHintUsed ? (
              <div className="bg-amber-950/30 border border-amber-500/40 rounded-xl p-3 space-y-1.5 text-xs">
                <div className="flex items-center gap-1.5 text-amber-300 font-bold text-[11px] uppercase tracking-wider font-mono">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                  <span>Unlocked Forensic Hint</span>
                </div>
                <div className="font-mono text-[11px] text-amber-100 bg-stone-950/40 p-2.5 rounded-lg border border-amber-500/20 overflow-x-auto select-all">
                  {currentTask.hint}
                </div>
              </div>
            ) : showConfirmHint ? (
              <div className="bg-stone-900/60 border border-amber-500/40 rounded-xl p-3 space-y-2.5">
                <div className="flex items-start gap-2 text-xs text-amber-200">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    Revealing this hint deducts <strong>{currentTask.hintCost} points</strong> from your investigation score.
                  </span>
                </div>
                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    onClick={() => setShowConfirmHint(false)}
                    className="px-3 py-1 rounded-lg text-xs font-semibold text-stone-300 hover:text-white bg-stone-900/40 border border-white/15"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmHint}
                    className="px-3 py-1 rounded-lg text-xs font-bold text-stone-950 shadow-md"
                    style={{
                      backgroundColor: '#D97043',
                      backgroundImage: 'linear-gradient(135deg, #E88255 0%, #D97043 100%)',
                    }}
                  >
                    Confirm (-{currentTask.hintCost} pts)
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={handleRevealHintClick}
                disabled={isCurrentTaskSolved}
                className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm ${
                  isCurrentTaskSolved
                    ? 'bg-stone-900/30 text-stone-400 border border-white/10 cursor-not-allowed opacity-60'
                    : 'text-stone-950 hover:brightness-110 active:scale-95'
                }`}
                style={
                  !isCurrentTaskSolved
                    ? {
                        backgroundColor: '#D97043',
                        backgroundImage: 'linear-gradient(135deg, #E88255 0%, #D97043 50%, #C85A32 100%)',
                        boxShadow: '0 4px 12px rgba(200, 90, 50, 0.3)',
                      }
                    : undefined
                }
              >
                <HelpCircle className="w-4 h-4" />
                <span>{isCurrentTaskSolved ? 'Directive Solved' : `REQUEST HINT (-${currentTask.hintCost} PTS)`}</span>
              </button>
            )}
          </div>

          {/* Clues Discovered Log */}
          {cluesDiscovered.length > 0 && (
            <div className="bg-stone-900/40 border border-emerald-500/30 rounded-xl p-3 space-y-1.5 text-xs mt-3">
              <div className="flex items-center gap-1.5 text-emerald-300 font-bold text-[11px] uppercase tracking-wider font-mono">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Verified Leads Acquired</span>
              </div>
              <ul className="space-y-1 text-stone-200 text-[11px]">
                {cluesDiscovered.map((clue, cIdx) => (
                  <li key={cIdx} className="flex items-start gap-1.5">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{clue}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
