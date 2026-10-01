import React, { useState } from 'react';
import { JournalEntry } from '../types';
import { 
  BookOpen, 
  Lock, 
  CheckCircle, 
  Copy, 
  Check, 
  X, 
  Lightbulb, 
  Code2,
  Sparkles
} from 'lucide-react';

interface JournalModalProps {
  isOpen: boolean;
  onClose: () => void;
  entries: JournalEntry[];
  unlockedEntryIds: string[];
  onInsertCodeSnippet: (code: string) => void;
  completedLevels?: number[];
}

/**
 * Step B: Fix Unlock Mapping Logic
 * Evaluates whether a journal entry is unlocked based on:
 * 1. Default unlock for Level 0 (Orientation)
 * 2. Presence in unlockedEntryIds array
 * 3. Level completion match (completedLevels contains entry.levelRequired)
 */
export const isEntryUnlocked = (
  entry: JournalEntry,
  unlockedEntryIds: string[] = [],
  completedLevels?: number[]
): boolean => {
  if (entry.levelRequired === 0) return true;
  if (unlockedEntryIds.includes(entry.id)) return true;
  if (completedLevels && completedLevels.includes(entry.levelRequired)) return true;
  return false;
};

export const JournalModal: React.FC<JournalModalProps> = ({
  isOpen,
  onClose,
  entries,
  unlockedEntryIds,
  onInsertCodeSnippet,
  completedLevels,
}) => {
  const [selectedEntryId, setSelectedEntryId] = useState<string>(entries[0]?.id || '');
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentEntry = entries.find(e => e.id === selectedEntryId) || entries[0];
  const isCurrentUnlocked = isEntryUnlocked(currentEntry, unlockedEntryIds, completedLevels);

  const handleCopy = (code: string) => {
    onInsertCodeSnippet(code);
    setCopiedSnippet(code);
    setTimeout(() => setCopiedSnippet(null), 1500);
  };

  // Calculate actual unlocked count using unified unlock condition
  const totalUnlockedCount = entries.filter(e => isEntryUnlocked(e, unlockedEntryIds, completedLevels)).length;

  return (
    <div className="fixed inset-0 bg-stone-950/75 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div 
        className="max-w-4xl w-full h-[85vh] flex flex-col rounded-2xl shadow-2xl border border-white/20 overflow-hidden text-stone-100"
        style={{
          backgroundColor: 'rgba(47, 68, 59, 0.95)',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.45)'
        }}
      >
        {/* Top Header */}
        <div className="px-5 py-3.5 bg-stone-950/40 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white font-sans tracking-wide">
                DETECTIVE'S FIELD JOURNAL & RDBMS MANUAL
              </h2>
              <p className="text-[11px] text-emerald-200/70">
                Unlocked relational concepts, SQL syntax cards, and forensic best practices.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Sidebar + Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar: Unlocked Entries List */}
          <div className="w-1/3 border-r border-white/10 bg-stone-950/20 overflow-y-auto p-3 space-y-1.5">
            <div className="px-2 py-1 text-[10px] font-mono uppercase text-emerald-300 font-bold tracking-wider">
              Field Directives & Notes ({totalUnlockedCount}/{entries.length})
            </div>
            {entries.map(entry => {
              const unlocked = isEntryUnlocked(entry, unlockedEntryIds, completedLevels);
              const isSelected = entry.id === currentEntry?.id;

              return (
                <button
                  key={entry.id}
                  onClick={() => setSelectedEntryId(entry.id)}
                  className={`w-full text-left p-2.5 rounded-xl text-xs transition-all flex items-center justify-between border cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500/20 border-amber-500/50 text-white font-bold shadow-sm'
                      : unlocked
                      ? 'bg-stone-900/30 hover:bg-stone-900/50 text-stone-200 border-white/5'
                      : 'bg-stone-950/30 text-stone-500 border-transparent opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    {unlocked ? (
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    ) : (
                      <Lock className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                    )}
                    <span className="truncate">{entry.title}</span>
                  </div>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-stone-900/40 text-stone-400 shrink-0 border border-white/5">
                    {entry.topic}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Content View */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-stone-900/10">
            {isCurrentUnlocked ? (
              <>
                {/* Header */}
                <div className="border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-amber-300 font-semibold mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{currentEntry.topic} Reference Dossier</span>
                  </div>
                  <h1 className="text-xl font-bold text-white font-sans">
                    {currentEntry.title}
                  </h1>
                  <p className="text-xs text-stone-200/90 mt-2 leading-relaxed font-sans">
                    {currentEntry.summary}
                  </p>
                </div>

                {/* Cheat Sheet Syntax Cards */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-emerald-300" />
                    <span>SQL Syntax & Directives</span>
                  </h3>

                  {currentEntry.cheatSheet.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-stone-900/50 border border-white/10 rounded-xl p-3.5 space-y-2 shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-amber-300">
                          {item.syntax}
                        </span>
                        <button
                          onClick={() => handleCopy(item.example)}
                          className="px-2 py-1 bg-stone-800/80 hover:bg-stone-800 text-stone-300 hover:text-white rounded-lg text-[10px] font-mono border border-white/10 flex items-center gap-1 transition-colors cursor-pointer"
                          title="Insert snippet into interactive query editor"
                        >
                          {copiedSnippet === item.example ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">Inserted!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Insert to Editor</span>
                            </>
                          )}
                        </button>
                      </div>

                      <p className="text-xs text-stone-300 font-sans">
                        {item.explanation}
                      </p>

                      <div className="bg-[#1E2E28] border border-emerald-900/40 p-2.5 rounded-lg font-mono text-xs text-stone-100 select-all overflow-x-auto">
                        {item.example}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Detective Tip Callout */}
                <div className="bg-amber-950/30 border border-amber-500/40 rounded-xl p-3.5 flex items-start gap-3 text-xs shadow-sm">
                  <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-mono font-bold text-amber-300 block mb-0.5 uppercase tracking-wide">
                      Lead Detective Tip
                    </span>
                    <p className="text-amber-100/90 leading-relaxed font-sans">
                      {currentEntry.detectiveTip}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 text-stone-400">
                <div className="w-14 h-14 rounded-2xl bg-stone-900/50 border border-white/10 flex items-center justify-center mb-3 text-stone-500">
                  <Lock className="w-7 h-7" />
                </div>
                <h3 className="text-base font-bold text-stone-200 mb-1 font-sans">
                  Classified Dossier: Entry Locked
                </h3>
                <p className="text-xs text-stone-400 max-w-sm leading-relaxed">
                  Solve the directives in Case File #{currentEntry.levelRequired === 0 ? '000' : `00${currentEntry.levelRequired}`} to unlock this RDBMS syntax card and detective insight.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
