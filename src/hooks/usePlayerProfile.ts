import { useState, useEffect, useCallback, useRef } from 'react';
import { doc, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../services/firebase';
import { UserProfile } from '../types';

export const USER_ID_KEY = 'sql_sleuth_user_id';
export const PROFILE_KEY = 'sql_sleuth_user_profile_v1';

/**
 * Generates or retrieves a persistent device user ID.
 * This guarantees a single Firestore document per player regardless of username changes.
 */
export function getOrCreatePersistentUserId(): string {
  try {
    const existing = localStorage.getItem(USER_ID_KEY);
    if (existing && existing.trim().length > 0) {
      return existing.trim();
    }
  } catch (e) {
    // LocalStorage fallback
  }

  const generatedId = `sleuth_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 8)}`;
  try {
    localStorage.setItem(USER_ID_KEY, generatedId);
  } catch (e) {
    // Ignore storage write issues
  }
  return generatedId;
}

export interface UpdatePlayerProfilePayload {
  username?: string;
  avatarId?: string;
  rankTitle?: string;
  score?: number;
  currentBadge?: string;
  achievements?: string[];
}

export function usePlayerProfile() {
  const [userId] = useState<string>(() => getOrCreatePersistentUserId());

  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(PROFILE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse user profile:', e);
    }
    return {
      username: 'Det_Vance',
      avatarId: 'fox',
      rankTitle: 'Junior Sleuth',
    };
  });

  const previousUsernameRef = useRef<string>(userProfile.username);

  // Keep previous username ref in sync
  useEffect(() => {
    previousUsernameRef.current = userProfile.username;
  }, [userProfile.username]);

  /**
   * Helper to manually purge any orphan duplicate documents from Firestore
   * (e.g. deleting doc(db, 'investigators', 'sherylbee') or 'agent_sherylbee').
   */
  const cleanOrphanDoc = useCallback(async (docId: string) => {
    if (!db || !docId) return;
    try {
      await deleteDoc(doc(db, 'investigators', docId));
      console.log(`[Firestore Cleanup] Purged orphan investigator document: ${docId}`);
    } catch (err: any) {
      console.warn(`[Firestore Cleanup] Failed to delete orphan doc ${docId}:`, err?.message);
    }
  }, []);

  /**
   * Updates player profile with persistent userId document keying
   * and automatically purges legacy username-keyed duplicate documents in Firestore.
   */
  const updatePlayerProfile = useCallback(
    async (newDetails: UpdatePlayerProfilePayload) => {
      const oldUsername = previousUsernameRef.current;
      const updatedUsername = (newDetails.username ?? userProfile.username).trim();
      const updatedAvatar = newDetails.avatarId ?? userProfile.avatarId;
      const updatedRank = newDetails.rankTitle ?? newDetails.currentBadge ?? userProfile.rankTitle;

      const updatedProfile: UserProfile = {
        ...userProfile,
        username: updatedUsername,
        avatarId: updatedAvatar,
        rankTitle: updatedRank,
      };

      // 1. Update React Local State & Local Storage
      setUserProfile(updatedProfile);
      try {
        localStorage.setItem(PROFILE_KEY, JSON.stringify(updatedProfile));
      } catch (e) {
        console.warn('Failed to save user profile to localStorage:', e);
      }

      // 2. Target persistent userId document in Firestore
      if (db && userId) {
        try {
          const userDocRef = doc(db, 'investigators', userId);
          await setDoc(
            userDocRef,
            {
              username: updatedUsername,
              avatarIcon: updatedAvatar,
              currentBadge: updatedRank,
              ...(typeof newDetails.score === 'number' ? { score: newDetails.score } : {}),
              ...(Array.isArray(newDetails.achievements) ? { achievements: newDetails.achievements } : {}),
              lastVisited: serverTimestamp(),
            },
            { merge: true }
          );

          // 3. Purge legacy documents if username was changed
          if (oldUsername && oldUsername.toLowerCase() !== updatedUsername.toLowerCase()) {
            const legacyKeys = [
              oldUsername,
              oldUsername.toLowerCase(),
              `agent_${oldUsername.toLowerCase().replace(/[^a-z0-9_]/g, '_')}`,
            ];

            // Execute deleteDoc cleanup calls on all potential legacy documents
            for (const legacyKey of legacyKeys) {
              if (legacyKey !== userId) {
                deleteDoc(doc(db, 'investigators', legacyKey)).catch((err) => {
                  console.warn(`Legacy document cleanup skipped for ${legacyKey}:`, err?.message);
                });
              }
            }
          }
        } catch (e) {
          console.warn('Firestore updatePlayerProfile notice:', e);
        }
      }

      return updatedProfile;
    },
    [userId, userProfile]
  );

  return {
    userId,
    userProfile,
    setUserProfile,
    updatePlayerProfile,
    cleanOrphanDoc,
  };
}
