import React from "react";

function Button({ text, onClick, className, type, onSubmit }) {
  return (
    <button
      type={type}
      className={`${className} bg-primary px-3 py-1 active:scale-[0.98] cursor-pointer transition-all duration-150 text-text-dark-primary md:hover:bg-blue-500 md:text-[.95rem] text-[.9rem] lg:text-[1rem] lg:px-[0.875rem] lg:py-[0.428rem] rounded-lg `}
      onClick={onClick}
      onSubmit={onSubmit}
    >
      {text}
    </button>
  );
}

export default Button;
