import Firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { signInWithPopup } from 'firebase/auth';

const config = {
    apiKey: "AIzaSyArVuGjFPvBlOxcIF21Clp5hBbnCsiWRuQ",
    authDomain: "crwn-db-e560d.firebaseapp.com",
    projectId: "crwn-db-e560d",
    storageBucket: "crwn-db-e560d.appspot.com",
    messagingSenderId: "577407776595",
    appId: "1:577407776595:web:f2e3c66b6d7be5615013a6",
    measurementId: "G-ZFVX56X5BK"
  }

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapshot = await userRef.get();

    if(!snapshot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch(error) {
        console.log('error creating user', error.message);
      }
    }
    return userRef;
  }

  Firebase.initializeApp(config);

  export const auth = Firebase.auth(); 
  export const firestore = Firebase.firestore();

  const provider = new Firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });

  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default Firebase;


