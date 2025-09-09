import React, { useState } from "react";
import { EyeOff, Eye } from "lucide-react";

const Input = React.forwardRef(
  (
    {
      type,
      name,
      label,
      placeholder,
      className = "",
      id,
      required = false,
      ...rest
    },
    ref
  ) => {
    const userId = id || name;
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="flex flex-col gap-2 relative">
        <label htmlFor={name}>{label}</label>
        <input
          id={userId}
          type={
            type === "password" ? (showPassword ? "text" : "password") : "text"
          }
          name={name}
          ref={ref}
          required={required}
          placeholder={placeholder}
          className={`${className} p-2 mb-4 rounded-md w-full placeholder:text-[.9rem] md:placeholder:text-[1rem] focus:outline-none border-[0.5px] dark:border-border-dark border-border-dark dark:bg-bg-dark-secondary bg-bg-light-secondary`}
          {...rest}
        />
        {type === "password" && (
          <div
            onClick={() => setShowPassword((show) => !show)}
            className="absolute top-1/2 right-3"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </div>
        )}
      </div>
    );
  }
);

export default Input;
