import React, { useState } from 'react';
import { CaseLevel, UserProfile, AchievementBadge } from '../types';
import { LowPolyAvatarIcon } from './LowPolyAvatarIcon';
import { ProfileModal } from './ProfileModal';
import { HowToPlayModal } from './HowToPlayModal';
import { CaseCardsGrid } from './CaseCardsGrid';
import { AltoHeroIllustration } from './AltoHeroIllustration';
import { 
  Play, 
  HelpCircle, 
  Trophy, 
  Award, 
  BookOpen, 
  Shield, 
  Sparkles,
  Database,
  CheckCircle2,
  Lock,
  Compass,
  ArrowRight,
  TrendingUp,
  FileSearch,
  ExternalLink
} from 'lucide-react';

interface TitlePageProps {
  levels: CaseLevel[];
  currentLevelIndex: number;
  solvedTasks: Record<string, boolean>;
  hintsUsed: Record<string, boolean>;
  score: number;
  unlockedJournalCount: number;
  userProfile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
  achievements: AchievementBadge[];
  onPlayCurrentLevel: () => void;
  onSelectLevelToPlay: (levelIndex: number) => void;
  onOpenJournal: () => void;
  onOpenVictoryPage?: () => void;
  onOpenRoster?: () => void;
  isAllCasesCleared?: boolean;
}

