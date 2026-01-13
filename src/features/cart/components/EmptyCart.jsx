// 4. COMPONENT: components/cart/EmptyCart.jsx
// ============================================
import React from "react";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

export const EmptyCart = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-16">
      <div className="text-center">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="w-12 h-12 text-blue-400" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Your cart is empty
        </h2>
        <p className="text-gray-600 text-base mb-8">
          Add some products to get started!
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl"
        >
          <ShoppingBag className="w-5 h-5" />
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};
