import React, { useState } from 'react';
import { UserProfile, AchievementBadge } from '../types';
import { LOW_POLY_AVATARS, validateUsername } from '../data/userProfileData';
import { LowPolyAvatarIcon } from './LowPolyAvatarIcon';
import { 
  X, 
  Check, 
  Shield, 
  Trophy, 
  Lock, 
  User, 
  Sparkles, 
  AlertCircle 
} from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  onSaveProfile: (updated: UserProfile) => void;
  achievements: AchievementBadge[];
  playerScore: number;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  onSaveProfile,
  achievements,
  playerScore,
}) => {
  const [usernameInput, setUsernameInput] = useState(userProfile.username);
  const [selectedAvatarId, setSelectedAvatarId] = useState(userProfile.avatarId);
  const [validationError, setValidationError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSave = () => {
    const check = validateUsername(usernameInput, userProfile.username);
    if (!check.isValid) {
      setValidationError(check.errorMessage || 'Invalid username');
      return;
    }
    setValidationError(null);
    onSaveProfile({
      ...userProfile,
      username: usernameInput.trim(),
      avatarId: selectedAvatarId,
    });
    onClose();
  };

  const unlockedCount = achievements.filter(a => a.isUnlocked).length;

  return (
    <div className="fixed inset-0 bg-stone-950/75 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div 
        className="w-full max-w-2xl rounded-2xl shadow-2xl border border-emerald-900/30 overflow-hidden flex flex-col max-h-[90vh]"
        style={{
          backgroundColor: 'rgba(47, 68, 59, 0.95)',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.45)'
        }}
      >
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-emerald-800/40 flex items-center justify-between bg-emerald-950/40">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-800/40 border border-emerald-700/50 flex items-center justify-center text-emerald-200">
              <User className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h2 className="text-base font-bold text-stone-100 font-sans tracking-wide">
                OPERATIVE DOSSIER & PROFILE
              </h2>
              <p className="text-xs text-emerald-200/70">
                Personalize your investigative identity & review achievements
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-emerald-300/70 hover:text-stone-100 hover:bg-emerald-800/40 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-stone-200">
          {/* Section 1: Username & Identity */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-emerald-300 font-mono">
                Investigator Codename / Username
              </label>
              <span className="text-[11px] text-stone-400">
                Must be unique (3-18 characters)
              </span>
            </div>

            <div className="relative">
              <input
                type="text"
                value={usernameInput}
                onChange={(e) => {
                  setUsernameInput(e.target.value);
                  if (validationError) setValidationError(null);
                }}
                maxLength={18}
                placeholder="Enter unique codename..."
                className="w-full px-4 py-2.5 rounded-xl bg-stone-900/60 border border-emerald-700/40 text-stone-100 placeholder-stone-500 font-sans text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 transition-all"
              />
            </div>

            {validationError && (
              <div className="flex items-center gap-1.5 text-xs text-rose-300 bg-rose-950/40 border border-rose-800/50 p-2 rounded-lg">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{validationError}</span>
              </div>
            )}
          </div>

          {/* Section 2: Low-Poly Avatar Carousel / Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-emerald-300 font-mono">
                Select Low-Poly Persona Avatar
              </label>
              <span className="text-[11px] text-emerald-300/70 font-mono">
                Geometric Alto Style
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {LOW_POLY_AVATARS.map((av) => {
                const isSelected = selectedAvatarId === av.id;
                return (
                  <button
                    key={av.id}
                    type="button"
                    onClick={() => setSelectedAvatarId(av.id)}
                    className={`p-3 rounded-xl border text-left transition-all relative flex flex-col items-center gap-2 group ${
                      isSelected
                        ? 'border-amber-500 bg-amber-500/15 shadow-lg shadow-amber-900/20 scale-[1.02]'
                        : 'border-emerald-800/40 bg-emerald-950/30 hover:border-emerald-700/60 hover:bg-emerald-900/30'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}
                    <div className="w-14 h-14 rounded-xl bg-stone-900/40 p-1 flex items-center justify-center overflow-hidden">
                      <LowPolyAvatarIcon avatarId={av.id} size={48} />
                    </div>
                    <div className="text-center">
                      <div className="text-xs font-bold text-stone-200 group-hover:text-amber-300 transition-colors">
                        {av.name}
                      </div>
                      <div className="text-[10px] text-stone-400 truncate max-w-[100px]">
                        {av.subtitle}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 3: Detective Badges & Achievements */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between border-t border-emerald-800/40 pt-4">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-400" />
                <label className="text-xs font-bold uppercase tracking-wider text-emerald-300 font-mono">
                  Investigation Badges
                </label>
              </div>
              <span className="text-xs font-mono text-amber-300 font-semibold bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded-full">
                {unlockedCount} / {achievements.length} Unlocked
              </span>
            </div>

            <div className="space-y-2">
              {achievements.map((badge) => {
                return (
                  <div
                    key={badge.id}
                    className={`p-3 rounded-xl border flex items-center justify-between text-xs transition-colors ${
                      badge.isUnlocked
                        ? 'bg-emerald-950/40 border-emerald-600/40 text-stone-200'
                        : 'bg-stone-950/40 border-stone-800/60 text-stone-500 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          badge.isUnlocked
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                            : 'bg-stone-800/50 text-stone-600'
                        }`}
                      >
                        {badge.isUnlocked ? (
                          <Sparkles className="w-4 h-4" />
                        ) : (
                          <Lock className="w-4 h-4" />
                        )}
                      </div>
                      <div>
                        <div className="font-bold flex items-center gap-2">
                          <span className={badge.isUnlocked ? 'text-stone-100' : 'text-stone-500'}>
                            {badge.title}
                          </span>
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-stone-900/60 border border-stone-700/50 text-stone-400">
                            {badge.category}
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-400 mt-0.5">
                          {badge.description}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      {badge.isUnlocked ? (
                        <span className="text-[11px] font-mono font-semibold text-emerald-400 flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" />
                          Earned
                        </span>
                      ) : (
                        <span className="text-[11px] font-mono text-stone-500">
                          Locked
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 border-t border-emerald-800/40 bg-emerald-950/40 flex items-center justify-between">
          <div className="text-xs text-stone-400 font-mono">
            Active Rank: <strong className="text-amber-300 font-semibold">{userProfile.rankTitle}</strong>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-300 hover:text-stone-100 hover:bg-emerald-900/40 border border-emerald-800/50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 rounded-xl text-xs font-bold text-stone-950 transition-all shadow-md active:scale-95 flex items-center gap-1.5"
              style={{
                backgroundColor: '#D97043',
                backgroundImage: 'linear-gradient(to bottom, #E88255, #C85A32)'
              }}
            >
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              Save Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
