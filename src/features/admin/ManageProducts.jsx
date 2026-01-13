import React from "react";
import { Package, DollarSign, Tag, TrendingUp } from "lucide-react";
import {
  useGetProductsForAdminQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from "../products/productsApiSlice";
import { useGetCategoriesQuery } from "../categories/categoriesApiSlice";
import Spinner from "../../components/common/Spinner";
import { formatPrice } from "../../utils/helpers";
import { useCRUDOperations } from "../../hooks/useCRUDOperations";
import { ManagementPageLayout } from "./components/ManagementPageLayout";
import { StatsCard } from "./components/StatsCard";
import { DataTable } from "./components/DataTable";
import { ActionButtons } from "./components/ActionButtons";
import { DeleteDialog } from "./components/DeleteDialog";
import EditProductModal from "../modalComponents/SubmissionLogic/EditProductModal";
import AddProductModal from "../modalComponents/SubmissionLogic/AddProductModal";
import { useModalState } from "../../hooks/useModalState";

const ManageProducts = () => {
  const { data: products, isLoading } = useGetProductsForAdminQuery();
  const { data: categories } = useGetCategoriesQuery();
  console.log("products =>", products);
  console.log("categories =>", categories);
  const [deleteProduct] = useDeleteProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();

  const {
    editingItem: editingProduct,
    showDeleteModal,
    itemToDelete: productToDelete,
    isDeleting,
    handleDelete: handleDeleteClick,
    handleConfirmDelete,
    handleEdit,
    handleSaveEdit,
    handleCreate: handleCreateProduct,
    setEditingItem: setEditingProduct,
    setShowDeleteModal,
  } = useCRUDOperations(createProduct, updateProduct, deleteProduct);

  const { showAddModal, setShowAddModal } = useModalState();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Spinner size="lg" />
      </div>
    );
  }

  const totalValue =
    products?.reduce((sum, p) => sum + p.price * p.stock, 0) || 0;
  const lowStock = products?.filter((p) => p.stock < 10).length || 0;

  return (
    <>
      <ManagementPageLayout
        title="Manage Products"
        subtitle="Add, edit, and manage your product catalog"
        icon={Package}
        onAddClick={() => setShowAddModal(true)}
        addButtonText="Add Product"
      >
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard
            label="Total Products"
            value={products?.length || 0}
            icon={Package}
            gradientFrom="from-blue-500"
            gradientTo="to-blue-600"
          />
          <StatsCard
            label="Total Value"
            value={formatPrice(totalValue)}
            icon={DollarSign}
            gradientFrom="from-blue-400"
            gradientTo="to-blue-500"
          />
          <StatsCard
            label="Low Stock"
            value={lowStock}
            icon={TrendingUp}
            gradientFrom="from-red-600"
            gradientTo="to-red-700"
          />
        </div>

        {/* Products Table */}
        <DataTable
          columns={["Image", "Name", "Category", "Price", "Stock", "Actions"]}
          data={products}
          emptyMessage="No products found"
          emptyIcon={Package}
          renderRow={(product) => (
            <tr
              key={product._id}
              className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 transition-all duration-200"
            >
              <td className="py-4 px-6">
                <img
                  src={
                    product.images?.[0]?.url || "https://via.placeholder.com/50"
                  }
                  alt={product.title}
                  className="w-16 h-16 object-cover rounded-xl shadow-md hover:shadow-lg transition-shadow"
                />
              </td>
              <td className="py-4 px-6">
                <p className="font-bold text-gray-900">{product.title}</p>
              </td>
              <td className="py-4 px-6">
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-sm font-semibold hover:from-blue-600 hover:to-blue-700 transition-all">
                  <Tag className="w-3 h-3" />
                  {product.category?.name}
                </span>
              </td>
              <td className="py-4 px-6">
                <div className="flex items-center gap-1 font-bold text-gray-900">
                  <DollarSign className="w-4 h-4 text-blue-600" />
                  {formatPrice(product.price)}
                </div>
              </td>
              <td className="py-4 px-6">
                <span
                  className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-bold transition-all ${
                    product.stock > 10
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700"
                      : product.stock > 0
                      ? "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700"
                      : "bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800"
                  }`}
                >
                  {product.stock}
                </span>
              </td>
              <td className="py-4 px-6">
                <ActionButtons
                  onEdit={() => handleEdit(product)}
                  onDelete={() => handleDeleteClick(product)}
                />
              </td>
            </tr>
          )}
        />
      </ManagementPageLayout>

      {/* Modals */}
      {showAddModal && (
        <AddProductModal
          categories={categories}
          onClose={() => setShowAddModal(false)}
          onSave={handleCreateProduct}
          isSubmitting={isCreating}
        />
      )}

      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          categories={categories}
          onClose={() => setEditingProduct(null)}
          onSave={handleSaveEdit}
          isSubmitting={isUpdating}
        />
      )}

      <DeleteDialog
        isOpen={showDeleteModal}
        title="Delete Product"
        itemName={productToDelete?.title}
        resourceType="product"
        onConfirm={handleConfirmDelete}
        onCancel={() => setShowDeleteModal(false)}
        isLoading={isDeleting}
      />
    </>
  );
};

export default ManageProducts;
