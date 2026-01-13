// src/api/cartApi.js
import { apiSlice } from "./apiSlice";

export const cartApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch cart from database
    getCart: builder.query({
      query: () => "/cart",
      providesTags: ["Cart"],
    }),

    // Save cart to database
    updateCart: builder.mutation({
      query: (cartItems) => ({
        url: "/cart",
        method: "PUT",
        body: { cartItems },
      }),
      invalidatesTags: ["Cart"],
    }),

    // Clear cart in database
    clearCart: builder.mutation({
      query: () => ({
        url: "/cart",
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const { useGetCartQuery, useUpdateCartMutation, useClearCartMutation } =
  cartApi;
