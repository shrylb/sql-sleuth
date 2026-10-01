// Re-export clean live Firestore hook to eliminate mock data
export { 
  useLiveLeaderboard as useFirebaseLeaderboard,
  useLiveLeaderboard 
} from './useLiveLeaderboard';
export type { 
  InvestigatorRecord, 
  CurrentUserLeaderboardProfile 
} from './useLiveLeaderboard';
