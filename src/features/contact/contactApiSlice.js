// src/features/contact/contactApiSlice.js
import { apiSlice } from "../../api/apiSlice";

export const contactApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Submit contact form
    submitContactForm: builder.mutation({
      query: (contactData) => ({
        url: "/contact",
        method: "POST",
        body: contactData,
      }),
    }),

    // Get all contacts (admin)
    getAllContacts: builder.query({
      query: () => "/contact/admin/all",
      providesTags: ["Contacts"],
    }),

    // Get single contact (admin)
    getContact: builder.query({
      query: (id) => `/contact/${id}`,
      providesTags: ["Contacts"],
    }),

    // Reply to contact (admin)
    replyToContact: builder.mutation({
      query: ({ id, reply }) => ({
        url: `/contact/${id}/reply`,
        method: "PUT",
        body: { reply },
      }),
      invalidatesTags: ["Contacts"],
    }),

    // Delete contact (admin)
    deleteContact: builder.mutation({
      query: (id) => ({
        url: `/contact/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Contacts"],
    }),
  }),
});

export const {
  useSubmitContactFormMutation,
  useGetAllContactsQuery,
  useGetContactQuery,
  useReplyToContactMutation,
  useDeleteContactMutation,
} = contactApiSlice;
