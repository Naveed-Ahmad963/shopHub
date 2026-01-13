// hooks/useProductCart.js
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import toast from "react-hot-toast";

export const useProductCart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const handleAddToCart = (product, quantity = 1) => {
    const existingItem = cartItems.find((item) => item._id === product._id);

    if (existingItem && quantity === 1) {
      toast.success("Product already in your cart!");
      return;
    }

    dispatch(addToCart({ ...product, quantity }));
    toast.success("Added to cart!");
  };

  const isInCart = (productId) => {
    return cartItems.some((item) => item._id === productId);
  };

  return {
    handleAddToCart,
    isInCart,
    cartItems,
  };
};
