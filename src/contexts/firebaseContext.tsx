import { initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { firebaseConfig } from "../utils/firebase-config";

interface IFirebaseContext {
  db: Firestore | null;
}

const initialValue: IFirebaseContext = {
  db: null,
};

const FirebaseContext = createContext(initialValue);

const FirebaseProvider = ({ children }: any) => {
  const [db, setDb] = useState<Firestore | null>(null);

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const _db = getFirestore(app);
    setDb(_db);
  }, []);

  return (
    <FirebaseContext.Provider value={{ db }}>
      {children}
    </FirebaseContext.Provider>
  );
};

const useFirebaseContext = () => {
  return useContext(FirebaseContext);
};

export { FirebaseContext, FirebaseProvider, useFirebaseContext };
