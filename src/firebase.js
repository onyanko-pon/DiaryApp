import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCESmz5s5gDEIePPfex11_eXpuhRMTj5HU',
  authDomain: 'loinsystem.firebaseapp.com',
  projectId: 'loinsystem',
  storageBucket: 'loinsystem.firebasestorage.app',
  messagingSenderId: '61712526317',
  appId: '1:61712526317:web:88619c6c113863cec055e4',
  measurementId: 'G-P98VVTT2RV',
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
const db = getFirestore(app)

export { auth, provider, signInWithPopup, db }
export default db
