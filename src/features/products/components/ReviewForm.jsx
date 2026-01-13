// components/ReviewForm.jsx
import React from "react";
import { Star, User } from "lucide-react";

export const ReviewForm = ({
  user,
  rating,
  setRating,
  comment,
  setComment,
  isLoading,
  onSubmit,
  onLoginClick,
}) => {
  if (!user) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 mb-8 text-center">
        <div className="w-16 h-16 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8 text-blue-600" />
        </div>
        <p className="text-gray-900 font-semibold text-base mb-4">
          Please login to write a review
        </p>
        <button
          onClick={onLoginClick}
          className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all shadow-sm hover:shadow-md"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
      <h3 className="text-lg font-bold text-gray-900 mb-6">Write a Review</h3>
      <form onSubmit={onSubmit}>
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Rating
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="focus:outline-none transition-transform hover:scale-110"
              >
                <Star
                  className={`w-8 h-8 ${
                    star <= rating
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Comment
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows="4"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
            placeholder="Share your experience with this product..."
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-sm text-sm"
        >
          {isLoading ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
};
