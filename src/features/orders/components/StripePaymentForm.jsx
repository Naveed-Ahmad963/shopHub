// components/StripePaymentFormComponent.jsx
import React from "react";
import { PaymentElement } from "@stripe/react-stripe-js";
import { Lock, CheckCircle, ArrowLeft } from "lucide-react";
import Spinner from "../../../components/common/Spinner";
import { formatPrice } from "../../../utils/helpers";

export const StripePaymentFormComponent = ({
  isProcessing,
  message,
  total,
  onSubmit,
  onCancel,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onCancel}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-semibold mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Checkout
          </button>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">
              Complete Payment
            </h1>
            <p className="text-gray-600 text-lg">
              Secure payment powered by Stripe
            </p>
          </div>
        </div>

        {/* Payment Form Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Order Summary */}
          <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-700 font-semibold">Order Total:</span>
              <span className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                {formatPrice(total)}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Lock className="w-4 h-4" />
              <span>Your payment information is secure and encrypted</span>
            </div>
          </div>

          {/* Stripe Payment Element */}
          <form onSubmit={onSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Card Details
              </label>
              <PaymentElement
                options={{
                  layout: "tabs",
                  appearance: {
                    theme: "stripe",
                    variables: {
                      colorPrimary: "#2563eb",
                      colorBackground: "#ffffff",
                      colorText: "#1f2937",
                      colorDanger: "#ef4444",
                      fontFamily: "system-ui, -apple-system, sans-serif",
                      spacingUnit: "4px",
                      borderRadius: "8px",
                    },
                  },
                }}
              />
            </div>

            {message && (
              <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl">
                <p className="text-red-600 font-semibold text-sm">{message}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full flex justify-center items-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold text-lg rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isProcessing ? (
                <>
                  <Spinner size="sm" />
                  <span>Processing Payment...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  <span>Pay {formatPrice(total)}</span>
                </>
              )}
            </button>

            <p className="text-center text-sm text-gray-500 mt-4">
              By completing this purchase, you agree to our terms and conditions
            </p>
          </form>

          {/* Security Badges */}
          <div className="mt-8 pt-6 border-t-2 border-gray-200">
            <div className="flex items-center justify-center gap-6 flex-wrap">
              <div className="flex items-center gap-2 text-gray-600">
                <Lock className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-semibold">SSL Encrypted</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-semibold">PCI Compliant</span>
              </div>
              <div className="text-gray-600 text-sm font-semibold">
                Powered by Stripe
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StripePaymentFormComponent;
