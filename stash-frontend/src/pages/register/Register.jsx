import axios from "axios";
import { useState } from "react";
import Input from "../../utils/ui/Input";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../../utils/ui/Buttons/Button";
import { useUserContext } from "../../hooks/useUserContext";
import AuthWelcomeSidebar from "../../utils/ui/AuthWelcomeSidebar";
import LoginWithGoogleBtn from "../../utils/ui/Buttons/LoginWithGoogleBtn";

function Register() {
  const { login } = useUserContext();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const getApiUrl = () => {
    const hostname = window.location.hostname;
    console.log("window.location.hostname", hostname);

    const port = import.meta.env.VITE_BACKEND_API_PORT;

    if (hostname === "localhost" || hostname === "127.0.0.1") {
      return `http://localhost:${port}/api/v1/`;
    }
    const protocol = window.location.protocol;
    return `${protocol}//${hostname}:${port}/api/v1/`;
  };

  const API_BASE_URL = getApiUrl();
  console.log(API_BASE_URL);

  const onSubmit = async function (data) {
    try {
      const response = await axios.post(`${API_BASE_URL}auth/register`, data, {
        withCredentials: true,
      });
      console.log("Response data:", response.data);

      const responseData = response.data.data;
      const { user, accessToken, refreshToken } = responseData;

      console.log("Access Token:", accessToken);
      console.log("Refresh Token:", refreshToken);
      console.log("User Info:", user);
      login({
        ...user,
        accessToken,
        refreshToken,
      });

      navigate("/user/dashboard");
      reset();
    } catch (error) {
      console.error(error.response?.data || error.message);
      setMessage(error.response?.data.message || error.message);
    }
  };
  const errorClass = "text-error text-sm relative bottom-[0.65rem]";
  return (
    <div className="bg-bg-light-primary select-none dark:bg-bg-dark-primary text-text-light-primary dark:text-text-dark-primary w-full flex">
      {/* left ui side  */}
      <AuthWelcomeSidebar />
      {/* right ui side  */}
      <div className="py-6 md:p-8 mt-8 w-full md:w-1/2 gap-3 justify-center lg:justify-evenly flex items-center select-none text-text-light-primary dark:text-text-dark-primary">
        <div className="w-full flex flex-col mt-8 md:mt-10 items-center border-border-light dark:border-border-dark rounded-2xl p-5 md:p-8 sm:w-[25rem] md:w-[32rem] lg:w-[30rem]">
          <div className="font-semibold text-[1.5rem] md:text-[1.8rem] lg:text-[2rem] mb-1">
            Register
          </div>
          <p className="mb-6 text-[.9rem] md:text-[1rem]">
            Create a new account 👋
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="relative w-11/12"
            action=""
          >
            {/* username */}
            <Input
              type="text"
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Minimum length is 3 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Maximum length is 20 characters",
                },
                pattern: {
                  value:
                    /^[a-zA-Z0-9](?!.*[._]{2})[a-zA-Z0-9._]{1,18}[a-zA-Z0-9]$/,
                  message:
                    "Username must be alphanumeric and can contain . or _ but no consecutive special characters, and cannot start or end with special characters",
                },
              })}
              label="Username"
              placeholder="Enter your username"
            />
            {errors.username && (
              <p className={errorClass}>{errors.username.message}</p>
            )}
            {/* email */}
            <Input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email address format",
                },
              })}
              label="Email"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className={errorClass}>{errors.email.message}</p>
            )}

            {/* password */}
            <Input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                maxLength: {
                  value: 30,
                  message: "Password must be at most 30 characters",
                },
              })}
              label="Password"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className={errorClass}>{errors.password.message}</p>
            )}
            {message && <div className={errorClass}>{message}</div>}
            {/* submit button */}

            <div>
              <Button
                type="Submit"
                text="Register"
                className="w-full mt-3 py-2"
              />
            </div>
            {/* Login with google  */}
            <div className="flex items-center w-full my-3">
              <hr className="flex-grow border-t border-text-dark-secondary dark:border-border-dark" />
              <span className="mx-3 text-text-light-secondary dark:text-text-dark-secondary text-sm">
                or
              </span>
              <hr className="flex-grow border-t border-text-dark-secondary dark:border-border-dark" />
            </div>

            <div className="py-2 mt-3 w-full cursor-pointer">
              <LoginWithGoogleBtn />
            </div>
            <div className="mt-4 text-[.9rem] md:text-[1rem] dark:text-text-dark-secondary text-text-light-secondary">
              Already have an account?{" "}
              <a href="/login" className="underline  cursor-pointer">
                Login
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
