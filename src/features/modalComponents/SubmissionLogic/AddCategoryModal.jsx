// src/features/modals/AddCategoryModal.jsx
import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";
import BaseModal from "../BaseModal";
import FormField from "../FormField";
import ModalActions from "../ModalActions";
import {
  VALIDATION_RULES,
  useFormValidation,
} from "../ModalHooks/useFormValidation";

const AddCategoryModal = ({ onClose, onSave, isSubmitting }) => {
  const { generateSlug } = useFormValidation();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      slug: "",
    },
  });

  const nameValue = watch("name");

  const onSubmit = async (data) => {
    // Auto-generate slug if empty
    if (!data.slug) {
      data.slug = generateSlug(data.name);
    }
    await onSave(data);
    reset();
  };

  return (
    <BaseModal title="Add Category" icon={Plus} onClose={onClose} size="md">
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
          label="Slug"
          icon="Link2"
          name="slug"
          register={register}
          validation={VALIDATION_RULES.slug}
          error={errors.slug}
          placeholder="Auto-generated from name"
          onChange={(e) => {
            const value = e.target.value;
            if (!value && nameValue) {
              e.target.value = generateSlug(nameValue);
            }
          }}
        />
        <p className="text-xs text-gray-500">
          Auto-generated from name if left empty
        </p>

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
          submitLabel="Create Category"
          isEdit={false}
        />
      </form>
    </BaseModal>
  );
};

export default AddCategoryModal;
