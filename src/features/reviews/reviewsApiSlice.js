import { apiSlice } from "../../api/apiSlice";

export const reviewsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addReview: builder.mutation({
      query: ({ productId, ...review }) => ({
        url: `/reviews/${productId}`,
        method: "POST",
        body: review,
      }),
      invalidatesTags: (result, error, { productId }) => [
        { type: "Product", id: productId },
      ],
    }),
  }),
});

export const { useAddReviewMutation } = reviewsApiSlice;
