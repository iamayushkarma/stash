// import axios from "axios";
// import { FcGoogle } from "react-icons/fc";
// import { useNavigate } from "react-router-dom";
// import { signInWithPopup } from "firebase/auth";
// import { auth, provider } from "../../Firebase";
// import { serverUrl } from "../../../pages/constents";
// import { useUserContext } from "../../../hooks/useUserContext";

// function LoginWithGoogleBtn() {
//   const { login } = useUserContext();
//   const navigate = useNavigate();
//   const loginWithGoogle = async () => {
//     try {
//       const response = await signInWithPopup(auth, provider);
//       const user = response.user;
//       const userData = {
//         name: user.displayName,
//         email: user.email,
//         googleId: user.uid,
//       };
//       const apiResponse = await axios.post(
//         `${serverUrl}auth/google-login`,
//         userData,
//         {
//           withCredentials: true,
//           headers: { "content-type": "application/json" },
//         }
//       );
//       const resData = await apiResponse.data;
//       const { user: userFromBackend, accessToken, refreshToken } = resData.data;

//       login({
//         ...userFromBackend,
//         accessToken,
//         refreshToken,
//       });
//       navigate("/user/dashboard");
//       reset();
//     } catch (error) {
//       console.error("error with google login", error);
//     }
//   };
//   return (
//     <>
//       <div
//         onClick={() => loginWithGoogle()}
//         className="p-2 border border-border-dark dark:border-border-dark bg-bg-light-secondary dark:bg-bg-dark-secondary flex gap-2 items-center justify-center rounded-xl"
//       >
//         <span>
//           <FcGoogle />
//         </span>
//         <span className="text-text-light-primary dark:text-text-dark-primary">
//           Google
//         </span>
//       </div>
//     </>
//   );
// }

// export default LoginWithGoogleBtn;

import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import {
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import { auth, provider } from "../../Firebase";
import { serverUrl } from "../../../pages/constents";
import { useUserContext } from "../../../hooks/useUserContext";
import { useEffect, useState } from "react";

function LoginWithGoogleBtn() {
  const { login } = useUserContext();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Check if on mobile device
  const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  };

  // Handle redirect result on component mount (for mobile)
  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          await handleGoogleAuth(result);
        }
      } catch (error) {
        console.error("Error handling redirect result:", error);
        setIsLoading(false);
      }
    };

    handleRedirectResult();
  }, []);

  // Common function to handle Google authentication
  const handleGoogleAuth = async (response) => {
    try {
      setIsLoading(true);
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

      navigate("/user/dashboard");
    } catch (error) {
      console.error("Error with Google login:", error);
      alert("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Login function that chooses popup or redirect based on device
  const loginWithGoogle = async () => {
    try {
      setIsLoading(true);

      if (isMobile()) {
        // Use redirect for mobile devices
        await signInWithRedirect(auth, provider);
        // The redirect will happen, and the result will be handled in useEffect
      } else {
        // Use popup for desktop
        const response = await signInWithPopup(auth, provider);
        await handleGoogleAuth(response);
      }
    } catch (error) {
      console.error("Error initiating Google login:", error);
      alert("Login failed. Please try again.");
      setIsLoading(false);
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
