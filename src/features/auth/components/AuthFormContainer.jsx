// components/AuthFormContainer.jsx
import React from "react";

export const AuthFormContainer = ({
  title,
  subtitle,
  icon: Icon,
  children,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-lg">
              <Icon className="w-10 h-10 text-white" />
            </div>
          </div>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-2">
            {title}
          </h2>
          <p className="text-gray-600 text-lg">{subtitle}</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
          {children}
        </div>
      </div>
    </div>
  );
};
