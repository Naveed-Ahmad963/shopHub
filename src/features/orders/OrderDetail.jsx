// 13. REFACTORED OrderDetails.jsx
// ============================================================================

import React from "react";
import { useParams } from "react-router-dom";
import { useGetOrderDetailsQuery } from "../../features/orders/ordersApiSlice";
import Spinner from "../../components/common/Spinner";
import ErrorMessage from "../../components/common/ErrorMessage";
import { OrderItemsList } from "./components/OrderItemsList";
import { OrderSummaryDisplay } from "./components/OrderSummaryDisplay";

const OrderDetails = () => {
  const { id } = useParams();
  const {
    data: order,
    isLoading,
    isError,
    error,
  } = useGetOrderDetailsQuery(id);

  if (isLoading) return <Spinner />;
  if (isError) return <ErrorMessage message={error?.data?.message} />;

  const roundPrice = (price) => Number(price ?? 0).toFixed(2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8">
          Order #{order?._id}
        </h1>

        {/* Shipping Information */}
        <div className="bg-white shadow rounded p-4 mb-6">
          <h2 className="text-xl font-semibold mb-3">Shipping Information</h2>
          <div className="space-y-2">
            <p>
              <strong>Name:</strong> {order?.user?.name}
            </p>
            <p>
              <strong>Email:</strong> {order?.user?.email}
            </p>
            <p>
              <strong>Address:</strong> {order?.shippingAddress?.street},{" "}
              {order?.shippingAddress?.city},{" "}
              {order?.shippingAddress?.postalCode},{" "}
              {order?.shippingAddress?.country}
            </p>

            {order?.orderStatus === "Delivered" ? (
              <p className="text-green-600 font-semibold mt-2">
                Delivered at: {order?.deliveredAt?.substring(0, 10)}
              </p>
            ) : (
              <p className="text-yellow-600 font-semibold mt-2">
                Status: {order?.orderStatus}
              </p>
            )}
          </div>
        </div>

        {/* Payment Information */}
        <div className="bg-white shadow rounded p-4 mb-6">
          <h2 className="text-xl font-semibold mb-3">Payment</h2>
          <p>
            <strong>Method:</strong> {order?.paymentInfo?.method}
          </p>
          <p>
            <strong>Status:</strong> {order?.paymentInfo?.status}
          </p>
        </div>

        {/* Order Items */}
        <div className="bg-white shadow rounded p-4 mb-6">
          <h2 className="text-xl font-semibold mb-4">Order Items</h2>
          <OrderItemsList items={order?.orderItems} />
        </div>

        {/* Order Summary */}
        <OrderSummaryDisplay
          itemsPrice={order?.itemsPrice}
          taxPrice={order?.taxPrice}
          shippingPrice={order?.shippingPrice}
          totalPrice={order?.totalPrice}
        />
      </div>
    </div>
  );
};

export default OrderDetails;
