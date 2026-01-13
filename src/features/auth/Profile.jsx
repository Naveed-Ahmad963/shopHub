import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  User,
  Mail,
  Package,
  ShoppingBag,
  Calendar,
  DollarSign,
} from "lucide-react";
import { selectCurrentUser } from "./authSlice";
import { useGetMyOrdersQuery } from "../orders/ordersApiSlice";
import Spinner from "../../components/common/Spinner";
import { formatPrice, formatDate } from "../../utils/helpers";

const Profile = () => {
  const user = useSelector(selectCurrentUser);
  const { data: orders, isLoading } = useGetMyOrdersQuery();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "from-green-500 to-emerald-500";
      case "cancelled":
        return "from-red-500 to-pink-500";
      case "shipped":
        return "from-purple-500 to-pink-500";
      case "processing":
        return "from-blue-500 to-cyan-500";
      default:
        return "from-yellow-500 to-orange-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl">
              <User className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              My Profile
            </h1>
          </div>
          <p className="text-gray-600 text-lg ml-16">
            Manage your account and view your orders
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-gradient-to-r from-blue-600 to-blue-700">
              <div className="flex items-center justify-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
                  <User className="w-12 h-12 text-white" />
                </div>
              </div>

              <div className="space-y-6">
                <div className="pb-4 border-b-2 border-blue-100">
                  <label className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-1 block">
                    Name
                  </label>
                  <p className="font-extrabold text-gray-900 text-lg">
                    {user?.name}
                  </p>
                </div>

                <div className="pb-4">
                  <label className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-1 block">
                    Email
                  </label>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-blue-600" />
                    <p className="font-semibold text-gray-900">{user?.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Orders */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-gradient-to-r from-blue-600 to-blue-700">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg">
                  <ShoppingBag className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-extrabold text-gray-900">
                  My Orders
                </h2>
              </div>

              {isLoading ? (
                <div className="flex justify-center py-12">
                  <Spinner size="lg" />
                </div>
              ) : orders && orders.length > 0 ? (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <Link
                      key={order._id}
                      to={`/orders/${order._id}`}
                      className="block border-2 border-blue-200 rounded-xl p-6 hover:border-blue-600 hover:shadow-lg transition-all hover:scale-102 hover:bg-blue-50"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                              <Package className="w-4 h-4 text-white" />
                            </div>
                            <p className="font-extrabold text-gray-900">
                              Order #{order._id.slice(-8).toUpperCase()}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <p className="text-sm font-semibold">
                              {formatDate(order.createdAt)}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`px-4 py-2 rounded-xl bg-gradient-to-r ${getStatusColor(
                            order.orderStatus
                          )} text-white font-semibold text-sm shadow-lg`}
                        >
                          {order.orderStatus?.charAt(0).toUpperCase() +
                            order.orderStatus?.slice(1)}
                        </span>
                      </div>

                      <div className="flex justify-between items-center pt-4 border-t-2 border-blue-100">
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4 text-blue-600" />
                          <p className="text-sm font-semibold text-gray-600">
                            {order.orderItems?.length || 0} item(s)
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-5 h-5 text-blue-600" />
                          <p className="font-extrabold text-gray-900 text-lg">
                            {formatPrice(order.totalPrice)}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="w-10 h-10 text-blue-600" />
                  </div>
                  <p className="text-gray-900 font-extrabold text-xl mb-2">
                    No orders yet
                  </p>
                  <p className="text-gray-600 mb-6">
                    You haven't placed any orders yet
                  </p>
                  <Link
                    to="/shop"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    Start Shopping
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
