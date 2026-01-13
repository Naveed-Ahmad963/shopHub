// components/AuthInput.jsx
import React from "react";

import { EyeOff, Eye } from "lucide-react";

export const AuthInput = ({
  label,
  icon: Icon,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  required = false,
  showToggle = false,
  isVisible = false,
  onToggleVisibility,
  ...props
}) => {
  const inputType = showToggle && isVisible ? "text" : type;

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className="block w-full pl-12 pr-4 py-3 border-2 border-blue-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          {...props}
        />
        {showToggle && (
          <button
            type="button"
            onClick={onToggleVisibility}
            className="absolute inset-y-0 right-0 pr-4 flex items-center"
          >
            {isVisible ? (
              <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
            )}
          </button>
        )}
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600 font-semibold">{error}</p>
      )}
    </div>
  );
};
