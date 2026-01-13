// 3. COMPONENT: components/cart/OrderSummary.jsx
// ============================================
import React from "react";
import { Link } from "react-router-dom";
import { Package, ArrowRight } from "lucide-react";
import { formatPrice } from "../../../utils/helpers";

export const OrderSummary = ({
  subtotal,
  shipping,
  tax,
  total,
  onCheckout,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-20">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg border border-blue-200">
          <Package className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-lg font-bold text-gray-900">Order Summary</h2>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-semibold text-sm">Subtotal</span>
          <span className="font-bold text-blue-600">
            {formatPrice(subtotal)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-semibold text-sm">Shipping</span>
          <span className="font-bold text-blue-600">
            {formatPrice(shipping)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-semibold text-sm">Tax (10%)</span>
          <span className="font-bold text-blue-600">{formatPrice(tax)}</span>
        </div>
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between items-center">
            <span className="text-base font-bold text-gray-900">Total</span>
            <span className="text-2xl font-black text-blue-600">
              {formatPrice(total)}
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={onCheckout}
        className="w-full flex justify-center items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-sm hover:shadow-md mb-4"
      >
        Proceed to Checkout
        <ArrowRight className="w-4 h-4" />
      </button>

      <Link
        to="/shop"
        className="block text-center text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors"
      >
        Continue Shopping
      </Link>
    </div>
  );
};
