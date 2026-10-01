import React, { useState, useMemo } from 'react';
import { 
  Trophy, 
  Search, 
  Users, 
  Radio, 
  Award, 
  Sparkles, 
  ArrowLeft, 
  AlertCircle,
  FolderSearch,
  Radar
} from 'lucide-react';
import { useLiveLeaderboard, CurrentUserLeaderboardProfile } from '../hooks/useLiveLeaderboard';
import { LowPolyAvatarIcon } from './LowPolyAvatarIcon';

interface PrecinctDirectoryProps {
  currentUser: CurrentUserLeaderboardProfile;
  onNavigateBack: () => void;
}

export const PrecinctDirectory: React.FC<PrecinctDirectoryProps> = ({
  currentUser,
  onNavigateBack,
}) => {
  // Step 1 Hook: Direct Cloud Firestore connection with zero mock data
  const {
    players,
    isConnected,
    isLoading,
    error,
    onlineCount,
    totalCount,
  } = useLiveLeaderboard(currentUser);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterMode, setFilterMode] = useState<'ALL' | 'ONLINE' | 'TOP10'>('ALL');
  const [sortBy, setSortBy] = useState<'SCORE' | 'RECENT'>('SCORE');

  // Filtered and sorted roster
  const displayedPlayers = useMemo(() => {
    let list = [...players];

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.username.toLowerCase().includes(q) ||
          p.currentBadge.toLowerCase().includes(q) ||
          p.achievements.some((a) => a.toLowerCase().includes(q))
      );
    }

    // Filter by mode
    if (filterMode === 'ONLINE') {
      list = list.filter((p) => p.isOnline);
    } else if (filterMode === 'TOP10') {
      list = list.slice(0, 10);
    }

    // Sort
    if (sortBy === 'SCORE') {
      list.sort((a, b) => b.score - a.score);
    } else if (sortBy === 'RECENT') {
      list.sort((a, b) => new Date(b.lastVisited || 0).getTime() - new Date(a.lastVisited || 0).getTime());
    }

    return list;
  }, [players, searchQuery, filterMode, sortBy]);

  // Rank styling helper
  const getRankBadgeStyle = (rankIndex: number) => {
    if (rankIndex === 0) {
      return {
        bg: 'bg-gradient-to-br from-amber-400 to-amber-600 text-stone-950 shadow-amber-500/40 border-amber-300',
        label: '#1',
      };
    }
    if (rankIndex === 1) {
      return {
        bg: 'bg-gradient-to-br from-stone-200 to-stone-400 text-stone-900 shadow-stone-400/30 border-stone-200',
        label: '#2',
      };
    }
    if (rankIndex === 2) {
      return {
        bg: 'bg-gradient-to-br from-[#D97043] to-[#B84A39] text-white shadow-orange-500/30 border-orange-300',
        label: '#3',
      };
    }
    return {
      bg: 'bg-stone-900/60 text-stone-300 border-white/10',
      label: `#${rankIndex + 1}`,
    };
  };

  return (
    <div 
      className="min-h-screen w-full font-sans text-stone-100 flex flex-col items-center justify-start py-8 sm:py-12 px-4 sm:px-6 relative overflow-x-hidden selection:bg-amber-500/20 selection:text-amber-200"
      style={{
        background: 'linear-gradient(175deg, #7F9F8E 0%, #8BA898 30%, #B5C4B9 65%, #D9D2C5 100%)',
      }}
    >
      {/* Background Low-Poly Mountain Silhouettes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20 select-none">
        <svg
          className="absolute -top-10 left-1/2 -translate-x-1/2 w-[1600px] h-[750px]"
          viewBox="0 0 1600 750"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon points="800,30 420,550 1180,550" fill="#4F6D61" opacity="0.45" />
          <polygon points="800,30 1180,550 800,550" fill="#3D564C" opacity="0.55" />
          <polygon points="360,140 60,650 680,650" fill="#5F8073" opacity="0.35" />
          <polygon points="1240,120 940,650 1540,650" fill="#3D564C" opacity="0.4" />
        </svg>

        <svg
          className="absolute bottom-0 left-0 w-full h-[400px]"
          viewBox="0 0 1440 400"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon points="0,200 240,260 480,180 720,240 960,160 1200,220 1440,140 1440,400 0,400" fill="#4F6D61" opacity="0.5" />
          <polygon points="0,260 320,200 640,280 960,220 1280,290 1440,250 1440,400 0,400" fill="#3D564C" opacity="0.75" />
          <polygon points="0,310 200,290 500,340 800,300 1100,330 1440,300 1440,400 0,400" fill="#2F443B" opacity="0.85" />
        </svg>
      </div>

      <div className="relative z-10 max-w-5xl w-full flex flex-col gap-6">
        {/* Top Navigation Bar */}
        <div className="w-full flex items-center justify-between">
          <button
            onClick={onNavigateBack}
            className="px-4 py-2 rounded-xl bg-stone-900/60 hover:bg-stone-900 text-stone-200 hover:text-white border border-white/15 transition-all flex items-center gap-2 text-xs font-semibold shadow-md active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-amber-300" />
            <span>Back to Dashboard</span>
          </button>

          {/* Firebase Cloud Sync Status */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900/60 border border-white/15 text-xs font-mono">
            <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
            <span className="text-stone-300">
              {isConnected ? 'Firestore Cloud Connection Active' : 'Connecting to Firestore...'}
            </span>
          </div>
        </div>

        {/* Hero Header Section with Faceted Golden Low-Poly Trophy */}
        <div 
          className="w-full rounded-[20px] p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6"
          style={{
            backgroundColor: 'rgba(79, 109, 97, 0.88)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(217, 210, 197, 0.3)',
          }}
        >
          {/* Header Copy */}
          <div className="flex-1 text-center md:text-left space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-400/40 text-emerald-200 text-xs font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>PRECINCT 42 · LIVE FIRESTORE DIRECTORY</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight uppercase font-sans drop-shadow-sm">
              ACTIVE DETECTIVE ROSTER & LEADERBOARD
            </h1>

            <p className="text-xs sm:text-sm text-stone-200/90 leading-relaxed font-sans max-w-xl">
              Real-time synchronization with Cloud Firestore. Every score, progression milestone, and online heartbeat is streamed directly from the central precinct database.
            </p>

            {/* Sub-stat Bar */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
              <div className="px-3.5 py-1.5 rounded-xl bg-stone-900/40 border border-white/10 flex items-center gap-2 text-xs font-mono">
                <Users className="w-4 h-4 text-sky-300" />
                <span className="text-stone-300">Registered Sleuths:</span>
                <strong className="text-white font-bold">{totalCount}</strong>
              </div>

              <div className="px-3.5 py-1.5 rounded-xl bg-stone-900/40 border border-white/10 flex items-center gap-2 text-xs font-mono">
                <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span className="text-stone-300">Currently Active:</span>
                <strong className="text-emerald-300 font-bold">{onlineCount} Online</strong>
              </div>
            </div>
          </div>

          {/* Low-Poly Faceted Golden/Copper Trophy SVG Graphic */}
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center shrink-0 filter drop-shadow-2xl">
            <div className="absolute inset-0 bg-amber-400/25 rounded-full blur-2xl animate-pulse" />
            <svg
              viewBox="0 0 160 160"
              className="w-full h-full relative z-10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Trophy Cup - Geometric Low-Poly Facets */}
              <polygon points="80,18 120,35 110,80 80,102 50,80 40,35" fill="#E88255" />
              <polygon points="80,18 120,35 80,65" fill="#FAD961" />
              <polygon points="80,18 40,35 80,65" fill="#FFE27A" />
              <polygon points="40,35 50,80 80,65" fill="#F2C94C" />
              <polygon points="120,35 110,80 80,65" fill="#D97043" />
              <polygon points="50,80 80,102 80,65" fill="#E5B537" />
              <polygon points="110,80 80,102 80,65" fill="#C85A32" />

              {/* Handles */}
              <polygon points="42,38 22,48 20,72 40,78 44,70 28,66 30,52 44,46" fill="#D97043" />
              <polygon points="42,38 22,48 30,52 44,46" fill="#F2C94C" />
              <polygon points="118,38 138,48 140,72 120,78 116,70 132,66 130,52 116,46" fill="#B84A39" />
              <polygon points="118,38 138,48 130,52 116,46" fill="#E88255" />

              {/* Stem & Pedestal */}
              <polygon points="74,102 86,102 90,122 70,122" fill="#D97043" />
              <polygon points="74,102 80,102 80,122 70,122" fill="#F2C94C" />
              <polygon points="80,102 86,102 90,122 80,122" fill="#C85A32" />
              <polygon points="55,122 105,122 118,142 42,142" fill="#3D564C" />
              <polygon points="55,122 80,122 80,142 42,142" fill="#4F6D61" />
              <polygon points="80,122 105,122 118,142 80,142" fill="#2E443A" />
              <polygon points="42,142 118,142 124,150 36,150" fill="#1E2E28" />

              {/* Star Emblem */}
              <polygon points="80,48 83,56 92,57 85,63 87,71 80,66 73,71 75,63 68,57 77,56" fill="#1C2B24" />
              <polygon points="80,50 82,56 80,60 78,56" fill="#FAD961" />
              <polygon points="80,60 85,63 80,65 75,63" fill="#D97043" />
            </svg>
          </div>
        </div>

        {/* Error State Banner */}
        {error && (
          <div 
            className="w-full rounded-2xl p-4 flex items-center gap-3 text-rose-200 border"
            style={{
              backgroundColor: 'rgba(58, 28, 24, 0.9)',
              borderColor: 'rgba(184, 74, 57, 0.6)',
            }}
          >
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
            <div className="text-xs font-mono">
              <strong>Notice:</strong> {error}
            </div>
          </div>
        )}

        {/* Search, Filter & Sort Controls */}
        <div 
          className="w-full rounded-2xl p-4 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3 text-stone-100"
          style={{
            backgroundColor: 'rgba(79, 109, 97, 0.82)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(217, 210, 197, 0.25)',
          }}
        >
          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-stone-300 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search detectives or badges..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-stone-900/60 border border-white/15 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          {/* Filter Pills & Sort Selector */}
          <div className="w-full sm:w-auto flex flex-wrap items-center justify-between sm:justify-end gap-2">
            <div className="flex items-center gap-1 bg-stone-900/50 p-1 rounded-xl border border-white/10 text-xs">
              <button
                onClick={() => setFilterMode('ALL')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                  filterMode === 'ALL' ? 'bg-amber-500 text-stone-950 font-bold shadow-sm' : 'text-stone-300 hover:text-white'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterMode('ONLINE')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                  filterMode === 'ONLINE' ? 'bg-emerald-500 text-stone-950 font-bold shadow-sm' : 'text-stone-300 hover:text-white'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-950" />
                Online
              </button>
              <button
                onClick={() => setFilterMode('TOP10')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                  filterMode === 'TOP10' ? 'bg-amber-500 text-stone-950 font-bold shadow-sm' : 'text-stone-300 hover:text-white'
                }`}
              >
                Top 10
              </button>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-stone-200">
              <span className="text-stone-300 font-mono text-[11px]">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-stone-900/70 border border-white/15 text-xs rounded-xl px-2.5 py-1.5 text-white focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                <option value="SCORE">Highest Score</option>
                <option value="RECENT">Recent Activity</option>
              </select>
            </div>
          </div>
        </div>

        {/* Directory Grid / Roster View */}
        <div className="w-full space-y-3">
          {/* 1. Loading Skeleton State */}
          {isLoading ? (
            <div 
              className="rounded-2xl p-10 text-center text-stone-200 shadow-md flex flex-col items-center justify-center gap-4"
              style={{
                backgroundColor: 'rgba(79, 109, 97, 0.78)',
                border: '1px solid rgba(217, 210, 197, 0.25)',
              }}
            >
              <div className="relative w-12 h-12 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-amber-400/40 animate-ping" />
                <Radar className="w-8 h-8 text-amber-300 animate-spin" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold font-mono tracking-wider text-amber-200 uppercase">
                  Connecting to Precinct Central Database...
                </p>
                <p className="text-xs text-stone-300/80">Streaming active investigator profiles from Cloud Firestore</p>
              </div>

              {/* Pulsing Skeleton Cards */}
              <div className="w-full max-w-xl space-y-2 pt-2">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="h-16 w-full rounded-xl bg-stone-900/40 border border-white/10 animate-pulse" />
                ))}
              </div>
            </div>
          ) : displayedPlayers.length === 0 ? (
            /* 2. Empty Database State (Zero Fake Records) */
            <div 
              className="rounded-2xl p-12 text-center text-stone-200 shadow-md flex flex-col items-center justify-center gap-4 border"
              style={{
                backgroundColor: 'rgba(45, 66, 56, 0.95)',
                backdropFilter: 'blur(20px)',
                borderColor: 'rgba(217, 210, 197, 0.25)',
              }}
            >
              {/* Low-Poly Search Light / Folder SVG Icon */}
              <div className="relative w-20 h-20 flex items-center justify-center filter drop-shadow-md">
                <svg
                  viewBox="0 0 80 80"
                  className="w-full h-full"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Folder Tab & Body */}
                  <polygon points="12,24 32,24 38,32 68,32 68,64 12,64" fill="#3D564C" />
                  <polygon points="16,32 68,32 64,64 12,64" fill="#4F6D61" />
                  <polygon points="16,36 64,36 60,60 20,60" fill="#2E443A" />
                  {/* Search Light Ray */}
                  <polygon points="40,16 68,56 46,62" fill="#D97043" opacity="0.4" />
                  <polygon points="40,16 58,48 48,52" fill="#FAD961" opacity="0.6" />
                  {/* Lens Rim */}
                  <polygon points="34,16 46,16 48,26 32,26" fill="#F2C94C" />
                </svg>
              </div>

              <div className="space-y-1.5 max-w-md">
                <h3 className="text-base sm:text-lg font-extrabold text-[#D9D2C5] tracking-wide uppercase font-sans">
                  NO DETECTIVE RECORDS FOUND
                </h3>
                <p className="text-xs text-stone-300/80 leading-relaxed font-sans">
                  The precinct directory is currently clear. Complete your first cold case in the console to record your name in the logs!
                </p>
              </div>

              <button
                onClick={onNavigateBack}
                className="mt-2 px-5 py-2.5 rounded-xl text-stone-950 font-bold text-xs shadow-lg transition-all active:scale-95 cursor-pointer flex items-center gap-2"
                style={{
                  backgroundColor: '#D97043',
                  backgroundImage: 'linear-gradient(135deg, #E88255 0%, #D97043 50%, #C85A32 100%)',
                }}
              >
                <span>OPEN INVESTIGATION WORKSPACE</span>
              </button>
            </div>
          ) : (
            /* 3. Real Player Map Function */
            displayedPlayers.map((detective, index) => {
              const rankInfo = getRankBadgeStyle(index);
              const isSelf = detective.id === currentUser.userId;

              return (
                <div
                  key={detective.id}
                  className={`w-full rounded-2xl p-4 sm:p-5 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all duration-200 ${
                    isSelf 
                      ? 'ring-2 ring-amber-400/80 bg-stone-900/85' 
                      : 'hover:bg-stone-900/50'
                  }`}
                  style={{
                    backgroundColor: isSelf ? 'rgba(45, 66, 56, 0.95)' : 'rgba(79, 109, 97, 0.82)',
                    backdropFilter: 'blur(16px)',
                    border: isSelf ? '1px solid rgba(245, 158, 11, 0.6)' : '1px solid rgba(217, 210, 197, 0.25)',
                  }}
                >
                  {/* Left: Rank Badge + Avatar + Names */}
                  <div className="flex items-center gap-3.5 w-full sm:w-auto">
                    {/* Numerical Rank Badge */}
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono font-extrabold text-xs border shadow-sm shrink-0 ${rankInfo.bg}`}
                    >
                      {rankInfo.label}
                    </div>

                    {/* Low-Poly Avatar + Online Presence Indicator */}
                    <div className="relative shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-stone-900/60 border border-white/15 flex items-center justify-center p-1.5 shadow-inner">
                        <LowPolyAvatarIcon avatarId={detective.avatarIcon || 'detective'} className="w-full h-full" />
                      </div>
                      {/* Presence Dot */}
                      <span
                        title={detective.isOnline ? 'Online now' : 'Offline'}
                        className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-stone-900 ${
                          detective.isOnline
                            ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]'
                            : 'bg-stone-500'
                        }`}
                      />
                    </div>

                    {/* Username & Badge */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h2 className="text-sm sm:text-base font-extrabold text-white truncate font-sans">
                          @{detective.username}
                        </h2>
                        {isSelf && (
                          <span className="px-2 py-0.5 rounded-md bg-amber-500/20 border border-amber-400/40 text-[10px] font-mono font-bold text-amber-300">
                            YOU
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-stone-200/80 font-medium truncate flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                        <span>{detective.currentBadge}</span>
                      </p>
                    </div>
                  </div>

                  {/* Middle / Right: Achievements Chips & Score */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between sm:justify-end gap-3.5 w-full sm:w-auto">
                    {/* Achievement Chips */}
                    <div className="flex flex-wrap items-center gap-1.5 max-w-sm">
                      {detective.achievements.length > 0 ? (
                        <>
                          {detective.achievements.slice(0, 3).map((ach, achIdx) => (
                            <span
                              key={achIdx}
                              className="px-2.5 py-1 rounded-lg bg-stone-900/40 border border-white/10 text-[11px] text-stone-200 font-medium whitespace-nowrap"
                            >
                              {ach}
                            </span>
                          ))}
                          {detective.achievements.length > 3 && (
                            <span className="text-[10px] font-mono text-stone-300/80 px-1.5">
                              +{detective.achievements.length - 3} more
                            </span>
                          )}
                        </>
                      ) : (
                        <span className="text-[11px] font-mono text-stone-400 italic">No badges earned yet</span>
                      )}
                    </div>

                    {/* Score Pill */}
                    <div className="shrink-0 px-4 py-2 rounded-xl bg-stone-900/60 border border-white/15 flex items-center gap-2 shadow-inner">
                      <Trophy className="w-4 h-4 text-amber-300" />
                      <span className="font-mono font-extrabold text-white text-sm tabular-nums">
                        {detective.score.toLocaleString()} <span className="text-[11px] text-amber-300 font-sans">PTS</span>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
