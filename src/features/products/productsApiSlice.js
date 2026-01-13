import { apiSlice } from "../../api/apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ category, search, page = 1, limit = 10 } = {}) => {
        const params = new URLSearchParams();
        if (category) params.append("category", category);
        if (search) params.append("search", search);
        params.append("page", page);
        params.append("limit", limit);
        return `/products?${params.toString()}`;
      },
      transformResponse: (response) => response.data || [],
      providesTags: ["Product"],
    }),

    getProductsForAdmin: builder.query({
      query: () => "/products/admin",
      transformResponse: (response) =>
        response.data?.products || response.products || [],
      providesTags: ["Product"],
    }),

    getProductById: builder.query({
      query: (id) => `/products/${id}`,
      transformResponse: (response) => response.data?.product || {},
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),

    createProduct: builder.mutation({
      query: (product) => ({
        url: "/products",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Product"],
    }),

    updateProduct: builder.mutation({
      query: ({ id, ...product }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: product,
      }),
      invalidatesTags: ["Product"],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),

    uploadProductImages: builder.mutation({
      query: ({ id, files }) => {
        const formData = new FormData();
        files.forEach((file) => formData.append("files", file));
        return {
          url: `/products/${id}/images`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Product"],
    }),

    deleteProductImage: builder.mutation({
      query: ({ id, publicId }) => ({
        url: `/products/${id}/images/${publicId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductsForAdminQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useUploadProductImagesMutation,
  useDeleteProductImageMutation,
} = productsApiSlice;
