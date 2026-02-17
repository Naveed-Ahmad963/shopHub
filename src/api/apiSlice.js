// src/api/apiSlice.js
// If you don't have this file, create it. If you do, just verify it has these settings:

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL || "https://shophub-api-production-98b1.up.railway.app/api",
  credentials: "include", // Important for cookies
  prepareHeaders: (headers, { getState }) => {
    // Get token from Redux state
    const token = getState().auth.token;

    // If we have a token, add it to headers
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["User", "Cart", "Products", "Orders"], // Add tags as needed
  endpoints: (builder) => ({}), // Endpoints will be injected
});
