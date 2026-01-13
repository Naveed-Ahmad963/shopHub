import React from "react";
import { Link } from "react-router-dom";
import {
  Package,
  ShoppingCart,
  Users,
  FolderTree,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import { useGetProductsForAdminQuery } from "../products/productsApiSlice";
import { useGetOrdersQuery } from "../orders/ordersApiSlice";

const Dashboard = () => {
  // ✅ FIX — data is already an array (due to transformResponse)
  const { data: products = [] } = useGetProductsForAdminQuery();
  const { data: orders = [] } = useGetOrdersQuery();
  console.log("PRODUCTS RESPONSE =>", products);
  console.log("ORDERS RESPONSE =>", orders);
  const stats = [
    {
      title: "Total Products",
      value: products.length,
      icon: Package,
      gradient: "from-blue-600 to-blue-700",
      bgGradient: "from-blue-50 to-blue-100",
      link: "/admin/products",
      borderColor: "border-blue-600",
    },
    {
      title: "Total Orders",
      value: orders.length,
      icon: ShoppingCart,
      gradient: "from-green-600 to-green-700",
      bgGradient: "from-green-50 to-emerald-50",
      link: "/admin/orders",
      borderColor: "border-green-600",
    },
    {
      title: "Manage Users",
      value: "View All",
      icon: Users,
      gradient: "from-purple-600 to-purple-700",
      bgGradient: "from-purple-100 to-purple-50",
      link: "/admin/users",
      borderColor: "border-purple-600",
    },
    {
      title: "Categories",
      value: "Manage",
      icon: FolderTree,
      gradient: "from-orange-600 to-orange-700",
      bgGradient: "from-orange-50 to-amber-50",
      link: "/admin/categories",
      borderColor: "border-orange-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <Sparkles className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-gray-600 text-lg">
            Welcome back! Here's what's happening with your store today.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Link
              key={index}
              to={stat.link}
              className={`group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border-t-4 ${stat.borderColor}`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              ></div>

              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-semibold mb-2 uppercase tracking-wide">
                    {stat.title}
                  </p>
                  <p className="text-4xl font-extrabold text-gray-900">
                    {stat.value}
                  </p>
                  <div className="flex items-center gap-1 mt-2 text-sm text-gray-600 group-hover:text-gray-700">
                    <span>View details</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                <div
                  className={`p-4 rounded-2xl bg-gradient-to-br ${stat.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border-t-4 border-blue-600">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                  Recent Orders
                </h2>
              </div>
              <Link
                to="/admin/orders"
                className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                View All
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {orders.length > 0 ? (
              <div className="space-y-3">
                {orders.slice(0, 5).map((order) => (
                  <Link
                    key={order._id}
                    to={`/admin/orders`}
                    className="group flex justify-between items-center p-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 rounded-xl transition-all"
                  >
                    <div>
                      <p className="font-bold text-gray-900 group-hover:text-blue-600">
                        #{order._id.slice(-8).toUpperCase()}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {order.user?.name}
                      </p>
                    </div>

                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        order.status === "delivered"
                          ? "bg-gradient-to-r from-green-500 to-green-600 text-white"
                          : order.status === "processing"
                          ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white"
                          : "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white"
                      }`}
                    >
                      {order.status}
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingCart className="w-8 h-8 text-blue-600" />
                </div>
                <p className="text-gray-600">No orders yet</p>
              </div>
            )}
          </div>

          {/* Low Stock */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border-t-4 border-red-600">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-red-600 to-red-700 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold">Low Stock Alert</h2>
              </div>
              <Link
                to="/admin/products"
                className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                View All
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {products.filter((p) => p.stock < 10).length > 0 ? (
              <div className="space-y-3">
                {products
                  .filter((p) => p.stock < 10)
                  .slice(0, 5)
                  .map((product) => (
                    <Link
                      key={product._id}
                      to={`/admin/products`}
                      className="group flex justify-between items-center p-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 rounded-xl transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={
                            product.images?.[0]?.url ||
                            "https://via.placeholder.com/50"
                          }
                          alt={product.title}
                          className="w-16 h-16 object-cover rounded-xl shadow-md"
                        />

                        <div>
                          <p className="font-bold group-hover:text-blue-600">
                            {product.title}
                          </p>
                          <p className="text-sm text-gray-600">
                            Stock:{" "}
                            <span className="font-semibold text-blue-600">
                              {product.stock} units
                            </span>
                          </p>
                        </div>
                      </div>

                      <span className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full text-sm font-semibold">
                        Low
                      </span>
                    </Link>
                  ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="w-8 h-8 text-red-600" />
                </div>
                <p className="text-gray-600 font-semibold">
                  All products are well stocked!
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  No action needed at this time
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
