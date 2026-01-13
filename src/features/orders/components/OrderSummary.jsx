// components/OrderSummary.jsx
import React from "react";
import { Package, DollarSign } from "lucide-react";
import { formatPrice } from "../../../utils/helpers";
// import { OrderSummaryDisplay } from "./OrderSummary";

export const OrderSummary = ({
  cartItems,
  totals,
  isLoading,
  onSubmit,
  selectedPaymentMethod,
  submitButtonLabel = "Continue to Payment",
}) => {
  const { subtotal, shipping, tax, total } = totals;

  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-20 border-t-4 border-purple-500">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg">
            <Package className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-extrabold text-gray-900">
            Order Summary
          </h2>
        </div>

        <div className="space-y-4 mb-6">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg"
            >
              <span className="text-sm font-semibold text-gray-900">
                {item.title} × {item.quantity}
              </span>
              <span className="font-bold text-gray-900">
                {formatPrice(item.price * item.quantity)}
              </span>
            </div>
          ))}

          <div className="border-t-2 border-purple-200 pt-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-semibold">Subtotal</span>
              <span className="font-bold text-gray-900">
                {formatPrice(subtotal)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-semibold">Shipping</span>
              <span className="font-bold text-gray-900">
                {formatPrice(shipping)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-semibold">Tax</span>
              <span className="font-bold text-gray-900">
                {formatPrice(tax)}
              </span>
            </div>
          </div>

          <div className="border-t-2 border-purple-200 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-extrabold text-gray-900">
                Total
              </span>
              <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                {formatPrice(total)}
              </span>
            </div>
          </div>
        </div>

        <button
          type="submit"
          onClick={onSubmit}
          disabled={isLoading}
          className="w-full flex justify-center items-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isLoading ? (
            <span>Processing...</span>
          ) : (
            <>
              <DollarSign className="w-5 h-5" />
              {selectedPaymentMethod === "Credit Card"
                ? "Continue to Payment"
                : "Place Order"}
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
