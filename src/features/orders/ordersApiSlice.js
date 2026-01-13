// src/features/orders/ordersApiSlice.js
import { apiSlice } from "../../api/apiSlice";

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => "/orders/admin/all",
      transformResponse: (response) => response.data?.orders || [],
      providesTags: (result) => {
        const orders = result || [];
        return [
          ...orders.map(({ _id }) => ({ type: "Order", id: _id })),
          { type: "Order", id: "LIST" },
        ];
      },
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
    }),

    getOrderDetails: builder.query({
      query: (id) => `/orders/${id}`,
      transformResponse: (response) => response.data?.order || {},
      providesTags: (result, error, id) => [{ type: "Order", id }],
    }),

    getMyOrders: builder.query({
      query: () => "/orders/my",
      transformResponse: (response) => response.data?.orders || [],
      providesTags: (result) => {
        const orders = result || [];
        return [
          ...orders.map(({ _id }) => ({ type: "Order", id: _id })),
          { type: "Order", id: "MY_LIST" },
        ];
      },
    }),

    createOrder: builder.mutation({
      query: (order) => ({
        url: "/orders",
        method: "POST",
        body: order,
      }),
      invalidatesTags: [
        { type: "Order", id: "LIST" },
        { type: "Order", id: "MY_LIST" },
      ],
    }),

    updateOrderStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/orders/${id}/status`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Order", id },
        { type: "Order", id: "LIST" },
        { type: "Order", id: "MY_LIST" },
      ],
    }),

    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [
        { type: "Order", id: "LIST" },
        { type: "Order", id: "MY_LIST" },
      ],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderDetailsQuery,
  useGetMyOrdersQuery,
  useCreateOrderMutation,
  useUpdateOrderStatusMutation,
  useDeleteOrderMutation,
} = ordersApiSlice;
