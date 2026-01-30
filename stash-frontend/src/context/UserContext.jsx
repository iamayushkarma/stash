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
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    // Use onAuthStateChanged to detect Firebase auth state (handles redirect and popup)
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setIsLoading(false);
        return;
      }

      // If we already have a user in localStorage, skip exchange
      const stored = localStorage.getItem("user");
      if (stored) {
        setIsLoading(false);
        return;
      }

      // Exchange Firebase user with backend to get app tokens
      const userData = {
        name: firebaseUser.displayName,
        email: firebaseUser.email,
        googleId: firebaseUser.uid,
      };

      try {
        const apiResponse = await axios.post(
          `${serverUrl}auth/google-login`,
          userData,
          { withCredentials: true }
        );
        const resData = apiResponse.data.data;
        const { user: userFromBackend, accessToken, refreshToken } = resData;

        const combined = { ...userFromBackend, accessToken, refreshToken };
        setUser(combined);
        localStorage.setItem("user", JSON.stringify(combined));
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
      } catch (err) {
        console.error("Backend exchange failed:", err);
      } finally {
        setIsLoading(false);
      }
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
