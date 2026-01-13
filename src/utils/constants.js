export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const ORDER_STATUS = {
  PENDING: "pending",
  PROCESSING: "processing",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
};

export const USER_ROLES = {
  USER: "user",
  ADMIN: "admin",
};
