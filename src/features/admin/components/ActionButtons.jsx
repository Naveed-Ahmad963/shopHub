import React from "react";
import { Edit, Trash2 } from "lucide-react";

export const ActionButtons = ({
  onEdit,
  onDelete,
  editLabel = "Edit",
  deleteLabel = "Delete",
  showEdit = true,
  showDelete = true,
  customActions = [],
  isEditDisabled = false,
}) => {
  return (
    <div className="flex gap-2 flex-wrap">
      {showEdit && (
        <button
          onClick={onEdit}
          disabled={isEditDisabled}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg hover:scale-105 disabled:opacity-50"
          title={editLabel}
        >
          <Edit className="w-4 h-4" />
          {editLabel}
        </button>
      )}

      {showDelete && (
        <button
          onClick={onDelete}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg hover:from-red-700 hover:to-red-800 transition-all shadow-md hover:shadow-lg hover:scale-105"
          title={deleteLabel}
        >
          <Trash2 className="w-4 h-4" />
          {deleteLabel}
        </button>
      )}

      {customActions.map((action, idx) => (
        <button
          key={idx}
          onClick={action.onClick}
          className={action.className}
          title={action.title}
        >
          {action.icon && <action.icon className="w-4 h-4" />}
          {action.label}
        </button>
      ))}
    </div>
  );
};
