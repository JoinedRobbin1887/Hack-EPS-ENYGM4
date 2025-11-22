import React from "react";

export function Button({ children, className = "", ...props }) {
  return (
    <button
      type="submit"
      className={`
        flex items-center justify-center rounded-3xl bg-indigo-500
        cursor-pointer
        text-sm leading-6 font-semibold
        text-white hover:bg-indigo-400
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500
        ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
