import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { CASE_LEVELS } from './data/levels';
import { JOURNAL_ENTRIES } from './data/journalEntries';
import { INITIAL_ACHIEVEMENTS } from './data/userProfileData';
import { sqlEngine } from './engine/sqlEngine';
import { QueryExecutionResult, UserProfile, AchievementBadge } from './types';
import { Header } from './components/Header';
import { LeftPanel } from './components/LeftPanel';
import { CenterPanel } from './components/CenterPanel';
import { RightPanel } from './components/RightPanel';
import { JournalModal, isEntryUnlocked } from './components/JournalModal';
import { CaseVictoryModal } from './components/CaseVictoryModal';
import { TitlePage } from './components/TitlePage';
import { GameplayConsole } from './components/GameplayConsole';
import { VictoryPage } from './components/VictoryPage';
import { PrecinctDirectory } from './components/PrecinctDirectory';
import { ResetConfirmModal } from './components/ResetConfirmModal';
import { usePlayerProfile } from './hooks/usePlayerProfile';
import { doc, setDoc } from 'firebase/firestore';
import { db } from './services/firebase';

const STORAGE_KEY = 'sql_sleuth_game_progress_v1';

export default function App() {
  // Navigation View: 'DASHBOARD' | 'INVESTIGATION' | 'VICTORY' | 'ROSTER'
  const [viewMode, setViewMode] = useState<'DASHBOARD' | 'INVESTIGATION' | 'VICTORY' | 'ROSTER'>('DASHBOARD');

  // Load initial progress from localStorage
  const [levelIndex, setLevelIndex] = useState<number>(0);
  const [taskIndex, setTaskIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(100); // 100 starting detective points
  const [solvedTasks, setSolvedTasks] = useState<Record<string, boolean>>({});
  const [unlockedJournalIds, setUnlockedJournalIds] = useState<string[]>(['tables_and_columns']);
  const [hintsUsed, setHintsUsed] = useState<Record<string, boolean>>({});
  const [cluesDiscovered, setCluesDiscovered] = useState<Record<number, string[]>>({});
  const [totalQueriesExecuted, setTotalQueriesExecuted] = useState<number>(0);

  // User Profile with Persistent Device User ID (prevents duplicate Firestore documents)
  const {
    userId,
    userProfile,
    setUserProfile,
    updatePlayerProfile,
    cleanOrphanDoc,
  } = usePlayerProfile();

  // Query and execution state
  const [query, setQuery] = useState<string>('SELECT * FROM evidence_registry;');
  const [lastResult, setLastResult] = useState<QueryExecutionResult | null>(null);
  const [taskValidation, setTaskValidation] = useState<{
    isCorrect: boolean;
    feedback: string;
    clueDiscovered?: string;
  } | null>(null);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);

  // Modals
  const [isJournalOpen, setIsJournalOpen] = useState<boolean>(false);
  const [isVictoryModalOpen, setIsVictoryModalOpen] = useState<boolean>(false);
  const [hasUnreadJournal, setHasUnreadJournal] = useState<boolean>(false);

  // Current Level and Task references
  const currentLevel = CASE_LEVELS[levelIndex] || CASE_LEVELS[0];
  const currentTask = currentLevel.tasks[taskIndex] || currentLevel.tasks[0];

  // Dynamic Detective Rank
  const calculatedRank = useMemo(() => {
    if (score >= 600) return 'Chief Forensic Analyst';
    if (score >= 350) return 'Senior Investigator';
    if (score >= 150) return 'Junior Sleuth';
    return 'Rookie Detective';
  }, [score]);

  // Keep rank title synced if score upgraded
  useEffect(() => {
    if (userProfile.rankTitle !== calculatedRank) {
      setUserProfile(prev => ({ ...prev, rankTitle: calculatedRank }));
    }
  }, [calculatedRank, userProfile.rankTitle]);

  // Save profile changes (using updatePlayerProfile which cleans legacy username documents)
  const handleUpdateProfile = (updated: UserProfile) => {
    updatePlayerProfile({
      username: updated.username,
      avatarId: updated.avatarId,
      rankTitle: updated.rankTitle,
      score,
      currentBadge: updated.rankTitle,
    });
  };

  // Dynamic achievement badges based on game progress
  const achievements: AchievementBadge[] = useMemo(() => {
    return INITIAL_ACHIEVEMENTS.map(badge => {
      let isUnlocked = false;
      if (badge.id === 'badge_orientation') {
        isUnlocked = CASE_LEVELS[0]?.tasks.every(t => solvedTasks[t.id]) || false;
      } else if (badge.id === 'badge_filter') {
        isUnlocked = CASE_LEVELS[1]?.tasks.every(t => solvedTasks[t.id]) || false;
      } else if (badge.id === 'badge_join') {
        isUnlocked = CASE_LEVELS[2]?.tasks.every(t => solvedTasks[t.id]) || false;
      } else if (badge.id === 'badge_audit') {
        isUnlocked = CASE_LEVELS[3]?.tasks.every(t => solvedTasks[t.id]) || false;
      } else if (badge.id === 'badge_subqueries') {
        isUnlocked = CASE_LEVELS[4]?.tasks.every(t => solvedTasks[t.id]) || false;
      } else if (badge.id === 'badge_sanitization') {
        isUnlocked = CASE_LEVELS[5]?.tasks.every(t => solvedTasks[t.id]) || false;
      } else if (badge.id === 'badge_sanctum') {
        isUnlocked = CASE_LEVELS[6]?.tasks.every(t => solvedTasks[t.id]) || false;
      } else if (badge.id === 'badge_surveillance') {
        isUnlocked = CASE_LEVELS[7]?.tasks.every(t => solvedTasks[t.id]) || false;
      } else if (badge.id === 'badge_case_when') {
        isUnlocked = CASE_LEVELS[8]?.tasks.every(t => solvedTasks[t.id]) || false;
      } else if (badge.id === 'badge_final_takedown') {
        isUnlocked = CASE_LEVELS[9]?.tasks.every(t => solvedTasks[t.id]) || false;
      } else if (badge.id === 'badge_centurion') {
        isUnlocked = score >= 500;
      }
      return { ...badge, isUnlocked };
    });
  }, [solvedTasks, score]);

  // Load saved state on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.score !== undefined) setScore(parsed.score);
        if (parsed.solvedTasks) setSolvedTasks(parsed.solvedTasks);
        if (parsed.unlockedJournalIds) setUnlockedJournalIds(parsed.unlockedJournalIds);
        if (parsed.hintsUsed) setHintsUsed(parsed.hintsUsed);
        if (parsed.cluesDiscovered) setCluesDiscovered(parsed.cluesDiscovered);
        if (parsed.totalQueriesExecuted !== undefined) setTotalQueriesExecuted(parsed.totalQueriesExecuted);
        if (typeof parsed.levelIndex === 'number' && parsed.levelIndex < CASE_LEVELS.length) {
          setLevelIndex(parsed.levelIndex);
        }
      }
    } catch (e) {
      console.warn('Failed to load local progress:', e);
    }
  }, []);

  // Save progress changes
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          score,
          solvedTasks,
          unlockedJournalIds,
          hintsUsed,
          cluesDiscovered,
          levelIndex,
          totalQueriesExecuted,
        })
      );
    } catch (e) {
      // Ignore storage write issues
    }
  }, [score, solvedTasks, unlockedJournalIds, hintsUsed, cluesDiscovered, levelIndex, totalQueriesExecuted]);

  // Initialize database when level changes
  useEffect(() => {
    sqlEngine.loadLevelTables(currentLevel.id, currentLevel.tables);
    setTaskIndex(0);
    setLastResult(null);
    setTaskValidation(null);

    // Initial query starter based on current level
    if (currentLevel.id === 0) {
      setQuery('SELECT * FROM evidence_registry;');
    } else if (currentLevel.id === 1) {
      setQuery("SELECT full_name, alias, jacket_color FROM suspects WHERE jacket_color = 'Black';");
    } else if (currentLevel.id === 2) {
      setQuery("SELECT badge_id, door_location, access_time FROM door_logs WHERE door_location = 'Vault Rear Exit' AND access_time BETWEEN '2026-09-02 23:30:00' AND '2026-09-02 23:45:00';");
    } else if (currentLevel.id === 3) {
      setQuery('SELECT company_id, COUNT(transaction_id) AS total_transactions FROM transactions GROUP BY company_id;');
    } else if (currentLevel.id === 4) {
      setQuery('SELECT AVG(risk_score) AS avg_syndicate_risk FROM operations;');
    } else if (currentLevel.id === 5) {
      setQuery('DELETE FROM active_suspects WHERE suspect_id = 999;');
    } else if (currentLevel.id === 6) {
      setQuery('SELECT s.codename, s.district, o.full_name AS operative_name FROM safehouses s LEFT JOIN assigned_operatives o ON s.safehouse_id = o.safehouse_id;');
    } else if (currentLevel.id === 7) {
      setQuery('CREATE INDEX idx_location_sector ON surveillance_pings (location_sector);');
    } else if (currentLevel.id === 8) {
      setQuery("SELECT transaction_id, account_number, amount, CASE WHEN destination_type = 'Offshore Bank' AND is_flagged_country = 1 THEN 'CRITICAL' WHEN destination_type = 'Crypto Exchange' OR amount > 50000.00 THEN 'HIGH' ELSE 'LOW' END AS risk_level FROM audit_ledger;");
    } else if (currentLevel.id === 9) {
      setQuery("SELECT s.full_name, w.warrant_id, w.division_code, a.asset_type, a.liquidation_value FROM arrest_warrants w INNER JOIN suspects s ON w.suspect_id = s.suspect_id INNER JOIN seized_assets a ON w.warrant_id = a.warrant_id WHERE w.division_code = 'DIV-ALPHA' AND w.warrant_status = 'Pending Execution';");
    }
  }, [currentLevel.id]);

  // When switching task in the same level, clear previous task validation
  const handleSelectTask = (index: number) => {
    setTaskIndex(index);
    setTaskValidation(null);
  };

  // Run the current SQL query
  const handleExecuteQuery = useCallback(() => {
    setIsExecuting(true);
    setTaskValidation(null);
    setTotalQueriesExecuted(prev => prev + 1);

    setTimeout(() => {
      const res = sqlEngine.executeQuery(query);
      setLastResult(res);
      setIsExecuting(false);

      if (res.success) {
        // Validate against current objective
        const validation = currentTask.validateResult(res.rows, res.columns, query);
        setTaskValidation(validation);

        if (validation.isCorrect) {
          const isNewlySolved = !solvedTasks[currentTask.id];

          if (isNewlySolved) {
            // Award points
            setScore(prev => prev + currentTask.points);

            // Mark solved
            setSolvedTasks(prev => ({
              ...prev,
              [currentTask.id]: true,
            }));

            // Record clue discovered
            if (validation.clueDiscovered) {
              setCluesDiscovered(prev => ({
                ...prev,
                [currentLevel.id]: [...(prev[currentLevel.id] || []), validation.clueDiscovered!],
              }));
            }

            // Check if all tasks in this case are solved
            const remainingUnsolved = currentLevel.tasks.filter(
              t => t.id !== currentTask.id && !solvedTasks[t.id]
            );

            if (remainingUnsolved.length === 0) {
              // Level complete! Unlock journal entry
              if (currentLevel.journalUnlockId && !unlockedJournalIds.includes(currentLevel.journalUnlockId)) {
                setUnlockedJournalIds(prev => [...prev, currentLevel.journalUnlockId]);
                setHasUnreadJournal(true);
              }
              // Open victory modal
              setTimeout(() => {
                setIsVictoryModalOpen(true);
              }, 400);
            }
          }
        }
      } else {
        setTaskValidation({
          isCorrect: false,
          feedback: res.error || 'SQL statement execution failed.',
        });
      }
    }, 40);
  }, [query, currentTask, solvedTasks, currentLevel, unlockedJournalIds]);

  // Use hint handler (deduct points)
  const handleUseHint = (taskId: string, cost: number) => {
    setScore(prev => Math.max(0, prev - cost));
    setHintsUsed(prev => ({
      ...prev,
      [taskId]: true,
    }));
  };

  // Advance to next task inside current level
  const handleAdvanceTask = () => {
    if (taskIndex < currentLevel.tasks.length - 1) {
      setTaskIndex(prev => prev + 1);
      setTaskValidation(null);
    }
  };

  // Proceed to next level
  const handleProceedNextCase = () => {
    if (levelIndex < CASE_LEVELS.length - 1) {
      setLevelIndex(prev => prev + 1);
    }
  };

  const [isResetModalOpen, setIsResetModalOpen] = useState<boolean>(false);

  // Trigger Confirmation Modal for Reset
  const handleResetProgress = () => {
    setIsResetModalOpen(true);
  };

  // Step B: Reset Logic (handleConfirmReset)
  const handleConfirmReset = useCallback(() => {
    // 1. Reset React Local State
    setScore(0);
    setSolvedTasks({});
    setUnlockedJournalIds(['tables_and_columns']);
    setHintsUsed({});
    setCluesDiscovered({});
    setTotalQueriesExecuted(0);
    setLevelIndex(0);
    setTaskIndex(0);
    setLastResult(null);
    setTaskValidation(null);
    setQuery('SELECT * FROM evidence_registry;');

    // 2. Reset the in-memory SQLite / AlaSQL database to default seed state
    try {
      sqlEngine.loadLevelTables(0, CASE_LEVELS[0].tables);
    } catch (e) {
      console.warn('Error resetting in-memory database:', e);
    }

    // 3. Clear Local Storage
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem('sql_sleuth_progress');
    } catch (e) {
      console.warn('Error clearing localStorage:', e);
    }

    // 4. Sync with Firebase Firestore (target persistent userId)
    try {
      const userDocRef = doc(db, 'investigators', userId);
      setDoc(
        userDocRef,
        {
          score: 0,
          currentLevel: 'L0',
          completedLevels: ['L0'],
          currentBadge: 'Apprentice Detective',
          achievements: [],
          lastVisited: new Date().toISOString(),
        },
        { merge: true }
      ).catch(() => {});

      // Clean legacy username document if it existed
      cleanOrphanDoc(userProfile.username);
      cleanOrphanDoc(`agent_${userProfile.username.toLowerCase().replace(/[^a-z0-9_]/g, '_')}`);
    } catch (e) {
      // Firebase fallback
    }

    // 5. Close Modal & Redirect to Level 0 (Orientation)
    setIsResetModalOpen(false);
    setViewMode('INVESTIGATION');
  }, [userId, userProfile.username, cleanOrphanDoc]);

  // Metrics
  const totalTasksCount = CASE_LEVELS.reduce((acc, lvl) => acc + lvl.tasks.length, 0);
  const solvedTasksCount = Object.keys(solvedTasks).filter(k => solvedTasks[k]).length;
  const isCaseCompleted = currentLevel.tasks.every(t => solvedTasks[t.id]);
  const hasNextTask = taskIndex < currentLevel.tasks.length - 1;
  const isAllCasesCleared = CASE_LEVELS.every(lvl => lvl.tasks.every(t => Boolean(solvedTasks[t.id])));

  // Completed level indices (e.g. [0, 1, 2, ...])
  const completedLevels = useMemo(() => {
    return CASE_LEVELS.filter(lvl => lvl.tasks.every(t => Boolean(solvedTasks[t.id]))).map(lvl => lvl.id);
  }, [solvedTasks]);

  // Derived accurate unlocked journal entries count (1 to 10)
  const unlockedJournalCount = useMemo(() => {
    return JOURNAL_ENTRIES.filter(e => isEntryUnlocked(e, unlockedJournalIds, completedLevels)).length;
  }, [unlockedJournalIds, completedLevels]);

  // Current User profile formatted for Firebase Realtime Leaderboard & Presence
  const leaderboardCurrentUser = useMemo(() => {
    const unlockedBadges = achievements.filter(a => a.isUnlocked);
    const highestBadge = unlockedBadges[unlockedBadges.length - 1]?.title || userProfile.rankTitle || 'Junior Sleuth';
    const unlockedTitles = unlockedBadges.map(a => a.title);

    return {
      userId, // Persistent Device User ID
      username: userProfile.username,
      avatarIcon: userProfile.avatarId,
      currentBadge: highestBadge,
      score,
      achievements: unlockedTitles.length > 0 ? unlockedTitles : ['Orientation Cleared'],
    };
  }, [userId, userProfile, achievements, score]);

  // Launch a level from the dashboard
  const handleSelectLevelToPlay = (targetLevelIndex: number) => {
    setLevelIndex(targetLevelIndex);
    setTaskValidation(null);
    setViewMode('INVESTIGATION');
  };

  return (
    <>
      {/* VIEW: PRECINCT ACTIVE DIRECTORY & REAL-TIME ROSTER */}
      {viewMode === 'ROSTER' ? (
        <PrecinctDirectory
          currentUser={leaderboardCurrentUser}
          onNavigateBack={() => setViewMode('DASHBOARD')}
        />
      ) : viewMode === 'VICTORY' ? (
        /* VIEW: VICTORY CELEBRATION PAGE */
        <VictoryPage
          score={score}
          totalQueriesExecuted={totalQueriesExecuted}
          userProfile={userProfile}
          onRetainProfile={() => setViewMode('DASHBOARD')}
          onResetInvestigation={() => {
            handleResetProgress();
            setViewMode('DASHBOARD');
          }}
        />
      ) : viewMode === 'DASHBOARD' ? (
        /* VIEW 1: TITLE PAGE & LANDING DASHBOARD */
        <TitlePage
          levels={CASE_LEVELS}
          currentLevelIndex={levelIndex}
          solvedTasks={solvedTasks}
          hintsUsed={hintsUsed}
          score={score}
          unlockedJournalCount={unlockedJournalCount}
          userProfile={userProfile}
          onUpdateProfile={handleUpdateProfile}
          achievements={achievements}
          onPlayCurrentLevel={() => setViewMode('INVESTIGATION')}
          onSelectLevelToPlay={handleSelectLevelToPlay}
          onOpenJournal={() => setIsJournalOpen(true)}
          onOpenVictoryPage={() => setViewMode('VICTORY')}
          onOpenRoster={() => setViewMode('ROSTER')}
          isAllCasesCleared={isAllCasesCleared}
        />
      ) : (
        /* VIEW 2: INVESTIGATION WORKSPACE (Alto Low-Poly Frosted Console) */
        <GameplayConsole
          levels={CASE_LEVELS}
          currentLevel={currentLevel}
          currentLevelIndex={levelIndex}
          onSelectLevel={index => {
            setLevelIndex(index);
            setTaskValidation(null);
          }}
          currentTask={currentTask}
          currentTaskIndex={taskIndex}
          onSelectTask={handleSelectTask}
          score={score}
          solvedTasks={solvedTasks}
          solvedTasksCount={solvedTasksCount}
          totalTasksCount={totalTasksCount}
          hintsUsed={hintsUsed}
          onUseHint={handleUseHint}
          cluesDiscovered={cluesDiscovered[currentLevel.id] || []}
          query={query}
          onQueryChange={setQuery}
          onExecuteQuery={handleExecuteQuery}
          isExecuting={isExecuting}
          lastResult={lastResult}
          taskValidation={taskValidation}
          onAdvanceTask={handleAdvanceTask}
          hasNextTask={hasNextTask}
          isCaseCompleted={isCaseCompleted}
          onOpenVictoryModal={() => setIsVictoryModalOpen(true)}
          onOpenJournal={() => {
            setIsJournalOpen(true);
            setHasUnreadJournal(false);
          }}
          onResetProgress={handleResetProgress}
          hasUnreadJournal={hasUnreadJournal}
          onNavigateToDashboard={() => setViewMode('DASHBOARD')}
        />
      )}

      {/* Global Detective's Journal Modal */}
      <JournalModal
        isOpen={isJournalOpen}
        onClose={() => setIsJournalOpen(false)}
        entries={JOURNAL_ENTRIES}
        unlockedEntryIds={unlockedJournalIds}
        completedLevels={completedLevels}
        onInsertCodeSnippet={code => {
          setQuery(code);
          setIsJournalOpen(false);
          setViewMode('INVESTIGATION');
        }}
      />

      {/* Global Case Solved Victory Modal */}
      <CaseVictoryModal
        isOpen={isVictoryModalOpen}
        onClose={() => setIsVictoryModalOpen(false)}
        caseLevel={currentLevel}
        totalScore={score}
        pointsEarnedInCase={currentLevel.tasks.reduce((sum, t) => sum + t.points, 0)}
        onProceedNextCase={handleProceedNextCase}
        onOpenJournal={() => setIsJournalOpen(true)}
        hasNextCase={levelIndex < CASE_LEVELS.length - 1}
        onOpenGrandVictory={() => setViewMode('VICTORY')}
      />

      {/* Global Wipe Case Progress & Investigation Data Confirmation Modal */}
      <ResetConfirmModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirmReset={handleConfirmReset}
      />
    </>
  );
}
