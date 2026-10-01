import React from 'react';
import { 
  X, 
  Terminal, 
  Database, 
  HelpCircle, 
  Key, 
  Award, 
  CheckCircle2, 
  Play 
} from 'lucide-react';

interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlayNow: () => void;
}

export const HowToPlayModal: React.FC<HowToPlayModalProps> = ({
  isOpen,
  onClose,
  onPlayNow,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-stone-950/75 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div 
        className="w-full max-w-2xl rounded-2xl shadow-2xl border border-emerald-900/30 overflow-hidden flex flex-col max-h-[85vh]"
        style={{
          backgroundColor: 'rgba(47, 68, 59, 0.95)',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.45)'
        }}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-emerald-800/40 flex items-center justify-between bg-emerald-950/40">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300">
              <HelpCircle className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h2 className="text-base font-bold text-stone-100 font-sans tracking-wide">
                HOW TO PLAY: INVESTIGATIVE FIELD GUIDE
              </h2>
              <p className="text-xs text-emerald-200/70">
                Master Relational Databases & crack crime cases
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

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-stone-200 text-xs leading-relaxed">
          {/* Rule 1 */}
          <div className="flex items-start gap-3 bg-stone-950/30 p-3.5 rounded-xl border border-emerald-800/30">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 font-bold font-mono text-xs">
              1
            </div>
            <div>
              <h3 className="font-bold text-stone-100 text-sm mb-1 flex items-center gap-2">
                <Database className="w-4 h-4 text-emerald-400" />
                The 3-Panel Split Workspace
              </h3>
              <p className="text-stone-300">
                In the investigation terminal, the screen splits into 3 coordinated zones:
              </p>
              <ul className="list-disc list-inside mt-1.5 space-y-1 text-stone-300 font-mono text-[11px]">
                <li><strong className="text-amber-300">Left Panel:</strong> Incident brief, suspect dossiers, and forensic directives.</li>
                <li><strong className="text-emerald-300">Center Panel:</strong> Visual schema viewer (PK/FK keys) & interactive SQL query editor.</li>
                <li><strong className="text-sky-300">Right Panel:</strong> Live query results grid, execution latency, and forensic verdicts.</li>
              </ul>
            </div>
          </div>

          {/* Rule 2 */}
          <div className="flex items-start gap-3 bg-stone-950/30 p-3.5 rounded-xl border border-emerald-800/30">
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0 font-bold font-mono text-xs">
              2
            </div>
            <div>
              <h3 className="font-bold text-stone-100 text-sm mb-1 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-amber-400" />
                Interactive SQL Query Console
              </h3>
              <p className="text-stone-300">
                Type ANSI/SQLite queries directly into the console. Click table names and column pills in the schema viewer to auto-insert them into your editor.
              </p>
              <div className="mt-2 bg-stone-950/70 p-2 rounded-lg font-mono text-[11px] text-amber-300 border border-stone-800">
                Shortcut: Press <kbd className="px-1.5 py-0.5 rounded bg-stone-800 border border-stone-700 text-stone-200">Ctrl + Enter</kbd> (or <kbd className="px-1.5 py-0.5 rounded bg-stone-800 border border-stone-700 text-stone-200">Cmd + Enter</kbd>) to instantly execute your query!
              </div>
            </div>
          </div>

          {/* Rule 3 */}
          <div className="flex items-start gap-3 bg-stone-950/30 p-3.5 rounded-xl border border-emerald-800/30">
            <div className="w-7 h-7 rounded-lg bg-terracotta/20 text-orange-300 flex items-center justify-center shrink-0 font-bold font-mono text-xs" style={{ backgroundColor: 'rgba(217, 112, 67, 0.2)' }}>
              3
            </div>
            <div>
              <h3 className="font-bold text-stone-100 text-sm mb-1 flex items-center gap-2">
                <Award className="w-4 h-4 text-orange-400" />
                Scoring & Headquarters Hints
              </h3>
              <p className="text-stone-300">
                Earn investigator points for every correctly solved directive. If you get stuck, request a forensic hint from headquarters in exchange for a small score deduction.
              </p>
            </div>
          </div>

          {/* Rule 4 */}
          <div className="flex items-start gap-3 bg-stone-950/30 p-3.5 rounded-xl border border-emerald-800/30">
            <div className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-300 flex items-center justify-center shrink-0 font-bold font-mono text-xs">
              4
            </div>
            <div>
              <h3 className="font-bold text-stone-100 text-sm mb-1 flex items-center gap-2">
                <Key className="w-4 h-4 text-sky-400" />
                Strict Sequential Level Locking
              </h3>
              <p className="text-stone-300">
                To preserve narrative continuity and pedagogical integrity, subsequent crime cases remain locked until the preceding case is 100% completed. Cleared cases can be replayed anytime for revision!
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-emerald-800/40 bg-emerald-950/40 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-300 hover:text-stone-100 hover:bg-emerald-900/40 border border-emerald-800/50 transition-colors"
          >
            Close Guide
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onPlayNow();
            }}
            className="px-5 py-2 rounded-xl text-xs font-bold text-stone-950 transition-all shadow-md active:scale-95 flex items-center gap-1.5"
            style={{
              backgroundColor: '#D97043',
              backgroundImage: 'linear-gradient(to bottom, #E88255, #C85A32)'
            }}
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            Enter Active Case
          </button>
        </div>
      </div>
    </div>
  );
};
