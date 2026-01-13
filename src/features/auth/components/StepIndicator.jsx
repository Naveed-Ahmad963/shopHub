// components/StepIndicator.jsx
import React from "react";

export const StepIndicator = ({ totalSteps, currentStep }) => {
  return (
    <div className="flex justify-between gap-2">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={`h-1 flex-1 rounded-full transition-all ${
            index + 1 <= currentStep ? "bg-blue-600" : "bg-gray-300"
          }`}
        />
      ))}
    </div>
  );
};
