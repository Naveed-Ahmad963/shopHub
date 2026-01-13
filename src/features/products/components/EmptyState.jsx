// components/EmptyState.jsx
import React from "react";
import { Search, ShoppingBag, X } from "lucide-react";

export const EmptyState = ({
  searchQuery,
  selectedCategory,
  onClearSearch,
  onClearAllFilters,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-16">
      <div className="text-center max-w-md mx-auto">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <Search className="w-10 h-10 text-gray-400" />
        </div>
        <h3 className="text-2xl font-black text-gray-900 mb-3">
          {searchQuery ? "No results found" : "No products available"}
        </h3>
        <p className="text-gray-600 mb-6 leading-relaxed">
          {searchQuery
            ? `We couldn't find any products matching "${searchQuery}". Try different keywords or browse all products.`
            : "No products match your current filters. Try adjusting your selection."}
        </p>
        <div className="flex gap-3 justify-center">
          {searchQuery && (
            <button
              onClick={onClearSearch}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
            >
              <ShoppingBag className="w-5 h-5" />
              Browse All
            </button>
          )}
          {selectedCategory && (
            <button
              onClick={onClearAllFilters}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-700 transition-all shadow-md hover:shadow-lg"
            >
              <X className="w-5 h-5" />
              Clear Filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
