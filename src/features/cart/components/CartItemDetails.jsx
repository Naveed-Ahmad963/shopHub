// 4. COMPONENT: components/cart/CartItemDetails.jsx
// ============================================
import React from "react";
import { Link } from "react-router-dom";
import { DollarSign } from "lucide-react";
import { formatPrice } from "../../../utils/helpers";

export const CartItemDetails = ({ productId, title, description, price }) => {
  return (
    <div className="flex-1">
      <Link
        to={`/products/${productId}`}
        className="font-bold text-gray-900 hover:text-blue-600 mb-2 block text-base transition-colors"
      >
        {title}
      </Link>
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{description}</p>
      <div className="flex items-center gap-1">
        <DollarSign className="w-5 h-5 text-blue-600" />
        <p className="text-lg font-black text-blue-600">{formatPrice(price)}</p>
      </div>
    </div>
  );
};
