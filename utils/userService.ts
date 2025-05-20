import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from './../firebaseConfig';

export const getCurrentUserRole = async (): Promise<string | null> => {
  const user = auth.currentUser;
  if (!user) return null;

  const userDoc = await getDoc(doc(db, 'users', user.uid));
  return userDoc.exists() ? userDoc.data().role : null;
};
