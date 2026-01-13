// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { mergeCarts, clearCart, setCartFromDB } from "../cart/cartSlice";

// Safe JSON parse helper
const parseJSON = (str) => {
  try {
    return JSON.parse(str);
  } catch {
    return null;
  }
};

// Initialize state safely
const initialState = {
  user: parseJSON(localStorage.getItem("user")),
  token: localStorage.getItem("token") || null,
  isLoading: false,
  error: null,
};

// ✅ Async thunk for login with cart sync
export const loginWithCartSync = createAsyncThunk(
  "auth/loginWithCartSync",
  async ({ user, token, fetchCart, updateCart }, { dispatch, getState }) => {
    try {
      // Fetch cart from database using RTK Query
      const { data: dbCartData } = await fetchCart().unwrap();
      const dbCart = dbCartData?.cartItems || [];

      // Get current cart from Redux state
      const localCart = getState().cart.cartItems;

      if (localCart.length > 0 && dbCart.length > 0) {
        // Merge both carts
        dispatch(mergeCarts(dbCart));
        // Save merged cart to database
        const mergedCart = getState().cart.cartItems;
        await updateCart(mergedCart).unwrap();
      } else if (dbCart.length > 0) {
        // Only database cart exists
        dispatch(setCartFromDB(dbCart));
      } else if (localCart.length > 0) {
        // Only local cart exists, save to database
        await updateCart(localCart).unwrap();
      }

      return { user, token };
    } catch (error) {
      console.error("Cart sync failed:", error);
      // Continue login even if cart sync fails
      return { user, token };
    }
  }
);

// ✅ Async thunk for logout with cart save
export const logoutWithCartSave = createAsyncThunk(
  "auth/logoutWithCartSave",
  async ({ updateCart }, { dispatch, getState }) => {
    try {
      const cartItems = getState().cart.cartItems;

      // Save cart to database before logout
      if (cartItems.length > 0) {
        await updateCart(cartItems).unwrap();
      }

      // Clear cart from Redux and localStorage
      dispatch(clearCart());
    } catch (error) {
      console.error("Failed to save cart on logout:", error);
      // Clear cart anyway
      dispatch(clearCart());
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;

      // Save safely to localStorage
      if (action.payload.user !== undefined && action.payload.user !== null) {
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      }
      if (action.payload.token !== undefined && action.payload.token !== null) {
        localStorage.setItem("token", action.payload.token);
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      // Login with cart sync
      .addCase(loginWithCartSync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginWithCartSync.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoading = false;

        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginWithCartSync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Logout with cart save
      .addCase(logoutWithCartSave.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      });
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
