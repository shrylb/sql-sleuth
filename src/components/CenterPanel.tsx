import React, { useState, useRef, useEffect } from 'react';
import { TableData } from '../types';
import { 
  Database, 
  Key, 
  Play, 
  RotateCcw, 
  Eye, 
  ChevronDown, 
  ChevronRight,
  Code2,
  Sparkles,
  X,
  Layers
} from 'lucide-react';
import { sqlEngine } from '../engine/sqlEngine';

interface CenterPanelProps {
  tables: TableData[];
  query: string;
  onQueryChange: (q: string) => void;
  onExecuteQuery: () => void;
  isExecuting: boolean;
  sampleSolution?: string;
}

export const CenterPanel: React.FC<CenterPanelProps> = ({
  tables,
  query,
  onQueryChange,
  onExecuteQuery,
  isExecuting,
  sampleSolution,
}) => {
  const [expandedTables, setExpandedTables] = useState<Record<string, boolean>>({
    [tables[0]?.name || '']: true
  });
  const [previewTable, setPreviewTable] = useState<string | null>(null);
  const [previewRows, setPreviewRows] = useState<any[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Update expanded table default when tables change
  useEffect(() => {
    if (tables.length > 0) {
      const initial: Record<string, boolean> = {};
      tables.forEach((t, i) => {
        initial[t.name] = i === 0;
      });
      setExpandedTables(initial);
    }
  }, [tables]);

  const toggleTable = (tableName: string) => {
    setExpandedTables(prev => ({
      ...prev,
      [tableName]: !prev[tableName]
    }));
  };

  const handleOpenPreview = (tableName: string) => {
    const rows = sqlEngine.getTablePreview(tableName, 5);
    setPreviewRows(rows);
    setPreviewTable(tableName);
  };

  const insertTextAtCursor = (text: string) => {
    const el = textareaRef.current;
    if (!el) {
      onQueryChange(query + text);
      return;
    }
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const newText = query.substring(0, start) + text + query.substring(end);
    onQueryChange(newText);
    setTimeout(() => {
      el.focus();
      el.selectionStart = el.selectionEnd = start + text.length;
    }, 10);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Ctrl+Enter or Cmd+Enter to execute
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      onExecuteQuery();
    }
    // Tab key indentation
    if (e.key === 'Tab') {
      e.preventDefault();
      insertTextAtCursor('  ');
    }
  };

  // Compute line numbers for editor
  const lineCount = Math.max(query.split('\n').length, 5);
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1);

  return (
    <div 
      className="h-full flex flex-col rounded-2xl border border-white/20 shadow-xl overflow-hidden text-stone-100"
      style={{
        backgroundColor: 'rgba(79, 109, 97, 0.88)',
        backdropFilter: 'blur(16px)',
      }}
    >
      {/* Upper Half: Visual Database Schema Viewer */}
      <div className="h-1/2 flex flex-col border-b border-white/15 overflow-hidden">
        {/* Schema Header Bar */}
        <div className="px-4 py-2.5 bg-stone-950/30 border-b border-white/10 flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-amber-300" />
            <h2 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Database Schema Viewer
            </h2>
            <span className="text-[11px] font-mono text-stone-300/80">
              ({tables.length} {tables.length === 1 ? 'Table' : 'Tables'})
            </span>
          </div>
          <span className="text-[10px] text-stone-300/70 font-mono hidden sm:inline">
            Click column name to insert
          </span>
        </div>

        {/* Tables List */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3">
          {tables.map(table => {
            const isExpanded = Boolean(expandedTables[table.name]);
            return (
              <div
                key={table.name}
                className="bg-stone-900/40 border border-white/15 rounded-xl overflow-hidden shadow-xs"
              >
                {/* Table Header Bar */}
                <div className="px-3 py-2 bg-stone-950/40 flex items-center justify-between select-none border-b border-white/5">
                  <button
                    onClick={() => toggleTable(table.name)}
                    className="flex items-center gap-2 text-xs font-mono font-bold text-white hover:text-amber-300 transition-colors"
                  >
                    {isExpanded ? (
                      <ChevronDown className="w-3.5 h-3.5 text-stone-300" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 text-stone-300" />
                    )}
                    <span>{table.name}</span>
                    <span className="text-[10px] font-normal text-stone-400">
                      ({table.rows.length} rows)
                    </span>
                  </button>

                  <button
                    onClick={() => handleOpenPreview(table.name)}
                    className="px-2 py-0.5 rounded-lg text-[10px] font-mono font-medium text-stone-300 hover:text-white bg-stone-800/60 hover:bg-stone-800 border border-white/10 transition-colors flex items-center gap-1"
                    title="Preview top 5 rows"
                  >
                    <Eye className="w-3 h-3 text-amber-400" />
                    <span>Preview</span>
                  </button>
                </div>

                {/* Table Description */}
                <div className="px-3 py-1.5 text-[11px] text-stone-300/80 bg-stone-950/20 border-b border-white/5 italic font-sans">
                  {table.description}
                </div>

                {/* Columns Listing */}
                {isExpanded && (
                  <div className="p-2 space-y-1 bg-stone-900/20">
                    {table.columns.map(col => (
                      <div
                        key={col.name}
                        onClick={() => insertTextAtCursor(col.name)}
                        className="group px-2.5 py-1.5 rounded-lg hover:bg-stone-800/50 transition-colors flex items-center justify-between text-xs cursor-pointer border border-transparent hover:border-white/10"
                        title={col.description || 'Click to insert column into editor'}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          {col.isPrimaryKey ? (
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-0.5">
                              <Key className="w-2.5 h-2.5" />
                              PK
                            </span>
                          ) : col.isForeignKey ? (
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-500/40 flex items-center gap-0.5">
                              FK
                            </span>
                          ) : (
                            <span className="w-2 h-2 rounded-full bg-stone-600 group-hover:bg-amber-400 transition-colors" />
                          )}
                          <span className="font-mono text-stone-100 group-hover:text-amber-300 transition-colors truncate">
                            {col.name}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-[10px] font-mono shrink-0">
                          {col.foreignKeyTarget && (
                            <span className="text-sky-300/80 hidden md:inline truncate max-w-[120px]">
                              → {col.foreignKeyTarget}
                            </span>
                          )}
                          <span className="px-1.5 py-0.2 rounded bg-stone-950/40 border border-white/10 text-stone-300">
                            {col.type}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Data Preview Modal / Floating Drawer */}
        {previewTable && (
          <div className="p-3 bg-stone-950/80 border-t border-white/15 text-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-stone-200 font-bold flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                <span>Previewing `{previewTable}` (Top 5 Rows)</span>
              </span>
              <button
                onClick={() => setPreviewTable(null)}
                className="text-stone-400 hover:text-white p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="overflow-x-auto max-h-32 border border-white/10 rounded-lg">
              <table className="w-full text-left font-mono text-[11px] border-collapse bg-stone-900/60">
                <thead>
                  <tr className="bg-stone-950/80 text-stone-300 border-b border-white/10">
                    {previewRows.length > 0 &&
                      Object.keys(previewRows[0]).map(k => (
                        <th key={k} className="p-1.5 font-semibold border-r border-white/5 last:border-r-0">
                          {k}
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-stone-200">
                  {previewRows.map((r, ri) => (
                    <tr key={ri} className="hover:bg-white/5">
                      {Object.keys(r).map(k => (
                        <td key={k} className="p-1.5 border-r border-white/5 last:border-r-0 whitespace-nowrap">
                          {String(r[k])}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Lower Half: SQL Query Console */}
      <div className="h-1/2 flex flex-col bg-stone-950/20 overflow-hidden">
        {/* Editor Toolbar */}
        <div className="px-4 py-2 bg-stone-950/30 border-b border-white/10 flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-emerald-300" />
            <h2 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Interactive SQL Console
            </h2>
          </div>

          {/* Quick Syntax Snippets */}
          <div className="flex items-center gap-1.5 overflow-x-auto text-[10px] font-mono">
            <button
              onClick={() => insertTextAtCursor('SELECT * FROM ')}
              className="px-2 py-0.5 rounded-md bg-stone-900/50 hover:bg-stone-800 text-stone-200 hover:text-white border border-white/10 transition-colors"
            >
              SELECT
            </button>
            <button
              onClick={() => insertTextAtCursor('WHERE ')}
              className="px-2 py-0.5 rounded-md bg-stone-900/50 hover:bg-stone-800 text-stone-200 hover:text-white border border-white/10 transition-colors"
            >
              WHERE
            </button>
            <button
              onClick={() => insertTextAtCursor('INNER JOIN ')}
              className="px-2 py-0.5 rounded-md bg-stone-900/50 hover:bg-stone-800 text-stone-200 hover:text-white border border-white/10 transition-colors"
            >
              JOIN
            </button>
            <button
              onClick={() => insertTextAtCursor('GROUP BY ')}
              className="px-2 py-0.5 rounded-md bg-stone-900/50 hover:bg-stone-800 text-stone-200 hover:text-white border border-white/10 transition-colors"
            >
              GROUP BY
            </button>
            <button
              onClick={() => onQueryChange('')}
              className="p-1 rounded-md text-stone-400 hover:text-rose-300 hover:bg-stone-900/40 transition-colors"
              title="Clear editor"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Embedded Soft Dark-Slate/Emerald Editor Block (#1E2E28) */}
        <div className="flex-1 flex overflow-hidden p-2.5">
          <div 
            className="flex-1 flex rounded-xl border border-emerald-900/40 shadow-inner overflow-hidden"
            style={{
              backgroundColor: '#1E2E28',
            }}
          >
            {/* Line Numbers Gutter */}
            <div className="w-9 py-3 bg-[#17241F] text-stone-400/60 font-mono text-xs select-none text-right pr-2 border-r border-white/10 flex flex-col leading-6">
              {lineNumbers.map(n => (
                <span key={n}>{n}</span>
              ))}
            </div>

            {/* Textarea Code Editor */}
            <textarea
              ref={textareaRef}
              value={query}
              onChange={e => onQueryChange(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              placeholder="-- Write your investigative SQL query here...&#10;SELECT * FROM suspects WHERE jacket_color = 'Black';"
              className="flex-1 p-3 bg-transparent text-stone-100 placeholder-stone-400/50 font-mono text-xs sm:text-sm resize-none focus:outline-none leading-6 selection:bg-amber-500/30 selection:text-amber-200"
              style={{
                caretColor: '#D97043',
              }}
            />
          </div>
        </div>

        {/* Editor Action Footer */}
        <div className="px-4 py-2.5 bg-stone-950/30 border-t border-white/10 flex items-center justify-between gap-3">
          <div className="text-[11px] font-mono text-stone-300/80 flex items-center gap-2">
            <span className="hidden sm:inline">Shortcut:</span>
            <kbd className="px-1.5 py-0.5 rounded bg-stone-900/60 border border-white/15 text-[10px] text-stone-200">
              Ctrl + Enter
            </kbd>
            <span className="hidden sm:inline">to execute</span>
          </div>

          {/* Prominent Glowing Terracotta Orange "RUN QUERY" CTA Button */}
          <button
            onClick={onExecuteQuery}
            disabled={isExecuting}
            className="px-6 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm text-stone-950 flex items-center gap-2 shadow-lg transition-all hover:brightness-110 active:scale-95 tracking-wide"
            style={{
              backgroundColor: '#D97043',
              backgroundImage: 'linear-gradient(135deg, #E88255 0%, #D97043 50%, #C85A32 100%)',
              boxShadow: '0 6px 20px rgba(200, 90, 50, 0.45)',
            }}
          >
            <Play className="w-4 h-4 fill-current" />
            <span>{isExecuting ? 'EXECUTING...' : 'RUN QUERY'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
