// 7. REFACTORED COMPONENT: components/cart/CartItem.jsx
// ============================================
import React from "react";
import { useCartItem } from "../../hooks/useCartItem";
import { CartItemImage } from "./components/cartItemImage";
import { CartItemDetails } from "./components/CartItemDetails";
import { QuantityControls } from "./components/QuantityControls";
import { RemoveButton } from "./components/RemoveButton";
import { formatPrice } from "../../utils/helpers";

export const CartItem = ({ item }) => {
  const {
    imageUrl,
    itemSubtotal,
    isMinQuantity,
    isMaxQuantity,
    handleIncrease,
    handleDecrease,
    handleRemove,
    handleImageError,
  } = useCartItem(item);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex gap-6">
        <CartItemImage
          productId={item._id}
          imageUrl={imageUrl}
          title={item.title}
          onError={handleImageError}
        />

        <CartItemDetails
          productId={item._id}
          title={item.title}
          description={item.description}
          price={item.price}
        />

        <div className="flex flex-col items-end justify-between">
          <RemoveButton onRemove={handleRemove} />

          <QuantityControls
            quantity={item.quantity}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            isMinQuantity={isMinQuantity}
            isMaxQuantity={isMaxQuantity}
          />
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200 flex justify-between items-center">
        <span className="text-gray-600 font-semibold text-xs uppercase tracking-wide">
          Subtotal
        </span>
        <span className="text-xl font-black text-blue-600">
          {formatPrice(itemSubtotal)}
        </span>
      </div>
    </div>
  );
};
