import { useState, useEffect, useRef } from 'react';
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  doc, 
  setDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { 
  ref, 
  onValue, 
  onDisconnect, 
  set 
} from 'firebase/database';
import { db, rtdb } from '../services/firebase';

export interface InvestigatorRecord {
  id: string;
  username: string;
  avatarIcon: string;
  currentBadge: string;
  score: number;
  achievements: string[];
  lastVisited: string;
  isOnline?: boolean;
}

export interface CurrentUserLeaderboardProfile {
  userId: string;
  username: string;
  avatarIcon: string;
  currentBadge: string;
  score: number;
  achievements: string[];
}

/**
 * Live Cloud Firestore synchronization hook with resilient offline handling and zero mock records.
 */
export function useLiveLeaderboard(currentUser: CurrentUserLeaderboardProfile) {
  const [players, setPlayers] = useState<InvestigatorRecord[]>([]);
  const [presenceMap, setPresenceMap] = useState<Record<string, boolean>>({});
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const prevSyncSignature = useRef<string>('');

  // 1. Initialize & Sync Active Player Profile to Firestore (investigators/{userId})
  useEffect(() => {
    if (!currentUser.userId || !currentUser.username || !db) return;

    const dataToSync = {
      username: currentUser.username,
      avatarIcon: currentUser.avatarIcon || 'detective_01',
      score: currentUser.score || 0,
      currentBadge: currentUser.currentBadge || 'Apprentice Detective',
      achievements: currentUser.achievements || [],
      lastVisited: serverTimestamp(),
    };

    const signature = `${currentUser.userId}-${currentUser.username}-${currentUser.score}-${currentUser.currentBadge}-${currentUser.achievements.length}`;
    if (signature === prevSyncSignature.current) return;
    prevSyncSignature.current = signature;

    try {
      const userDocRef = doc(db, 'investigators', currentUser.userId);
      setDoc(userDocRef, dataToSync, { merge: true }).catch(() => {
        // Handled silently: Firestore SDK caches writes locally during offline mode
      });
    } catch (e) {
      // Ignore offline write errors
    }
  }, [currentUser]);

  // 2. Realtime Database Presence Heartbeat (.info/connected & /status/{userId})
  useEffect(() => {
    if (!currentUser.userId || !rtdb) return;

    let userStatusRef: any = null;
    let unsubscribeConnected: (() => void) | null = null;
    let unsubscribeAllStatus: (() => void) | null = null;

    try {
      const connectedRef = ref(rtdb, '.info/connected');
      userStatusRef = ref(rtdb, `/status/${currentUser.userId}`);

      unsubscribeConnected = onValue(connectedRef, (snapshot) => {
        const connected = snapshot.val() === true;
        setIsConnected(connected);

        if (connected && userStatusRef) {
          onDisconnect(userStatusRef)
            .set({
              state: 'offline',
              username: currentUser.username,
              lastChanged: Date.now(),
            })
            .then(() => {
              return set(userStatusRef, {
                state: 'online',
                username: currentUser.username,
                lastChanged: Date.now(),
              });
            })
            .catch(() => {});
        }
      });

      // Listen to all users' active presence map
      const allStatusRef = ref(rtdb, '/status');
      unsubscribeAllStatus = onValue(allStatusRef, (snapshot) => {
        const data = snapshot.val();
        if (data && typeof data === 'object') {
          const presence: Record<string, boolean> = {};
          Object.keys(data).forEach((uid) => {
            presence[uid] = data[uid]?.state === 'online';
          });
          setPresenceMap(presence);
        }
      });
    } catch (e) {
      // Graceful offline fallback
    }

    return () => {
      if (unsubscribeConnected) unsubscribeConnected();
      if (unsubscribeAllStatus) unsubscribeAllStatus();
      if (userStatusRef) {
        set(userStatusRef, {
          state: 'offline',
          username: currentUser.username,
          lastChanged: Date.now(),
        }).catch(() => {});
      }
    };
  }, [currentUser.userId, currentUser.username]);

  // 3. Real-Time Leaderboard Stream via onSnapshot - NO MOCK/FALLBACK RECORDS
  useEffect(() => {
    if (!db) {
      setIsLoading(false);
      setError('Terminal offline. Verify Firestore database initialization in Firebase Console.');
      return;
    }

    setIsLoading(true);
    setError(null);

    let unsubscribeFirestore: (() => void) | null = null;

    try {
      const q = query(collection(db, 'investigators'), orderBy('score', 'desc'));

      unsubscribeFirestore = onSnapshot(
        q,
        (snapshot) => {
          // Pure Firestore data map - zero mock records
          const liveRecords: InvestigatorRecord[] = snapshot.docs.map((docSnap) => {
            const data = docSnap.data();
            
            let lastVisitedStr = '';
            if (data.lastVisited?.toDate) {
              lastVisitedStr = data.lastVisited.toDate().toISOString();
            } else if (typeof data.lastVisited === 'string') {
              lastVisitedStr = data.lastVisited;
            } else {
              lastVisitedStr = new Date().toISOString();
            }

            return {
              id: docSnap.id,
              username: data.username || 'Anonymous Sleuth',
              avatarIcon: data.avatarIcon || 'detective_01',
              currentBadge: data.currentBadge || 'Apprentice Detective',
              score: typeof data.score === 'number' ? data.score : 0,
              achievements: Array.isArray(data.achievements) ? data.achievements : [],
              lastVisited: lastVisitedStr,
            };
          });

          setPlayers(liveRecords);
          setIsLoading(false);
          setIsConnected(true);
        },
        (err) => {
          // Graceful handling of code=unavailable or offline network
          if (err?.code === 'unavailable') {
            setError('Terminal operating in offline mode. Database will sync once connected.');
          } else {
            setError('Terminal offline. Verify Firestore database initialization in Firebase Console.');
          }
          setIsLoading(false);
          setPlayers([]);
        }
      );
    } catch (e) {
      setError('Terminal offline. Verify Firestore database initialization in Firebase Console.');
      setIsLoading(false);
    }

    return () => {
      if (unsubscribeFirestore) unsubscribeFirestore();
    };
  }, []);

  // Merge real players with live presence map
  const livePlayersWithPresence = players.map((player) => {
    const isSelf = player.id === currentUser.userId;
    const isOnline = isSelf ? true : Boolean(presenceMap[player.id]);
    return {
      ...player,
      isOnline,
    };
  });

  return {
    players: livePlayersWithPresence,
    isConnected,
    isLoading,
    error,
    onlineCount: livePlayersWithPresence.filter((p) => p.isOnline).length,
    totalCount: livePlayersWithPresence.length,
  };
}
