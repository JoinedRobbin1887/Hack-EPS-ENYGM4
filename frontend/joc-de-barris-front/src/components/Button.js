import React from "react";

export function Button({ children, className = "", ...props }) {
  return (
    <button
      type="submit"
      className={`
        flex items-center justify-center rounded-3xl bg-cornflower-blue-500
        cursor-pointer
        text-sm leading-6 font-semibold
        text-white hover:bg-cornflower-blue-300
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500
        ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
