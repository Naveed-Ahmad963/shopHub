// src/features/auth/authApiSlice.js
import { apiSlice } from "../../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ Send OTP - accepts object { email }
    sendOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/send-otp",
        method: "POST",
        body: typeof data === "string" ? { email: data } : data,
      }),
    }),

    // ✅ Verify OTP
    verifyOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body: data, // { email, otp }
      }),
    }),

    // ✅ Register
    register: builder.mutation({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData, // { name, email, password, verificationToken }
      }),
    }),

    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),

    getProfile: builder.query({
      query: () => "/auth/profile",
      providesTags: ["User"],
    }),

    forgotPassword: builder.mutation({
      query: (email) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: typeof email === "string" ? { email } : email,
      }),
    }),

    resetPassword: builder.mutation({
      query: ({ resetToken, password }) => ({
        url: `/auth/reset-password/${resetToken}`,
        method: "PUT",
        body: { password },
      }),
    }),
  }),
});

export const {
  useSendOtpMutation,
  useVerifyOtpMutation,
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetProfileQuery,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApiSlice;
