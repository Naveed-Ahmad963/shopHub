import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Plus } from "lucide-react";

export const ManagementPageLayout = ({
  title,
  subtitle,
  icon: Icon,
  onAddClick,
  children,
  showAddButton = true,
  addButtonText = "Add",
}) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-semibold mb-8 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl font-extrabold text-gray-900">{title}</h1>
            </div>
            <p className="text-gray-600 text-lg ml-16">{subtitle}</p>
          </div>
          {showAddButton && (
            <button
              onClick={onAddClick}
              className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl hover:scale-105"
            >
              <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              {addButtonText}
            </button>
          )}
        </div>

        {/* Content */}
        {children}
      </div>
    </div>
  );
};
