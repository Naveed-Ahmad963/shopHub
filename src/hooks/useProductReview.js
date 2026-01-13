// hooks/useProductReview.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddReviewMutation } from "../features/reviews/reviewsApiSlice";
import { getErrorMessage } from "../utils/helpers";
import toast from "react-hot-toast";

export const useProductReview = (productId, user) => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [addReview, { isLoading: isReviewLoading }] = useAddReviewMutation();

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      await addReview({
        productId,
        rating,
        comment,
      }).unwrap();
      setRating(5);
      setComment("");
      toast.success("Review added successfully!");
      return true;
    } catch (err) {
      toast.error(getErrorMessage(err));
      return false;
    }
  };

  return {
    rating,
    setRating,
    comment,
    setComment,
    isReviewLoading,
    handleSubmitReview,
  };
};
