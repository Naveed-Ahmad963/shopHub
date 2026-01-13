// src/features/payment/StripePaymentForm.jsx (FIXED - MINIMAL)
import React, { useMemo } from "react";
import { useStripePayment } from "../../hooks/useStripePayment";
import { useVerifyPaymentMutation } from "../../api/paymentApi";
import { StripePaymentFormComponent } from "./components/StripePaymentForm";
import toast from "react-hot-toast";

const StripePaymentForm = ({
  clientSecret,
  orderId,
  onSuccess,
  onCancel,
  cartItems,
}) => {
  const [verifyPayment] = useVerifyPaymentMutation();
  const { isProcessing, message, handleSubmit } =
    useStripePayment(verifyPayment);

  // Calculate total from cartItems
  const totalPrice = useMemo(() => {
    if (!cartItems || cartItems.length === 0) return 0;
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const shippingPrice = 10;
    const taxPrice = subtotal * 0.1;
    return subtotal + shippingPrice + taxPrice;
  }, [cartItems]);

  const handleSubmitPayment = async (e) => {
    if (!orderId) {
      toast.error("Order not created. Please try again.");
      return;
    }

    const success = await handleSubmit(e, orderId);
    if (success) {
      onSuccess();
    }
  };

  return (
    <StripePaymentFormComponent
      clientSecret={clientSecret}
      orderId={orderId}
      isProcessing={isProcessing}
      message={message}
      total={totalPrice}
      onSubmit={handleSubmitPayment}
      onCancel={onCancel}
    />
  );
};

export default StripePaymentForm;
