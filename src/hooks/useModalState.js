import { useState } from "react";

export const useModalState = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return {
    showAddModal,
    setShowAddModal,
    showDeleteModal,
    setShowDeleteModal,
  };
};
