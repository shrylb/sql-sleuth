import React, { useState } from 'react';
import { CaseLevel, MissionTask, QueryExecutionResult } from '../types';
import { Header } from './Header';
import { LeftPanel } from './LeftPanel';
import { CenterPanel } from './CenterPanel';
import { RightPanel } from './RightPanel';
import { LevelLockedModal } from './LevelLockedModal';

interface GameplayConsoleProps {
  levels: CaseLevel[];
  currentLevel: CaseLevel;
  currentLevelIndex: number;
  onSelectLevel: (index: number) => void;
  currentTask: MissionTask;
  currentTaskIndex: number;
  onSelectTask: (index: number) => void;
  score: number;
  solvedTasks: Record<string, boolean>;
  solvedTasksCount: number;
  totalTasksCount: number;
  hintsUsed: Record<string, boolean>;
  onUseHint: (taskId: string, cost: number) => void;
  cluesDiscovered: string[];
  query: string;
  onQueryChange: (q: string) => void;
  onExecuteQuery: () => void;
  isExecuting: boolean;
  lastResult: QueryExecutionResult | null;
  taskValidation: {
    isCorrect: boolean;
    feedback: string;
    clueDiscovered?: string;
  } | null;
  onAdvanceTask: () => void;
  hasNextTask: boolean;
  isCaseCompleted: boolean;
  onOpenVictoryModal: () => void;
  onOpenJournal: () => void;
  onResetProgress: () => void;
  hasUnreadJournal: boolean;
  onNavigateToDashboard: () => void;
}

export const GameplayConsole: React.FC<GameplayConsoleProps> = ({
  levels,
  currentLevel,
  currentLevelIndex,
  onSelectLevel,
  currentTask,
  currentTaskIndex,
  onSelectTask,
  score,
  solvedTasks,
  solvedTasksCount,
  totalTasksCount,
  hintsUsed,
  onUseHint,
  cluesDiscovered,
  query,
  onQueryChange,
  onExecuteQuery,
  isExecuting,
  lastResult,
  taskValidation,
  onAdvanceTask,
  hasNextTask,
  isCaseCompleted,
  onOpenVictoryModal,
  onOpenJournal,
  onResetProgress,
  hasUnreadJournal,
  onNavigateToDashboard,
}) => {
  const [lockedTargetLevelIndex, setLockedTargetLevelIndex] = useState<number | null>(null);

  const lockedTargetLevel = lockedTargetLevelIndex !== null ? levels[lockedTargetLevelIndex] : null;
  const lockedPreviousLevel =
    lockedTargetLevelIndex !== null && lockedTargetLevelIndex > 0
      ? levels[lockedTargetLevelIndex - 1]
      : null;

  return (
    <div 
      className="h-screen w-screen flex flex-col font-sans text-stone-100 overflow-hidden relative selection:bg-amber-500/20 selection:text-amber-200"
      style={{
        background: 'linear-gradient(175deg, #7F9F8E 0%, #8BA898 35%, #B5C4B9 70%, #D9D2C5 100%)',
      }}
    >
      {/* Background Low-Poly Mountain Geometry (matching Dashboard) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20 select-none">
        <svg
          className="absolute -top-12 left-1/2 -translate-x-1/2 w-[1400px] h-[700px]"
          viewBox="0 0 1400 700"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon points="700,50 380,500 1020,500" fill="#4F6D61" opacity="0.4" />
          <polygon points="700,50 1020,500 700,500" fill="#3D564C" opacity="0.5" />
          <polygon points="340,160 80,600 600,600" fill="#5F8073" opacity="0.3" />
          <polygon points="1060,140 800,600 1320,600" fill="#3D564C" opacity="0.35" />
        </svg>

        <svg
          className="absolute -bottom-8 left-0 w-full h-[360px]"
          viewBox="0 0 1440 360"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon points="0,180 240,240 480,160 720,220 960,140 1200,200 1440,120 1440,360 0,360" fill="#4F6D61" opacity="0.5" />
          <polygon points="0,240 320,180 640,260 960,200 1280,270 1440,230 1440,360 0,360" fill="#3D564C" opacity="0.7" />
          <polygon points="0,290 200,270 500,320 800,280 1100,310 1440,280 1440,360 0,360" fill="#2F443B" opacity="0.8" />
        </svg>
      </div>

      {/* Top Navigation Bar with Strict Progression Locks */}
      <Header
        levels={levels}
        currentLevelIndex={currentLevelIndex}
        onSelectLevel={onSelectLevel}
        solvedTasks={solvedTasks}
        onLockedLevelClick={idx => setLockedTargetLevelIndex(idx)}
        score={score}
        solvedTasksCount={solvedTasksCount}
        totalTasksCount={totalTasksCount}
        onOpenJournal={onOpenJournal}
        onResetProgress={onResetProgress}
        hasUnreadJournal={hasUnreadJournal}
        onNavigateToDashboard={onNavigateToDashboard}
      />

      {/* Main 3-Panel Split-Screen Workspace */}
      <main className="relative z-10 flex-1 grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 p-3 sm:p-4 overflow-hidden">
        {/* Left Panel: Case Objectives & Directives (3 cols) */}
        <section className="col-span-12 md:col-span-3 h-full overflow-hidden">
          <LeftPanel
            currentLevel={currentLevel}
            currentTask={currentTask}
            currentTaskIndex={currentTaskIndex}
            onSelectTask={onSelectTask}
            solvedTasks={solvedTasks}
            hintsUsed={hintsUsed}
            onUseHint={onUseHint}
            score={score}
            cluesDiscovered={cluesDiscovered}
          />
        </section>

        {/* Center Panel: Schema Viewer & SQL Console (5 cols) */}
        <section className="col-span-12 md:col-span-5 h-full overflow-hidden">
          <CenterPanel
            tables={currentLevel.tables}
            query={query}
            onQueryChange={onQueryChange}
            onExecuteQuery={onExecuteQuery}
            isExecuting={isExecuting}
            sampleSolution={currentTask.sampleSolution}
          />
        </section>

        {/* Right Panel: Query Results Table & Output Logs (4 cols) */}
        <section className="col-span-12 md:col-span-4 h-full overflow-hidden">
          <RightPanel
            lastResult={lastResult}
            taskValidation={taskValidation}
            onAdvanceTask={onAdvanceTask}
            hasNextTask={hasNextTask}
            isCaseCompleted={isCaseCompleted}
            onOpenVictoryModal={onOpenVictoryModal}
          />
        </section>
      </main>

      {/* Interactive Level Locked Modal Overlay */}
      <LevelLockedModal
        isOpen={lockedTargetLevelIndex !== null}
        onClose={() => setLockedTargetLevelIndex(null)}
        targetLevel={lockedTargetLevel}
        previousLevel={lockedPreviousLevel}
        onReturnToActive={() => setLockedTargetLevelIndex(null)}
      />
    </div>
  );
};
