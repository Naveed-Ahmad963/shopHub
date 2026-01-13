// components/PasswordStrengthIndicator.jsx
import React from "react";
import { CheckCircle, AlertCircle } from "lucide-react";

export const PasswordStrengthIndicator = ({
  password,
  confirmPassword,
  showConfirmPassword = false,
}) => {
  if (!password) return null;

  const isPasswordValid = password.length >= 6;
  const isPasswordMatch = !showConfirmPassword || password === confirmPassword;

  return (
    <div className="space-y-2">
      {/* Password Length */}
      <div className="flex items-center gap-2">
        {isPasswordValid ? (
          <CheckCircle className="w-4 h-4 text-green-500" />
        ) : (
          <AlertCircle className="w-4 h-4 text-red-500" />
        )}
        <span
          className={`text-sm ${
            isPasswordValid ? "text-green-600" : "text-red-600"
          }`}
        >
          At least 6 characters
        </span>
      </div>

      {/* Password Match (if confirm password shown) */}
      {showConfirmPassword && confirmPassword && (
        <div className="flex items-center gap-2">
          {isPasswordMatch ? (
            <CheckCircle className="w-4 h-4 text-green-500" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-500" />
          )}
          <span
            className={`text-sm ${
              isPasswordMatch ? "text-green-600" : "text-red-600"
            }`}
          >
            {isPasswordMatch ? "Passwords match" : "Passwords do not match"}
          </span>
        </div>
      )}
    </div>
  );
};
