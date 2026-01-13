import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingCart, Star, Package, Heart } from "lucide-react";
import { addToCart } from "../cart/cartSlice";
import { formatPrice } from "../../utils/helpers";
import toast from "react-hot-toast";

const ProductCard = ({ product, viewMode = "grid" }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  // Handle loading state - show skeleton
  if (!product) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-pulse">
        <div className="w-full h-64 bg-gray-200"></div>
        <div className="p-5">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
        </div>
      </div>
    );
  }

  const handleAddToCart = (e) => {
    e.preventDefault();

    const existingItem = cartItems.find((item) => item._id === product._id);

    if (existingItem) {
      toast.success("Product already in your cart!");
      return;
    }

    dispatch(addToCart({ ...product, quantity: 1 }));
    toast.success("Added to cart!");
  };

  const imageUrl =
    product.images?.[0]?.url || "https://via.placeholder.com/300";

  if (viewMode === "list") {
    return (
      <Link
        to={`/products/${product._id}`}
        className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden flex"
      >
        <div className="relative w-48 flex-shrink-0">
          <img
            src={imageUrl}
            alt={product.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/300";
            }}
          />
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-gray-900 bg-opacity-80 flex items-center justify-center">
              <span className="text-white font-bold text-sm">Out of Stock</span>
            </div>
          )}
        </div>
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-xl text-gray-900 mb-2 hover:text-blue-600 transition-colors">
              {product.title}
            </h3>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {product.description}
            </p>
            <div className="flex items-center mb-3">
              <div className="flex items-center gap-1">
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
              <span className="text-sm text-gray-600 ml-2 font-semibold">
                ({product.numReviews || 0})
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-black text-gray-900">
              {formatPrice(product.price)}
            </span>
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCart className="w2 h-4" />
              Add to Cart
            </button>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/products/${product._id}`}
      className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden group"
    >
      <div className="relative overflow-hidden bg-gray-50">
        <img
          src={imageUrl}
          alt={product.title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300";
          }}
        />

        {/* Out of Stock Overlay */}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-gray-900 bg-opacity-80 flex items-center justify-center">
            <div className="text-center">
              <Package className="w-12 h-12 text-white mx-auto mb-2" />
              <span className="text-white font-bold text-lg">Out of Stock</span>
            </div>
          </div>
        )}

        {/* Low Stock Badge */}
        {product.stock > 0 && product.stock <= 5 && (
          <div className="absolute top-3 right-3">
            <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full shadow-md">
              Only {product.stock} left
            </span>
          </div>
        )}
      </div>

      <div className="p-5">
        {/* Title */}
        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {product.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center mb-4">
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
          <span className="text-sm text-gray-600 ml-2 font-semibold">
            ({product.numReviews || 0})
          </span>
        </div>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div>
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-1">
              Price
            </p>
            <span className="text-xl font-black text-gray-900">
              {formatPrice(product.price)}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="flex items-center gap-2 px-2 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-sm"
          >
            <ShoppingCart className="w-2 h-4" />
            <span className="hidden sm:inline">Add to Cart</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
