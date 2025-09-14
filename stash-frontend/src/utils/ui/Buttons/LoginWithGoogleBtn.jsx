import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../Firebase";
import { serverUrl } from "../../../pages/constents";
import { useUserContext } from "../../../hooks/useUserContext";

function LoginWithGoogleBtn() {
  const { login } = useUserContext();
  const navigate = useNavigate();
  const loginWithGoogle = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
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
          headers: { "content-type": "application/json" },
        }
      );
      const resData = await apiResponse.data;
      const { user: userFromBackend, accessToken, refreshToken } = resData.data;

      login({
        ...userFromBackend,
        accessToken,
        refreshToken,
      });
      navigate("/user/dashboard");
      reset();
    } catch (error) {
      console.error("error with google login", error);
    }
  };
  return (
    <>
      <div
        onClick={() => loginWithGoogle()}
        className="p-2 border border-border-dark dark:border-border-dark bg-bg-light-secondary dark:bg-bg-dark-secondary flex gap-2 items-center justify-center rounded-xl"
      >
        <span>
          <FcGoogle />
        </span>
        <span className="text-text-light-primary dark:text-text-dark-primary">
          Google
        </span>
      </div>
    </>
  );
}

export default LoginWithGoogleBtn;
