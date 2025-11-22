// src/components/PreferenceSelector.js
import React from "react";

export function PreferenceSelector({ label, options, selected, onChange, type = "single" }) {
  return (

    <div className="mb-6 border-b border-gray-200 pb-4">
      

      <p className="uppercase text-base text-gray-600 font-medium mb-3 text-center">{label}</p>
      

      <div className="flex flex-wrap justify-center gap-2"> 
        {options.map((option) => {
          const isSelected = selected.includes(option);
          return (
            <button
              key={option}
              className={`
                px-4 py-2 text-base rounded-full border 
                transition duration-150 whitespace-nowrap shadow-sm
                ${
                  isSelected

                    ? "bg-cornflower-blue-800 text-white font-semibold border-blue-700"
                    // NORMAL: Contorn gris suau
                    : "bg-transparent text-gray-700 border-gray-400 hover:bg-blue-50 hover:text-blue-700"
                }
              `}
              onClick={() => {
                if (type === "single") {
                  onChange([option]);
                } else {
                  if (isSelected) {
                    onChange(selected.filter((o) => o !== option));
                  } else {
                    onChange([...selected, option]);
                  }
                }
              }}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}