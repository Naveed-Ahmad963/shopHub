import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingCart,
  Calendar,
  DollarSign,
  Package,
  TrendingUp,
  Eye,
} from "lucide-react";
import {
  useGetOrdersQuery,
  useUpdateOrderStatusMutation,
  useDeleteOrderMutation,
} from "../orders/ordersApiSlice";
import Spinner from "../../components/common/Spinner";
import { formatPrice, formatDate } from "../../utils/helpers";
import { useCRUDOperations } from "../../hooks/useCRUDOperations";
import { ManagementPageLayout } from "./components/ManagementPageLayout";
import { StatsCard } from "./components/StatsCard";
import { DataTable } from "./components/DataTable";
import { DeleteDialog } from "./components/DeleteDialog";
import { ORDER_STATUS } from "../../utils/constants";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../utils/helpers";
import { useModalState } from "../../hooks/useModalState";

const ManageOrders = () => {
  const {
    data: orders,
    isLoading,
    refetch,
  } = useGetOrdersQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [deleteOrder] = useDeleteOrderMutation();
  const [updateOrderStatus, { isLoading: isUpdating }] =
    useUpdateOrderStatusMutation();

  const {
    showDeleteModal,
    itemToDelete: orderToDelete,
    isDeleting,
    handleDelete: handleDeleteClick,
    handleConfirmDelete,
    setShowDeleteModal,
  } = useCRUDOperations(null, null, deleteOrder);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus({ id: orderId, status: newStatus }).unwrap();
      toast.success("Order status updated successfully!");
      refetch();
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Spinner size="lg" />
      </div>
    );
  }

  const totalRevenue =
    orders?.reduce((sum, order) => sum + order.totalPrice, 0) || 0;
  const pendingOrders =
    orders?.filter((o) => o.orderStatus === "pending").length || 0;
  const deliveredOrders =
    orders?.filter((o) => o.orderStatus === "delivered").length || 0;

  const getStatusColor = (status) => {
    const colorMap = {
      pending: "from-yellow-500 to-orange-500",
      processing: "from-blue-500 to-blue-600",
      shipped: "from-purple-500 to-purple-600",
      delivered: "from-green-500 to-green-600",
      cancelled: "from-red-600 to-red-700",
    };
    return colorMap[status] || "from-blue-500 to-blue-600";
  };

  const getRowBackgroundColor = (status) => {
    const bgMap = {
      pending: "hover:bg-gradient-to-r hover:from-yellow-50 hover:to-orange-50",
      processing: "hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50",
      shipped: "hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50",
      delivered:
        "hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50",
      cancelled: "hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50",
    };
    return (
      bgMap[status] ||
      "hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100"
    );
  };

  return (
    <>
      <ManagementPageLayout
        title="Manage Orders"
        subtitle="Track and manage all customer orders"
        icon={ShoppingCart}
        showAddButton={false}
      >
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatsCard
            label="Total Orders"
            value={orders?.length || 0}
            icon={Package}
            gradientFrom="from-blue-600"
            gradientTo="to-blue-700"
            className="border-t-4 border-blue-600"
          />
          <StatsCard
            label="Total Revenue"
            value={formatPrice(totalRevenue)}
            icon={DollarSign}
            gradientFrom="from-green-600"
            gradientTo="to-green-700"
            className="border-t-4 border-green-600"
          />
          <StatsCard
            label="Pending"
            value={pendingOrders}
            icon={TrendingUp}
            gradientFrom="from-yellow-500"
            gradientTo="to-orange-500"
            className="border-t-4 border-yellow-500"
          />
          <StatsCard
            label="Delivered"
            value={deliveredOrders}
            icon={ShoppingCart}
            gradientFrom="from-green-500"
            gradientTo="to-green-600"
            className="border-t-4 border-green-500"
          />
        </div>

        {/* Orders Table */}
        <DataTable
          columns={[
            "Order ID",
            "Customer",
            "Date",
            "Total",
            "Status",
            "Actions",
          ]}
          data={orders}
          emptyMessage="No orders found"
          emptyIcon={ShoppingCart}
          renderRow={(order) => (
            <tr
              key={order._id}
              className={`border-b border-gray-100 transition-all duration-200 ${getRowBackgroundColor(
                order.orderStatus
              )}`}
            >
              <td className="py-4 px-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                    <Package className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-bold text-gray-900">
                    #{order._id.slice(-8).toUpperCase()}
                  </span>
                </div>
              </td>
              <td className="py-4 px-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center font-bold text-white text-sm">
                    {order.user?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <span className="text-gray-900 font-medium">
                    {order.user?.name}
                  </span>
                </div>
              </td>
              <td className="py-4 px-6">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  {formatDate(order.createdAt)}
                </div>
              </td>
              <td className="py-4 px-6">
                <div className="flex items-center gap-1 font-bold text-gray-900">
                  <DollarSign className="w-4 h-4 text-blue-600" />
                  {formatPrice(order.totalPrice)}
                </div>
              </td>
              <td className="py-4 px-6">
                <select
                  value={order.orderStatus}
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                  disabled={isUpdating}
                  className={`px-4 py-2 rounded-xl border-2 border-transparent bg-gradient-to-r ${getStatusColor(
                    order.orderStatus
                  )} text-white font-semibold text-sm focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg cursor-pointer transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {Object.values(ORDER_STATUS).map((status) => (
                    <option
                      key={status}
                      value={status}
                      className="bg-white text-gray-900"
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </td>
              <td className="py-4 px-6">
                <div className="flex items-center gap-2">
                  <Link
                    to={`/orders/${order._id}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </Link>
                  <button
                    onClick={() => handleDeleteClick(order)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-xl hover:from-red-700 hover:to-red-800 transition-all shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          )}
        />
      </ManagementPageLayout>

      <DeleteDialog
        isOpen={showDeleteModal}
        title="Delete Order"
        itemName={`Order #${orderToDelete?._id.slice(-8).toUpperCase()}`}
        resourceType="order"
        onConfirm={handleConfirmDelete}
        onCancel={() => setShowDeleteModal(false)}
        isLoading={isDeleting}
      />
    </>
  );
};

export default ManageOrders;
