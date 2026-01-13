// hooks/useStripePayment.js
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import { getErrorMessage } from "../utils/helpers";

export const useStripePayment = (verifyPayment) => {
  const stripe = useStripe();
  const elements = useElements();

  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e, orderId) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);
    setMessage("");

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/orders/${orderId}`,
        },
        redirect: "if_required",
      });

      if (error) {
        setMessage(error.message);
        toast.error(error.message);
        setIsProcessing(false);
        return;
      }

      if (paymentIntent && paymentIntent.status === "succeeded") {
        await verifyPayment({
          paymentIntentId: paymentIntent.id,
          orderId,
        }).unwrap();

        return true;
      }
    } catch (error) {
      console.error("Payment failed:", error);
      const errorMessage =
        getErrorMessage(error) || "Payment failed. Please try again.";
      setMessage(errorMessage);
      toast.error(errorMessage);
      setIsProcessing(false);
    }

    return false;
  };

  return {
    stripe,
    elements,
    isProcessing,
    message,
    setMessage,
    handleSubmit,
  };
};
