// components/ProductsDisplay.jsx
import React from "react";
import { Star, Grid, List } from "lucide-react";
import ProductCard from "../ProductCard";

export const ProductsDisplay = ({
  products,
  total,
  viewMode,
  onViewModeChange,
}) => {
  return (
    <>
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
        <p className="text-sm text-gray-600 font-semibold">
          Showing{" "}
          <span className="text-gray-900 font-bold">
            {Math.min(12, products.length)} of {total}
          </span>{" "}
          products
        </p>
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2 bg-white rounded-lg p-1 shadow-sm border border-gray-200">
            <button
              onClick={() => onViewModeChange("grid")}
              className={`p-2 rounded-md transition-all ${
                viewMode === "grid"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => onViewModeChange("list")}
              className={`p-2 rounded-md transition-all ${
                viewMode === "list"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm text-gray-600">Premium Quality</span>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div
        className={`grid gap-6 ${
          viewMode === "grid"
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1"
        }`}
      >
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            viewMode={viewMode}
          />
        ))}
      </div>
    </>
  );
};
