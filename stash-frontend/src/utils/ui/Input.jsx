import React, { useState } from "react";
import { EyeOff, Eye } from "lucide-react";

function Input({
  type,
  name,
  label,
  value,
  placeholder,
  className = "",
  onClick,
  id,
  onChange,
  required = false,
}) {
  const userId = id || name;

  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex flex-col gap-2 relative">
      <label htmlFor={name}>{label}</label>
      <input
        id={userId}
        type={
          type == "password" ? (showPassword ? "text" : "password") : "text"
        }
        name={name}
        value={value}
        onClick={onClick}
        required={required}
        onChange={onChange}
        placeholder={placeholder}
        className={`${className} p-2 mb-4 rounded-md w-full placeholder:text-[.9rem] md:placeholder:text-[1rem] focus:outline-none border-[0.5px] dark:border-border-dark border-border-dark dark:bg-bg-dark-secondary bg-bg-light-secondary`}
      />
      {type == "password" && (
        <div
          onClick={() => setShowPassword((showPassword) => !showPassword)}
          className=" absolute top-1/2 right-3 "
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </div>
      )}
    </div>
  );
}

export default Input;
