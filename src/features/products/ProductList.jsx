import { useGetProductsQuery } from "./productsApiSlice";
import { useGetCategoriesQuery } from "../categories/categoriesApiSlice";
import Spinner from "../../components/common/Spinner";
import ErrorMessage from "../../components/common/ErrorMessage";
import { getErrorMessage } from "../../utils/helpers";
import { useProductFilters } from "../../hooks/useProductFilter";
import { CategoryFilter } from "./components/CategoryFilter";
import { SearchBanner } from "./components/SearchBanner";
import { Pagination } from "./components/Pagination";
import { EmptyState } from "./components/EmptyState";
import { ProductsDisplay } from "./components/ProductsDisplay";

const ProductList = () => {
  const {
    selectedCategory,
    viewMode,
    setViewMode,
    searchQuery,
    currentPage,
    handleCategoryChange,
    handlePageChange,
    clearSearch,
    clearAllFilters,
  } = useProductFilters();

  const {
    data: productsData,
    isLoading,
    error,
  } = useGetProductsQuery({
    category: selectedCategory,
    search: searchQuery,
    page: currentPage,
    limit: 12,
  });
  const { data: categoriesData } = useGetCategoriesQuery();

  // ✅ FIXED: categoriesData is already an array (due to transformResponse)
  const categories = Array.isArray(categoriesData) ? categoriesData : [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <Spinner size="lg" />
      </div>
    );
  }

  // ✅ FIXED: productsData already contains full response with pagination (no .data wrapper)
  const products = productsData?.products || [];
  const totalPages = productsData?.totalPages || 1;
  const total = productsData?.total || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
              <span className="hover:text-blue-600 cursor-pointer">Home</span>
              <span>/</span>
              <span className="font-semibold text-gray-900">
                {searchQuery ? "Search Results" : "All Products"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">
                  {searchQuery
                    ? `Results for "${searchQuery}"`
                    : "All Products"}
                </h1>
                <p className="text-gray-600">
                  {total > 0
                    ? `${total} ${total === 1 ? "product" : "products"} found`
                    : "No products found"}
                </p>
              </div>
            </div>
          </div>

          {/* Search Banner */}
          <SearchBanner
            searchQuery={searchQuery}
            total={total}
            onClearSearch={clearSearch}
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            onClearFilters={clearAllFilters}
            total={total}
            searchQuery={searchQuery}
          />

          {/* Products Grid */}
          <main className="flex-1">
            {error ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <ErrorMessage message={getErrorMessage(error)} />
              </div>
            ) : products.length > 0 ? (
              <>
                <ProductsDisplay
                  products={products}
                  total={total}
                  viewMode={viewMode}
                  onViewModeChange={setViewMode}
                />
              </>
            ) : (
              <EmptyState
                searchQuery={searchQuery}
                selectedCategory={selectedCategory}
                onClearSearch={clearSearch}
                onClearAllFilters={clearAllFilters}
              />
            )}
          </main>
        </div>

        {/* Pagination */}
        {products.length > 0 && totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            total={total}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default ProductList;
