import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/Firebase";
import axios from "axios";
import { serverUrl } from "../pages/constents";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isInitialLoad = true;
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    // Set isLoading to false after initial check
    setIsLoading(false);

    // Set up listener for auth state changes - only for logout detection
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      // If no Firebase user and we're not on initial load, user logged out
      if (!firebaseUser && !isInitialLoad) {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        return;
      }

      // Don't do backend exchange here - the button component handles it
      // Just update context if we have a stored user
      if (firebaseUser) {
        const stored = localStorage.getItem("user");
        if (stored && JSON.parse(stored)._id) {
          // Context was already updated by button's login() call
        }
      }

      isInitialLoad = false;
    });

    return () => unsubscribe();
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("accessToken", userData.accessToken);
    localStorage.setItem("refreshToken", userData.refreshToken);
  };
  const logout = () => {
    // sign out from firebase as well so onAuthStateChanged won't re-authenticate
    try {
      signOut(auth).catch((e) => console.warn("Firebase signOut failed:", e));
    } catch (e) {
      console.warn("Firebase signOut exception:", e);
    }

    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};
