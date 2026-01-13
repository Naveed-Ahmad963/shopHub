//hooks / useProductFilters.js;
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export const useProductFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || ""
  );
  const [viewMode, setViewMode] = useState("grid");

  const searchQuery = searchParams.get("search") || "";
  const currentPage = parseInt(searchParams.get("page")) || 1;

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    const params = new URLSearchParams(searchParams);
    if (categoryId) {
      params.set("category", categoryId);
    } else {
      params.delete("category");
    }
    params.set("page", "1");
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearSearch = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("search");
    params.set("page", "1");
    setSearchParams(params);
  };

  const clearAllFilters = () => {
    setSelectedCategory("");
    const params = new URLSearchParams();
    if (searchQuery) {
      params.set("search", searchQuery);
    }
    params.set("page", "1");
    setSearchParams(params);
  };

  return {
    searchParams,
    setSearchParams,
    selectedCategory,
    viewMode,
    setViewMode,
    searchQuery,
    currentPage,
    handleCategoryChange,
    handlePageChange,
    clearSearch,
    clearAllFilters,
  };
};
