// 5. COMPONENT: components/cart/QuantityControls.jsx
// ============================================
import React from "react";
import { Plus, Minus } from "lucide-react";

export const QuantityControls = ({
  quantity,
  onIncrease,
  onDecrease,
  isMinQuantity,
  isMaxQuantity,
}) => {
  return (
    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={onDecrease}
        className="p-2 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        disabled={isMinQuantity}
        aria-label="Decrease quantity"
      >
        <Minus className="w-4 h-4 text-gray-600" />
      </button>
      <span className="px-4 py-2 font-bold text-gray-900 border-l border-r border-gray-200 min-w-[3rem] text-center text-sm">
        {quantity}
      </span>
      <button
        onClick={onIncrease}
        className="p-2 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        disabled={isMaxQuantity}
        aria-label="Increase quantity"
      >
        <Plus className="w-4 h-4 text-gray-600" />
      </button>
    </div>
  );
};
