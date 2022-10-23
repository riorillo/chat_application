import {
  getAuth,
  getRedirectResult,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
  signOut,
  User,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";
import app, { db } from "../../firebase";

const AuthContext = createContext<any>({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | undefined>(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      getAuth(app),

      async (currentUser) => {
        if (currentUser) {
          const result = await getRedirectResult(getAuth(app));

          if (result?.user) {
            setUser(result.user);

            const { uid, email, displayName, photoURL } = result.user;
            const docRef = doc(db, "users", uid);
            await setDoc(docRef, {
              email: email,
              displayName: displayName,
              photoURL: photoURL,
            });

            navigate("/homescreen");
          }
        }
        setLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const signIn = (provider: string) => {
    provider === "Google" &&
      signInWithRedirect(getAuth(app), new GoogleAuthProvider());

    provider === "GitHub" &&
      signInWithRedirect(getAuth(app), new GithubAuthProvider());
  };

  const logOut = () => {
    signOut(getAuth(app));
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, signIn, logOut }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
