import React from "react";

export const Button = ({
  isLoading = false,
  disabled = false,
  children }) => {
  return (
    <button
      type="submit"
      disabled={disabled || isLoading}
      className={`w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300
      ${isLoading ? 'cursor-wait' : 'cursor-pointer'}
      ${disabled && 'opacity-50 pointer-events-none'}, 
        `}
    >
      {children}
    </button>
  );
};
