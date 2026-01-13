// components/OrderCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Package, Calendar, DollarSign } from "lucide-react";
import { formatPrice, formatDate } from "../../../utils/helpers";

export const OrderCard = ({ order, getStatusGradient }) => {
  const status = order.orderStatus || "pending";
  const createdAt = order.createdAt ? formatDate(order.createdAt) : "N/A";
  const itemsCount = order.orderItems?.length || 0;
  const totalPrice = order.totalPrice ?? 0;

  return (
    <Link
      to={`/orders/${order._id}`}
      className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all hover:scale-105 flex flex-col justify-between border-t-4 border-blue-600"
    >
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
            <Package className="w-5 h-5 text-white" />
          </div>
          <p className="font-extrabold text-lg text-gray-900">
            Order #{order._id ? order._id.slice(-8).toUpperCase() : "N/A"}
          </p>
        </div>

        <div className="flex items-center gap-2 text-gray-600 mb-4">
          <Calendar className="w-4 h-4" />
          <p className="text-sm font-semibold">Placed on {createdAt}</p>
        </div>

        <span
          className={`inline-flex items-center px-4 py-2 rounded-xl bg-gradient-to-r ${getStatusGradient(
            status
          )} text-white font-semibold text-sm shadow-lg`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>

      <div className="flex items-center justify-between mt-6 pt-6 border-t-2 border-blue-100">
        <div className="flex items-center gap-2">
          <Package className="w-5 h-5 text-blue-600" />
          <span className="text-gray-700 font-semibold">
            {itemsCount} item{itemsCount !== 1 ? "s" : ""}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <DollarSign className="w-5 h-5 text-blue-600" />
          <p className="text-lg font-extrabold text-gray-900">
            {formatPrice(totalPrice)}
          </p>
        </div>
      </div>
    </Link>
  );
};
