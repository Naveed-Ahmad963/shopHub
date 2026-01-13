import React from "react";
import DeleteConfirmationModal from "../../modalComponents/SubmissionLogic/deleteConfirmationModal";

export const DeleteDialog = ({
  isOpen,
  title = "Delete Item",
  itemName,
  resourceType = "item",
  onConfirm,
  onCancel,
  isLoading = false,
}) => {
  return (
    <DeleteConfirmationModal
      isOpen={isOpen}
      title={title}
      itemName={itemName}
      resourceType={resourceType}
      onConfirm={onConfirm}
      onCancel={onCancel}
      isLoading={isLoading}
    />
  );
};
