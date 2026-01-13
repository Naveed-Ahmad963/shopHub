// features/cart/Cart.jsx
import React, { useEffect } from "react";
import { useCart } from "../../hooks/useCart";
import { BackButton } from "./components/BackButton";
import { EmptyCart } from "./components/EmptyCart";
import { CartHeader } from "./components/CartHeader";
import { CartItem } from "./CartItem";
import { OrderSummary } from "./components/OrderSummary";

const Cart = () => {
  const { cartItems, handleCheckout, subtotal, shipping, tax, total } =
    useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <BackButton className="mb-8" />
          <EmptyCart />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BackButton className="mb-8" />
        <CartHeader itemCount={cartItems.length} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <CartItem key={item._id} item={item} />
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary
              subtotal={subtotal}
              shipping={shipping}
              tax={tax}
              total={total}
              onCheckout={handleCheckout}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
