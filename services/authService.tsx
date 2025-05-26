// authService.ts
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { db, auth } from './../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';

export const registerUser = async (email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const uid = userCredential.user.uid;

  // Assign role in Firestore
  await setDoc(doc(db, 'users', uid), {
    email,
    role: 'admin', // Change to 'user' for non-admins
  });

  return userCredential;
};


export const loginUser = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};
