// components/OrderItemsList.jsx
import React from "react";
import ErrorMessage from "../../../components/common/ErrorMessage";

export const OrderItemsList = ({ items }) => {
  const roundPrice = (price) => Number(price ?? 0).toFixed(2);

  if (!items || items.length === 0) {
    return <ErrorMessage message="No Items Found" />;
  }

  return (
    <div>
      {items.map((item) => (
        <div
          key={item._id}
          className="flex items-center justify-between border-b py-3"
        >
          <div className="flex items-center gap-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 object-cover rounded"
            />
            <div>
              <p className="font-semibold">{item.name}</p>
              {item.variant && (
                <p className="text-gray-600 text-sm">Variant: {item.variant}</p>
              )}
            </div>
          </div>

          <p>
            {item.qty} x ${roundPrice(item.price)} ={" "}
            <span className="font-semibold">
              ${roundPrice(item.qty * item.price)}
            </span>
          </p>
        </div>
      ))}
    </div>
  );
};
