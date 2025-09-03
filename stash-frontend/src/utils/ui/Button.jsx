import React from "react";

function Button({ text, onClick, className }) {
  return (
    <button
      className={`${className} bg-primary px-3 py-1 active:scale-[0.98] transition-all duration-150 text-text-dark-primary md:hover:bg-blue-500 lg:text-[1rem] lg:px-[0.875rem] lg:py-[0.428rem] rounded-lg `}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
