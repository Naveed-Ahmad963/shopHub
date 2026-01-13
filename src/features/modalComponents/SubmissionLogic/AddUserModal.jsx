// src/features/modals/AddUserModal.jsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";
import BaseModal from "../BaseModal";
import FormField from "../FormField";
import ModalActions from "../ModalActions";
import { VALIDATION_RULES } from "../ModalHooks/useFormValidation";

const AddUserModal = ({ onClose, onSave, isSubmitting }) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "user",
    },
  });

  const onSubmit = async (data) => {
    await onSave(data);
    reset();
  };

  return (
    <BaseModal title="Add User" icon={Plus} onClose={onClose} size="md">
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
        <FormField
          label="Name"
          icon="UserIcon"
          name="name"
          register={register}
          validation={VALIDATION_RULES.name("Name")}
          error={errors.name}
          placeholder="Enter user name"
        />

        <FormField
          label="Email"
          icon="Mail"
          name="email"
          type="email"
          register={register}
          validation={VALIDATION_RULES.email}
          error={errors.email}
          placeholder="Enter email address"
        />

        <FormField
          label="Password"
          icon="Shield"
          name="password"
          type="password"
          register={register}
          validation={VALIDATION_RULES.password}
          error={errors.password}
          placeholder="Enter password (min. 6 characters)"
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword(!showPassword)}
        />

        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
            <span className="w-4 h-4 text-blue-600">
              {/* Shield icon for role */}
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path d="M3.5 6.5A9.5 9.5 0 0110 1v18c-6.5 0-9-3.5-9-7v-4.5z" />
              </svg>
            </span>
            Role
          </label>
          <select
            {...register("role")}
            className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <ModalActions
          onClose={onClose}
          isSubmitting={isSubmitting}
          submitLabel="Create User"
          isEdit={false}
        />
      </form>
    </BaseModal>
  );
};

export default AddUserModal;
