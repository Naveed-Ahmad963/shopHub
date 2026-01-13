// components/PaymentMethodSelect.jsx
import React from "react";
import { CreditCard } from "lucide-react";

export const PaymentMethodSelect = ({
  register,
  errors,
  selectedPaymentMethod,
  paymentMethods = [
    { value: "Credit Card", label: "Credit/Debit Card (via Stripe)" },
    { value: "PayPal", label: "PayPal" },
    { value: "Cash on Delivery", label: "Cash on Delivery" },
  ],
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-orange-500">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg">
          <CreditCard className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-extrabold text-gray-900">Payment Method</h2>
      </div>

      <div className="space-y-3">
        {paymentMethods.map((method) => (
          <label
            key={method.value}
            className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
              selectedPaymentMethod === method.value
                ? "border-orange-500 bg-gradient-to-r from-orange-50 to-amber-50"
                : "border-gray-200 hover:border-orange-500 hover:bg-gradient-to-r hover:from-orange-50 hover:to-amber-50"
            }`}
          >
            <input
              type="radio"
              value={method.value}
              {...register("paymentMethod", {
                required: "Payment method is required",
              })}
              className="w-5 h-5 text-orange-600"
            />
            <span className="ml-3 font-semibold text-gray-900">
              {method.label}
            </span>
          </label>
        ))}
      </div>
      {errors.paymentMethod && (
        <p className="mt-3 text-sm text-red-600 font-semibold">
          {errors.paymentMethod.message}
        </p>
      )}
    </div>
  );
};
