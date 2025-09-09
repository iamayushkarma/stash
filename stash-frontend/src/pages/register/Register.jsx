import Button from "../../utils/ui/Button";
import Input from "../../utils/ui/Input";
import { FcGoogle } from "react-icons/fc";
import AuthWelcomeSidebar from "../../utils/ui/AuthWelcomeSidebar";
import { useForm } from "react-hook-form";

function Register() {
  const { register, handleSubmit } = useForm();

  handleSubmit = (e) => {
    e.prevent.default();
  };
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

          <form className="relative w-11/12" action="">
            {/* email */}
            <Input
              type="text"
              name="username"
              label="Username"
              placeholder="Enter your username"
            />
            {/* email */}
            <Input
              type="email"
              name="email"
              label="Email"
              placeholder="Enter your email"
            />
            {/* password */}
            <Input
              type="password"
              name="password"
              label="Password"
              placeholder="Enter your password"
            />
            {/* submit button */}

            <div>
              <Button
                type="Submit"
                onSubmit={() => handleSubmit()}
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
              <div className="p-2 border border-border-dark dark:border-border-dark bg-bg-light-secondary dark:bg-bg-dark-secondary flex gap-2 items-center justify-center rounded-xl">
                <span>
                  <FcGoogle />
                </span>
                <span className="text-text-light-primary dark:text-text-dark-primary">
                  Google
                </span>
              </div>
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
