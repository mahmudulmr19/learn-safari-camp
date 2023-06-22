import React, { createContext, useEffect } from "react";
import { auth } from "@/firebase/Firebase";
import { useAuth } from "@/hooks";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const { setCurrentUser, setLoading } = useAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        website: "Learn Safari Camp",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
