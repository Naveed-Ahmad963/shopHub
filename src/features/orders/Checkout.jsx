// src/features/orders/Checkout.jsx (MINIMAL FIX)
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useCreateOrderMutation } from "./ordersApiSlice";
import { useCreatePaymentIntentMutation } from "../../api/paymentApi";
import ErrorMessage from "../../components/common/ErrorMessage";
import { calculateCartTotal, getErrorMessage } from "../../utils/helpers";
import { useCheckoutForm } from "../../hooks/useCheckoutForm";
import { ShippingAddressForm } from "./components/ShippingAdressForm";
import { PaymentMethodSelect } from "./components/PaymentMethodSelect";
import { OrderSummary } from "./components/OrderSummary";
import StripePaymentForm from "../orders/stripePaymentForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();

  const [createOrder, { error: orderError }] = useCreateOrderMutation();
  const [createPaymentIntent] = useCreatePaymentIntentMutation();

  const calculateTotals = (items) => {
    const subtotal = calculateCartTotal(items);
    const shipping = 10;
    const tax = subtotal * 0.1;
    return { subtotal, shipping, tax, total: subtotal + shipping + tax };
  };

  const {
    register,
    handleSubmit,
    errors,
    selectedPaymentMethod,
    showStripeForm,
    clientSecret,
    createdOrderId,
    isProcessing,
    orderTotal,
    onSubmit: handleCheckoutSubmit,
    handlePaymentSuccess,
    handlePaymentCancel,
  } = useCheckoutForm(createOrder, createPaymentIntent, calculateTotals);

  if (cartItems.length === 0) {
    navigate("/cart");
    return null;
  }

  const totals = calculateTotals(cartItems);

  if (showStripeForm && clientSecret && createdOrderId) {
    return (
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <StripePaymentForm
          clientSecret={clientSecret}
          orderId={createdOrderId}
          cartItems={cartItems}
          total={orderTotal || totals.total}
          onSuccess={handlePaymentSuccess}
          onCancel={handlePaymentCancel}
        />
      </Elements>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            Checkout
          </h1>
          <p className="text-gray-600 text-lg">Complete your order details</p>
        </div>

        {orderError && (
          <div className="mb-6">
            <ErrorMessage message={getErrorMessage(orderError)} />
          </div>
        )}

        <form
          onSubmit={handleSubmit((data) =>
            handleCheckoutSubmit(data, cartItems)
          )}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <ShippingAddressForm register={register} errors={errors} />
              <PaymentMethodSelect
                register={register}
                errors={errors}
                selectedPaymentMethod={selectedPaymentMethod}
              />
            </div>

            <OrderSummary
              cartItems={cartItems}
              totals={totals}
              isLoading={isProcessing}
              onSubmit={handleSubmit((data) =>
                handleCheckoutSubmit(data, cartItems)
              )}
              selectedPaymentMethod={selectedPaymentMethod}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
