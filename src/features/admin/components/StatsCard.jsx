// components/StatsCard.jsx
import React from "react";

export const StatsCard = ({
  label,
  value,
  icon: Icon,
  gradientFrom = "from-blue-500",
  gradientTo = "to-blue-600",
  className = "",
}) => {
  return (
    <div
      className={`bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 ${className}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-semibold uppercase tracking-wide mb-1">
            {label}
          </p>
          <p className="text-3xl font-extrabold text-gray-900">{value}</p>
        </div>
        <div
          className={`p-3 bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-xl`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
};
