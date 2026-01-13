// src/features/modals/EditCategoryModal.jsx
import { useForm } from "react-hook-form";
import { Edit } from "lucide-react";
import BaseModal from "../BaseModal";
import FormField from "../FormField";
import ModalActions from "../ModalActions";
import { VALIDATION_RULES } from "../ModalHooks/useFormValidation";

const EditCategoryModal = ({ category, onClose, onSave, isSubmitting }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: category?.name || "",
      description: category?.description || "",
    },
  });

  const onSubmit = async (data) => {
    await onSave(category._id, data);
  };

  return (
    <BaseModal title="Edit Category" icon={Edit} onClose={onClose} size="md">
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
        <FormField
          label="Category Name"
          icon="FolderTree"
          name="name"
          register={register}
          validation={VALIDATION_RULES.name("Name")}
          error={errors.name}
          placeholder="Enter category name"
        />

        <FormField
          label="Description"
          icon="FileText"
          name="description"
          type="textarea"
          register={register}
          validation={{}}
          error={errors.description}
          placeholder="Enter category description"
          rows="4"
        />

        <ModalActions
          onClose={onClose}
          isSubmitting={isSubmitting}
          submitLabel="Update Category"
          isEdit={true}
        />
      </form>
    </BaseModal>
  );
};

export default EditCategoryModal;
