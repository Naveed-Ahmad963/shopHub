// src/features/modals/components/ModalActions.jsx
import { Plus, Edit } from "lucide-react";
import Spinner from "../../components/common/Spinner";

const ModalActions = ({
  onClose,
  isSubmitting,
  submitLabel = "Save",
  isEdit = false,
}) => {
  const icon = isEdit ? (
    <Edit className="w-4 h-4" />
  ) : (
    <Plus className="w-4 h-4" />
  );

  return (
    <div className="flex gap-3 p-6 border-t border-blue-100 bg-gray-50">
      <button
        type="button"
        onClick={onClose}
        disabled={isSubmitting}
        className="flex-1 px-6 py-3 border-2 border-blue-300 text-blue-700 font-semibold rounded-xl hover:bg-blue-50 transition-all disabled:opacity-50"
      >
        Cancel
      </button>
      <button
        type="submit"
        disabled={isSubmitting}
        className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all disabled:opacity-50 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Spinner size="sm" />
            <span>Saving...</span>
          </>
        ) : (
          <>
            {icon}
            <span>{submitLabel}</span>
          </>
        )}
      </button>
    </div>
  );
};

export default ModalActions;
