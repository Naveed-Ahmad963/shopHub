// hooks/useCheckoutForm.js (FIXED)
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { clearCart } from "../features/cart/cartSlice";
import { getErrorMessage } from "../utils/helpers";

export const useCheckoutForm = (
  createOrder,
  createPaymentIntent,
  calculateTotals
) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      paymentMethod: "Credit Card",
    },
  });

  const [showStripeForm, setShowStripeForm] = useState(false);
  const [clientSecret, setClientSecret] = useState(null);
  const [createdOrderId, setCreatedOrderId] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const selectedPaymentMethod = watch("paymentMethod");

  const onSubmit = async (data, cartItems) => {
    setIsProcessing(true);
    try {
      const orderItems = cartItems.map((item) => ({
        product: item._id,
        name: item.title,
        qty: item.quantity,
        price: item.price,
        image: item.images?.[0]?.url || "",
        variant: item.variant || "",
      }));

      const { subtotal, shipping, tax, total } = calculateTotals(cartItems);

      const order = {
        orderItems,
        shippingAddress: {
          street: data.address,
          city: data.city,
          postalCode: data.postalCode,
          country: data.country,
        },
        paymentInfo: {
          method: data.paymentMethod,
          status: "Pending",
        },
        itemsPrice: subtotal,
        taxPrice: tax,
        shippingPrice: shipping,
        totalPrice: total,
      };

      // Create order first
      const orderResult = await createOrder(order).unwrap();

      console.log("Order response structure:", orderResult);

      // Handle different response structures
      const newOrderId =
        orderResult._id ||
        orderResult.order?._id ||
        orderResult.data?.order?._id ||
        orderResult.data?._id;

      if (!newOrderId) {
        console.error("Could not extract order ID from response:", orderResult);
        throw new Error(
          "Failed to get order ID from response. Check console for details."
        );
      }

      setCreatedOrderId(newOrderId);
      console.log("Order created with ID:", newOrderId);

      if (data.paymentMethod === "Credit Card") {
        try {
          console.log("Creating payment intent with:", {
            amount: total,
            orderId: newOrderId,
            currency: "usd",
          });

          const paymentResult = await createPaymentIntent({
            amount: total,
            orderId: newOrderId,
            currency: "usd",
          }).unwrap();

          console.log("Payment intent created successfully:", paymentResult);

          // Handle both direct and nested response structures
          const secret =
            paymentResult.clientSecret || paymentResult.data?.clientSecret;

          if (!secret) {
            console.error("Response structure:", paymentResult);
            throw new Error("No clientSecret in payment response");
          }

          setClientSecret(secret);
          setShowStripeForm(true);
          console.log("Stripe form should now be visible");
        } catch (paymentErr) {
          console.error("Payment intent creation failed:", paymentErr);
          const errorMsg = getErrorMessage(paymentErr);
          console.error("Error message:", errorMsg);
          toast.error("Failed to create payment. " + errorMsg);
        }
      } else {
        toast.success("Your order has been placed successfully");
        dispatch(clearCart());
        navigate(`/orders/${newOrderId}`);
      }
    } catch (err) {
      console.error("Checkout failed:", err);
      toast.error(getErrorMessage(err));
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePaymentSuccess = () => {
    toast.success("Payment successful! Your order has been placed.");
    dispatch(clearCart());
    navigate(`/orders/${createdOrderId}`);
  };

  const handlePaymentCancel = () => {
    setShowStripeForm(false);
    setClientSecret(null);
    toast.error("Payment cancelled");
  };

  return {
    register,
    handleSubmit,
    errors,
    watch,
    selectedPaymentMethod,
    showStripeForm,
    clientSecret,
    createdOrderId,
    isProcessing,
    onSubmit,
    handlePaymentSuccess,
    handlePaymentCancel,
  };
};
