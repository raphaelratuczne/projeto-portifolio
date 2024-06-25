import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

interface IAuthContext {
  auth: any;
  user: any;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const initialValue: IAuthContext = {
  auth: null,
  user: null,
  loading: true,
  login: () => Promise.resolve(),
  logout: () => null,
};

const AuthContext = createContext(initialValue);

const AuthProvider = ({ children }: any) => {
  const [auth, setAuth] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const _auth = getAuth();
    setAuth(_auth);

    const unsubscribe = onAuthStateChanged(_auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("errorCode", errorCode, "errorMessage", errorMessage);
      });
  };

  const logout = () => {
    setTimeout(() => {
      signOut(auth);
    }, 1000);
  };

  return (
    <AuthContext.Provider value={{ auth, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  return useContext(AuthContext);
};

export { AuthContext, AuthProvider, useAuthContext };
