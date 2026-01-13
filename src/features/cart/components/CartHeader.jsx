// 5. COMPONENT: components/cart/CartHeader.jsx
// ============================================
import React from "react";
import { ShoppingCart } from "lucide-react";

export const CartHeader = ({ itemCount }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg border border-blue-200">
          <ShoppingCart className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
      </div>
      <p className="text-gray-600">
        {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
      </p>
    </div>
  );
};
