import React from 'react';
import { CaseLevel } from '../types';
import { 
  Play, 
  Lock, 
  CheckCircle2, 
  Star, 
  Sparkles, 
  Key, 
  Layers, 
  Clock, 
  ArrowRight,
  ShieldCheck,
  Building2,
  Fingerprint,
  Search,
  Eye,
  PieChart,
  Award
} from 'lucide-react';

interface CaseCardsGridProps {
  levels: CaseLevel[];
  currentLevelIndex: number;
  solvedTasks: Record<string, boolean>;
  hintsUsed: Record<string, boolean>;
  onSelectLevelToPlay: (levelIndex: number) => void;
}

export const CaseCardsGrid: React.FC<CaseCardsGridProps> = ({
  levels,
  currentLevelIndex,
  solvedTasks,
  hintsUsed,
  onSelectLevelToPlay,
}) => {
  // Case icons mapping for rich low-poly visual personality
  const getCaseIcon = (levelNumber: number) => {
    switch (levelNumber) {
      case 0:
        return <ShieldCheck className="w-5 h-5 text-emerald-300" />;
      case 1:
        return <Fingerprint className="w-5 h-5 text-amber-300" />;
      case 2:
        return <Key className="w-5 h-5 text-sky-300" />;
      case 3:
        return <Building2 className="w-5 h-5 text-orange-300" />;
      case 4:
        return <Search className="w-5 h-5 text-rose-300" />;
      case 5:
        return <Sparkles className="w-5 h-5 text-amber-200" />;
      case 6:
        return <Layers className="w-5 h-5 text-sky-300" />;
      case 7:
        return <Eye className="w-5 h-5 text-emerald-300" />;
      case 8:
        return <PieChart className="w-5 h-5 text-amber-300" />;
      case 9:
        return <Award className="w-5 h-5 text-rose-300" />;
      default:
        return <Search className="w-5 h-5 text-stone-300" />;
    }
  };

  // Determine status of level sequentially
  const getLevelStatus = (levelIdx: number) => {
    const level = levels[levelIdx];
    const isCompleted = level.tasks.every(t => solvedTasks[t.id]);
    const someSolved = level.tasks.some(t => solvedTasks[t.id]);

    if (levelIdx === 0) {
      if (isCompleted) return 'SOLVED';
      if (someSolved) return 'IN_PROGRESS';
      return 'READY';
    }

    // Check if previous level is completed
    const prevCompleted = levels[levelIdx - 1]?.tasks.every(t => solvedTasks[t.id]) ?? true;
    if (!prevCompleted) {
      return 'LOCKED';
    }

    if (isCompleted) return 'SOLVED';
    if (someSolved) return 'IN_PROGRESS';
    return 'READY';
  };

  // Calculate star rating (0 to 3)
  const getStarRating = (level: CaseLevel, status: string) => {
    if (status === 'LOCKED') return 0;
    const completedTasks = level.tasks.filter(t => solvedTasks[t.id]).length;
    const total = level.tasks.length;
    if (completedTasks === 0) return 0;

    if (completedTasks === total) {
      // Check if hints were used in this level
      const usedHintInLevel = level.tasks.some(t => hintsUsed[t.id]);
      return usedHintInLevel ? 2 : 3;
    }

    return 1;
  };

  // Calculate points earned in this level
  const getLevelPoints = (level: CaseLevel) => {
    const earned = level.tasks.reduce((sum, t) => {
      if (solvedTasks[t.id]) {
        const hintDeduction = hintsUsed[t.id] ? t.hintCost : 0;
        return sum + Math.max(0, t.points - hintDeduction);
      }
      return sum;
    }, 0);

    const max = level.tasks.reduce((sum, t) => sum + t.points, 0);
    return { earned, max };
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
      {levels.map((level, idx) => {
        const status = getLevelStatus(idx);
        const isLocked = status === 'LOCKED';
        const isSolved = status === 'SOLVED';
        const isInProgress = status === 'IN_PROGRESS';
        const isCurrent = idx === currentLevelIndex;
        const stars = getStarRating(level, status);
        const { earned, max } = getLevelPoints(level);
        const tasksCompletedCount = level.tasks.filter(t => solvedTasks[t.id]).length;
        const totalTasks = level.tasks.length;

        // Distinctive concept tags
        const concepts = Array.from(new Set(level.tasks.map(t => t.conceptFocus)));

        return (
          <div
            key={level.id}
            className={`rounded-3xl border transition-all duration-300 relative flex flex-col justify-between overflow-hidden group ${
              isLocked
                ? 'bg-stone-900/40 border-stone-800/40 opacity-60 shadow-none'
                : isSolved
                ? 'border-emerald-600/50 hover:border-emerald-400/70 shadow-xl'
                : 'border-white/20 hover:border-amber-400/60 shadow-2xl'
            }`}
            style={{
              backgroundColor: isLocked ? 'rgba(38, 52, 46, 0.6)' : 'rgba(79, 109, 97, 0.88)',
              backdropFilter: 'blur(16px)',
              boxShadow: isLocked
                ? 'none'
                : '0 20px 35px -10px rgba(26, 43, 35, 0.35)',
            }}
          >
            {/* Top Bar inside Card */}
            <div className="p-5 sm:p-6 pb-4">
              <div className="flex items-start justify-between gap-3 mb-3">
                {/* Level Index Badge & Icon */}
                <div className="flex items-center gap-2.5">
                  <div 
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center border shadow-inner ${
                      isLocked
                        ? 'bg-stone-800/60 border-stone-700/50 text-stone-500'
                        : isSolved
                        ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-300'
                        : 'bg-stone-900/40 border-amber-500/30 text-amber-300'
                    }`}
                  >
                    {isLocked ? <Lock className="w-5 h-5" /> : getCaseIcon(level.levelNumber)}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-stone-300">
                        {level.levelNumber === 0 ? 'ORIENTATION' : `CASE FILE #00${level.levelNumber}`}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-stone-900/50 border border-white/10 text-stone-300">
                        {level.difficulty}
                      </span>
                    </div>

                    <div className="text-xs font-mono text-stone-300/80">
                      {level.category}
                    </div>
                  </div>
                </div>

                {/* Status Indicator Pill */}
                <div>
                  {isSolved && (
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 flex items-center gap-1.5 shadow-xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      SOLVED
                    </span>
                  )}
                  {isInProgress && (
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-400/40 flex items-center gap-1.5 shadow-xs">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                      IN PROGRESS ({tasksCompletedCount}/{totalTasks})
                    </span>
                  )}
                  {status === 'READY' && (
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-sky-500/20 text-sky-200 border border-sky-400/40 flex items-center gap-1.5 shadow-xs">
                      <Sparkles className="w-3.5 h-3.5 text-sky-300" />
                      READY
                    </span>
                  )}
                  {isLocked && (
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-mono text-stone-400 bg-stone-900/60 border border-stone-800/80 flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      LOCKED
                    </span>
                  )}
                </div>
              </div>

              {/* Title & Subtitle */}
              <div className="mt-2">
                <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight font-sans">
                  {level.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-200/90 font-medium mt-0.5">
                  {level.subtitle}
                </p>
              </div>

              {/* Briefing Snippet */}
              <p className="text-xs text-stone-200/80 mt-3 line-clamp-2 leading-relaxed bg-stone-950/20 p-2.5 rounded-xl border border-white/5">
                {level.briefing.dossier.split('\n')[0]}
              </p>

              {/* Concepts Tags (Discipline: clean badges) */}
              <div className="mt-3.5 flex flex-wrap gap-1.5">
                {concepts.slice(0, 3).map((concept, cIdx) => (
                  <span
                    key={cIdx}
                    className="text-[11px] font-mono px-2.5 py-0.5 rounded-lg bg-stone-900/40 border border-white/10 text-stone-200"
                  >
                    {concept}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Bar: Star Rating, Score, and Launch Action */}
            <div className="p-5 sm:p-6 pt-3 border-t border-white/10 bg-stone-950/20 flex items-center justify-between gap-3">
              {/* Star Rating & Points Display */}
              <div>
                <div className="flex items-center gap-1 mb-1">
                  {[1, 2, 3].map(starNum => (
                    <Star
                      key={starNum}
                      className={`w-4 h-4 ${
                        starNum <= stars
                          ? 'text-amber-400 fill-amber-400 filter drop-shadow'
                          : 'text-stone-600/70'
                      }`}
                    />
                  ))}
                  <span className="text-[11px] font-mono text-stone-300 ml-1.5">
                    {stars === 3 ? 'Flawless' : stars === 2 ? 'Mastered' : stars === 1 ? '1/3 Solved' : 'Unrated'}
                  </span>
                </div>

                <div className="text-xs font-mono">
                  <span className="text-stone-400">Yield: </span>
                  <span className="font-bold text-amber-300">{earned}</span>
                  <span className="text-stone-400"> / {max} pts</span>
                </div>
              </div>

              {/* Action Button */}
              {isLocked ? (
                <div className="text-right">
                  <span className="text-[11px] text-stone-400 font-mono flex items-center gap-1.5 justify-end">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Clear Case #{levels[idx - 1]?.levelNumber ?? idx} First</span>
                  </span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => onSelectLevelToPlay(idx)}
                  className={`px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md active:scale-95 whitespace-nowrap ${
                    isSolved
                      ? 'bg-stone-900/60 hover:bg-stone-800 text-stone-200 border border-white/20'
                      : 'text-stone-950 hover:brightness-110 tracking-wide'
                  }`}
                  style={
                    !isSolved
                      ? {
                          backgroundColor: '#D97043',
                          backgroundImage: 'linear-gradient(135deg, #E88255 0%, #D97043 50%, #C85A32 100%)',
                          boxShadow: '0 4px 14px rgba(200, 90, 50, 0.4)',
                        }
                      : undefined
                  }
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>{isSolved ? 'REVISIT CASE' : isInProgress ? 'RESUME CASE' : 'LAUNCH CASE'}</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-80" />
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
