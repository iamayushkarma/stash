import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../Firebase";
import { serverUrl } from "../../../pages/constents";
import { useUserContext } from "../../../hooks/useUserContext";
import { useState } from "react";

function LoginWithGoogleBtn() {
  const { login } = useUserContext();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Common function to handle Google authentication
  const handleGoogleAuth = async (response) => {
    try {
      const user = response.user;

      const userData = {
        name: user.displayName,
        email: user.email,
        googleId: user.uid,
      };

      const apiResponse = await axios.post(
        `${serverUrl}auth/google-login`,
        userData,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      const resData = apiResponse.data;
      const { user: userFromBackend, accessToken, refreshToken } = resData.data;

      login({
        ...userFromBackend,
        accessToken,
        refreshToken,
      });

      // Navigate immediately after updating context
      navigate("/user/dashboard", { replace: true });
    } catch (error) {
      console.error("Error with Google login:", error);
      alert("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Login function - use popup for all devices (modern mobile browsers support it)
  const loginWithGoogle = async () => {
    try {
      setIsLoading(true);
      console.log("🚀 Starting Google login with popup...");
      const response = await signInWithPopup(auth, provider);
      console.log("✅ Popup succeeded, user:", response.user.email);
      await handleGoogleAuth(response);
    } catch (error) {
      console.error("❌ Google login failed:", error.message);
      setIsLoading(false);

      // Only show error if user didn't cancel
      if (error.code !== "auth/popup-closed-by-user") {
        alert("Login failed. Please try again.");
      }
    }
  };

  return (
    <div
      onClick={loginWithGoogle}
      className={`p-2 border border-border-dark dark:border-border-dark bg-bg-light-secondary dark:bg-bg-dark-secondary flex gap-2 items-center justify-center rounded-xl cursor-pointer hover:bg-bg-light-primary dark:hover:bg-bg-dark-primary transition-colors ${
        isLoading ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {isLoading ? (
        <span className="text-text-light-primary dark:text-text-dark-primary">
          Loading...
        </span>
      ) : (
        <>
          <span>
            <FcGoogle />
          </span>
          <span className="text-text-light-primary dark:text-text-dark-primary">
            Google
          </span>
        </>
      )}
    </div>
  );
}

export default LoginWithGoogleBtn;
