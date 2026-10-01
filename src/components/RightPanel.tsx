import React from 'react';
import { QueryExecutionResult } from '../types';
import { 
  Table2, 
  Terminal, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Layers, 
  ArrowRight,
  Sparkles,
  Trophy
} from 'lucide-react';

interface RightPanelProps {
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
}

export const RightPanel: React.FC<RightPanelProps> = ({
  lastResult,
  taskValidation,
  onAdvanceTask,
  hasNextTask,
  isCaseCompleted,
  onOpenVictoryModal,
}) => {
  return (
    <div 
      className="h-full flex flex-col rounded-2xl border border-white/20 shadow-xl overflow-hidden text-stone-100"
      style={{
        backgroundColor: 'rgba(79, 109, 97, 0.88)',
        backdropFilter: 'blur(16px)',
      }}
    >
      {/* Upper Section: Query Result Table Grid (3/5 height) */}
      <div className="h-3/5 flex flex-col border-b border-white/15 overflow-hidden">
        {/* Results Header Bar */}
        <div className="px-4 py-2.5 bg-stone-950/30 border-b border-white/10 flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <Table2 className="w-4 h-4 text-amber-300" />
            <h2 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Query Result Table
            </h2>
          </div>

          {lastResult && lastResult.success && (
            <div className="flex items-center gap-2.5 text-[11px] font-mono text-stone-300">
              <span className="flex items-center gap-1 bg-stone-900/40 px-2 py-0.5 rounded-lg border border-white/10">
                <Layers className="w-3 h-3 text-emerald-300" />
                <span className="text-white font-bold">{lastResult.rowCount}</span>
                <span>{lastResult.rowCount === 1 ? 'row' : 'rows'}</span>
              </span>
              <span className="flex items-center gap-1 bg-stone-900/40 px-2 py-0.5 rounded-lg border border-white/10">
                <Clock className="w-3 h-3 text-amber-400" />
                <span>{lastResult.executionTimeMs} ms</span>
              </span>
            </div>
          )}
        </div>

        {/* Table Content Area */}
        <div className="flex-1 overflow-auto p-3 sm:p-4">
          {!lastResult ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-300/70">
              <div className="w-12 h-12 rounded-2xl bg-stone-900/40 border border-white/10 flex items-center justify-center mb-2.5 text-amber-300 shadow-inner">
                <Terminal className="w-6 h-6" />
              </div>
              <p className="text-xs font-mono font-bold mb-1 text-white">Awaiting Detective Query</p>
              <p className="text-[11px] max-w-xs text-stone-200/80 leading-relaxed font-sans">
                Draft your SQL query and click "RUN QUERY" or press Ctrl+Enter to inspect the live records.
              </p>
            </div>
          ) : !lastResult.success ? (
            <div className="p-4 bg-rose-950/40 border border-rose-800/50 rounded-xl text-rose-200 font-mono text-xs shadow-md">
              <div className="flex items-center gap-2 font-bold text-rose-300 mb-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>SQL Execution Error</span>
              </div>
              <p className="leading-relaxed text-stone-200">
                {lastResult.error}
              </p>
            </div>
          ) : lastResult.rows.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-300/70">
              <p className="text-xs font-mono font-bold text-white mb-1">0 Records Returned</p>
              <p className="text-[11px] text-stone-200/80 max-w-xs font-sans">
                Query executed successfully in {lastResult.executionTimeMs}ms, but no records matched your filter.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto border border-white/15 rounded-xl shadow-inner bg-stone-900/40">
              <table className="w-full text-left text-xs font-mono border-collapse">
                <thead>
                  <tr className="bg-[#2A4036] text-stone-100 border-b border-white/10 sticky top-0">
                    <th className="p-2 text-stone-400 font-normal w-10 text-center border-r border-white/10 select-none">
                      #
                    </th>
                    {lastResult.columns.map(col => (
                      <th
                        key={col}
                        className="p-2 text-white font-bold border-r border-white/10 last:border-r-0 whitespace-nowrap"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {lastResult.rows.map((row, rowIdx) => (
                    <tr
                      key={rowIdx}
                      className={
                        rowIdx % 2 === 0
                          ? 'bg-[#1E2E28]/90 hover:bg-[#2F443B] transition-colors'
                          : 'bg-[#24362E]/90 hover:bg-[#2F443B] transition-colors'
                      }
                    >
                      <td className="p-2 text-stone-400 text-center border-r border-white/10 select-none text-[10px]">
                        {rowIdx + 1}
                      </td>
                      {lastResult.columns.map(col => (
                        <td
                          key={col}
                          className="p-2 text-stone-100 border-r border-white/10 last:border-r-0 whitespace-nowrap font-mono tabular-nums"
                        >
                          {row[col] === null || row[col] === undefined ? (
                            <span className="text-amber-300/60 italic font-sans text-[11px]">NULL</span>
                          ) : (
                            String(row[col])
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Lower Section: Investigation Output & Verification Logs (2/5 height) */}
      <div className="h-2/5 flex flex-col bg-stone-950/20 overflow-hidden">
        {/* Verdict Header Bar */}
        <div className="px-4 py-2 bg-stone-950/30 border-b border-white/10 flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-300" />
            <h2 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Investigation Verdict & Logs
            </h2>
          </div>
          <span className="text-[10px] text-stone-300/80 font-mono">
            Automated Diagnostic Evaluator
          </span>
        </div>

        {/* Verdict Container */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4">
          {!taskValidation ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-3 text-stone-300/70">
              <p className="text-xs font-mono text-stone-200 mb-1">Status: Standby</p>
              <p className="text-[11px] text-stone-300/80 max-w-xs font-sans">
                Submit a SQL query to verify evidence against your current mission objective.
              </p>
            </div>
          ) : taskValidation.isCorrect ? (
            <div className="h-full flex flex-col justify-between space-y-2">
              <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-xl p-3 text-xs space-y-2 shadow-md">
                <div className="flex items-center gap-2 font-bold text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-[#4CAF50] shrink-0" />
                  <span>DIRECTIVE VERIFIED & COMPLETED!</span>
                </div>

                <p className="text-stone-100 leading-relaxed font-sans text-xs">
                  {taskValidation.feedback}
                </p>

                {taskValidation.clueDiscovered && (
                  <div className="flex items-center gap-2 text-[11px] font-mono text-amber-200 bg-stone-950/40 p-2 rounded-lg border border-amber-500/30">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Evidence Acquired: {taskValidation.clueDiscovered}</span>
                  </div>
                )}
              </div>

              {/* Navigation Action */}
              <div className="pt-1 flex items-center justify-end gap-2">
                {hasNextTask ? (
                  <button
                    onClick={onAdvanceTask}
                    className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-stone-950 flex items-center gap-2 shadow-lg transition-all hover:brightness-110 active:scale-95"
                    style={{
                      backgroundColor: '#D97043',
                      backgroundImage: 'linear-gradient(135deg, #E88255 0%, #D97043 50%, #C85A32 100%)',
                      boxShadow: '0 4px 14px rgba(200, 90, 50, 0.4)',
                    }}
                  >
                    <span>NEXT DIRECTIVE</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : isCaseCompleted ? (
                  <button
                    onClick={onOpenVictoryModal}
                    className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-stone-950 flex items-center gap-2 shadow-lg transition-all hover:brightness-110 active:scale-95"
                    style={{
                      backgroundColor: '#D97043',
                      backgroundImage: 'linear-gradient(135deg, #E88255 0%, #D97043 50%, #C85A32 100%)',
                      boxShadow: '0 4px 14px rgba(200, 90, 50, 0.4)',
                    }}
                  >
                    <Trophy className="w-4 h-4" />
                    <span>VIEW CASE CONCLUSION</span>
                  </button>
                ) : null}
              </div>
            </div>
          ) : (
            <div className="bg-stone-900/60 border border-amber-500/40 rounded-xl p-3 text-xs space-y-1.5 shadow-md">
              <div className="flex items-center gap-2 font-bold text-amber-300">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Forensic Directive Pending</span>
              </div>
              <p className="text-stone-200 leading-relaxed font-sans text-xs">
                {taskValidation.feedback}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
