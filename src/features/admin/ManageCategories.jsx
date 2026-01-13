import React from "react";
import { FolderTree, FileText, Layers } from "lucide-react";
import {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "../categories/categoriesApiSlice";
import Spinner from "../../components/common/Spinner";
import { useCRUDOperations } from "../../hooks/useCRUDOperations";
import { ManagementPageLayout } from "./components/ManagementPageLayout";
import { StatsCard } from "./components/StatsCard";
import { ActionButtons } from "./components/ActionButtons";
import { DeleteDialog } from "./components/DeleteDialog";
import EditCategoryModal from "../modalComponents/SubmissionLogic/EditCategoryModal";
import AddCategoryModal from "../modalComponents/SubmissionLogic/AddCategoryModal";
import { useModalState } from "../../hooks/useModalState";

const ManageCategories = () => {
  const { data: categories, isLoading } = useGetCategoriesQuery();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateCategoryMutation();
  const [createCategory, { isLoading: isCreating }] =
    useCreateCategoryMutation();

  const {
    editingItem: editingCategory,
    showDeleteModal,
    itemToDelete: categoryToDelete,
    isDeleting,
    handleDelete: handleDeleteClick,
    handleConfirmDelete,
    handleEdit,
    handleSaveEdit,
    handleCreate: handleCreateCategory,
    setEditingItem: setEditingCategory,
    setShowDeleteModal,
  } = useCRUDOperations(createCategory, updateCategory, deleteCategory);

  const { showAddModal, setShowAddModal } = useModalState();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <>
      <ManagementPageLayout
        title="Manage Categories"
        subtitle="Organize your products with categories"
        icon={FolderTree}
        onAddClick={() => setShowAddModal(true)}
        addButtonText="Add Category"
      >
        {/* Stats Card */}
        <div className="mb-8">
          <StatsCard
            label="Total Categories"
            value={categories?.length || 0}
            icon={Layers}
            gradientFrom="from-blue-500"
            gradientTo="to-blue-600"
          />
        </div>

        {/* Categories Grid */}
        {categories && categories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <div
                key={category._id}
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-transparent hover:border-blue-200"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg group-hover:scale-110 transition-transform duration-300">
                        <FolderTree className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {category.name}
                      </h3>
                    </div>
                    <div className="flex items-start gap-2 text-gray-600 text-sm">
                      <FileText className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <p className="line-clamp-2">
                        {category.description || "No description"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t border-gray-100">
                  <ActionButtons
                    onEdit={() => handleEdit(category)}
                    onDelete={() => handleDeleteClick(category)}
                    showEdit={true}
                    showDelete={true}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-16 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <FolderTree className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No Categories Yet
            </h3>
            <p className="text-gray-600 mb-6">
              Start organizing your products by creating your first category
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl hover:scale-105"
            >
              Add Your First Category
            </button>
          </div>
        )}
      </ManagementPageLayout>

      {/* Modals */}
      {showAddModal && (
        <AddCategoryModal
          onClose={() => setShowAddModal(false)}
          onSave={handleCreateCategory}
          isSubmitting={isCreating}
        />
      )}

      {editingCategory && (
        <EditCategoryModal
          category={editingCategory}
          onClose={() => setEditingCategory(null)}
          onSave={handleSaveEdit}
          isSubmitting={isUpdating}
        />
      )}

      <DeleteDialog
        isOpen={showDeleteModal}
        title="Delete Category"
        itemName={categoryToDelete?.name}
        resourceType="category"
        onConfirm={handleConfirmDelete}
        onCancel={() => setShowDeleteModal(false)}
        isLoading={isDeleting}
      />
    </>
  );
};

export default ManageCategories;
