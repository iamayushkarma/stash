import Button from "../utils/ui/Buttons/Button";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="w-full select-none h-svh fixed dark:text-text-dark-primary bg-bg-light-primary text-text-light-primary dark:bg-bg-dark-primary">
      <div className="flex flex-col justify-center relative h-[100%] items-center">
        <div>
          <span className="bg-primary/10 dark:text-text-dark-secondary text-text-light-secondary px-5 py-2 rounded-lg">
            404
          </span>
        </div>
        <div className="p-6 pb-3 text-lg md:text-xl lg:text-2xl">
          <p className="">Oops! Page not found.</p>
        </div>
        <div className="text-center w-11/12 text-sm md:text-md lg:text-lg dark:text-text-dark-secondary text-text-light-secondary">
          <p className="">
            We couldn't find the page you're looking for. It might have been
            moved or doesn't exist anymore.
          </p>
        </div>
        <div className="mt-6">
          <Link to="/">
            <Button text="Back to Home page"></Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;
