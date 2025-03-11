'use client';
import { FirebaseAuth } from '#/lib/db/firebaseAuth';
import Login from '#/ui/LoginModal';
import SignUp from '#/ui/SignUpModal';
import Welcome from '#/ui/WelcomModal';
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
import { useRouter, useSearchParams } from 'next/navigation';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useToast } from './ToastContext';

interface UserDetailsInterface {
  firstName?: string;
  lastName?: string;
  mobile?: string;
  pincode?: string;
  address?: string;
  email: string;
  uuid: string;
  birthdate?: string;
  city?: string;
  country?: string;
}

interface AuthContextType {
  user: User | null;
  userDetails: UserDetailsInterface | null;
  loading: boolean;
  login: (
    email: string,
    password: string,
    rememberMe: boolean,
  ) => Promise<void>;
  logout: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  handleGoogleSignup: () => Promise<void>;
  toggleLogin: () => void;
  saveUserDetails: (userInfo: UserDetailsInterface) => Promise<void>;
  handleEmailSignup: (
    email: string,
    password: string,
    userInfo: any,
  ) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userDetails, setUserDetails] = useState<UserDetailsInterface | null>(
    null,
  );
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

  const saveUserDetails = async (userInfo: UserDetailsInterface) => {
    try {
      console.log('userInfo:', userInfo);
      const response = await fetch('/api/user/saveUser', {
        method: 'POST',
        body: JSON.stringify(userInfo),
      });
      const data = await response.json();
      if (data.status) {
        setUserDetails(userInfo);
      }
    } catch (err) {
      console.error('Error saving user details:', err);
    }
  };

  const getUserDetails = async (uuid: string, email: string) => {
    try {
      const response = await fetch('/api/user/getUser', {
        method: 'POST',
        body: JSON.stringify({ uuid, email }),
      });
      const data = await response.json();
      if (data.status) {
        setUserDetails(data.userDetails);
      }
    } catch (err) {
      console.error('Error fetching user details:', err);
    }
  };

  useEffect(() => {
    if (!user) {
      setUserDetails(null);
    } else {
      showToast('You have logged in successfully.', 'success');
      getUserDetails(user.uid, user?.email ?? '');
    }
  }, [user]);

  const { showToast } = useToast();

  const login = async (
    email: string,
    password: string,
    rememberMe: boolean,
  ) => {
    try {
      if (!firebaseAuth) return;
      const persistence = rememberMe
        ? browserLocalPersistence
        : browserSessionPersistence;
      await setPersistence(firebaseAuth, persistence);
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (err: any) {
      showToast('Please verify your credentials', 'error');
      console.error('Login failed. Try again.');
    }
  };

  const loginWithGoogle = async () => {
    if (!firebaseAuth) return;
    const googleProvider = FirebaseAuth.getInstance().getGoogleAuthProvider();
    await signInWithPopup(firebaseAuth, googleProvider);
  };

  const logout = async () => {
    if (!firebaseAuth) return;
    await signOut(firebaseAuth);
    showToast('You have been logged out.', 'success');
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

  const handleEmailSignup = async (
    email: string,
    password: string,
    userInfo: any,
  ) => {
    try {
      if (!firebaseAuth) return;
      const user = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password,
      );
      const uuid = user.user?.uid;
      const newUserDetails = {
        ...userInfo,
        uuid,
        email,
      };
      await saveUserDetails(newUserDetails);
    } catch (err) {
      showToast('Email already in use', 'error');
      console.error('Signup failed. Try again.');
    }
  };

  const searchParams = useSearchParams();
  const router = useRouter();
  const [hasLogin, setHasLogin] = useState(false);
  const [hasSignUp, setHasSignUp] = useState(false);
  const [hasWelcome, setHasWelcome] = useState(false);

  useEffect(() => {
    setHasLogin(searchParams.has('login'));
    setHasSignUp(searchParams.has('signUp'));
    setHasWelcome(searchParams.has('welcome'));
  }, [searchParams]);

  const removeLoginQueryParam = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('login');
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const removeSignUpQueryParam = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('signUp');
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    if (!userDetails) return;
    if (!!userDetails && hasSignUp) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('welcome', 'true');
      params.delete('login');
      params.delete('signUp');
      router.replace(`?${params.toString()}`, { scroll: false });
    }

    if (!!userDetails && hasLogin) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete('login');
      params.delete('signUp');
      router.replace(`?${params.toString()}`, { scroll: false });
    }
  }, [userDetails, hasSignUp, hasLogin]);

  const toggleLogin = () => {
    if (searchParams.has('login')) {
      removeLoginQueryParam();
      return;
    }
    const params = new URLSearchParams(searchParams.toString());
    params.set('login', 'true');
    params.delete('signUp');
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const toggleSignUp = () => {
    if (searchParams.has('signUp')) {
      removeSignUpQueryParam();
      return;
    }
    let params = new URLSearchParams(searchParams.toString());
    params.set('signUp', 'true');
    params.delete('login');
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const toggleWelcome = () => {
    if (searchParams.has('welcome')) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete('welcome');
      router.replace(`?${params.toString()}`, { scroll: false });
      return;
    }
    let params = new URLSearchParams(searchParams.toString());
    params.set('welcome', 'true');
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userDetails,
        loading,
        login,
        logout,
        loginWithGoogle,
        handleGoogleSignup,
        handleEmailSignup,
        toggleLogin,
        saveUserDetails,
      }}
    >
      {children}
      <Login
        isOpen={hasLogin}
        onClose={toggleLogin}
        toggleSignUp={toggleSignUp}
      />
      <SignUp isOpen={hasSignUp} onClose={toggleSignUp} />
      <Welcome isOpen={hasWelcome} onClose={toggleWelcome} />
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
