import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MessageSquare, ChevronLeft } from "lucide-react";
import { useGetProductByIdQuery } from "./productsApiSlice";
import Spinner from "../../components/common/Spinner";
import ErrorMessage from "../../components/common/ErrorMessage";
import { getErrorMessage } from "../../utils/helpers";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../auth/authSlice";
import { useProductCart } from "../../hooks/useProductCart";
import { useProductReview } from "../../hooks/useProductReview";
import { ProductInfo } from "./components/ProductInfo";
import { ReviewForm } from "./components/ReviewForm";
import { ReviewsList } from "./components/ReviewsList";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);

  const [quantity, setQuantity] = useState(1);

  const { data: product, isLoading, error } = useGetProductByIdQuery(id);
  const { handleAddToCart } = useProductCart();
  const {
    rating,
    setRating,
    comment,
    setComment,
    isReviewLoading,
    handleSubmitReview,
  } = useProductReview(id, user);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <ErrorMessage message={getErrorMessage(error)} />
        </div>
      </div>
    );
  }

  const imageUrl =
    product.images?.[0]?.url || "https://via.placeholder.com/600";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-semibold mb-8 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="bg-gray-50 rounded-lg overflow-hidden">
              <img
                src={imageUrl}
                alt={product.title}
                className="w-full h-auto rounded-lg"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/600";
                }}
              />
            </div>
          </div>

          {/* Product Info */}
          <ProductInfo
            product={product}
            quantity={quantity}
            setQuantity={setQuantity}
            onAddToCart={handleAddToCart}
          />
        </div>

        {/* Reviews Section */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-blue-50 rounded-lg border border-blue-200">
              <MessageSquare className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Customer Reviews
            </h2>
          </div>

          {/* Review Form */}
          <ReviewForm
            user={user}
            rating={rating}
            setRating={setRating}
            comment={comment}
            setComment={setComment}
            isLoading={isReviewLoading}
            onSubmit={handleSubmitReview}
            onLoginClick={() => navigate("/login")}
          />

          {/* Reviews List */}
          <ReviewsList reviews={product.reviews} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
