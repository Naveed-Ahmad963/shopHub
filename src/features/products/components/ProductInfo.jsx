// components/ProductInfo.jsx
import React from "react";
import { Star, ShoppingCart, Minus, Plus, Package } from "lucide-react";
import { formatPrice } from "../../../utils/helpers";

export const ProductInfo = ({
  product,
  quantity,
  setQuantity,
  onAddToCart,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>

      {/* Rating */}
      <div className="flex items-center gap-2 mb-6">
        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(product.ratings || 0)
                  ? "text-yellow-500 fill-yellow-500"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-gray-600 font-semibold">
          ({product.numReviews || 0} reviews)
        </span>
      </div>

      {/* Price */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-2">
          Price
        </p>
        <p className="text-4xl font-black text-gray-900">
          {formatPrice(product.price)}
        </p>
      </div>

      {/* Description */}
      <p className="text-gray-700 mb-6 leading-relaxed text-sm">
        {product.description}
      </p>

      {/* Stock Status */}
      <div className="mb-6">
        <span
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm ${
            product.stock > 0
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          <Package className="w-4 h-4" />
          {product.stock > 0
            ? `In Stock (${product.stock} available)`
            : "Out of Stock"}
        </span>
      </div>

      {/* Quantity and Add to Cart */}
      {product.stock > 0 && (
        <>
          <div className="flex items-center gap-4 mb-6">
            <label className="font-semibold text-gray-900 text-sm">
              Quantity:
            </label>
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 hover:bg-gray-50 transition-colors"
              >
                <Minus className="w-4 h-4 text-gray-600" />
              </button>
              <span className="px-6 py-2 font-bold text-gray-900 border-l border-r border-gray-200">
                {quantity}
              </span>
              <button
                onClick={() =>
                  setQuantity(Math.min(product.stock, quantity + 1))
                }
                className="p-2 hover:bg-gray-50 transition-colors"
              >
                <Plus className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          <button
            onClick={() => onAddToCart(product, quantity)}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all shadow-sm hover:shadow-md"
          >
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </button>
        </>
      )}

      {product.stock === 0 && (
        <button
          disabled
          className="w-full px-6 py-3 bg-gray-300 text-gray-500 font-bold rounded-lg cursor-not-allowed"
        >
          Out of Stock
        </button>
      )}
    </div>
  );
};
