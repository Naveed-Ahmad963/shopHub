// 1. CUSTOM HOOK: hooks/useCart.js
// ============================================
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  removeFromCart,
  updateCartItemQuantity,
} from "../features/cart/cartSlice";
import { calculateCartTotal } from "../utils/helpers";
import { selectCurrentUser } from "../features/auth/authSlice";

export const useCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const user = useSelector(selectCurrentUser);

  const handleQuantityChange = (id, quantity) => {
    if (quantity > 0) {
      dispatch(updateCartItemQuantity({ id, quantity }));
    }
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
    toast.success("Product Removed");
  };

  const handleCheckout = () => {
    if (!user) {
      navigate("/login", { state: { from: { pathname: "/checkout" } } });
    } else {
      navigate("/checkout");
    }
  };

  const subtotal = calculateCartTotal(cartItems);
  const shipping = subtotal > 0 ? 10 : 0;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  return {
    cartItems,
    user,
    handleQuantityChange,
    handleRemove,
    handleCheckout,
    subtotal,
    shipping,
    tax,
    total,
  };
};
