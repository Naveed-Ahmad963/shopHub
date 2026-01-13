// hooks/useCRUDOperations.js
import { useState } from "react";
import toast from "react-hot-toast";
import { getErrorMessage } from "../utils/helpers";

export const useCRUDOperations = (
  createMutation,
  updateMutation,
  deleteMutation
) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleDelete = (item) => {
    setItemToDelete(item);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteMutation(itemToDelete._id || itemToDelete.id).unwrap();
      toast.success("Deleted successfully!");
      setShowDeleteModal(false);
      setItemToDelete(null);
      return true;
    } catch (err) {
      toast.error(getErrorMessage(err));
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
  };

  const handleSaveEdit = async (id, formData) => {
    try {
      await updateMutation({ id, ...formData }).unwrap();
      toast.success("Updated successfully!");
      setEditingItem(null);
      return true;
    } catch (err) {
      toast.error(getErrorMessage(err));
      return false;
    }
  };

  const handleCreate = async (formData) => {
    try {
      await createMutation(formData).unwrap();
      toast.success("Created successfully!");
      return true;
    } catch (err) {
      toast.error(getErrorMessage(err));
      return false;
    }
  };

  return {
    isDeleting,
    editingItem,
    showDeleteModal,
    itemToDelete,
    handleDelete,
    handleConfirmDelete,
    handleEdit,
    handleSaveEdit,
    handleCreate,
    setEditingItem,
    setShowDeleteModal,
    setItemToDelete,
  };
};
