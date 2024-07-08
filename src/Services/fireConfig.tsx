import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBQzNi-Hjmi1SuyVDtd3C9egHJKTrWLMdo",
  authDomain: "fir-oryon.firebaseapp.com",
  projectId: "fir-oryon",
  storageBucket: "fir-oryon.appspot.com",
  messagingSenderId: "116852585931",
  appId: "1:116852585931:web:d33c35e72703691d44b24e",
  measurementId: "G-697YKKQBET"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
