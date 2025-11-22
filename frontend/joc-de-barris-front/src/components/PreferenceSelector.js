// src/components/PreferenceSelector.js
import React from "react";

export function PreferenceSelector({ label, options, selected, onChange, type = "single" }) {
  return (
    <div className="mb-4">
      <p className="font-semibold mb-2">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = selected.includes(option);
          return (
            <button
              key={option}
              className={`px-3 py-1 rounded-full border transition ${
                isSelected
                  ? "bg-indigo-500 text-white border-indigo-500"
                  : "bg-white text-black border-gray-300"
              }`}
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
