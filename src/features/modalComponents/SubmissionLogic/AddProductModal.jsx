// src/features/modals/AddProductModal.jsx
import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";
import BaseModal from "../BaseModal";
import FormField from "../FormField";
import ModalActions from "../ModalActions";
import { VALIDATION_RULES } from "../ModalHooks/useFormValidation";

const AddProductModal = ({ categories, onClose, onSave, isSubmitting }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      price: "",
      category: "",
      stock: "",
      brand: "",
      imageUrl: "",
    },
  });

  const onSubmit = async (data) => {
    const productData = {
      title: data.title,
      description: data.description,
      price: Number(data.price),
      stock: Number(data.stock),
      category: data.category,
      brand: data.brand || "",
      images: data.imageUrl ? [{ url: data.imageUrl }] : [],
    };
    await onSave(productData);
    reset();
  };

  return (
    <BaseModal title="Add Product" icon={Plus} onClose={onClose} size="lg">
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
        <FormField
          label="Product Title"
          icon="Package"
          name="title"
          register={register}
          validation={VALIDATION_RULES.title}
          error={errors.title}
          placeholder="Enter product title"
        />

        <FormField
          label="Description"
          icon="FileText"
          name="description"
          type="textarea"
          register={register}
          validation={VALIDATION_RULES.description}
          error={errors.description}
          placeholder="Enter product description"
          rows="4"
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            label="Price"
            icon="DollarSign"
            name="price"
            type="number"
            register={register}
            validation={VALIDATION_RULES.price}
            error={errors.price}
            placeholder="0.00"
            step="0.01"
          />

          <FormField
            label="Stock"
            icon="Layers"
            name="stock"
            type="number"
            register={register}
            validation={VALIDATION_RULES.stock}
            error={errors.stock}
            placeholder="0"
          />
        </div>

        <FormField
          label="Category"
          icon="Tag"
          name="category"
          type="select"
          register={register}
          validation={VALIDATION_RULES.category}
          error={errors.category}
          options={categories}
        />

        <FormField
          label="Product Image URL"
          icon="ImageIcon"
          name="imageUrl"
          type="text"
          register={register}
          validation={{}}
          error={errors.imageUrl}
          placeholder="https://example.com/image.jpg"
        />

        <ModalActions
          onClose={onClose}
          isSubmitting={isSubmitting}
          submitLabel="Create Product"
          isEdit={false}
        />
      </form>
    </BaseModal>
  );
};

export default AddProductModal;
