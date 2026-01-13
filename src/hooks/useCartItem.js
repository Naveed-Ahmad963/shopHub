// hooks/useCartItem.js
// ============================================
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import {
  removeFromCart,
  updateCartItemQuantity,
} from "../features/cart/cartSlice";

export const useCartItem = (item) => {
  const dispatch = useDispatch();

  const imageUrl = item.images?.[0]?.url || "https://via.placeholder.com/150";

  const handleQuantityChange = (quantity) => {
    if (quantity > 0) {
      dispatch(updateCartItemQuantity({ id: item._id, quantity }));
    }
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item._id));
    toast.success("Product Removed");
  };

  const handleIncrease = () => {
    if (item.quantity < item.stock) {
      handleQuantityChange(item.quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      handleQuantityChange(item.quantity - 1);
    }
  };

  const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/150";
  };

  const itemSubtotal = item.price * item.quantity;
  const isMinQuantity = item.quantity <= 1;
  const isMaxQuantity = item.quantity >= item.stock;

  return {
    imageUrl,
    itemSubtotal,
    isMinQuantity,
    isMaxQuantity,
    handleIncrease,
    handleDecrease,
    handleRemove,
    handleImageError,
  };
};
