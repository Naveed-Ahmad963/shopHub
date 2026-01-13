// 12. REFACTORED OrderList.jsx
// ============================================================================

import React from "react";
import { ShoppingBag } from "lucide-react";
import { useGetMyOrdersQuery } from "./ordersApiSlice";
import Spinner from "../../components/common/Spinner";
import { OrderCard } from "./components/OrderCard";
import { Link } from "react-router-dom";

const OrderList = () => {
  const { data: orders, isLoading } = useGetMyOrdersQuery();

  const getStatusGradient = (status) => {
    const normalizedStatus = status.toLowerCase();
    const gradientMap = {
      delivered: "from-green-500 to-emerald-500",
      cancelled: "from-red-500 to-pink-500",
      shipped: "from-purple-500 to-pink-500",
      processing: "from-blue-500 to-cyan-500",
    };
    return gradientMap[normalizedStatus] || "from-yellow-500 to-orange-500";
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Spinner size="lg" />
      </div>
    );
  }

  const ordersToDisplay = orders || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              My Orders
            </h1>
          </div>
          <p className="text-gray-600 text-lg ml-16">
            {ordersToDisplay.length || 0}{" "}
            {ordersToDisplay.length === 1 ? "order" : "orders"} in total
          </p>
        </div>

        {ordersToDisplay.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ordersToDisplay.map((order) => (
              <OrderCard
                key={order._id}
                order={order}
                getStatusGradient={getStatusGradient}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-16 border-t-4 border-blue-600">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-12 h-12 text-blue-600" />
              </div>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-3">
                No orders yet
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                Start shopping to see your orders here
              </p>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold text-lg rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                <ShoppingBag className="w-5 h-5" />
                Browse Products
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderList;
