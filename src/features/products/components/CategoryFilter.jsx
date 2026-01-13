// components/CategoryFilter.jsx
import { Filter, LayoutGrid, X, TrendingUp } from "lucide-react";

export const CategoryFilter = ({
  categories,
  selectedCategory,
  onCategoryChange,
  onClearFilters,
  total,
  searchQuery,
}) => {
  return (
    <aside className="lg:w-72 flex-shrink-0">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 sticky top-24">
        {/* Filter Header */}
        <div className="flex items-center justify-between mb-5 pb-5 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Filter className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-black text-lg text-gray-900">Filters</h3>
              <p className="text-xs text-gray-500">Refine results</p>
            </div>
          </div>
          {selectedCategory && (
            <button
              onClick={onClearFilters}
              className="text-xs text-blue-600 hover:text-blue-700 font-semibold"
            >
              Clear
            </button>
          )}
        </div>

        {/* Categories */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <LayoutGrid className="w-4 h-4 text-gray-600" />
            <h4 className="text-sm font-bold text-gray-700">Categories</h4>
          </div>
          <div className="space-y-2">
            <button
              onClick={() => onCategoryChange("")}
              className={`w-full text-left px-4 py-3 rounded-lg font-semibold text-sm transition-all ${
                !selectedCategory
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="flex items-center justify-between">
                All Products
                {!selectedCategory && (
                  <span className="text-xs bg-white/30 px-2 py-0.5 rounded-full">
                    {total}
                  </span>
                )}
              </span>
            </button>

            {categories?.map((category) => (
              <button
                key={category._id}
                onClick={() => onCategoryChange(category._id)}
                className={`w-full text-left px-4 py-3 rounded-lg font-semibold text-sm transition-all ${
                  selectedCategory === category._id
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        {!searchQuery && total > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <p className="text-sm font-bold text-gray-900">Store Stats</p>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Products</span>
                  <span className="font-bold text-gray-900">{total}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Categories</span>
                  <span className="font-bold text-gray-900">
                    {categories?.length || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
