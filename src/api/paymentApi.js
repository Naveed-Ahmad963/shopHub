// src/api/paymentApi.js
import { apiSlice } from "./apiSlice";

export const paymentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Create payment intent
    createPaymentIntent: builder.mutation({
      query: (data) => ({
        url: "/payment/create-payment-intent",
        method: "POST",
        body: data,
      }),
    }),

    // Verify payment
    verifyPayment: builder.mutation({
      query: (data) => ({
        url: "/payment/verify-payment",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const { useCreatePaymentIntentMutation, useVerifyPaymentMutation } =
  paymentApi;