export const TitlePage: React.FC<TitlePageProps> = ({
  levels,
  currentLevelIndex,
  solvedTasks,
  hintsUsed,
  score,
  unlockedJournalCount,
  userProfile,
  onUpdateProfile,
  achievements,
  onPlayCurrentLevel,
  onSelectLevelToPlay,
  onOpenJournal,
  onOpenVictoryPage,
  onOpenRoster,
  isAllCasesCleared,
}) => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isHowToPlayOpen, setIsHowToPlayOpen] = useState(false);

  const activeLevel = levels[currentLevelIndex] || levels[0];
  const unlockedBadgesCount = achievements.filter(a => a.isUnlocked).length;

  // Calculate metrics
  const totalTasks = levels.reduce((sum, l) => sum + l.tasks.length, 0);
  const solvedCount = Object.keys(solvedTasks).filter(k => solvedTasks[k]).length;
  const casesCompletedCount = levels.filter(lvl => lvl.tasks.every(t => solvedTasks[t.id])).length;
  const progressPercent = Math.round((solvedCount / totalTasks) * 100);

  // Dynamic rank based on score
  const getDetectiveRank = (points: number) => {
    if (points >= 600) return 'Chief Forensic Analyst';
    if (points >= 350) return 'Senior Investigator';
    if (points >= 150) return 'Junior Sleuth';
    return 'Rookie Detective';
  };

  const currentRank = getDetectiveRank(score);

  return (
    <div 
      className="min-h-screen w-full relative overflow-x-hidden flex flex-col font-sans text-stone-100 selection:bg-amber-500/20 selection:text-amber-200"
      style={{
        background: 'linear-gradient(175deg, #7F9F8E 0%, #8BA898 35%, #B5C4B9 70%, #D9D2C5 100%)',
      }}
    >
      {/* Low-Poly Alto-Inspired Geometric Mountain Background Silhouette Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25 select-none">
        <svg
          className="absolute -top-10 left-1/2 -translate-x-1/2 w-[1400px] h-[700px]"
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

      {/* A. Header Bar */}
      <header className="relative z-20 w-full px-4 sm:px-8 py-3.5 flex items-center justify-between border-b border-white/10 backdrop-blur-md bg-stone-950/20">
        {/* Game Title & Branding */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center shadow-md">
            <Database className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg sm:text-xl tracking-wider text-stone-100 uppercase font-sans">
                SQL SLEUTH
              </span>
              
            </div>
            <p className="text-[11px] text-stone-300/80 font-mono tracking-wide hidden sm:block">
              Relational Database Crime-Solving Odyssey
            </p>
          </div>
        </div>

        {/* Action Controls & User Profile Widget */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Quick Field Manual Button */}
          <button
            onClick={onOpenJournal}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold text-stone-200 hover:text-stone-100 bg-stone-900/35 hover:bg-stone-900/55 border border-white/15 transition-all flex items-center gap-1.5 shadow-xs"
          >
            <BookOpen className="w-4 h-4 text-emerald-300" />
            <span className="hidden sm:inline">Field Manual</span>
            <span className="text-[10px] font-mono text-amber-300">({unlockedJournalCount})</span>
          </button>

          {/* Active Precinct Directory / Leaderboard CTA */}
          {onOpenRoster && (
            <button
              onClick={onOpenRoster}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold text-stone-200 hover:text-stone-100 bg-stone-900/35 hover:bg-stone-900/55 border border-white/15 transition-all flex items-center gap-1.5 shadow-xs"
              title="Active Detective Roster & Real-Time Leaderboard"
            >
              <Trophy className="w-4 h-4 text-amber-300" />
              <span className="hidden sm:inline">Precinct Roster</span>
            </button>
          )}

          {/* How to Play CTA */}
          <button
            onClick={() => setIsHowToPlayOpen(true)}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold text-stone-200 hover:text-stone-100 bg-stone-900/35 hover:bg-stone-900/55 border border-white/15 transition-all flex items-center gap-1.5 shadow-xs"
          >
            <HelpCircle className="w-4 h-4 text-amber-300" />
            <span className="hidden sm:inline">How to Play</span>
          </button>

          {/* User Profile Widget (Click opens ProfileModal) */}
          <button
            onClick={() => setIsProfileModalOpen(true)}
            className="p-1 sm:pr-3.5 rounded-2xl bg-stone-900/40 hover:bg-stone-900/60 border border-white/20 transition-all flex items-center gap-2.5 shadow-md group active:scale-95"
            title="Edit Detective Profile & Review Badges"
          >
            <div className="w-9 h-9 rounded-xl bg-stone-800/80 p-0.5 flex items-center justify-center border border-amber-500/40 shadow-inner overflow-hidden">
              <LowPolyAvatarIcon avatarId={userProfile.avatarId} size={32} />
            </div>

            <div className="text-left hidden sm:block">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-stone-100 group-hover:text-amber-300 transition-colors">
                  {userProfile.username}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </div>
              <div className="flex items-center gap-2 text-[10px] text-stone-300/80 font-mono">
                <span className="text-amber-300 font-medium">{currentRank}</span>
                <span>•</span>
                <span>{unlockedBadgesCount} Badges</span>
              </div>
            </div>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8 sm:space-y-10">
        
        {/* B. Hero / Welcome Section */}
        <section 
          className="rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl relative overflow-hidden text-stone-100"
          style={{
            backgroundColor: 'rgba(79, 109, 97, 0.88)',
            backdropFilter: 'blur(16px)',
          }}
        >
          {/* Subtle Ambient Radial Highlight */}
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  RDBMS Interactive Case Simulator
                </span>
                <span className="text-xs font-mono text-emerald-100/70 hidden sm:inline">
                  ANSI / SQLite Engine
                </span>
              </div>

              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white font-sans leading-tight">
                  SQL SLEUTH
                </h1>
                <p className="text-base sm:text-lg font-semibold text-amber-200/90 mt-1">
                  Solve Crimes, Query by Query.
                </p>
                <p className="text-xs sm:text-sm text-stone-200/80 mt-2 max-w-xl font-normal leading-relaxed">
                  Step into the boots of a cyber-forensics investigator. Search crime scene evidence, link access door logs using foreign keys, and audit illicit financial ledgers through standard SQL syntax.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                {/* Terracotta Orange Primary Action Button */}
                <button
                  type="button"
                  onClick={onPlayCurrentLevel}
                  className="px-7 py-3 rounded-2xl font-extrabold text-sm sm:text-base text-stone-950 flex items-center gap-2.5 shadow-xl transition-all hover:brightness-110 active:scale-95 tracking-wide animate-pulse hover:animate-none"
                  style={{
                    backgroundColor: '#D97043',
                    backgroundImage: 'linear-gradient(135deg, #E88255 0%, #D97043 50%, #C85A32 100%)',
                    boxShadow: '0 8px 24px rgba(200, 90, 50, 0.45)',
                  }}
                >
                  <Play className="w-5 h-5 fill-current" />
                  <span>{solvedCount > 0 ? 'RESUME INVESTIGATION' : 'PLAY NOW'}</span>
                </button>

                {/* Secondary CTA: Field Manual / How to Play */}
                <button
                  type="button"
                  onClick={onOpenJournal}
                  className="px-4 py-3 rounded-2xl font-semibold text-xs sm:text-sm text-stone-200 hover:text-white bg-stone-900/35 hover:bg-stone-900/55 border border-white/15 transition-all flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4 text-emerald-300" />
                  <span>FIELD MANUAL</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsHowToPlayOpen(true)}
                  className="px-4 py-3 rounded-2xl font-semibold text-xs sm:text-sm text-stone-200 hover:text-white bg-stone-900/35 hover:bg-stone-900/55 border border-white/15 transition-all flex items-center gap-2"
                >
                  <HelpCircle className="w-4 h-4 text-amber-300" />
                  <span>TUTORIAL</span>
                </button>
              </div>
            </div>

            {/* Right Hero Visual Column: Low-Poly Landscape & Floating Schema Cubes */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <div className="rounded-2xl border border-white/20 shadow-xl overflow-hidden bg-stone-900/30 p-1">
                <AltoHeroIllustration />
              </div>
            </div>
          </div>
        </section>

        {/* D. Detective's Achievements & Stats Overview */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-800 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-stone-700" />
              <span>FORENSIC DOSSIER & PERFORMANCE OVERVIEW</span>
            </h2>
            <span className="text-[11px] font-mono text-stone-700">
              Clearance: <strong className="text-stone-900">{progressPercent}%</strong>
            </span>
          </div>

          {/* 4 Stats Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {/* Stat 1: Cases Cleared */}
            <div 
              className="p-4 rounded-2xl border border-white/20 shadow-md flex items-center gap-3.5"
              style={{
                backgroundColor: 'rgba(79, 109, 97, 0.85)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <div className="w-10 h-10 rounded-xl bg-stone-900/40 border border-white/10 flex items-center justify-center text-emerald-300 shrink-0">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase text-stone-300/80">Cases Solved</div>
                <div className="text-lg sm:text-xl font-bold font-mono text-white">
                  {casesCompletedCount} <span className="text-xs text-stone-300">/ {levels.length}</span>
                </div>
              </div>
            </div>

            {/* Stat 2: Cumulative Score */}
            <div 
              className="p-4 rounded-2xl border border-white/20 shadow-md flex items-center gap-3.5"
              style={{
                backgroundColor: 'rgba(79, 109, 97, 0.85)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <div className="w-10 h-10 rounded-xl bg-stone-900/40 border border-white/10 flex items-center justify-center text-amber-300 shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase text-stone-300/80">Total Score</div>
                <div className="text-lg sm:text-xl font-bold font-mono text-amber-300">
                  {score} <span className="text-xs text-stone-300">pts</span>
                </div>
              </div>
            </div>

            {/* Stat 3: Field Manual Entries */}
            <div 
              className="p-4 rounded-2xl border border-white/20 shadow-md flex items-center gap-3.5"
              style={{
                backgroundColor: 'rgba(79, 109, 97, 0.85)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <div className="w-10 h-10 rounded-xl bg-stone-900/40 border border-white/10 flex items-center justify-center text-sky-300 shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase text-stone-300/80">Concepts Mastered</div>
                <div className="text-lg sm:text-xl font-bold font-mono text-white">
                  {unlockedJournalCount} <span className="text-xs text-stone-300">Notes</span>
                </div>
              </div>
            </div>

            {/* Stat 4: Detective Rank */}
            <div 
              className="p-4 rounded-2xl border border-white/20 shadow-md flex items-center gap-3.5"
              style={{
                backgroundColor: 'rgba(79, 109, 97, 0.85)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <div className="w-10 h-10 rounded-xl bg-stone-900/40 border border-white/10 flex items-center justify-center text-orange-300 shrink-0">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase text-stone-300/80">Detective Rank</div>
                <div className="text-xs sm:text-sm font-bold text-amber-200 truncate max-w-[120px]">
                  {currentRank}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* C. Level / Case Selection Dashboard (Cards Grid) */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-stone-900 font-sans">
                INVESTIGATION CASE FILES
              </h2>
              <p className="text-xs text-stone-700 font-medium">
                Select an unlocked crime case to launch the interactive SQL query console and solve the mystery
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-stone-700 bg-stone-900/10 px-3 py-1.5 rounded-full border border-stone-800/10 self-start sm:self-auto">
              <Shield className="w-3.5 h-3.5 text-amber-700" />
              <span>Sequential Clearance Enforced</span>
            </div>
          </div>

          {/* All Cases Cleared Celebration Banner */}
          {isAllCasesCleared && onOpenVictoryPage && (
            <div 
              onClick={onOpenVictoryPage}
              className="p-4 rounded-2xl bg-gradient-to-r from-amber-600/35 via-emerald-800/45 to-amber-600/35 border border-amber-400/50 shadow-lg cursor-pointer hover:brightness-110 transition-all flex flex-col sm:flex-row items-center justify-between gap-3 text-stone-100"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/30 border border-amber-300 flex items-center justify-center text-amber-300 shrink-0 shadow-inner">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-white text-sm sm:text-base tracking-wide flex items-center gap-2">
                    <span>OPERATION COMPLETE: ALL 10 CASES RESOLVED!</span>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                  </h4>
                  <p className="text-xs text-stone-200">
                    Syndicate officially dismantled. Click to view Victory & Celebration Page with Game Credits.
                  </p>
                </div>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenVictoryPage();
                }}
                className="px-5 py-2.5 rounded-xl font-bold text-xs text-stone-950 flex items-center gap-1.5 shrink-0 shadow-md transition-all active:scale-95"
                style={{
                  backgroundColor: '#D97043',
                  backgroundImage: 'linear-gradient(135deg, #E88255 0%, #D97043 50%, #C85A32 100%)',
                }}
              >
                <span>Victory Ceremony</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Interactive Case Cards Grid */}
          <CaseCardsGrid
            levels={levels}
            currentLevelIndex={currentLevelIndex}
            solvedTasks={solvedTasks}
            hintsUsed={hintsUsed}
            onSelectLevelToPlay={onSelectLevelToPlay}
          />
        </section>

        {/* Unlocked Badges Showcase Preview */}
        <section 
          className="rounded-3xl p-5 sm:p-6 border border-white/20 shadow-xl"
          style={{
            backgroundColor: 'rgba(79, 109, 97, 0.85)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
            <div className="flex items-center gap-2.5">
              <Trophy className="w-5 h-5 text-amber-300" />
              <h3 className="text-sm font-bold text-white uppercase font-sans tracking-wide">
                Detective Accolades & Badges
              </h3>
            </div>
            <button
              onClick={() => setIsProfileModalOpen(true)}
              className="text-xs font-mono text-amber-300 hover:text-amber-200 flex items-center gap-1 transition-colors"
            >
              <span>Manage Profile</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {achievements.map((badge) => (
              <div
                key={badge.id}
                className={`p-3 rounded-2xl border flex flex-col justify-between gap-2 text-xs transition-all ${
                  badge.isUnlocked
                    ? 'bg-stone-900/40 border-amber-500/40 text-stone-100 shadow-md'
                    : 'bg-stone-950/30 border-stone-800/50 text-stone-400 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-stone-900/60 text-stone-300 border border-white/10">
                    {badge.category}
                  </span>
                  {badge.isUnlocked ? (
                    <span className="text-[10px] font-mono font-bold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Earned
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono text-stone-500 flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      Locked
                    </span>
                  )}
                </div>

                <div>
                  <h4 className={`font-bold text-xs ${badge.isUnlocked ? 'text-amber-300' : 'text-stone-300'}`}>
                    {badge.title}
                  </h4>
                  <p className="text-[11px] text-stone-300/80 mt-1 line-clamp-2 leading-tight">
                    {badge.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer Info */}
      <footer className="relative z-10 w-full px-6 py-6 text-center text-xs text-stone-700/80 font-mono border-t border-stone-800/10">
        SQL Sleuth: Detective's Data Adventure • Relational Database Educational System • Sherylbee
      </footer>

      {/* Profile Modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        userProfile={userProfile}
        onSaveProfile={onUpdateProfile}
        achievements={achievements}
        playerScore={score}
      />

      {/* How to Play Modal */}
      <HowToPlayModal
        isOpen={isHowToPlayOpen}
        onClose={() => setIsHowToPlayOpen(false)}
        onPlayNow={() => {
          setIsHowToPlayOpen(false);
          onPlayCurrentLevel();
        }}
      />
    </div>
  );
};
