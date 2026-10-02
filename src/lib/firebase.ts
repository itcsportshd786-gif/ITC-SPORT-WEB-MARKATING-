import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export const firebaseConfig = {
  projectId: "protean-terminus-1t86m",
  appId: "1:175270906038:web:b10b966e573bdfa2663e17",
  apiKey: "AIzaSyAPPQ2n7CWc5av3Fvnbzp2-ZX1ZO50VaOI",
  authDomain: "protean-terminus-1t86m.firebaseapp.com",
  firestoreDatabaseId: "ai-studio-itcsportslivespo-7023a282-1992-419c-b6e8-a046e39af3ab",
  storageBucket: "protean-terminus-1t86m.firebasestorage.app",
  messagingSenderId: "175270906038",
  measurementId: "",
  oAuthClientId: "175270906038-jof0n6fq8uiqnljj24rrhuch3vd8shuj.apps.googleusercontent.com"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

// Skill directive: test connection to Firestore on initialization
export async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn("Please check your Firebase configuration.");
    }
  }
}

testConnection();
