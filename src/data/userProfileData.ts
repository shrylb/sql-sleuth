import { AchievementBadge } from '../types';

export interface LowPolyAvatar {
  id: string;
  name: string;
  subtitle: string;
  colorBg: string;
  accent: string;
  animalType: string;
}

export const LOW_POLY_AVATARS: LowPolyAvatar[] = [
  { id: 'fox', name: 'Desert Fox', subtitle: 'Agile & Intuitive', colorBg: 'from-amber-600/30 to-orange-700/20', accent: '#D97043', animalType: 'Fox' },
  { id: 'owl', name: 'Alpine Owl', subtitle: 'Analytical Observer', colorBg: 'from-teal-600/30 to-emerald-700/20', accent: '#4F6D61', animalType: 'Owl' },
  { id: 'wolf', name: 'Timber Wolf', subtitle: 'Relentless Tracker', colorBg: 'from-slate-600/30 to-zinc-700/20', accent: '#8BA898', animalType: 'Wolf' },
  { id: 'falcon', name: 'Peregrine Falcon', subtitle: 'Sharp Reconnaissance', colorBg: 'from-sky-600/30 to-cyan-700/20', accent: '#38BDF8', animalType: 'Falcon' },
  { id: 'stag', name: 'Crested Stag', subtitle: 'Noble Strategist', colorBg: 'from-stone-600/30 to-amber-900/20', accent: '#D9D2C5', animalType: 'Stag' },
  { id: 'lynx', name: 'Shadow Lynx', subtitle: 'Silent Query Master', colorBg: 'from-indigo-600/30 to-violet-700/20', accent: '#A78BFA', animalType: 'Lynx' },
  { id: 'bear', name: 'Kodiak Bear', subtitle: 'Unyielding Auditor', colorBg: 'from-amber-900/30 to-stone-800/20', accent: '#C85A32', animalType: 'Bear' },
  { id: 'detective', name: 'Cyber Sleuth', subtitle: 'Chief Forensic Lead', colorBg: 'from-emerald-600/30 to-teal-800/20', accent: '#34D399', animalType: 'Detective' }
];

export const RESERVED_USERNAMES = [
  'admin',
  'system',
  'root',
  'vance',
  'montoya',
  'ghost',
  'shadow',
  'detective',
  'inspector',
  'sqlsleuth',
  'moderator',
  'cyber_sam'
];

export const INITIAL_ACHIEVEMENTS: AchievementBadge[] = [
  {
    id: 'badge_orientation',
    title: 'Orientation Badge',
    description: "Recover Officer Montoya's lost gold badge in Precinct 42 orientation.",
    iconName: 'ShieldCheck',
    isUnlocked: false,
    category: 'Rookie'
  },
  {
    id: 'badge_filter',
    title: 'Lineup Filter Master',
    description: 'Filter the 5th Avenue warehouse suspects and isolate Damon Thorne.',
    iconName: 'Filter',
    isUnlocked: false,
    category: 'Filtering'
  },
  {
    id: 'badge_join',
    title: 'Relational Keymaster',
    description: 'Bridge door logs to the badge registry and unmask Elena Rostova.',
    iconName: 'Link2',
    isUnlocked: false,
    category: 'Joins'
  },
  {
    id: 'badge_audit',
    title: 'Syndicate Buster',
    description: 'Execute the financial audit and dismantle Vanguard Imports laundering front.',
    iconName: 'Building2',
    isUnlocked: false,
    category: 'Audit'
  },
  {
    id: 'badge_subqueries',
    title: 'Subquery Specialist',
    description: 'Expose "The Architect" by isolating rogue risk outliers in Case File #004.',
    iconName: 'Search',
    isUnlocked: false,
    category: 'Mastery'
  },
  {
    id: 'badge_centurion',
    title: '500+ Score Centurion',
    description: 'Reach a total cumulative score of 500+ forensic investigation points.',
    iconName: 'Trophy',
    isUnlocked: false,
    category: 'Mastery'
  },
  {
    id: 'badge_sanitization',
    title: 'Sanitization Specialist',
    description: 'Neutralize decoy malware and archive the Architect decryption key in Case File #005.',
    iconName: 'Sparkles',
    isUnlocked: false,
    category: 'Mastery'
  },
  {
    id: 'badge_sanctum',
    title: 'Sanctum Infiltrator',
    description: 'Map unstaffed depots and uncover off-grid operatives in Case File #006.',
    iconName: 'Layers',
    isUnlocked: false,
    category: 'Mastery'
  },
  {
    id: 'badge_surveillance',
    title: 'Surveillance Architect',
    description: 'Deploy indexing structures and cryptographic security views in Case File #007.',
    iconName: 'Eye',
    isUnlocked: false,
    category: 'Mastery'
  },
  {
    id: 'badge_case_when',
    title: 'Risk Forensics Master',
    description: 'Categorize financial threat levels and isolate high-risk asset seizure targets in Case File #008.',
    iconName: 'PieChart',
    isUnlocked: false,
    category: 'Mastery'
  },
  {
    id: 'badge_final_takedown',
    title: 'Syndicate Dismantler',
    description: 'Execute atomic multi-table warrant seizures and close all 10 precinct case files in Case File #009.',
    iconName: 'ShieldCheck',
    isUnlocked: false,
    category: 'Mastery'
  }
];

/**
 * Validates a prospective username for format, length, and uniqueness against reserved handles.
 */
export function validateUsername(
  candidate: string,
  currentUsername: string
): { isValid: boolean; errorMessage?: string } {
  const trimmed = candidate.trim();
  if (trimmed.length < 3) {
    return { isValid: false, errorMessage: 'Username must be at least 3 characters long.' };
  }
  if (trimmed.length > 18) {
    return { isValid: false, errorMessage: 'Username cannot exceed 18 characters.' };
  }
  if (!/^[a-zA-Z0-9_]+$/.test(trimmed)) {
    return { isValid: false, errorMessage: 'Username can only contain letters, numbers, and underscores.' };
  }
  if (trimmed.toLowerCase() !== currentUsername.toLowerCase()) {
    if (RESERVED_USERNAMES.includes(trimmed.toLowerCase())) {
      return { isValid: false, errorMessage: `Username "${trimmed}" is already claimed or reserved.` };
    }
  }
  return { isValid: true };
}
