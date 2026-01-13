import React from "react";
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../../features/products/productsApiSlice";
import ProductCard from "../../features/products/ProductCard";
import Spinner from "../common/Spinner";
import { Sparkles, ArrowRight, Package } from "lucide-react";

const FeaturedProducts = () => {
  const { data: products, isLoading } = useGetProductsQuery({ limit: 8 });

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
              Featured Products
            </h2>
          </div>
          <p className="text-gray-600 text-lg font-medium">
            Check out our most popular and trending items
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Spinner size="lg" />
          </div>
        ) : products && products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {products.slice(0, 8).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            <div className="text-center">
              <Link
                to="/shop"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-lg rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                View All Products
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-16">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-10 h-10 text-gray-400" />
              </div>
              <p className="text-gray-900 font-extrabold text-xl mb-2">
                No products available yet
              </p>
              <p className="text-gray-600 text-sm mb-6">
                Start adding products to showcase them here
              </p>
              <Link
                to="/admin/products"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                <Package className="w-5 h-5" />
                Add Products
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
