// 3. COMPONENT: components/cart/CartItemImage.jsx
// ============================================
import React from "react";
import { Link } from "react-router-dom";

export const CartItemImage = ({ productId, imageUrl, title, onError }) => {
  return (
    <Link to={`/products/${productId}`}>
      <img
        src={imageUrl}
        alt={title}
        className="w-28 h-28 object-cover rounded-lg hover:opacity-80 transition-opacity"
        onError={onError}
      />
    </Link>
  );
};
