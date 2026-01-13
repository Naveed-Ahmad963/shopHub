// src/features/cart/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const cartFromStorage = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

const initialState = {
  cartItems: cartFromStorage,
  isSyncing: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems.push(item);
      }

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    updateCartItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find((x) => x._id === id);
      if (item) {
        item.quantity = quantity;
      }
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cart");
    },
    // ✅ NEW: Set cart from database
    setCartFromDB: (state, action) => {
      state.cartItems = action.payload;
      localStorage.setItem("cart", JSON.stringify(action.payload));
    },
    // ✅ NEW: Merge carts (localStorage + database)
    mergeCarts: (state, action) => {
      const dbCart = action.payload;
      const localCart = state.cartItems;

      // Create a map for quick lookup
      const mergedMap = new Map();

      // Add database items first
      dbCart.forEach((item) => {
        mergedMap.set(item._id, item);
      });

      // Merge with local cart (local cart takes precedence for quantity)
      localCart.forEach((item) => {
        if (mergedMap.has(item._id)) {
          // Keep the higher quantity
          const existing = mergedMap.get(item._id);
          mergedMap.set(item._id, {
            ...existing,
            quantity: Math.max(existing.quantity, item.quantity),
          });
        } else {
          mergedMap.set(item._id, item);
        }
      });

      state.cartItems = Array.from(mergedMap.values());
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    setSyncing: (state, action) => {
      state.isSyncing = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  clearCart,
  setCartFromDB,
  mergeCarts,
  setSyncing,
} = cartSlice.actions;

export default cartSlice.reducer;
