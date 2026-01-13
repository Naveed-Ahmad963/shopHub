// components/SearchBanner.jsx
import React from "react";
import { Search, X } from "lucide-react";

export const SearchBanner = ({ searchQuery, total, onClearSearch }) => {
  if (!searchQuery) return null;

  return (
    <div className="bg-blue-50 border-l-4 border-blue-600 rounded-r-xl p-4 flex items-center justify-between shadow-sm mb-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-600 rounded-lg">
          <Search className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-gray-900 font-bold text-sm">
            Searching: <span className="text-blue-600">"{searchQuery}"</span>
          </p>
          {total > 0 && (
            <p className="text-xs text-gray-600 mt-0.5">
              {total} {total === 1 ? "match" : "matches"}
            </p>
          )}
        </div>
      </div>
      <button
        onClick={onClearSearch}
        className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-100 transition-all font-semibold text-sm border border-gray-300 hover:border-blue-600 hover:text-blue-600"
      >
        <X className="w-4 h-4" />
        <span className="hidden sm:inline">Clear</span>
      </button>
    </div>
  );
};
