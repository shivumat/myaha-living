'use client';
import { FirebaseAuth } from '#/lib/db/firebaseAuth';
import {
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from 'firebase/auth';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (
    email: string,
    password: string,
    rememberMe: boolean,
  ) => Promise<void>;
  logout: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  handleGoogleSignup: () => Promise<void>;
  handleEmailSignup: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [firebaseAuth, setFirebaseAuth] = useState<any>(null);

  useEffect(() => {
    const authInstance = FirebaseAuth.getInstance().getAuthProvider();
    setFirebaseAuth(authInstance);

    const unsubscribe = onAuthStateChanged(authInstance, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (
    email: string,
    password: string,
    rememberMe: boolean,
  ) => {
    if (!firebaseAuth) return;
    const persistence = rememberMe
      ? browserLocalPersistence
      : browserSessionPersistence;
    await setPersistence(firebaseAuth, persistence);
    await signInWithEmailAndPassword(firebaseAuth, email, password);
  };

  const loginWithGoogle = async () => {
    if (!firebaseAuth) return;
    const googleProvider = FirebaseAuth.getInstance().getGoogleAuthProvider();
    await signInWithPopup(firebaseAuth, googleProvider);
  };

  const logout = async () => {
    if (!firebaseAuth) return;
    await signOut(firebaseAuth);
    setUser(null);
  };

  const handleGoogleSignup = async () => {
    try {
      if (!firebaseAuth) return;
      const googleProvider = FirebaseAuth.getInstance().getGoogleAuthProvider();
      await signInWithPopup(firebaseAuth, googleProvider);
    } catch (err) {
      console.error('Google signup failed.');
    }
  };

  const handleEmailSignup = async (email: string, password: string) => {
    try {
      if (!firebaseAuth) return;
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
    } catch (err) {
      console.error('Signup failed. Try again.');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        loginWithGoogle,
        handleGoogleSignup,
        handleEmailSignup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
