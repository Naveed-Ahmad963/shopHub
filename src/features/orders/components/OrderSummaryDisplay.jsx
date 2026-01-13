// components/OrderSummaryDisplay.jsx
import React from "react";

export const OrderSummaryDisplay = ({
  itemsPrice,
  taxPrice,
  shippingPrice,
  totalPrice,
}) => {
  const roundPrice = (price) => Number(price ?? 0).toFixed(2);

  return (
    <div className="bg-white shadow rounded p-4 mt-6">
      <h2 className="text-xl font-semibold mb-3">Order Summary</h2>
      <div className="space-y-2">
        <p>
          <strong>Items:</strong> ${roundPrice(itemsPrice)}
        </p>
        <p>
          <strong>Tax:</strong> ${roundPrice(taxPrice)}
        </p>
        <p>
          <strong>Shipping:</strong> ${roundPrice(shippingPrice)}
        </p>
        <p className="text-lg font-bold mt-3 pt-3 border-t-2">
          Total: ${roundPrice(totalPrice)}
        </p>
      </div>
    </div>
  );
};
export default OrderSummaryDisplay;
