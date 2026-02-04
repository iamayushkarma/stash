import axios from "axios";
import { useState, useLayoutEffect, useEffect } from "react";
import { motion } from "framer-motion";
import Input from "../../utils/ui/Input";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../../utils/ui/Buttons/Button";
import { useUserContext } from "../../hooks/useUserContext";
import AuthWelcomeSidebar from "../../utils/ui/AuthWelcomeSidebar";
import LoginWithGoogleBtn from "../../utils/ui/Buttons/LoginWithGoogleBtn";

function Login() {
  const { login, user, isLoading } = useUserContext();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Scroll to top on page load
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // If user is already authenticated (fallback for other auth methods), navigate to dashboard
  useEffect(() => {
    if (user && !isLoading) {
      navigate("/user/dashboard", { replace: true });
    }
  }, [user, isLoading, navigate]);

  const getApiUrl = () => {
    const hostname = window.location.hostname;
    const port = import.meta.env.VITE_BACKEND_API_PORT;
    if (hostname === "localhost" || hostname === "127.0.0.1") {
      return `http://localhost:${port}/api/v1/`;
    }
    const protocol = window.location.protocol;
    return `${protocol}//${hostname}:${port}/api/v1/`;
  };

  const API_BASE_URL = getApiUrl();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}auth/login`, data, {
        withCredentials: true,
      });
      const responseData = response.data.data;
      const { user, accessToken, refreshToken } = responseData;
      login({
        ...user,
        accessToken,
        refreshToken,
      });
      reset();
      navigate("/user/dashboard", { replace: true });
    } catch (error) {
      console.error(error.response?.data || error.message);
      setMessage(error.response?.data.message || error.message);
    }
  };

  const errorClass = "text-error text-sm relative bottom-[0.65rem]";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex dark:bg-bg-dark-primary bg-bg-light-primary"
    >
      {/* left ui side  */}
      <AuthWelcomeSidebar />

      {/* right ui side  */}
      <div className="py-6 md:p-8 mt-8 w-full md:w-1/2 gap-3 justify-center lg:justify-evenly flex items-center select-none text-text-light-primary dark:text-text-dark-primary">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full flex flex-col mt-8 md:mt-10 items-center border-border-light dark:border-border-dark rounded-2xl p-5 md:p-8 sm:w-[25rem] md:w-[32rem] lg:w-[30rem]"
        >
          <div className="font-semibold text-[1.5rem] md:text-[1.8rem] lg:text-[2rem] mb-1">
            Login
          </div>
          <p className="mb-6 text-[.9rem] md:text-[1rem]">
            Hi, Welcome back 👋
          </p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="relative w-11/12"
            action=""
          >
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
            <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary mt-2">
              By signing in or creating an account, you agree to our{" "}
              <a href="/terms" className="text-primary hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </a>
              .
            </p>
            {/* submit button */}
            <div>
              <Button type="submit" text="Login" className="w-full mt-3 py-2" />
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
              Don't have an account?{" "}
              <a href="/register" className="underline cursor-pointer">
                Register
              </a>
            </div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Login;
