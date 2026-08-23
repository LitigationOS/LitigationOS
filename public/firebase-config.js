// Firebase web configuration is safe to use in browser code.
// Replace every value below with the configuration from Firebase Console → Project settings → Your apps → Web app.
export const firebaseConfig = {
  apiKey: "PASTE_YOUR_FIREBASE_API_KEY",
  authDomain: "PASTE_YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "PASTE_YOUR_PROJECT_ID",
  storageBucket: "PASTE_YOUR_PROJECT_ID.firebasestorage.app",
  messagingSenderId: "PASTE_YOUR_MESSAGING_SENDER_ID",
  appId: "PASTE_YOUR_APP_ID"
};

export const firebaseIsConfigured = !Object.values(firebaseConfig).some(
  (value) => value.includes("PASTE_YOUR")
);
