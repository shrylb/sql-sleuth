export type SQLDataType = 'INTEGER' | 'TEXT' | 'REAL' | 'BOOLEAN' | 'DATETIME';

export interface ColumnDefinition {
  name: string;
  type: SQLDataType;
  isPrimaryKey?: boolean;
  isForeignKey?: boolean;
  foreignKeyTarget?: string; // e.g. "employees(id)"
  description?: string;
}

export interface TableData {
  name: string;
  columns: ColumnDefinition[];
  rows: Record<string, any>[];
  description: string;
}

export interface MissionTask {
  id: string;
  title: string;
  instruction: string;
  conceptFocus: string;
  hint: string;
  hintCost: number; // e.g. 50 points
  expectedQueryPattern?: RegExp[]; // Optional soft pattern check
  validateResult: (rows: any[], columns: string[], rawQuery: string) => {
    isCorrect: boolean;
    feedback: string;
    clueDiscovered?: string;
  };
  sampleSolution: string;
  points: number;
}

export interface CaseLevel {
  id: number;
  levelNumber: number;
  title: string;
  subtitle: string;
  category: 'Orientation' | 'Filtering' | 'Joins' | 'Aggregation' | 'DML' | 'Sanitization' | string;
  difficulty: 'Beginner' | 'Apprentice' | 'Investigator' | 'Master Sleuth' | 'Special Ops' | string;
  briefing: {
    incidentDate: string;
    location: string;
    dossier: string;
    suspectTarget: string;
  };
  tables: TableData[];
  tasks: MissionTask[];
  journalUnlockId: string;
}

export interface JournalEntry {
  id: string;
  title: string;
  topic: string;
  levelRequired: number;
  summary: string;
  cheatSheet: {
    syntax: string;
    explanation: string;
    example: string;
  }[];
  detectiveTip: string;
}

export interface QueryExecutionResult {
  success: boolean;
  columns: string[];
  rows: any[];
  executionTimeMs: number;
  error?: string;
  rowCount: number;
}

export interface GameProgress {
  currentLevelIndex: number;
  currentTaskIndex: number;
  score: number;
  solvedTasks: Record<string, boolean>; // taskId -> boolean
  unlockedJournalIds: string[];
  hintsUsed: Record<string, boolean>; // taskId -> boolean
  queryHistory: string[];
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  iconName: string;
  isUnlocked: boolean;
  category: 'Rookie' | 'Filtering' | 'Joins' | 'Audit' | 'Mastery';
}

export interface UserProfile {
  username: string;
  avatarId: string;
  rankTitle: string;
}

export interface LevelProgressionInfo {
  levelNumber: number;
  id: number;
  title: string;
  subtitle: string;
  category: string;
  status: 'completed' | 'current' | 'locked';
  isLocked: boolean;
  isCompleted: boolean;
  isCurrent: boolean;
  storyBrief: string;
  sqlConcepts: string[];
  tasksCount: number;
  tasksCompleted: number;
}
