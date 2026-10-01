import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeFirestore, getFirestore, setLogLevel } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

// Configuration parameters pulled strictly from Vite environment variables (import.meta.env)
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "sql-sleuth-game.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "sql-sleuth-game",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "sql-sleuth-game.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "370435895979",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-P0MMBBGY6Z"
};

// Initialize or get existing Firebase app instance
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Silence SDK internal connection retry warnings during offline or sandboxed execution
try {
  setLogLevel('silent');
} catch (e) {
  // Ignore
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

export default app;
