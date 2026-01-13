// 6. COMPONENT: components/cart/RemoveButton.jsx
// ============================================
import React from "react";
import { Trash2 } from "lucide-react";

export const RemoveButton = ({ onRemove }) => {
  return (
    <button
      onClick={onRemove}
      className="p-2 bg-gradient-to-br from-red-600 to-red-700 text-white rounded-lg border border-red-300 transition-all hover:from-red-700 hover:to-red-800 hover:shadow-md"
      aria-label="Remove item"
    >
      <Trash2 className="w-5 h-5" />
    </button>
  );
};
