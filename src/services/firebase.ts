import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeFirestore, getFirestore, setLogLevel } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

export const firebaseConfig = {
  apiKey: "AIzaSyDtSDL1zC99i5es9bQ6Z8gEmz-CpvEJKUw",
  authDomain: "sql-sleuth-game.firebaseapp.com",
  projectId: "sql-sleuth-game",
  storageBucket: "sql-sleuth-game.firebasestorage.app",
  messagingSenderId: "370435895979",
  appId: "1:370435895979:web:77bd405ec39de9d28b3dee",
  measurementId: "G-P0MMBBGY6Z"
};

// Initialize or reuse Firebase app instance
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Silence SDK internal connection retry warnings during offline or sandboxed execution
try {
  setLogLevel('silent');
} catch (e) {
  // Ignore in environments where setLogLevel is unavailable
}

// Initialize Firestore with auto-detect long polling for sandboxed iframes & proxies
export const db = (() => {
  try {
    return initializeFirestore(app, {
      experimentalAutoDetectLongPolling: true,
      ignoreUndefinedProperties: true,
    });
  } catch (e) {
    return getFirestore(app);
  }
})();

// Realtime Database instance for active detective presence heartbeats
export const rtdb = (() => {
  try {
    return getDatabase(app);
  } catch (e) {
    return null as any;
  }
})();
